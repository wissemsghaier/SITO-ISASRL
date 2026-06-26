"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { SiteFrame } from "@/components/site-frame";

type HealthResponse = {
  status: string;
  timestamp: string;
  database: string;
};

const solutionShowcase = [
  {
    badge: "Fatturazione",
    title: "Suite fiscale e documentale con firma, conservazione e interscambio.",
    text: "Flussi digitali completi per ridurre tempi amministrativi e semplificare il lavoro del team.",
    image: "/site/fatel.jpg",
    href: "/servizi",
  },
  {
    badge: "Cybersecurity",
    title: "Monitoraggio continuo e policy di sicurezza per aziende e professionisti.",
    text: "Approccio proattivo, backup certificato e continuita operativa anche in caso di incidente.",
    image: "/site/backup.jpg",
    href: "/assistenza",
  },
  {
    badge: "Progetti PA",
    title: "Forniture MEPA e tecnologie didattiche per scuole e pubblica amministrazione.",
    text: "Dalla consulenza alla consegna, con supporto tecnico e formazione specialistica.",
    image: "/site/LIM.jpg",
    href: "/mepa",
  },
  {
    badge: "Gestionale",
    title: "Soluzioni su misura per ordini professionali, cooperative e PMI.",
    text: "Customizzazioni avanzate, automazione processi e dashboard in tempo reale.",
    image: "/site/aula-informatica1.jpg",
    href: "/gestionale",
  },
];

const logoRibbon = [
  { name: "Zucchetti", image: "/site/zucchetti_logo.jpg" },
  { name: "Dell", image: "/site/DELL_logo.jpg" },
  { name: "HP", image: "/site/HP_logo.jpg" },
  { name: "Yashi", image: "/site/YASHI_logo.jpg" },
  { name: "eDatalia", image: "/site/edatalia.png" },
  { name: "KnowK", image: "/site/banner_progetto_lc.png" },
];

const visualStory = [
  {
    title: "Control Room",
    image: "/site/soluzioni-ict.jpg",
    text: "Architetture ibride e dashboard unificate per decisioni veloci.",
  },
  {
    title: "Digital Signature",
    image: "/site/firma-digitale-mini.png",
    text: "Firma digitale integrata nei processi HR, finance e procurement.",
  },
  {
    title: "Compliance Ready",
    image: "/site/whistleblowing_mini.jpg",
    text: "Canali sicuri e compliance normativa per organizzazioni moderne.",
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
  const apiStateLabel = loading ? "Checking" : health ? "Operativa" : "Non raggiungibile";

  return (
    <SiteFrame
      activePath="/"
      statusBadge={<div className={`api-pill ${badgeClass}`}>API {loading ? "checking" : health ? "online" : "offline"}</div>}
    >
      <section className="neo-hero reveal reveal-2 scroll-section">
        <div className="neo-hero-copy">
          <p className="hero-kicker">Digital platform per PMI, professionisti, scuole e PA</p>
          <h1>
            Design, strategia e tecnologia per una <span>crescita concreta</span>.
          </h1>
          <p>
            Abbiamo riprogettato l&apos;esperienza ISA con uno stile moderno, piu visivo e
            orientato ai risultati: consulenza, sviluppo, cybersecurity, cloud e automazione
            in un unico ecosistema operativo.
          </p>
          <div className="neo-hero-actions">
            <Link href="/contatti" className="btn-primary">
              Richiedi una demo
            </Link>
            <Link href="/servizi" className="btn-secondary">
              Esplora i servizi
            </Link>
          </div>
          <ul className="hero-points">
            <li>Partner Zucchetti</li>
            <li>Assistenza specialistica</li>
            <li>Cloud e Business Continuity</li>
            <li>Cybersecurity by design</li>
          </ul>
        </div>

        <div className="neo-hero-stage">
          <div className="neo-orb" aria-hidden="true" />
          <Image
            src="/site/soluzioni-ict.jpg"
            alt="Scenario enterprise"
            width={880}
            height={620}
            className="neo-frame neo-main"
            priority
          />
          <Image
            src="/site/monitor.jpg"
            alt="Dashboard gestionale"
            width={440}
            height={280}
            className="neo-frame neo-card-a"
          />
          <Image
            src="/site/logo_big.png"
            alt="ISA logo"
            width={360}
            height={240}
            className="neo-frame neo-card-b"
          />
          <div className="neo-live-card">
            <p>Stato infrastruttura</p>
            <strong>{health?.database ?? "unknown"}</strong>
            <span>
              API: {apiStateLabel} {health?.timestamp ? `- ${new Date(health.timestamp).toLocaleString()}` : ""}
            </span>
          </div>
        </div>
      </section>

      <section className="brand-ribbon reveal reveal-2 scroll-section" aria-label="Partner e tecnologie">
        <div className="brand-track">
          {[...logoRibbon, ...logoRibbon].map((logo, index) => (
            <div className="brand-chip stagger-item" key={`${logo.name}-${index}`}>
              <Image src={logo.image} alt={logo.name} width={132} height={48} />
            </div>
          ))}
        </div>
      </section>

      <section className="impact-strip reveal reveal-1 scroll-section">
        <article className="impact-item stagger-item">
          <strong>30+</strong>
          <span>Anni di esperienza</span>
        </article>
        <article className="impact-item stagger-item">
          <strong>1500+</strong>
          <span>Clienti seguiti</span>
        </article>
        <article className="impact-item stagger-item">
          <strong>24/7</strong>
          <span>Supporto per sistemi critici</span>
        </article>
        <article className="impact-item stagger-item">
          <strong>98%</strong>
          <span>Soddisfazione media clienti</span>
        </article>
      </section>

      <section className="ultra-premium-band reveal reveal-2 scroll-section">
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Signature Direction</p>
          <h3>Enterprise Craftsmanship</h3>
          <p>
            Ogni esperienza e progettata con precisione editoriale: gerarchia visiva, ritmo del contenuto
            e interazioni ad alto valore percettivo.
          </p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Experience Rhythm</p>
          <h3>Motion With Intention</h3>
          <p>
            Le animazioni non decorano: guidano la lettura, enfatizzano le priorita e migliorano la comprensione
            delle soluzioni digitali.
          </p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Strategic Outcome</p>
          <h3>Design That Converts</h3>
          <p>
            L&apos;interfaccia e orientata ai risultati: piu fiducia, piu contatti qualificati e piu chiarezza per i decisori.
          </p>
        </article>
      </section>

      <section className="showcase reveal reveal-2 scroll-section">
        <div className="section-head">
          <h2>Soluzioni in evidenza</h2>
          <Link href="/servizi">Vedi tutte le soluzioni</Link>
        </div>
        <div className="showcase-grid">
          {solutionShowcase.map((item) => (
            <article key={item.title} className="showcase-card stagger-item">
              <div className="showcase-image-wrap">
                <Image src={item.image} alt={item.title} width={620} height={360} className="showcase-image" />
                <span>{item.badge}</span>
              </div>
              <div className="showcase-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link href={item.href}>Approfondisci</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="visual-story reveal reveal-2 scroll-section">
        <div className="section-head">
          <h2>Immagini e branding</h2>
          <Link href="/contatti">Progetta il tuo percorso digitale</Link>
        </div>
        <div className="visual-grid">
          {visualStory.map((item) => (
            <article className="visual-card stagger-item" key={item.title}>
              <Image src={item.image} alt={item.title} width={560} height={340} className="visual-image" />
              <div className="visual-overlay">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ServicesStrip />

      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
