"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SiteFrame } from "@/components/site-frame";
import { trackAbClick, useTrackAbImpression } from "@/lib/ab-analytics";
import { useLeadVariant } from "@/lib/lead-copy";

const companyHighlights = ["Dal 1994", "Gruppo Zutec", "Ragusa (RG)", "Soluzioni ICT"];

const generalFacts = [
  {
    title: "Identita aziendale",
    text: "Informatica Soluzioni Aziendali S.r.l. e una realta storica che progetta e integra sistemi hardware e software con approccio concreto.",
  },
  {
    title: "Approccio operativo",
    text: "Lavoriamo con metodo chiaro: analisi, configurazione, avvio e supporto continuo per mantenere risultati misurabili nel tempo.",
  },
  {
    title: "Presenza sul territorio",
    text: "Sede a Ragusa, relazione diretta con aziende e professionisti, tempi rapidi di attivazione e assistenza dedicata.",
  },
];

const companyStory = [
  {
    year: "1994",
    title: "Fondazione ISA",
    text: "Avvio dell'azienda con focus su consulenza informatica e soluzioni gestionali per imprese locali.",
  },
  {
    year: "2000+",
    title: "Verticalizzazioni software",
    text: "Espansione dell'offerta con piattaforme dedicate a contabilita, logistica, ordini professionali e processi documentali.",
  },
  {
    year: "Oggi",
    title: "Struttura integrata",
    text: "ISA consolida competenze operative e strategiche all'interno del Gruppo Zutec per una capacita esecutiva ancora piu ampia.",
  },
];

const revealTransition = {
  duration: 0.78,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function Home() {
  const { variant, copy } = useLeadVariant();
  useTrackAbImpression({ variant, ctaId: "hero-primary", pagePath: "/" });
  useTrackAbImpression({ variant, ctaId: "hero-secondary", pagePath: "/" });

  return (
    <SiteFrame
      activePath="/"
      statusBadge={<div className="home-company-pill">Profilo Azienda</div>}
    >
      <div className="home-company-v3">
        <section className="home-company-hero-v3 scroll-section" data-stagger="slow">
          <motion.span
            className="home-company-glow-v3"
            aria-hidden="true"
            animate={{ x: ["-8%", "6%", "-8%"], opacity: [0.46, 0.8, 0.46] }}
            transition={{ duration: 10.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <div className="home-company-grid-v3">
            <div className="home-company-copy-v3">
              <motion.p
                className="home-company-kicker-v3 stagger-item"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={revealTransition}
              >
                Informatica Soluzioni Aziendali S.r.l.
              </motion.p>

              <motion.h1
                className="stagger-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.08 }}
              >
                Solo le informazioni generali dell&apos;azienda, in una home essenziale e istituzionale.
              </motion.h1>

              <motion.p
                className="home-company-lead-v3 stagger-item"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.16 }}
              >
                ISA nasce nel 1994 e affianca imprese e professionisti con soluzioni informatiche,
                software gestionali e supporto operativo continuo. La struttura e oggi parte del
                Gruppo Zutec, con una visione orientata a qualita, continuita e risultati concreti.
              </motion.p>

              <motion.div
                className="home-company-chip-row-v3 stagger-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.22 }}
              >
                {companyHighlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </motion.div>
            </div>

            <div className="home-company-panel-v3 stagger-item">
              <motion.div
                className="home-company-panel-inner-v3"
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...revealTransition, delay: 0.2 }}
              >
                <h2>Profilo generale</h2>
                <p>
                  Azienda ICT con orientamento pratico: analisi delle esigenze, implementazione
                  delle soluzioni e assistenza continuativa sul territorio.
                </p>
                <ul>
                  <li>Sede: Via delle Betulle, 137 Ragusa (RG) 97100</li>
                  <li>Telefono: 0932 252022</li>
                  <li>Email: info@isasrl.it</li>
                  <li>P.IVA: 01445260886</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="home-company-facts-v3 scroll-section" data-stagger="fast">
          {generalFacts.map((item, index) => (
            <motion.article
              key={item.title}
              className="home-company-fact-card-v3 stagger-item"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.32 }}
              transition={{ ...revealTransition, delay: index * 0.06 }}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </section>

        <motion.section
          className="home-company-story-v3 scroll-section"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={revealTransition}
        >
          <p className="home-company-kicker-v3">Percorso aziendale</p>
          <h2>Storia, evoluzione e continuita operativa</h2>
          <div className="home-company-story-grid-v3">
            {companyStory.map((item) => (
              <article key={item.year + item.title}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="home-company-cta-v3 scroll-section"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={revealTransition}
        >
          <div>
            <h2>Vuoi parlare con ISA?</h2>
            <p>
              Se vuoi approfondire il profilo aziendale o confrontarti con il team, contattaci
              direttamente.
            </p>
          </div>
          <div className="home-company-cta-actions-v3">
            <Link
              href="/azienda"
              className="btn-secondary"
              onClick={() => trackAbClick({ variant, ctaId: "hero-secondary", pagePath: "/" })}
            >
              Profilo Azienda
            </Link>
            <Link
              href="/azienda/contatti"
              className="btn-primary"
              onClick={() => trackAbClick({ variant, ctaId: "hero-primary", pagePath: "/" })}
            >
              {copy.heroPrimaryCta}
            </Link>
          </div>
        </motion.section>
      </div>
    </SiteFrame>
  );
}