"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { SiteFrame } from "@/components/site-frame";
import { trackAbClick, useTrackAbImpression } from "@/lib/ab-analytics";
import { useLeadVariant } from "@/lib/lead-copy";
import { partners } from "@/lib/site-data";

type HomeVisualMode = "soft" | "intense";

function isHomeVisualMode(value: string | undefined): value is HomeVisualMode {
  return value === "soft" || value === "intense";
}

const serviceShowcase = [
  {
    title: "Gestionale su misura",
    text: "ERP personalizzato con verticalizzazioni pronte per PMI, logistica e produzione.",
    image: "/site/premium-final/10-modular-architecture.jpg",
    href: "/servizi/gestionale-su-misura",
    badge: "ERP Core",
  },
  {
    title: "Business continuity",
    text: "Backup automatico, disaster recovery e ripartenza rapida da qualsiasi sede.",
    image: "/site/premium-final/04-business-continuity.jpg",
    href: "/servizi/business-continuity",
    badge: "Resilience",
  },
  {
    title: "Fatturazione elettronica",
    text: "Workflow unico per firma, invio, conservazione e adempimenti IVA.",
    image: "/site/premium-final/06-digital-invoicing.jpg",
    href: "/servizi/fatturazione-elettronica",
    badge: "Digital Flow",
  },
  {
    title: "Firma digitale",
    text: "Documenti con valore legale e approvazioni veloci in processi paperless.",
    image: "/site/premium-final/07-compliance-signature.jpg",
    href: "/servizi/firma-digitale",
    badge: "Compliance",
  },
  {
    title: "Tecnologia didattica",
    text: "Ambienti formativi moderni con reti, monitor interattivi e software educational.",
    image: "/site/premium-final/02-education-lab.jpg",
    href: "/servizi/tecnologia-didattica",
    badge: "Education",
  },
  {
    title: "Whistleblowing",
    text: "Canale sicuro e conforme per segnalazioni interne con gestione dedicata.",
    image: "/site/premium-final/09-kpi-performance.jpg",
    href: "/servizi/whistleblowing",
    badge: "Governance",
  },
] as const;

const revealTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1] as const,
};

const homeStarSeeds = [
  { x: 6, y: 8, size: 1.8, delay: 0.2, duration: 4.8 },
  { x: 14, y: 24, size: 1.2, delay: 0.6, duration: 5.6 },
  { x: 22, y: 14, size: 2.1, delay: 0.4, duration: 6.2 },
  { x: 31, y: 32, size: 1.4, delay: 1.1, duration: 5.4 },
  { x: 39, y: 10, size: 1.6, delay: 0.8, duration: 6.8 },
  { x: 47, y: 22, size: 2.3, delay: 1.5, duration: 5.1 },
  { x: 58, y: 12, size: 1.3, delay: 0.9, duration: 6.1 },
  { x: 65, y: 29, size: 1.9, delay: 1.7, duration: 5.7 },
  { x: 73, y: 16, size: 1.6, delay: 1.2, duration: 6.4 },
  { x: 82, y: 28, size: 2.4, delay: 0.3, duration: 5.9 },
  { x: 90, y: 11, size: 1.7, delay: 0.5, duration: 6.7 },
  { x: 11, y: 58, size: 1.5, delay: 2.1, duration: 6.5 },
  { x: 26, y: 71, size: 2.2, delay: 1.8, duration: 5.6 },
  { x: 43, y: 64, size: 1.4, delay: 2.5, duration: 6.9 },
  { x: 57, y: 74, size: 1.8, delay: 2.2, duration: 5.2 },
  { x: 69, y: 67, size: 2.1, delay: 2.8, duration: 6.3 },
  { x: 84, y: 72, size: 1.3, delay: 2.4, duration: 5.5 },
  { x: 94, y: 62, size: 1.9, delay: 2.9, duration: 6.6 },
  { x: 3, y: 38, size: 1.4, delay: 1.4, duration: 5.9 },
  { x: 18, y: 46, size: 1.7, delay: 1.9, duration: 6.1 },
  { x: 34, y: 51, size: 1.3, delay: 2.6, duration: 5.8 },
  { x: 49, y: 43, size: 1.9, delay: 1.3, duration: 6.4 },
  { x: 63, y: 49, size: 1.5, delay: 2.1, duration: 5.7 },
  { x: 78, y: 44, size: 2.2, delay: 1.6, duration: 6.5 },
  { x: 88, y: 52, size: 1.6, delay: 2.3, duration: 6 },
  { x: 97, y: 41, size: 1.2, delay: 1.7, duration: 5.6 },
] as const;

const partnerSceneByName: Record<string, { image: string; line: string; focus: string }> = {
  Zucchetti: {
    image: "/site/premium-final/12-solution-workshop.jpg",
    line: "Soluzioni ERP e processi aziendali integrati.",
    focus: "Enterprise Suite",
  },
  Dell: {
    image: "/site/premium-final/08-operations-platform.jpg",
    line: "Infrastrutture performanti per continuita operativa.",
    focus: "Data Core",
  },
  HP: {
    image: "/site/premium-final/11-monitoring-delivery.jpg",
    line: "Postazioni professionali e supporto endpoint evoluto.",
    focus: "Workforce Tech",
  },
  Edatalia: {
    image: "/site/premium-final/03-digital-workspace.jpg",
    line: "Esperienze digitali per formazione e collaborazione.",
    focus: "Knowledge Cloud",
  },
};

