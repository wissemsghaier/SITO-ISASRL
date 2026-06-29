"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { SiteFrame } from "@/components/site-frame";
import { trackAbClick, useTrackAbImpression } from "@/lib/ab-analytics";
import { useLeadVariant } from "@/lib/lead-copy";

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
    image: "/site/GettyImages-693472268.jpg",
    href: "/servizi",
  },
  {
    badge: "Cybersecurity",
    title: "Monitoraggio continuo e policy di sicurezza per aziende e professionisti.",
    text: "Approccio proattivo, backup certificato e continuita operativa anche in caso di incidente.",
    image: "/site/gestionali3.jpg",
    href: "/assistenza",
  },
  {
    badge: "Progetti PA",
    title: "Forniture MEPA e tecnologie didattiche per scuole e pubblica amministrazione.",
    text: "Dalla consulenza alla consegna, con supporto tecnico e formazione specialistica.",
    image: "/site/aulainformatica2.jpg",
    href: "/mepa",
  },
  {
    badge: "Gestionale",
    title: "Soluzioni su misura per ordini professionali, cooperative e PMI.",
    text: "Customizzazioni avanzate, automazione processi e dashboard in tempo reale.",
    image: "/site/gestionali.jpg",
    href: "/gestionale",
  },
];

const logoRibbon = [
  { name: "Zucchetti", image: "/site/zucchetti_logo.jpg", href: "http://www.zucchetti.it/website/cms/home.html" },
  { name: "Dell", image: "/site/DELL_logo.jpg", href: "https://www.dell.com/it-it" },
  { name: "HP", image: "/site/HP_logo.jpg", href: "https://store.hp.com" },
  { name: "Yashi", image: "/site/YASHI_logo.jpg", href: "https://www.yashiweb.com/" },
  { name: "eDatalia", image: "/site/edatalia.png", href: "https://edatalia.com/" },
  { name: "KnowK", image: "/site/banner_progetto_lc.png", href: "https://zutec.it/" },
];

const visualStory = [
  {
    title: "Control Room",
    image: "/site/HOME.jpg",
    text: "Architetture ibride e dashboard unificate per decisioni veloci.",
  },
  {
    title: "Digital Workspace",
    image: "/site/aula-informatica1.jpg",
    text: "Spazi digitali moderni con design operativo per team performanti.",
  },
  {
    title: "Executive Insight",
    image: "/site/monitor.jpg",
    text: "Visual intelligence per governance, decisioni e crescita sostenibile.",
  },
];

export default function Home() {
  const { variant, copy } = useLeadVariant();
  useTrackAbImpression({ variant, ctaId: "hero-primary", pagePath: "/" });
  useTrackAbImpression({ variant, ctaId: "hero-secondary", pagePath: "/" });
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
          <p className="hero-kicker">Rebranding Experience: Vision, Design, Performance</p>
          <h1>
            Una nuova identita digitale per <span>valore, autorevolezza e scala</span>.
          </h1>
          <p>
            Il sito evolve in una piattaforma premium: visual storytelling, motion design,
            percorsi chiari e posizionamento enterprise per aumentare percezione, fiducia
            e conversione commerciale.
          </p>
          <div className="neo-hero-actions">
            <Link
              href="/contatti"
              className="btn-primary"
              onClick={() => trackAbClick({ variant, ctaId: "hero-primary", pagePath: "/" })}
            >
              {copy.heroPrimaryCta}
            </Link>
            <Link
              href="/servizi"
              className="btn-secondary"
              onClick={() => trackAbClick({ variant, ctaId: "hero-secondary", pagePath: "/" })}
            >
              {copy.heroSecondaryCta}
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
            src="/site/HOME.jpg"
            alt="Nuova direzione visuale premium"
            width={880}
            height={620}
            className="neo-frame neo-main"
            priority
          />
          <Image
            src="/site/gestionali1.jpg"
            alt="Operations intelligence"
            width={440}
            height={280}
            className="neo-frame neo-card-a"
          />
          <Image
            src="/site/GettyImages-693472268.jpg"
            alt="Strategic consulting"
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
            <a
              className="brand-chip stagger-item"
              key={`${logo.name}-${index}`}
              href={logo.href}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={logo.image} alt={logo.name} width={132} height={48} />
            </a>
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
