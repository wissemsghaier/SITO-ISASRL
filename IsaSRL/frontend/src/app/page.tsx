"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ContactBanner, PartnersSection } from "@/components/common-sections";
import { SiteFrame } from "@/components/site-frame";
import { trackAbClick, useTrackAbImpression } from "@/lib/ab-analytics";
import { useLeadVariant } from "@/lib/lead-copy";

type HealthResponse = {
  status: string;
  timestamp: string;
  database: string;
};

const serviceShowcase = [
  {
    title: "Firma Digitale",
    text: "Attivazione, firma, conservazione e workflow documentale con integrazione completa.",
    href: "/servizi/firma-digitale",
    image: "/site/premium-final/07-compliance-signature.jpg",
  },
  {
    title: "Whistleblowing",
    text: "Canale segnalazioni conforme, sicuro e pronto per governance e compliance.",
    href: "/servizi/whistleblowing",
    image: "/site/premium-final/05-control-center.png",
  },
  {
    title: "Fatturazione Elettronica",
    text: "Firma, conservazione e interscambio con soluzioni integrate e operative.",
    href: "/servizi/fatturazione-elettronica",
    image: "/site/premium-final/06-digital-invoicing.jpg",
  },
  {
    title: "Business Continuity",
    text: "Backup automatico, archiviazione certificata e server cloud sempre pronti.",
    href: "/servizi/business-continuity",
    image: "/site/premium-final/04-business-continuity.jpg",
  },
  {
    title: "Gestionale su Misura",
    text: "Contabilita, documenti, magazzino e verticalizzazioni per PMI e ordini.",
    href: "/servizi/gestionale-su-misura",
    image: "/site/premium-final/08-operations-platform.jpg",
  },
  {
    title: "Tecnologia Didattica",
    text: "Forniture e progetti su rete MEPA con supporto alla transizione digitale.",
    href: "/servizi/tecnologia-didattica",
    image: "/site/premium-final/02-education-lab.jpg",
  },
];

const deliveryMethod = [
  {
    step: "1",
    title: "Ricerca & Analisi",
    text: "Studiamo obiettivi, processi e vincoli per disegnare una direzione chiara prima dell'esecuzione.",
  },
  {
    step: "2",
    title: "Design & Sviluppo",
    text: "Progettiamo soluzioni solide con roadmap progressive, ownership definite e velocita di delivery.",
  },
  {
    step: "3",
    title: "Test & Ottimizzazione",
    text: "Verifichiamo prestazioni, sicurezza e usabilita per garantire qualita continua e crescita misurabile.",
  },
];

