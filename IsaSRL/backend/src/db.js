const { Pool } = require("pg");
const { getConfigValue } = require("./config");

const dbHost = getConfigValue("DB_HOST");
const dbPort = Number(getConfigValue("DB_PORT", "5432"));
const dbName = getConfigValue("DB_NAME");
const dbUser = getConfigValue("DB_USER");
const dbPassword = getConfigValue("DB_PASSWORD");

const hasDbConfig =
  dbHost &&
  dbPort &&
  dbName &&
  dbUser &&
  dbPassword;

let pool = null;
let contactTableReady = false;
let abEventsTableReady = false;

if (hasDbConfig) {
  pool = new Pool({
    host: dbHost,
    port: dbPort,
    database: dbName,
    user: dbUser,
    password: dbPassword,
  });
}

async function checkDatabaseConnection() {
  if (!pool) {
    return "not-configured";
  }

  try {
    await pool.query("SELECT 1");
    return "connected";
  } catch {
    return "disconnected";
  }
}

async function getServiceHighlights() {
  if (!pool) {
    return [];
  }

  const result = await pool.query(
    "SELECT title, description FROM service_highlights ORDER BY id ASC"
  );

  return result.rows;
}

async function ensureContactTable() {
  if (!pool || contactTableReady) {
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_requests (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(120) NOT NULL,
      email VARCHAR(180) NOT NULL,
      phone VARCHAR(50),
      company VARCHAR(160),
      service_interest VARCHAR(160),
      message TEXT NOT NULL,
      consent_privacy BOOLEAN NOT NULL DEFAULT FALSE,
      source VARCHAR(120),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  contactTableReady = true;
}

async function ensureAbEventsTable() {
  if (!pool || abEventsTableReady) {
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS ab_test_events (
      id BIGSERIAL PRIMARY KEY,
      variant CHAR(1) NOT NULL CHECK (variant IN ('A', 'B')),
      event_type VARCHAR(16) NOT NULL CHECK (event_type IN ('impression', 'click')),
      cta_id VARCHAR(80) NOT NULL,
      page_path VARCHAR(200) NOT NULL,
      source VARCHAR(120),
      user_agent VARCHAR(260),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(
    "CREATE INDEX IF NOT EXISTS idx_ab_test_events_created_at ON ab_test_events (created_at DESC)"
  );
  await pool.query(
    "CREATE INDEX IF NOT EXISTS idx_ab_test_events_variant_event ON ab_test_events (variant, event_type)"
  );
  await pool.query(
    "CREATE INDEX IF NOT EXISTS idx_ab_test_events_cta_variant ON ab_test_events (cta_id, variant)"
  );

  abEventsTableReady = true;
}

async function saveContactLead(lead) {
  if (!pool) {
    return {
      stored: false,
      reason: "not-configured",
    };
  }

  try {
    await ensureContactTable();

    await pool.query(
      `
      INSERT INTO contact_requests (
        full_name,
        email,
        phone,
        company,
        service_interest,
        message,
        consent_privacy,
        source
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        lead.fullName,
        lead.email,
        lead.phone,
        lead.company,
        lead.serviceInterest,
        lead.message,
        lead.consentPrivacy,
        lead.source,
      ]
    );

    return {
      stored: true,
    };
  } catch {
    return {
      stored: false,
      reason: "db-error",
    };
  }
}

async function listContactLeads(limit = 50) {
  if (!pool) {
    return [];
  }

  const safeLimit = Math.min(200, Math.max(1, Number(limit) || 50));

  await ensureContactTable();

  const result = await pool.query(
    `
    SELECT
      id,
      full_name AS "fullName",
      email,
      phone,
      company,
      service_interest AS "serviceInterest",
      message,
      consent_privacy AS "consentPrivacy",
      source,
      created_at AS "createdAt"
    FROM contact_requests
    ORDER BY created_at DESC
    LIMIT $1
    `,
    [safeLimit]
  );

  return result.rows;
}

async function saveAbEvent(event) {
  if (!pool) {
    return {
      stored: false,
      reason: "not-configured",
    };
  }

  try {
    await ensureAbEventsTable();

    await pool.query(
      `
      INSERT INTO ab_test_events (
        variant,
        event_type,
        cta_id,
        page_path,
        source,
        user_agent
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        event.variant,
        event.eventType,
        event.ctaId,
        event.pagePath,
        event.source,
        event.userAgent,
      ]
    );

    return {
      stored: true,
    };
  } catch {
    return {
      stored: false,
      reason: "db-error",
    };
  }
}

async function listAbSummary(days = 30) {
  const windowDays = Math.min(120, Math.max(1, Number(days) || 30));

  if (!pool) {
    return {
      windowDays,
      totals: {
        impressions: 0,
        clicks: 0,
        ctr: 0,
      },
      variants: [],
      ctas: [],
      lastEventAt: null,
    };
  }

  await ensureAbEventsTable();

  const totalsResult = await pool.query(
    `
    WITH filtered AS (
      SELECT event_type
      FROM ab_test_events
      WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
    )
    SELECT
      COUNT(*) FILTER (WHERE event_type = 'impression')::int AS impressions,
      COUNT(*) FILTER (WHERE event_type = 'click')::int AS clicks,
      ROUND(
        100.0 *
        COUNT(*) FILTER (WHERE event_type = 'click') /
        NULLIF(COUNT(*) FILTER (WHERE event_type = 'impression'), 0),
        2
      ) AS ctr
    FROM filtered
    `,
    [windowDays]
  );

  const variantsResult = await pool.query(
    `
    SELECT
      variant,
      COUNT(*) FILTER (WHERE event_type = 'impression')::int AS impressions,
      COUNT(*) FILTER (WHERE event_type = 'click')::int AS clicks,
      ROUND(
        100.0 *
        COUNT(*) FILTER (WHERE event_type = 'click') /
        NULLIF(COUNT(*) FILTER (WHERE event_type = 'impression'), 0),
        2
      ) AS ctr
    FROM ab_test_events
    WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
    GROUP BY variant
    ORDER BY variant ASC
    `,
    [windowDays]
  );

  const ctasResult = await pool.query(
    `
    SELECT
      cta_id AS "ctaId",
      variant,
      COUNT(*) FILTER (WHERE event_type = 'impression')::int AS impressions,
      COUNT(*) FILTER (WHERE event_type = 'click')::int AS clicks,
      ROUND(
        100.0 *
        COUNT(*) FILTER (WHERE event_type = 'click') /
        NULLIF(COUNT(*) FILTER (WHERE event_type = 'impression'), 0),
        2
      ) AS ctr
    FROM ab_test_events
    WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
    GROUP BY cta_id, variant
    ORDER BY "ctaId" ASC, variant ASC
    `,
    [windowDays]
  );

  const lastEventResult = await pool.query(
    `
    SELECT created_at AS "lastEventAt"
    FROM ab_test_events
    ORDER BY created_at DESC
    LIMIT 1
    `
  );

  const totalsRow = totalsResult.rows[0] || {};

  return {
    windowDays,
    totals: {
      impressions: Number(totalsRow.impressions) || 0,
      clicks: Number(totalsRow.clicks) || 0,
      ctr: Number(totalsRow.ctr) || 0,
    },
    variants: variantsResult.rows.map((row) => ({
      variant: row.variant,
      impressions: Number(row.impressions) || 0,
      clicks: Number(row.clicks) || 0,
      ctr: Number(row.ctr) || 0,
    })),
    ctas: ctasResult.rows.map((row) => ({
      ctaId: row.ctaId,
      variant: row.variant,
      impressions: Number(row.impressions) || 0,
      clicks: Number(row.clicks) || 0,
      ctr: Number(row.ctr) || 0,
    })),
    lastEventAt: lastEventResult.rows[0]?.lastEventAt || null,
  };
}

module.exports = {
  checkDatabaseConnection,
  getServiceHighlights,
  saveContactLead,
  listContactLeads,
  saveAbEvent,
  listAbSummary,
};
