"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
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

const impactMetrics = [
  { value: "30+", label: "anni sul territorio" },
  { value: "24/7", label: "copertura business continuity" },
  { value: "300+", label: "aziende seguite" },
  { value: "98%", label: "ticket risolti nei tempi SLA" },
];

const revealTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function Home() {
  const { variant, copy } = useLeadVariant();
  useTrackAbImpression({ variant, ctaId: "hero-primary", pagePath: "/" });
  useTrackAbImpression({ variant, ctaId: "hero-secondary", pagePath: "/" });

  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const homeRootRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    let cancelled = false;
    let revertContext: (() => void) | undefined;

    const setupGsap = async () => {
      if (!homeRootRef.current) {
        return;
      }

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled || !homeRootRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".premium-scroll-section");
        sections.forEach((section, index) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 42 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              delay: index * 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 84%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        const cards = gsap.utils.toArray<HTMLElement>(".premium-stagger");
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              delay: (index % 4) * 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        gsap.to(".premium-orbit", {
          yPercent: -14,
          rotation: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".premium-home-shell",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }, homeRootRef);

      revertContext = () => ctx.revert();
    };

    void setupGsap();

    return () => {
      cancelled = true;
      revertContext?.();
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
      <div className="premium-home-shell" ref={homeRootRef}>
        <section className="premium-home-hero premium-scroll-section">
          <div className="premium-home-copy">
            <motion.p
              className="premium-home-kicker"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={revealTransition}
            >
              ISA Digital Acceleration Studio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.08 }}
            >
              Un design system operativo che trasforma tecnologia, processi e crescita.
            </motion.h1>
            <motion.p
              className="premium-home-lead"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.16 }}
            >
              Framer Motion orchestra la narrativa visuale, GSAP guida il ritmo su scroll e Lottie
              aggiunge profondita narrativa al cuore della hero. Ogni touchpoint e pensato per
              comunicare affidabilita enterprise e velocita di execution.
            </motion.p>

            <motion.div
              className="premium-home-actions"
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
                className="premium-home-secondary"
                onClick={() => trackAbClick({ variant, ctaId: "hero-secondary", pagePath: "/" })}
              >
                {copy.heroSecondaryCta}
              </Link>
            </motion.div>

            <motion.div
              className="premium-home-metrics"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.3 }}
            >
              {impactMetrics.map((metric) => (
                <article key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </motion.div>
          </div>

          <div className="premium-home-stage">
            <div className="premium-orbit" ref={lottieRef} aria-hidden="true" />
            <motion.div
              className="premium-platform-card"
              initial={{ opacity: 0, scale: 0.96, y: 26 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.18 }}
            >
              <p>Platform status</p>
              <strong>{health?.database ?? "unknown"}</strong>
              <span>
                {health?.timestamp
                  ? new Date(health.timestamp).toLocaleString()
                  : "In attesa di telemetria"}
              </span>
            </motion.div>
            <motion.div
              className="premium-stage-preview"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.25 }}
            >
              <Image
                src="/visuals/hero-constellation.svg"
                alt="Panoramica servizi digitali ISA"
                width={1200}
                height={690}
                className="premium-home-hero-image"
                priority
              />
            </motion.div>
          </div>
        </section>

        <motion.section
          className="premium-acquisition-banner premium-scroll-section"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={revealTransition}
        >
          <p className="premium-acquisition-tag">In evidenza</p>
          <h2>ISA nel Gruppo Zutec: nuova scala progettuale per clienti pubblici e privati</h2>
          <p>
            Dal 30 Aprile 2026 ISA srl e parte del gruppo
            <a href="https://zutec.it/" target="_blank" rel="noreferrer"> Zutec S.r.l.</a>. La nuova
            configurazione rafforza competenze verticali, delivery e capacita di supporto su
            iniziative ad alta complessita.
          </p>
        </motion.section>

        <section className="premium-solution-panel premium-scroll-section">
          <div className="section-head premium-section-head">
            <h2>Soluzioni ad alto impatto</h2>
            <Link href="/servizi">Esplora tutte le soluzioni</Link>
          </div>
          <div className="premium-solution-grid">
            {legacyHighlights.map((item) => (
              <motion.article
                className="premium-solution-card premium-stagger"
                key={item.title}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image src={item.image} alt={item.title} width={480} height={300} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link href={item.href}>Scopri la soluzione</Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="premium-tools-grid premium-scroll-section">
          <motion.div
            className="premium-tools-card premium-stagger"
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
            <div className="premium-pill-row">
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
            className="premium-tools-card premium-stagger"
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
            <ul>
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

        <section className="premium-partners-panel premium-scroll-section">
          <div className="section-head premium-section-head">
            <h2>Partner tecnologici</h2>
            <span>Ecosistema consolidato di brand enterprise</span>
          </div>
          <div className="premium-partner-grid">
            {partnerCards.map((partner) => (
              <motion.article
                className="premium-partner-card premium-stagger"
                key={partner.name}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
              >
                <Image src={partner.image} alt={partner.name} width={180} height={70} />
                <p>{partner.text}</p>
                <a href={partner.href} target="_blank" rel="noreferrer">
                  Vai al sito partner
                </a>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}