const projectFocus = [
  {
    title: "Dalla consulenza allo sviluppo",
    text: "Costruiamo percorsi digitali su misura con governance tecnica, visione business e risultati verificabili.",
    href: "/progetti",
    cta: "Esplora i progetti",
  },
  {
    title: "Servizi software e infrastruttura",
    text: "Dalla piattaforma gestionale alla continuita operativa, ogni modulo e allineato alle priorita del cliente.",
    href: "/servizi",
    cta: "Scopri i servizi",
  },
  {
    title: "Parla con il team giusto",
    text: "Raccogliamo la tua esigenza e attiviamo subito il gruppo specialistico piu adatto al tuo contesto.",
    href: "/contatti",
    cta: "Contattaci",
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

const impactMetrics = [
  { value: "30+", label: "anni sul territorio" },
  { value: "24/7", label: "copertura business continuity" },
  { value: "300+", label: "aziende seguite" },
  { value: "98%", label: "ticket risolti nei tempi SLA" },
];

const revealTransition = {
  duration: 0.68,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function Home() {
  const { variant, copy } = useLeadVariant();
  useTrackAbImpression({ variant, ctaId: "hero-primary", pagePath: "/" });
  useTrackAbImpression({ variant, ctaId: "hero-secondary", pagePath: "/" });

  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const lottieRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    let animation: { destroy: () => void } | null = null;
    let cancelled = false;

    const loadLottie = async () => {
      if (!lottieRef.current) {
        return;
      }

      const lottie = (await import("lottie-web")).default;
      if (cancelled || !lottieRef.current) {
        return;
      }

      animation = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/data/premium-orbit-lottie.json",
      });
    };

    void loadLottie();

    return () => {
      cancelled = true;
      animation?.destroy();
    };
  }, []);

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
      <div className="blue-home-v2">
        <section className="blue-hero-v2 scroll-section" data-stagger="slow">
          <div className="blue-hero-grid-v2">
            <div className="blue-hero-copy-v2">
              <motion.p
                className="blue-kicker-v2 stagger-item"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={revealTransition}
              >
                Informatica Soluzioni Aziendali | Dal 1994
              </motion.p>
              <motion.h1
                className="stagger-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.08 }}
              >
                L'infrastruttura digitale premium che trasforma operazioni, sicurezza e crescita.
              </motion.h1>
              <motion.p
                className="blue-lead-v2 stagger-item"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.16 }}
              >
                ISA unisce strategia, piattaforme e supporto operativo in un unico sistema
                esecutivo: design professionale, performance reale e controllo continuo per
                aziende che puntano a standard elevati.
              </motion.p>

              <motion.div
                className="blue-actions-v2 stagger-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.22 }}
              >
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
              </motion.div>
            </div>

            <div className="blue-hero-media-v2 stagger-item">
              <div className="blue-orbit-v2" ref={lottieRef} aria-hidden="true" />
              <motion.div
                className="blue-main-media-v2"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.18 }}
              >
                <Image
                  src="/site/premium-final/08-operations-platform.jpg"
                  alt="Panoramica servizi digitali ISA"
                  width={1200}
                  height={690}
                  className="blue-main-image-v2"
                  priority
                />
              </motion.div>

              <motion.div
                className="blue-status-v2"
                initial={{ opacity: 0, y: 22, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...revealTransition, delay: 0.24 }}
              >
                <p>Control Plane</p>
                <strong>{health?.database ?? "Operational"}</strong>
                <span>
                  {health?.timestamp
                    ? new Date(health.timestamp).toLocaleString()
                    : "In attesa di telemetria"}
                </span>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="blue-metrics-v2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...revealTransition, delay: 0.3 }}
          >
            {impactMetrics.map((metric) => (
              <article key={metric.label} className="stagger-item">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </motion.div>
        </section>

        <motion.section
          className="blue-highlight-v2 scroll-section"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={revealTransition}
        >
          <p className="blue-kicker-v2">In evidenza</p>
          <h2>ISA nel Gruppo Zutec: scala enterprise, governance piu forte, delivery piu veloce</h2>
          <p>
            Dal 30 Aprile 2026 ISA srl e parte del gruppo
            <a href="https://zutec.it/" target="_blank" rel="noreferrer"> Zutec S.r.l.</a>. Questa
            integrazione amplia competenze verticali, governance tecnica e capacita esecutiva su
            programmi complessi per imprese e pubblica amministrazione.
          </p>
        </motion.section>

        <section className="blue-services-v2 scroll-section" data-stagger="fast">
          <div className="section-head">
            <h2>Ci occupiamo di:</h2>
            <Link href="/servizi">Esplora tutte le soluzioni</Link>
          </div>
          <div className="blue-services-grid-v2">
            {serviceShowcase.map((item) => (
              <motion.article
                className="blue-service-card-v2 stagger-item"
                key={item.title}
                whileHover={{ y: -7, scale: 1.01 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <Image src={item.image} alt={item.title} width={480} height={300} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link href={item.href}>Scopri la soluzione</Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="blue-method-v2 scroll-section" data-stagger="slow">
          <div className="section-head">
            <h2>Tanti servizi, un solo metodo: il nostro</h2>
          </div>
          <p className="blue-method-lead-v2">
            Seguiamo un metodo chiaro e flessibile in ogni progetto: analisi, delivery e
            ottimizzazione continua.
          </p>
          <div className="blue-method-grid-v2">
            {deliveryMethod.map((item) => (
              <motion.article
                key={item.title}
                className="blue-method-card-v2 stagger-item"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="blue-offer-v2 scroll-section" data-stagger="fast">
          <div className="section-head">
            <h2>Dalla consulenza allo sviluppo, costruiamo soluzioni su misura</h2>
          </div>
          <div className="blue-offer-grid-v2">
            {projectFocus.map((item) => (
              <article key={item.title} className="blue-offer-card-v2 stagger-item">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link href={item.href}>{item.cta}</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="blue-tools-v2 scroll-section">
          <motion.div
            className="blue-tool-card-v2 stagger-item"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={revealTransition}
          >
            <h3>Assistenza remota</h3>
            <p>
              Avvia subito il supporto tecnico con canali certificati e un percorso di presa in
              carico che mantiene continuita operativa.
            </p>
            <div className="blue-pill-row-v2">
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
          </motion.div>

          <motion.div
            className="blue-tool-card-v2 stagger-item"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...revealTransition, delay: 0.08 }}
          >
            <h3>Documentazione strategica</h3>
            <p>
              Un hub unico per materiali tecnici, informative e documentazione ufficiale del
              perimetro ISA.
            </p>
            <ul className="blue-doc-list-v2">
              {documentLinks.map((doc) => (
                <li key={doc.label}>
                  <a href={doc.href} target="_blank" rel="noreferrer">
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        <PartnersSection />
        <ContactBanner />
      </div>
    </SiteFrame>
  );
}