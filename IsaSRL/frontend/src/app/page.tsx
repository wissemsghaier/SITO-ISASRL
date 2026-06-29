"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SiteFrame } from "@/components/site-frame";
import { trackAbClick, useTrackAbImpression } from "@/lib/ab-analytics";
import { useLeadVariant } from "@/lib/lead-copy";

type HealthResponse = {
  status: string;
  timestamp: string;
  database: string;
};

const legacyHighlights = [
  {
    title: "Firma Digitale",
    text: "Attivazione, firma, conservazione e workflow documentale con integrazione completa.",
    href: "/firma-digitale",
    image: "/visuals/service-archive.svg",
  },
  {
    title: "Whistleblowing",
    text: "Canale segnalazioni conforme, sicuro e pronto per governance e compliance.",
    href: "/whistleblowing",
    image: "/visuals/service-security.svg",
  },
  {
    title: "Fatturazione Elettronica",
    text: "Firma, conservazione e interscambio con soluzioni integrate e operative.",
    href: "/servizi",
    image: "/visuals/service-workflow.svg",
  },
  {
    title: "Business Continuity",
    text: "Backup automatico, archiviazione certificata e server cloud sempre pronti.",
    href: "/servizi",
    image: "/visuals/service-security.svg",
  },
  {
    title: "Gestionale su Misura",
    text: "Contabilita, documenti, magazzino e verticalizzazioni per PMI e ordini.",
    href: "/gestionale",
    image: "/visuals/service-workflow.svg",
  },
  {
    title: "Tecnologia Didattica",
    text: "Forniture e progetti su rete MEPA con supporto alla transizione digitale.",
    href: "/mepa",
    image: "/visuals/service-archive.svg",
  },
];

const partnerCards = [
  {
    name: "Zucchetti",
    image: "/site/zucchetti_logo.jpg",
    text: "Leader in Italia per software, hardware e servizi ad alto valore aziendale.",
    href: "http://www.zucchetti.it/website/cms/home.html",
  },
  {
    name: "Dell",
    image: "/site/DELL_logo.jpg",
    text: "Infrastrutture e piattaforme affidabili per ambienti professionali e enterprise.",
    href: "https://www.dell.com/it-it",
  },
  {
    name: "HP",
    image: "/site/HP_logo.jpg",
    text: "Dispositivi e soluzioni IT orientati a produttivita e sicurezza operativa.",
    href: "https://store.hp.com",
  },
  {
    name: "Yashi",
    image: "/site/YASHI_logo.jpg",
    text: "Display interattivi e tecnologia didattica per scuole e formazione.",
    href: "https://www.yashiweb.com/",
  },
];

const supportTools = [
  {
    name: "Supremo",
    href: "/downloads/Supremo_ISAsrl.exe",
    external: false,
  },
  {
    name: "Live Care",
    href: "https://logins.livecare.net/liveletexecustom/2Q5CT3D5CIP23I9P",
    external: true,
  },
  {
    name: "AnyDesk",
    href: "https://anydesk.it/download?os=win",
    external: true,
  },
];

