require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const {
  checkDatabaseConnection,
  getServiceHighlights,
  saveContactLead,
  listContactLeads,
  saveAbEvent,
  listAbSummary,
} = require("./db");
const { getConfigValue } = require("./config");

const app = express();
const port = Number(process.env.PORT || 4000);
const frontendUrl = getConfigValue("FRONTEND_URL", "http://localhost:3000");
const adminDashboardKey = getConfigValue("ADMIN_DASHBOARD_KEY", "");
const CONTACT_RATE_LIMIT_MAX = Math.max(
  1,
  Number(getConfigValue("CONTACT_RATE_LIMIT_MAX", "6")) || 6
);
const CONTACT_RATE_LIMIT_WINDOW_MS = Math.max(
  60_000,
  Number(getConfigValue("CONTACT_RATE_LIMIT_WINDOW_MS", "600000")) || 600000
);
const CV_MAX_BYTES = 5 * 1024 * 1024;
const cvUploadDir = path.resolve(__dirname, "..", "uploads", "career-cv");
const contactRateBuckets = new Map();
const AB_EVENT_TYPES = new Set(["impression", "click"]);
const AB_VARIANTS = new Set(["A", "B"]);

app.use(
  cors({
    origin: frontendUrl,
  })
);
app.use(express.json());

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const careerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdirSync(cvUploadDir, { recursive: true });
    cb(null, cvUploadDir);
  },
  filename: (req, file, cb) => {
    const safeName = normalizeText(req.body?.fullName, 80)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "candidate";
    const timestamp = Date.now();
    cb(null, `${safeName}-${timestamp}.pdf`);
  },
});

const uploadCareerCv = multer({
  storage: careerStorage,
  limits: { fileSize: CV_MAX_BYTES },
  fileFilter: (_req, file, cb) => {
    const hasPdfMime = file.mimetype === "application/pdf";
    const hasPdfExtension = file.originalname.toLowerCase().endsWith(".pdf");

    if (!hasPdfMime && !hasPdfExtension) {
      cb(new Error("CV must be a PDF file."));
      return;
    }

    cb(null, true);
  },
}).single("cvFile");

