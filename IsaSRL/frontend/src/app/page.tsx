"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
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

const partnerFocusByName: Record<string, string> = {
  Zucchetti: "ERP Ecosystem",
  Dell: "Data Center",
  HP: "Workplace Pro",
  Edatalia: "Knowledge Cloud",
};

export default function Home() {
  const { variant, copy } = useLeadVariant();
  useTrackAbImpression({ variant, ctaId: "hero-primary", pagePath: "/" });
  useTrackAbImpression({ variant, ctaId: "hero-secondary", pagePath: "/" });

  return (
    <SiteFrame activePath="/" pageVariant="home-uxmax" statusBadge={<div className="home-uxmax-pill">UX UI Pro Max</div>}>
      <div className="home-uxmax">
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

        <section className="home-uxmax-partners scroll-section" data-stagger="fast">
          <div className="home-uxmax-partners-orbit" aria-hidden="true">
            <span className="home-uxmax-partners-glow glow-left" />
            <span className="home-uxmax-partners-glow glow-right" />
          </div>
          <div className="home-uxmax-partners-head">
            <p>Partner Network</p>
            <h2>Partner selezionati con visual design piu immersivo</h2>
            <p className="home-uxmax-partners-lead">
              Nuova direzione creativa: immagini differenti, atmosfera cinematica e micro-animazioni luminose per valorizzare ogni brand.
            </p>
          </div>
          <div className="home-uxmax-partners-grid">
            {partners.map((partner, index) => (
              <motion.a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className={`home-uxmax-partner-card tone-${(index % 4) + 1}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -7, scale: 1.015 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ ...revealTransition, delay: index * 0.06 }}
              >
                <div className="home-uxmax-partner-media">
                  <Image
                    src={partner.showcaseImage ?? "/site/premium-final/08-operations-platform.jpg"}
                    alt={`Scenario ${partner.name}`}
                    width={720}
                    height={420}
                    className="home-uxmax-partner-hero"
                  />
                  <span className="home-uxmax-partner-shine" aria-hidden="true" />
                  <span className="home-uxmax-partner-spark" aria-hidden="true" />
                </div>

                <div className="home-uxmax-partner-body">
                  <Image src={partner.image} alt={partner.name} width={160} height={56} className="home-uxmax-partner-logo" />
                  <span className="home-uxmax-partner-badge">{partnerFocusByName[partner.name] ?? "Enterprise Partner"}</span>
                  <h3>{partner.name}</h3>
                  <p>{partner.showcaseSummary ?? "Partner strategico per soluzioni digitali ad alte prestazioni."}</p>
                  <span className="home-uxmax-partner-action">Scopri il partner</span>
                </div>
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