export default function Home() {
  const { variant, copy } = useLeadVariant();
  const activeHomeVisualMode: HomeVisualMode = isHomeVisualMode(process.env.NEXT_PUBLIC_HOME_VISUAL_MODE)
    ? process.env.NEXT_PUBLIC_HOME_VISUAL_MODE
    : "soft";

  useTrackAbImpression({ variant, ctaId: "hero-primary", pagePath: "/" });
  useTrackAbImpression({ variant, ctaId: "hero-secondary", pagePath: "/" });

  return (
    <SiteFrame activePath="/" pageVariant="home-uxmax" statusBadge={<div className="home-uxmax-pill">Service Focus Edition</div>}>
      <div className={`home-uxmax home-uxmax-focus home-visual-${activeHomeVisualMode}`}>
        <div className="home-uxmax-starfield" aria-hidden="true">
          {homeStarSeeds.map((star, index) => (
            <span
              key={`home-star-${index}`}
              className="home-uxmax-star"
              style={
                {
                  "--star-x": `${star.x}%`,
                  "--star-y": `${star.y}%`,
                  "--star-size": `${star.size}px`,
                  "--star-delay": `${star.delay}s`,
                  "--star-duration": `${star.duration}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <div className="home-uxmax-vignette" aria-hidden="true" />
        <div className="home-uxmax-smoke" aria-hidden="true" />

        <section className="home-uxmax-service-stage scroll-section" data-stagger="slow">
          <div className="home-uxmax-service-orbit" aria-hidden="true">
            <span className="service-orbit orb-1" />
            <span className="service-orbit orb-2" />
            <span className="service-orbit orb-3" />
          </div>

          <div className="home-uxmax-service-head">
            <motion.p
              className="home-uxmax-kicker"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={revealTransition}
            >
              Servizi principali ISA
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.08 }}
            >
              Solo i servizi della nostra azienda, con design immersivo e animazioni premium.
            </motion.h1>

            <motion.p
              className="home-uxmax-lead"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.16 }}
            >
              Ogni soluzione e presentata con visual dedicato, cerchi dinamici, micro-animazioni e un percorso chiaro verso la pagina servizio.
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
                Vedi tutti i servizi
              </Link>
            </motion.div>
          </div>

          <div className="home-uxmax-service-grid">
            {serviceShowcase.map((service, index) => (
              <motion.article
                key={service.title}
                className={`home-uxmax-service-focus-card tone-${(index % 6) + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -6, scale: 1.014 }}
                transition={{ ...revealTransition, delay: index * 0.05 }}
              >
                <div className="home-uxmax-service-focus-media">
                  <Image src={service.image} alt={service.title} width={840} height={560} className="home-uxmax-service-focus-image" />
                  <span className="home-uxmax-service-focus-ring" aria-hidden="true" />
                  <span className="home-uxmax-service-focus-shine" aria-hidden="true" />
                </div>
                <div className="home-uxmax-service-focus-copy">
                  <span className="home-uxmax-service-focus-badge">{service.badge}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <Link href={service.href}>Apri servizio</Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="home-uxmax-partners-alt scroll-section" data-stagger="fast">
          <div className="home-uxmax-partners-alt-orbit" aria-hidden="true">
            <span className="partners-alt-orb orb-a" />
            <span className="partners-alt-orb orb-b" />
          </div>

          <div className="home-uxmax-partners-alt-head">
            <p>Partner in una veste differente</p>
            <h2>Nuova presentazione partner con immagini alternative e atmosfera piu creativa</h2>
          </div>

          <div className="home-uxmax-partners-alt-grid">
            {partners.map((partner, index) => {
              const scene = partnerSceneByName[partner.name] ?? {
                image: "/site/premium-final/08-operations-platform.jpg",
                line: "Partner strategico per crescita e innovazione digitale.",
                focus: "Strategic Partner",
              };

              return (
                <motion.a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`home-uxmax-partner-panel tone-${(index % 4) + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -7, scale: 1.016 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ ...revealTransition, delay: index * 0.08 }}
                >
                  <Image
                    src={scene.image}
                    alt={`Visual partner ${partner.name}`}
                    width={980}
                    height={520}
                    className="home-uxmax-partner-panel-image"
                  />
                  <span className="home-uxmax-partner-panel-overlay" aria-hidden="true" />
                  <div className="home-uxmax-partner-panel-copy">
                    <Image src={partner.image} alt={partner.name} width={180} height={62} className="home-uxmax-partner-panel-logo" />
                    <span className="home-uxmax-partner-panel-focus">{scene.focus}</span>
                    <h3>{partner.name}</h3>
                    <p>{scene.line}</p>
                    <span className="home-uxmax-partner-panel-action">Visita partner</span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}