function runCareerUpload(req, res) {
  return new Promise((resolve, reject) => {
    uploadCareerCv(req, res, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function removeUploadedFile(filePath) {
  if (!filePath) {
    return;
  }

  try {
    await fs.promises.unlink(filePath);
  } catch {
    // Ignore cleanup failure.
  }
}

function normalizeText(value, maxLength) {
  const safeValue = typeof value === "string" ? value.trim() : "";
  return safeValue.slice(0, maxLength);
}

function normalizePath(value) {
  const normalized = normalizeText(value, 200);

  if (!normalized) {
    return "/";
  }

  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || "unknown";
}

function trackRateLimit(ip) {
  const now = Date.now();

  for (const [bucketIp, bucket] of contactRateBuckets) {
    if (bucket.resetAt <= now) {
      contactRateBuckets.delete(bucketIp);
    }
  }

  const existing = contactRateBuckets.get(ip);

  if (!existing || existing.resetAt <= now) {
    contactRateBuckets.set(ip, {
      count: 1,
      resetAt: now + CONTACT_RATE_LIMIT_WINDOW_MS,
    });
    return {
      limited: false,
    };
  }

  existing.count += 1;

  if (existing.count > CONTACT_RATE_LIMIT_MAX) {
    return {
      limited: true,
      retryAfterMs: existing.resetAt - now,
    };
  }

  return {
    limited: false,
  };
}

function isAdminAuthorized(req) {
  if (!adminDashboardKey) {
    return false;
  }

  const providedKey = normalizeText(req.headers["x-admin-key"], 256);
  return providedKey.length > 0 && providedKey === adminDashboardKey;
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
  const honeypot = normalizeText(req.body?.website, 160);

  if (honeypot) {
    return res.status(202).json({
      status: "ok",
      storedInDatabase: false,
      message: "Votre demande a ete envoyee. Nous vous recontacterons rapidement.",
    });
  }

  const ip = getClientIp(req);
  const rateLimit = trackRateLimit(ip);

  if (rateLimit.limited) {
    return res.status(429).json({
      status: "error",
      message: "Trop de tentatives. Veuillez patienter avant de reessayer.",
      retryAfterSeconds: Math.ceil(rateLimit.retryAfterMs / 1000),
    });
  }

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
    source: normalizeText(req.headers.origin, 120) || ip,
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

app.post("/api/career", async (req, res) => {
  try {
    await runCareerUpload(req, res);
  } catch (error) {
    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        status: "error",
        field: "cvFile",
        message: "Le CV PDF depasse la taille maximale de 5MB.",
      });
    }

    return res.status(400).json({
      status: "error",
      field: "cvFile",
      message: "Le CV doit etre un fichier PDF valide.",
    });
  }

  const uploadedCvPath = req.file?.path || "";
  const uploadedCvName = req.file?.filename || "";

  const honeypot = normalizeText(req.body?.website, 160);

  if (honeypot) {
    await removeUploadedFile(uploadedCvPath);
    return res.status(202).json({
      status: "ok",
      storedInDatabase: false,
      message: "Votre demande a ete envoyee. Nous vous recontacterons rapidement.",
    });
  }

  const ip = getClientIp(req);
  const rateLimit = trackRateLimit(ip);

  if (rateLimit.limited) {
    await removeUploadedFile(uploadedCvPath);
    return res.status(429).json({
      status: "error",
      message: "Trop de tentatives. Veuillez patienter avant de reessayer.",
      retryAfterSeconds: Math.ceil(rateLimit.retryAfterMs / 1000),
    });
  }

  const fullName = normalizeText(req.body?.fullName, 120);
  const email = normalizeText(req.body?.email, 180).toLowerCase();
  const phone = normalizeText(req.body?.phone, 50);
  const role = normalizeText(req.body?.role, 160);
  const experience = normalizeText(req.body?.experience, 160);
  const portfolio = normalizeText(req.body?.portfolio, 320);
  const message = normalizeText(req.body?.message, 5000);
  const consentPrivacy = String(req.body?.consentPrivacy).toLowerCase() === "true";

  if (fullName.length < 2) {
    await removeUploadedFile(uploadedCvPath);
    return res.status(400).json({
      status: "error",
      field: "fullName",
      message: "Le nom complet est requis.",
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    await removeUploadedFile(uploadedCvPath);
    return res.status(400).json({
      status: "error",
      field: "email",
      message: "Adresse email invalide.",
    });
  }

  if (role.length < 2) {
    await removeUploadedFile(uploadedCvPath);
    return res.status(400).json({
      status: "error",
      field: "role",
      message: "Le role souhaite est requis.",
    });
  }

  if (message.length < 12) {
    await removeUploadedFile(uploadedCvPath);
    return res.status(400).json({
      status: "error",
      field: "message",
      message: "La presentation doit contenir au moins 12 caracteres.",
    });
  }

  if (!consentPrivacy) {
    await removeUploadedFile(uploadedCvPath);
    return res.status(400).json({
      status: "error",
      field: "consentPrivacy",
      message: "Le consentement privacy est obligatoire.",
    });
  }

  if (!uploadedCvPath || !uploadedCvName) {
    return res.status(400).json({
      status: "error",
      field: "cvFile",
      message: "Le CV PDF est obligatoire.",
    });
  }

  const careerMessage = [
    "Candidatura: Lavora con noi",
    `Ruolo desiderato: ${role}`,
    `Esperienza: ${experience || "Non specificata"}`,
    `Portfolio/CV (link): ${portfolio || "Non specificato"}`,
    `CV file: ${uploadedCvName}`,
    `Presentazione: ${message}`,
  ].join("\n");

  const result = await saveContactLead({
    fullName,
    email,
    phone: phone || null,
    company: role || null,
    serviceInterest: "Lavora con noi",
    message: careerMessage,
    consentPrivacy,
    source: normalizeText(req.headers.origin, 120) || ip,
  });

  if (!result.stored) {
    console.warn("Career request received but not stored in DB", {
      reason: result.reason,
      email,
      fullName,
      role,
    });
  }

  return res.status(201).json({
    status: "ok",
    storedInDatabase: result.stored,
    message: "Votre candidature a ete envoyee. Nous vous recontacterons rapidement.",
  });
});

app.post("/api/analytics/ab/event", async (req, res) => {
  const variant = normalizeText(req.body?.variant, 1).toUpperCase();
  const eventType = normalizeText(req.body?.eventType, 16).toLowerCase();
  const ctaId = normalizeText(req.body?.ctaId, 80).toLowerCase();
  const pagePath = normalizePath(req.body?.pagePath);

  if (!AB_VARIANTS.has(variant)) {
    return res.status(400).json({
      status: "error",
      field: "variant",
      message: "Variant must be A or B.",
    });
  }

  if (!AB_EVENT_TYPES.has(eventType)) {
    return res.status(400).json({
      status: "error",
      field: "eventType",
      message: "Event type must be impression or click.",
    });
  }

  if (ctaId.length < 2) {
    return res.status(400).json({
      status: "error",
      field: "ctaId",
      message: "CTA id is required.",
    });
  }

  const result = await saveAbEvent({
    variant,
    eventType,
    ctaId,
    pagePath,
    source: normalizeText(req.headers.origin, 120) || getClientIp(req),
    userAgent: normalizeText(req.headers["user-agent"], 260),
  });

  if (!result.stored) {
    return res.status(202).json({
      status: "accepted",
      storedInDatabase: false,
      message: "Event accepted but not persisted.",
    });
  }

  return res.status(201).json({
    status: "ok",
    storedInDatabase: true,
  });
});

app.get("/api/admin/contacts", async (req, res) => {
  if (!adminDashboardKey) {
    return res.status(503).json({
      status: "error",
      message: "Admin dashboard key is not configured on the server.",
    });
  }

  if (!isAdminAuthorized(req)) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized.",
    });
  }

  try {
    const requestedLimit = Number(req.query.limit || 80);
    const leads = await listContactLeads(requestedLimit);

    return res.json({
      status: "ok",
      count: leads.length,
      data: leads,
    });
  } catch {
    return res.status(500).json({
      status: "error",
      message: "Unable to fetch contact requests.",
    });
  }
});

app.get("/api/admin/ab-summary", async (req, res) => {
  if (!adminDashboardKey) {
    return res.status(503).json({
      status: "error",
      message: "Admin dashboard key is not configured on the server.",
    });
  }

  if (!isAdminAuthorized(req)) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized.",
    });
  }

  try {
    const summary = await listAbSummary(req.query.days || 30);

    return res.json({
      status: "ok",
      ...summary,
    });
  } catch {
    return res.status(500).json({
      status: "error",
      message: "Unable to build A/B analytics summary.",
    });
  }
});

app.listen(port, () => {
  console.log(`IsaSRL API listening on http://localhost:${port}`);
});
