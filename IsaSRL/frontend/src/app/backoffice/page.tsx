"use client";

import { FormEvent, useMemo, useState } from "react";
import { SiteFrame } from "@/components/site-frame";

type ContactLead = {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceInterest: string | null;
  message: string;
  source: string | null;
  createdAt: string;
};

type AbVariantSummary = {
  variant: "A" | "B";
  impressions: number;
  clicks: number;
  ctr: number;
};

type AbCtaSummary = {
  ctaId: string;
  variant: "A" | "B";
  impressions: number;
  clicks: number;
  ctr: number;
};

type AbSummaryResponse = {
  status: string;
  windowDays: number;
  totals: {
    impressions: number;
    clicks: number;
    ctr: number;
  };
  variants: AbVariantSummary[];
  ctas: AbCtaSummary[];
  lastEventAt: string | null;
};

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

export default function BackofficePage() {
  const apiBaseUrl = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
    []
  );

  const [adminKey, setAdminKey] = useState("");
  const [windowDays, setWindowDays] = useState(30);

  const [contacts, setContacts] = useState<ContactLead[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [abSummary, setAbSummary] = useState<AbSummaryResponse | null>(null);
  const [abStatus, setAbStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [abErrorMessage, setAbErrorMessage] = useState("");

  const loadContacts = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/contacts?limit=150`, {
        headers: {
          "x-admin-key": adminKey,
        },
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Unable to load contacts.");
      }

      setContacts(payload.data || []);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setContacts([]);
      setErrorMessage(error instanceof Error ? error.message : "Unexpected error.");
    }
  };

  const loadAbSummary = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAbStatus("loading");
    setAbErrorMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/ab-summary?days=${windowDays}`, {
        headers: {
          "x-admin-key": adminKey,
        },
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Unable to load AB summary.");
      }

      setAbSummary(payload);
      setAbStatus("success");
    } catch (error) {
      setAbStatus("error");
      setAbSummary(null);
      setAbErrorMessage(error instanceof Error ? error.message : "Unexpected error.");
    }
  };

  return (
    <SiteFrame activePath="/backoffice">
      <section className="backoffice-shell reveal reveal-2 scroll-section">
        <div className="backoffice-head">
          <p className="contact-kicker">Administration</p>
          <h1>Back-office richieste contatto</h1>
          <p>
            Inserisci la chiave admin per consultare le ultime richieste archiviate su PostgreSQL.
          </p>
          <p>
            Standard visivi e linee guida disponibili nella pagina <a href="/brand-system">Brand System</a>.
          </p>
          <p>
            Analytics A/B: impression e click vengono raccolti in tempo reale per confrontare le varianti sui CTA principali.
          </p>
        </div>

        <form className="backoffice-auth" onSubmit={loadContacts}>
          <label>
            Chiave admin
            <input
              type="password"
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              placeholder="x-admin-key"
              required
            />
          </label>
          <button type="submit" className="btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Caricamento..." : "Carica richieste"}
          </button>
          {status === "error" ? <p className="form-feedback error">{errorMessage}</p> : null}
        </form>

        <form className="backoffice-auth backoffice-analytics-auth" onSubmit={loadAbSummary}>
          <label>
            Finestra analisi (giorni)
            <input
              type="number"
              min={1}
              max={120}
              value={windowDays}
              onChange={(event) => setWindowDays(Math.min(120, Math.max(1, Number(event.target.value) || 1)))}
              required
            />
          </label>
          <button type="submit" className="btn-primary" disabled={abStatus === "loading"}>
            {abStatus === "loading" ? "Aggiornamento..." : "Carica dashboard A/B"}
          </button>
          {abStatus === "error" ? <p className="form-feedback error">{abErrorMessage}</p> : null}
        </form>
      </section>

      <section className="backoffice-table-shell reveal reveal-3 scroll-section">
        <div className="section-head">
          <h2>Ultime richieste ({contacts.length})</h2>
        </div>

        {!contacts.length ? (
          <p className="backoffice-empty">Nessuna richiesta caricata al momento.</p>
        ) : (
          <div className="backoffice-table-wrap">
            <table className="backoffice-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Azienda</th>
                  <th>Service</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id} className="stagger-item">
                    <td>{new Date(contact.createdAt).toLocaleString()}</td>
                    <td>{contact.fullName}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone || "-"}</td>
                    <td>{contact.company || "-"}</td>
                    <td>{contact.serviceInterest || "-"}</td>
                    <td>{contact.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="backoffice-table-shell backoffice-analytics-shell reveal reveal-3 scroll-section">
        <div className="section-head">
          <h2>Dashboard A/B conversion</h2>
          <span>
            {abSummary
              ? `${abSummary.windowDays} giorni | ultimo evento ${
                  abSummary.lastEventAt
                    ? new Date(abSummary.lastEventAt).toLocaleString()
                    : "n/a"
                }`
              : "Carica la dashboard per visualizzare i KPI"}
          </span>
        </div>

        {!abSummary ? (
          <p className="backoffice-empty">Nessun dato analytics caricato al momento.</p>
        ) : (
          <>
            <div className="ab-kpi-grid">
              <article className="ab-kpi-card stagger-item">
                <p>Impression totali</p>
                <strong>{abSummary.totals.impressions.toLocaleString()}</strong>
              </article>
              <article className="ab-kpi-card stagger-item">
                <p>Click totali</p>
                <strong>{abSummary.totals.clicks.toLocaleString()}</strong>
              </article>
              <article className="ab-kpi-card stagger-item">
                <p>CTR complessivo</p>
                <strong>{formatPercent(abSummary.totals.ctr)}</strong>
              </article>
            </div>

            <div className="backoffice-table-wrap">
              <table className="backoffice-table">
                <thead>
                  <tr>
                    <th>Variante</th>
                    <th>Impression</th>
                    <th>Click</th>
                    <th>CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {abSummary.variants.map((row) => (
                    <tr key={`variant-${row.variant}`} className="stagger-item">
                      <td>{row.variant}</td>
                      <td>{row.impressions.toLocaleString()}</td>
                      <td>{row.clicks.toLocaleString()}</td>
                      <td>{formatPercent(row.ctr)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="backoffice-table-wrap">
              <table className="backoffice-table">
                <thead>
                  <tr>
                    <th>CTA</th>
                    <th>Variante</th>
                    <th>Impression</th>
                    <th>Click</th>
                    <th>CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {abSummary.ctas.map((row) => (
                    <tr key={`${row.ctaId}-${row.variant}`} className="stagger-item">
                      <td>{row.ctaId}</td>
                      <td>{row.variant}</td>
                      <td>{row.impressions.toLocaleString()}</td>
                      <td>{row.clicks.toLocaleString()}</td>
                      <td>{formatPercent(row.ctr)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </SiteFrame>
  );
}
