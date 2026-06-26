"use client";

import { useEffect, useMemo, useState } from "react";

type HealthResponse = {
  status: string;
  timestamp: string;
  database: string;
};

const offers = [
  {
    title: "Cloud & Backup Continuity",
    text: "Strategie 3-2-1, monitoring actif et plans de reprise pour proteger les operations 24/7.",
  },
  {
    title: "Cyber Security by Design",
    text: "Durcissement, segmentation et sensibilisation equipe pour reduire les risques reels.",
  },
  {
    title: "Workflows & Gestion Digitale",
    text: "Automatisation des process, portails clients et pilotage KPI pour gagner en productivite.",
  },
];

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
    []
  );

  useEffect(() => {
    const loadHealth = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/health`);
        if (!response.ok) {
          throw new Error("Failed to fetch API health");
        }
        const payload: HealthResponse = await response.json();
        setHealth(payload);
      } catch {
        setHealth(null);
      } finally {
        setLoading(false);
      }
    };

    loadHealth();
  }, [apiUrl]);

  return (
    <div className="site-wrap">
      <header className="hero-grid">
        <div className="hero-copy reveal reveal-1">
          <p className="eyebrow">IsaSRL Digital Platform</p>
          <h1>Nous construisons une presence digitale premium pour entreprises ambitieuses.</h1>
          <p>
            Nouvelle experience moderne basee sur Next.js, API Express et PostgreSQL.
            Rapide, evolutive et prete pour la croissance.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Demarrer le projet
            </a>
            <a href="#services" className="btn btn-ghost">
              Voir les services
            </a>
          </div>
        </div>

        <div className="hero-panel reveal reveal-2">
          <h2>System status</h2>
          <div className="status-item">
            <span>Backend API</span>
            <span className={`badge ${health ? "ok" : "down"}`}>
              {loading ? "Checking..." : health ? health.status : "Offline"}
            </span>
          </div>
          <div className="status-item">
            <span>PostgreSQL</span>
            <span className={`badge ${health?.database === "connected" ? "ok" : "warn"}`}>
              {loading ? "Checking..." : health?.database ?? "Unknown"}
            </span>
          </div>
          <div className="status-item">
            <span>API base URL</span>
            <span className="mono">{apiUrl}</span>
          </div>
          <div className="status-item">
            <span>Last check</span>
            <span className="mono">{health?.timestamp ? new Date(health.timestamp).toLocaleString() : "-"}</span>
          </div>
        </div>
      </header>

      <section id="services" className="services">
        <p className="section-label reveal reveal-1">Offre Core</p>
        <h2 className="reveal reveal-2">Une stack moderne, un design impactant, des resultats concrets.</h2>
        <div className="cards">
          {offers.map((offer, index) => (
            <article className={`card reveal reveal-${(index % 3) + 1}`} key={offer.title}>
              <h3>{offer.title}</h3>
              <p>{offer.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="cta reveal reveal-3">
        <h2>Un site a forte valeur percue, pense pour le niveau enterprise.</h2>
        <p>
          Branding web premium, animations elegantes, architecture scalable et socle technique pro.
          Cette base est prete pour evoluer vers e-commerce, CRM ou espace client.
        </p>
        <a href="mailto:contact@isasrl.it" className="btn btn-primary">
          Contacter IsaSRL
        </a>
      </section>
    </div>
  );
}