const documentLinks = [
  { label: "Contratto Intervento Remoto", href: "/documents/Contratto_Intervento_remoto.pdf" },
  { label: "Depliant Cofin", href: "/documents/DepliantCofin.pdf" },
  { label: "Proteus Evo", href: "/documents/ProteusEvo.pdf" },
  { label: "Informativa Privacy", href: "/documents/Informativa_privacy.pdf" },
  { label: "Informativa Cookie", href: "/documents/Informativa_cookie.pdf" },
  { label: "Informativa Clienti", href: "/documents/Informativaclienti.pdf" },
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

  return (
    <SiteFrame
      activePath="/"
      statusBadge={
        <div className={`api-pill ${badgeClass}`}>
          API {loading ? "checking" : health ? "online" : "offline"}
        </div>
      }
    >
      <section className="legacy-home-hero reveal reveal-2 scroll-section">
        <div className="legacy-home-hero-copy">
          <p className="legacy-home-kicker">Idee Innovazione e Tecnologie</p>
          <h1>Tecnologia concreta per far crescere processi, persone e risultati.</h1>
          <p>
            ISA opera come V.A.R. con progetti chiavi in mano: infrastrutture, software,
            gestione documentale, business continuity e consulenza verticale. Ogni intervento
            nasce per semplificare il lavoro quotidiano e trasformare la tecnologia in valore misurabile.
          </p>
          <div className="legacy-home-actions">
            <Link
              href="/contatti"
              className="btn-primary"
              onClick={() => trackAbClick({ variant, ctaId: "hero-primary", pagePath: "/" })}
            >
              {copy.heroPrimaryCta}
            </Link>
            <Link
              href="/servizi"
              className="legacy-home-secondary"
              onClick={() => trackAbClick({ variant, ctaId: "hero-secondary", pagePath: "/" })}
            >
              {copy.heroSecondaryCta}
            </Link>
          </div>
          <ul className="legacy-home-points">
            <li>Partner Zucchetti</li>
            <li>Assistenza remota dedicata</li>
            <li>Business continuity e backup</li>
            <li>Progetti MEPA e scuola digitale</li>
          </ul>
        </div>
        <div className="legacy-home-hero-media">
          <Image
            src="/visuals/hero-constellation.svg"
            alt="Panoramica servizi digitali ISA"
            width={1200}
            height={690}
            className="legacy-home-hero-image"
            priority
          />
          <div className="legacy-home-api-card">
            <p>Stato piattaforma</p>
            <strong>{health?.database ?? "unknown"}</strong>
            <span>
              {health?.timestamp ? new Date(health.timestamp).toLocaleString() : "In attesa di telemetria"}
            </span>
          </div>
        </div>
      </section>

      <section className="legacy-home-announcement reveal reveal-2 scroll-section">
        <p className="legacy-home-announcement-tag">In evidenza</p>
        <h2>ISA entra nel Gruppo Zutec: una nuova fase di crescita tecnologica</h2>
        <p>
          A partire dal 30 Aprile 2026, ISA srl e stata acquisita dal gruppo
          <a href="https://zutec.it/" target="_blank" rel="noreferrer"> Zutec S.r.l.</a>. La partnership
          rafforza competenze, capacita progettuale e continuita dei servizi per clienti pubblici e privati.
        </p>
      </section>

      <section className="legacy-home-highlights reveal reveal-2 scroll-section">
        <div className="section-head">
          <h2>Soluzioni in primo piano</h2>
          <Link href="/servizi">Esplora tutte le soluzioni</Link>
        </div>
        <div className="legacy-home-highlight-grid">
          {legacyHighlights.map((item) => (
            <article className="legacy-home-highlight-card stagger-item" key={item.title}>
              <Image src={item.image} alt={item.title} width={480} height={300} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link href={item.href}>Scopri la soluzione</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="legacy-home-tools reveal reveal-2 scroll-section">
        <div className="legacy-home-tools-block">
          <h3>Assistenza remota</h3>
          <p>
            Avvia subito il supporto tecnico con i nostri strumenti ufficiali e con il percorso
            di presa in carico dedicato.
          </p>
          <div className="legacy-home-pill-row">
            {supportTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target={tool.external ? "_blank" : undefined}
                rel={tool.external ? "noreferrer" : undefined}
              >
                {tool.name}
              </a>
            ))}
          </div>
        </div>
        <div className="legacy-home-tools-block">
          <h3>Documentazione</h3>
          <p>
            Consulta in un unico spazio informative privacy, documenti tecnici e materiali storici
            della piattaforma ISA.
          </p>
          <ul>
            {documentLinks.map((doc) => (
              <li key={doc.label}>
                <a href={doc.href} target="_blank" rel="noreferrer">
                  {doc.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="legacy-home-partners reveal reveal-2 scroll-section">
        <div className="section-head">
          <h2>Partner tecnologici</h2>
          <span>Ecosistema storico di brand e competenze certificate</span>
        </div>
        <div className="legacy-home-partner-grid">
          {partnerCards.map((partner) => (
            <article className="legacy-home-partner-card stagger-item" key={partner.name}>
              <Image src={partner.image} alt={partner.name} width={180} height={70} />
              <p>{partner.text}</p>
              <a href={partner.href} target="_blank" rel="noreferrer">
                Vai al sito partner
              </a>
            </article>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}