const { Pool } = require("pg");

const hasDbConfig =
  process.env.DB_HOST &&
  process.env.DB_PORT &&
  process.env.DB_NAME &&
  process.env.DB_USER &&
  process.env.DB_PASSWORD;

let pool = null;

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

module.exports = {
  checkDatabaseConnection,
  getServiceHighlights,
};
