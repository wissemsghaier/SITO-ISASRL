require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { checkDatabaseConnection, getServiceHighlights } = require("./db");

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  const database = await checkDatabaseConnection();

  res.json({
    status: "online",
    timestamp: new Date().toISOString(),
    database,
  });
});

app.get("/api/highlights", async (_req, res) => {
  try {
    const rows = await getServiceHighlights();

    if (rows.length) {
      return res.json(rows);
    }
  } catch {
    // Fallback keeps the API useful if DB is not initialized yet.
  }

  return res.json([
    {
      title: "Infrastructure Resilience",
      description: "Backup strategy, observability and business continuity by design.",
    },
    {
      title: "Managed Security",
      description: "Hardening, identity controls and active incident prevention.",
    },
    {
      title: "Digital Workflow Automation",
      description: "Modern internal tools that accelerate delivery and customer experience.",
    },
  ]);
});

app.listen(port, () => {
  console.log(`IsaSRL API listening on http://localhost:${port}`);
});
