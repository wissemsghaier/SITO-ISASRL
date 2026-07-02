"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteFrame } from "@/components/site-frame";
import { trackAbClick, useTrackAbImpression } from "@/lib/ab-analytics";
import { useLeadVariant } from "@/lib/lead-copy";
import { partners } from "@/lib/site-data";

const heroStats = [
  { value: "30+", label: "Anni di esperienza" },
  { value: "300+", label: "Clienti supportati" },
  { value: "24/7", label: "Presidio operativo" },
];

const visualMoments = [
  {
    title: "Delivery operativo",
    text: "Gestione rapida delle attivazioni con controllo continuo delle milestone.",
    image: "/site/premium-final/11-monitoring-delivery.jpg",
  },
  {
    title: "Architettura modulare",
    text: "Stack digitali componibili per scalare processi e produttivita.",
    image: "/site/premium-final/10-modular-architecture.jpg",
  },
  {
    title: "Workshop di soluzione",
    text: "Analisi strategica e roadmap condivisa con il team cliente.",
    image: "/site/premium-final/12-solution-workshop.jpg",
  },
];

const serviceSpotlight = [
  {
    title: "Gestione Aziendale",
    text: "ERP, controllo processi e governance documentale integrata.",
    href: "/gestionale",
    image: "/site/premium-final/05-control-center.png",
  },
  {
    title: "Business Continuity",
    text: "Backup automatico, monitoraggio e ripristino per continuita reale.",
    href: "/servizi/business-continuity",
    image: "/site/premium-final/04-business-continuity.jpg",
  },
  {
    title: "Fatturazione Digitale",
    text: "Flussi XML, firma e conservazione a norma in ambiente sicuro.",
    href: "/servizi/fatturazione-elettronica",
    image: "/site/premium-final/06-digital-invoicing.jpg",
  },
  {
    title: "Firma e Compliance",
    text: "Validazione legale dei documenti con governance centralizzata.",
    href: "/servizi/firma-digitale",
    image: "/site/premium-final/07-compliance-signature.jpg",
  },
];

const revealTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function Home() {
  const { variant, copy } = useLeadVariant();
  useTrackAbImpression({ variant, ctaId: "hero-primary", pagePath: "/" });
  useTrackAbImpression({ variant, ctaId: "hero-secondary", pagePath: "/" });

  return (
    <SiteFrame activePath="/" pageVariant="home-uxmax" statusBadge={<div className="home-uxmax-pill">UX UI Pro Max</div>}>
      <div className="home-uxmax">
        <section className="home-uxmax-hero scroll-section" data-stagger="slow">
          <motion.span
            className="home-uxmax-halo"
            aria-hidden="true"
            animate={{ x: ["-8%", "6%", "-8%"], opacity: [0.34, 0.75, 0.34] }}
            transition={{ duration: 11.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <div className="home-uxmax-hero-grid">
            <div className="home-uxmax-copy">
              <motion.p
                className="home-uxmax-kicker"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={revealTransition}
              >
                Informatica Soluzioni Aziendali S.r.l. | Gruppo Zutec
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.08 }}
              >
                Home premium per imprese che vogliono risultati concreti, velocita e controllo.
              </motion.h1>

              <motion.p
                className="home-uxmax-lead"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.16 }}
              >
                Progettiamo ecosistemi digitali affidabili: piattaforme gestionali, continuita operativa,
                firma e compliance con una direzione tecnica chiara e tempi esecutivi misurabili.
              </motion.p>

              <motion.div
                className="home-uxmax-actions"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.2 }}
              >
                <Link
                  href="/azienda/contatti"
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
                  Scopri i servizi
                </Link>
              </motion.div>

              <motion.div
                className="home-uxmax-stats"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.25 }}
              >
                {heroStats.map((item) => (
                  <article key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="home-uxmax-hero-visual"
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...revealTransition, delay: 0.1 }}
            >
              <Image
                src="/site/premium-final/08-operations-platform.jpg"
                alt="Piattaforma operativa ISA"
                width={950}
                height={720}
                priority
                className="home-uxmax-hero-image"
              />
              <div className="home-uxmax-float-card">
                <p>Control Room</p>
                <strong>Operations Platform</strong>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="home-uxmax-visuals scroll-section" data-stagger="fast">
          {visualMoments.map((item, index) => (
            <motion.article
              key={item.title}
              className="home-uxmax-visual-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...revealTransition, delay: index * 0.06 }}
            >
              <Image src={item.image} alt={item.title} width={780} height={520} className="home-uxmax-visual-image" />
              <div className="home-uxmax-visual-copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="home-uxmax-services scroll-section" data-stagger="fast">
          <div className="home-uxmax-services-head">
            <p>Core Expertise</p>
            <h2>Servizi principali in un ecosistema unico</h2>
          </div>
          <div className="home-uxmax-services-grid">
            {serviceSpotlight.map((service, index) => (
              <motion.article
                key={service.title}
                className="home-uxmax-service-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ...revealTransition, delay: index * 0.05 }}
              >
                <Image src={service.image} alt={service.title} width={640} height={420} className="home-uxmax-service-image" />
                <div className="home-uxmax-service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <Link href={service.href}>Apri servizio</Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="home-uxmax-partners scroll-section" data-stagger="fast">
          <div className="home-uxmax-partners-head">
            <p>Partner Network</p>
            <h2>Brand con cui realizziamo soluzioni enterprise</h2>
          </div>
          <div className="home-uxmax-partners-grid">
            {partners.map((partner, index) => (
              <motion.a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="home-uxmax-partner-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ ...revealTransition, delay: index * 0.06 }}
              >
                <Image src={partner.image} alt={partner.name} width={160} height={56} className="home-uxmax-partner-logo" />
                <span>{partner.name}</span>
              </motion.a>
            ))}
          </div>
        </section>

        <motion.section
          className="home-uxmax-cta scroll-section"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={revealTransition}
        >
          <div>
            <h2>Vuoi una roadmap concreta per la tua azienda?</h2>
            <p>
              Pianifichiamo insieme priorita, timing e risultati attesi con un approccio tecnico e operativo.
            </p>
          </div>
          <div className="home-uxmax-cta-actions">
            <Link href="/azienda" className="btn-secondary">
              Profilo azienda
            </Link>
            <Link href="/azienda/contatti" className="btn-primary">
              Richiedi consulenza
            </Link>
          </div>
        </motion.section>
      </div>
    </SiteFrame>
  );
}