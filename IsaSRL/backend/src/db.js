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

module.exports = {
  checkDatabaseConnection,
  getServiceHighlights,
  saveContactLead,
  listContactLeads,
};
