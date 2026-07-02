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

const editorialProofs = [
  { metric: "30+", label: "Anni di attivita", detail: "Esperienza continuativa in progetti ICT" },
  { metric: "300+", label: "Clienti seguiti", detail: "Imprese, enti e professionisti" },
  { metric: "24/7", label: "Continuita operativa", detail: "Supporto su scenari critici e backup" },
  { metric: "98%", label: "SLA rispettati", detail: "Interventi e prese in carico nei tempi" },
];

const editorialServices = [
  {
    title: "Software gestionale aziendale",
    text: "Piattaforme ERP e moduli verticali per controllo economico, operativo e documentale.",
    href: "/gestionale",
  },
  {
    title: "Fatturazione elettronica",
    text: "Emissione, ricezione, firma digitale e conservazione a norma in un unico flusso.",
    href: "/servizi/fatturazione-elettronica",
  },
  {
    title: "Business continuity",
    text: "Backup automatico e ripartenza rapida per garantire continuita alle attivita.",
    href: "/servizi/business-continuity",
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

  const isEditorialVariant = variant === "B";

  return (
    <SiteFrame
      activePath="/"
      pageVariant={isEditorialVariant ? "home-editorial-b" : "home-company-a"}
      statusBadge={<div className="home-company-pill">Profilo Azienda</div>}
    >
      {isEditorialVariant ? (
        <div className="home-editorial-b">
          <section className="home-editorial-hero-b scroll-section" data-stagger="slow">
            <motion.span
              className="home-editorial-halo-b"
              aria-hidden="true"
              animate={{ x: ["-10%", "8%", "-10%"], opacity: [0.32, 0.74, 0.32] }}
              transition={{ duration: 12.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            <div className="home-editorial-grid-b">
              <div className="home-editorial-narrative-b">
                <motion.p
                  className="home-editorial-kicker-b"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={revealTransition}
                >
                  Partner tecnologico per imprese e professionisti
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...revealTransition, delay: 0.08 }}
                >
                  Una struttura editoriale orientata a fiducia, competenza e risultati concreti.
                </motion.h1>
                <motion.p
                  className="home-editorial-lead-b"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...revealTransition, delay: 0.16 }}
                >
                  ISA opera dal 1994 con un modello consulenziale e operativo: studiamo i processi,
                  progettiamo la soluzione, accompagniamo il cliente nell&apos;adozione e garantiamo
                  continuita nel tempo. Oggi, dentro il Gruppo Zutec, ampliamo governance e capacita
                  di delivery su programmi complessi.
                </motion.p>
                <motion.div
                  className="home-editorial-chips-b"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...revealTransition, delay: 0.22 }}
                >
                  {companyHighlights.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </motion.div>
              </div>

              <div className="home-editorial-proof-b">
                {editorialProofs.map((proof, index) => (
                  <motion.article
                    key={proof.metric + proof.label}
                    className="home-editorial-proof-card-b"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...revealTransition, delay: 0.12 + index * 0.05 }}
                  >
                    <strong>{proof.metric}</strong>
                    <h3>{proof.label}</h3>
                    <p>{proof.detail}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section className="home-editorial-services-b scroll-section" data-stagger="fast">
            <div className="home-editorial-head-b">
              <h2>I nostri servizi principali</h2>
              <Link href="/servizi">Tutti i servizi</Link>
            </div>
            <div className="home-editorial-services-grid-b">
              {editorialServices.map((service, index) => (
                <motion.article
                  key={service.title}
                  className="home-editorial-service-card-b"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ ...revealTransition, delay: index * 0.06 }}
                >
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <Link href={service.href}>Scopri</Link>
                </motion.article>
              ))}
            </div>
          </section>

          <motion.section
            className="home-editorial-cta-b scroll-section"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={revealTransition}
          >
            <div>
              <h2>Consulenza professionale al tuo servizio</h2>
              <p>
                Confrontati con il team ISA per definire obiettivi, priorita e percorso operativo.
              </p>
            </div>
            <div className="home-editorial-cta-actions-b">
              <Link
                href="/azienda"
                className="btn-secondary"
                onClick={() => trackAbClick({ variant, ctaId: "hero-secondary", pagePath: "/" })}
              >
                Chi siamo
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
      ) : (
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
      )}
    </SiteFrame>
  );
}