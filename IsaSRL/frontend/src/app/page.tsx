"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { SiteFrame } from "@/components/site-frame";

type HealthResponse = {
  status: string;
  timestamp: string;
  database: string;
};

const newsCards = [
  {
    tag: "NOVITA",
    date: "Aggiornamento ISA",
    title: "Gestionale HR: workflow moderni per la gestione del personale.",
    image: "/site/GettyImages-693472268.jpg",
  },
  {
    tag: "EVENTI",
    date: "Zucchetti Day",
    title: "Innovazione e soluzioni digitali per aziende in crescita.",
    image: "/site/fatel.jpg",
  },
  {
    tag: "APPROFONDIMENTI",
    date: "Cybersecurity",
    title: "Cinque pratiche essenziali per proteggere dati e processi aziendali.",
    image: "/site/whistleblowing_img.jpg",
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

  const badgeClass = loading ? "checking" : health ? "online" : "offline";

  return (
    <SiteFrame
      activePath="/"
      statusBadge={<div className={`api-pill ${badgeClass}`}>API {loading ? "checking" : health ? "online" : "offline"}</div>}
    >
      <section className="hero reveal reveal-2">
        <div className="hero-copy">
          <p className="hero-kicker">Soluzioni affidabili per PMI, professionisti, scuole e PA</p>
          <h1>
            Soluzioni IT che <span>fanno crescere</span> il tuo business.
          </h1>
          <p>
            Da oltre 30 anni affianchiamo i clienti con servizi digitali evoluti:
            assistenza, cloud, sicurezza, gestionale aziendale, ordini professionali,
            MEPA, fatturazione elettronica e firma digitale.
          </p>
          <div className="hero-actions">
            <a href="/contatti" className="btn-primary">
              Richiedi una demo
            </a>
            <a href="/contatti" className="btn-secondary">
              Contattaci
            </a>
          </div>
          <ul className="hero-points">
            <li>Partner Zucchetti</li>
            <li>Assistenza remota</li>
            <li>Soluzioni cloud</li>
            <li>Sicurezza e cybersecurity</li>
          </ul>
        </div>

        <div className="hero-media">
          <Image
            src="/site/HOME.jpg"
            alt="Scenario aziendale digitale"
            width={900}
            height={540}
            className="hero-bg"
            priority
          />
          <Image
            src="/site/monitor.jpg"
            alt="Dashboard gestionale"
            width={480}
            height={310}
            className="hero-device"
          />
          <div className="hero-mini-card">
            <p>Database</p>
            <strong>{health?.database ?? "unknown"}</strong>
            <span>
              {health?.timestamp
                ? new Date(health.timestamp).toLocaleString()
                : "Waiting health check"}
            </span>
          </div>
          <button className="hero-arrow left" aria-label="Prev">
            ‹
          </button>
          <button className="hero-arrow right" aria-label="Next">
            ›
          </button>
        </div>
      </section>

      <ServicesStrip />

      <section className="stats-strip reveal reveal-1">
        <div>
          <strong>30+</strong>
          <span>Anni di esperienza</span>
        </div>
        <div>
          <strong>1.500+</strong>
          <span>Clienti soddisfatti in Sicilia</span>
        </div>
        <div>
          <strong>40+</strong>
          <span>Consulenti e tecnici specializzati</span>
        </div>
        <div>
          <strong>98%</strong>
          <span>Tasso di soddisfazione clienti</span>
        </div>
      </section>

      <section id="news" className="news reveal reveal-2">
        <div className="section-head">
          <h2>News e aggiornamenti</h2>
          <a href="/servizi">Vedi tutte le news</a>
        </div>
        <div className="news-grid">
          {newsCards.map((item) => (
            <article key={item.title} className="news-card">
              <div className="news-image-wrap">
                <Image src={item.image} alt={item.title} width={400} height={220} className="news-image" />
              </div>
              <div className="news-content">
                <p className="news-meta">
                  <span>{item.tag}</span>
                  <span>{item.date}</span>
                </p>
                <h3>{item.title}</h3>
                <a href="/contatti">Leggi di piu</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
