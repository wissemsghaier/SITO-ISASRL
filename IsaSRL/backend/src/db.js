const { Pool } = require("pg");

const hasDbConfig =
  process.env.DB_HOST &&
  process.env.DB_PORT &&
  process.env.DB_NAME &&
  process.env.DB_USER &&
  process.env.DB_PASSWORD;

let pool = null;
let contactTableReady = false;

if (hasDbConfig) {
  pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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

module.exports = {
  checkDatabaseConnection,
  getServiceHighlights,
  saveContactLead,
};
