require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { checkDatabaseConnection, getServiceHighlights, saveContactLead } = require("./db");

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);
app.use(express.json());

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeText(value, maxLength) {
  const safeValue = typeof value === "string" ? value.trim() : "";
  return safeValue.slice(0, maxLength);
}

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

app.post("/api/contact", async (req, res) => {
  const fullName = normalizeText(req.body?.fullName, 120);
  const email = normalizeText(req.body?.email, 180).toLowerCase();
  const phone = normalizeText(req.body?.phone, 50);
  const company = normalizeText(req.body?.company, 160);
  const serviceInterest = normalizeText(req.body?.serviceInterest, 160);
  const message = normalizeText(req.body?.message, 5000);
  const consentPrivacy = Boolean(req.body?.consentPrivacy);

  if (fullName.length < 2) {
    return res.status(400).json({
      status: "error",
      field: "fullName",
      message: "Le nom complet est requis.",
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      status: "error",
      field: "email",
      message: "Adresse email invalide.",
    });
  }

  if (message.length < 12) {
    return res.status(400).json({
      status: "error",
      field: "message",
      message: "Le message doit contenir au moins 12 caracteres.",
    });
  }

  if (!consentPrivacy) {
    return res.status(400).json({
      status: "error",
      field: "consentPrivacy",
      message: "Le consentement privacy est obligatoire.",
    });
  }

  const result = await saveContactLead({
    fullName,
    email,
    phone: phone || null,
    company: company || null,
    serviceInterest: serviceInterest || null,
    message,
    consentPrivacy,
    source: normalizeText(req.headers.origin, 120) || "web",
  });

  if (!result.stored) {
    console.warn("Contact request received but not stored in DB", {
      reason: result.reason,
      email,
      fullName,
    });
  }

  return res.status(201).json({
    status: "ok",
    storedInDatabase: result.stored,
    message: "Votre demande a ete envoyee. Nous vous recontacterons rapidement.",
  });
});

app.listen(port, () => {
  console.log(`IsaSRL API listening on http://localhost:${port}`);
});
