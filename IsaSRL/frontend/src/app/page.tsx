"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { SiteFrame } from "@/components/site-frame";
import { trackAbClick, useTrackAbImpression } from "@/lib/ab-analytics";
import { useLeadVariant } from "@/lib/lead-copy";
import { companyInfo, partners } from "@/lib/site-data";
import { premiumServiceCatalog } from "@/lib/services-catalog";

type HomeVisualMode = "soft" | "intense";
type HomeColorProfile = "fusion" | "warm" | "techno";

function isHomeVisualMode(value: string | undefined): value is HomeVisualMode {
  return value === "soft" || value === "intense";
}

function isHomeColorProfile(value: string | undefined): value is HomeColorProfile {
  return value === "fusion" || value === "warm" || value === "techno";
}

const homeBadgeByColorProfile: Record<HomeColorProfile, string> = {
  fusion: "Corporate Deep Blue Fusion",
  warm: "Corporate Amber Coral",
  techno: "Corporate Techno Pulse",
};

const serviceVisualBySlug: Record<string, string> = {
  "gestionale-su-misura": "/site/premium-final/10-modular-architecture.jpg",
  "business-continuity": "/site/premium-final/04-business-continuity.jpg",
  "fatturazione-elettronica": "/site/premium-final/06-digital-invoicing.jpg",
  "firma-digitale": "/site/premium-final/07-compliance-signature.jpg",
  "tecnologia-didattica": "/site/premium-final/02-education-lab.jpg",
  whistleblowing: "/site/premium-final/09-kpi-performance.jpg",
};

const enterpriseMilestones = [
  {
    year: "1994",
    title: "Nascita ISA",
    text: "Partenza come V.A.R. con soluzioni chiavi in mano hardware e software.",
  },
  {
    year: "2026",
    title: "Ingresso nel Gruppo Zutec",
    text: "Dal 30 Aprile 2026, evoluzione strategica per accelerare l'innovazione.",
  },
  {
    year: "Oggi",
    title: "Delivery enterprise",
    text: "Servizi verticali, infrastruttura resiliente e supporto operativo continuo.",
  },
] as const;

const erpVerticalDomains = [
  "Forza Vendita",
  "Tentata Vendita",
  "Picking Merci",
  "Cooperative Agricole",
  "Produzione Serre",
  "Officina Meccanica",
  "Fitofarmaci",
  "Mangimifici",
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
    line: "Leader software per ERP, HR e processi digitali aziendali.",
    focus: "Software Platform",
  },
  Dell: {
    image: "/site/premium-final/08-operations-platform.jpg",
    line: "Infrastrutture e data center orientati a continuita e performance.",
    focus: "Infrastructure",
  },
  HP: {
    image: "/site/premium-final/11-monitoring-delivery.jpg",
    line: "Tecnologie professionali endpoint per ambienti di lavoro evoluti.",
    focus: "Workplace",
  },
  Edatalia: {
    image: "/site/premium-final/03-digital-workspace.jpg",
    line: "Soluzioni digitali per formazione, firma e collaborazione documentale.",
    focus: "Knowledge Cloud",
  },
  Yashi: {
    image: "/site/premium-final/02-education-lab.jpg",
    line: "Interactive display professionali per aule, formazione e sale di collaborazione.",
    focus: "Interactive Display",
  },
};

export default function Home() {
  const { variant, copy } = useLeadVariant();
  const activeHomeVisualMode: HomeVisualMode = isHomeVisualMode(process.env.NEXT_PUBLIC_HOME_VISUAL_MODE)
    ? process.env.NEXT_PUBLIC_HOME_VISUAL_MODE
    : "soft";
  const activeHomeColorProfile: HomeColorProfile = isHomeColorProfile(process.env.NEXT_PUBLIC_HOME_COLOR_PROFILE)
    ? process.env.NEXT_PUBLIC_HOME_COLOR_PROFILE
    : "fusion";
  const featuredServices = premiumServiceCatalog.slice(0, 6);
  const spotlightPartner = partners.find((partner) => partner.name === "Yashi") ?? partners[0];
  const yashiPartner = partners.find((partner) => partner.name === "Yashi");
  const partnerCarouselItems = partners.length > 0 ? [...partners, ...partners] : [];
  const partnerCarouselReverseItems = partners.length > 0 ? [...partners].reverse().concat([...partners].reverse()) : [];
  const spotlightScene = spotlightPartner
    ? partnerSceneByName[spotlightPartner.name] ?? {
        image: "/site/premium-final/08-operations-platform.jpg",
        line: "Partner strategico per crescita e innovazione digitale.",
        focus: "Strategic Partner",
      }
    : {
        image: "/site/premium-final/08-operations-platform.jpg",
        line: "Partner strategico per crescita e innovazione digitale.",
        focus: "Strategic Partner",
      };
  const yashiScene = yashiPartner
    ? partnerSceneByName[yashiPartner.name] ?? {
        image: "/site/premium-final/08-operations-platform.jpg",
        line: "Partner strategico per crescita e innovazione digitale.",
        focus: "Strategic Partner",
      }
    : {
        image: "/site/premium-final/08-operations-platform.jpg",
        line: "Partner strategico per crescita e innovazione digitale.",
        focus: "Strategic Partner",
      };

  useTrackAbImpression({ variant, ctaId: "hero-primary", pagePath: "/" });
  useTrackAbImpression({ variant, ctaId: "hero-secondary", pagePath: "/" });

  return (
    <SiteFrame
      activePath="/"
      pageVariant="home-uxmax"
      statusBadge={<div className="home-uxmax-pill">{homeBadgeByColorProfile[activeHomeColorProfile]}</div>}
    >
      <div
        className={`home-uxmax home-uxmax-focus home-enterprise-modern home-enterprise-fusion home-figma-sourced home-showcase-luxe home-showroom-enterprise home-visual-${activeHomeVisualMode} home-color-${activeHomeColorProfile}`}
      >
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

        <section className="home-enterprise-hero scroll-section" data-stagger="slow" data-motion="hero" data-distance="20px">
          <div className="home-enterprise-circles" aria-hidden="true">
            <span className="enterprise-circle circle-a" />
            <span className="enterprise-circle circle-b" />
            <span className="enterprise-circle circle-c" />
          </div>

          <div className="home-enterprise-hero-grid">
            <div className="home-enterprise-copy stagger-item">
              <motion.p
                className="home-uxmax-kicker"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={revealTransition}
              >
                Dal 1994 | Informatica Soluzioni Aziendali S.r.l.
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.08 }}
              >
                Una home in stile grande enterprise, costruita sui dati reali della tua azienda.
              </motion.h1>

              <motion.p
                className="home-uxmax-lead"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.16 }}
              >
                ISA nasce come V.A.R. per soluzioni hardware e software chiavi in mano, con specializzazione in piattaforme gestionali,
                business continuity, firma digitale, assistenza remota e compliance. Dal 30 Aprile 2026 e parte del Gruppo Zutec.
              </motion.p>

              <motion.div
                className="home-uxmax-actions"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.22 }}
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
                  Portfolio servizi
                </Link>
              </motion.div>

              <motion.div
                className="home-enterprise-meta"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.27 }}
              >
                <span>HQ: Ragusa, Sicilia</span>
                <span>{companyInfo.group}</span>
                <span>P.IVA {companyInfo.vat}</span>
              </motion.div>
            </div>

            <motion.div
              className="home-enterprise-panel stagger-item"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...revealTransition, delay: 0.12 }}
            >
              <div className="home-enterprise-kpis">
                <article>
                  <strong>30+</strong>
                  <span>Anni di esperienza</span>
                </article>
                <article>
                  <strong>6</strong>
                  <span>Linee servizio core</span>
                </article>
                <article>
                  <strong>24/7</strong>
                  <span>Presidio operativo</span>
                </article>
              </div>

              <div className="home-enterprise-milestones">
                {enterpriseMilestones.map((step) => (
                  <article key={step.year + step.title}>
                    <p>{step.year}</p>
                    <h3>{step.title}</h3>
                    <span>{step.text}</span>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="home-enterprise-services scroll-section" data-stagger="fast" data-motion="services">
          <div className="home-enterprise-section-head stagger-item">
            <motion.p
              className="home-uxmax-kicker"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={revealTransition}
            >
              Servizi aziendali
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...revealTransition, delay: 0.06 }}
            >
              Soluzioni enterprise costruite sui contenuti reali ISA: gestionale, continuity, fatturazione, firma, didattica e whistleblowing.
            </motion.h1>
          </div>

          <div className="home-enterprise-services-grid stagger-item">
            {featuredServices.map((service, index) => (
              <motion.article
                key={service.slug}
                className={`home-enterprise-service-card tone-${(index % 6) + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -7, scale: 1.012 }}
                transition={{ ...revealTransition, delay: index * 0.05 }}
              >
                <div className="home-enterprise-service-media">
                  <Image
                    src={serviceVisualBySlug[service.slug] ?? "/site/premium-final/08-operations-platform.jpg"}
                    alt={service.title}
                    width={860}
                    height={560}
                    className="home-enterprise-service-image"
                  />
                  <span className="home-enterprise-service-ring" aria-hidden="true" />
                  <span className="home-enterprise-service-shine" aria-hidden="true" />
                </div>
                <div className="home-enterprise-service-copy">
                  <span className="home-enterprise-service-badge">{service.eyebrow}</span>
                  <h3>{service.title}</h3>
                  <p>{service.teaser}</p>
                  <Link href={`/servizi/${service.slug}`}>Apri servizio</Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="home-enterprise-verticals scroll-section" data-stagger="fast" data-motion="detail">
          <div className="home-enterprise-verticals-orbit" aria-hidden="true">
            <span className="enterprise-vertical-orb orb-a" />
            <span className="enterprise-vertical-orb orb-b" />
          </div>

          <div className="home-enterprise-section-head stagger-item">
            <p>Verticalizzazioni gestionali</p>
            <h2>Domini specialistici derivati dall'esperienza Adhoc Revolution e dai progetti ISA sul campo.</h2>
          </div>

          <div className="home-enterprise-vertical-grid stagger-item">
            {erpVerticalDomains.map((domain, index) => (
              <motion.article
                key={domain}
                className="home-enterprise-vertical-node"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ ...revealTransition, delay: index * 0.05 }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{domain}</h3>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="home-enterprise-partners scroll-section" data-stagger="fast" data-motion="partners">
          <div className="home-enterprise-section-head stagger-item">
            <p>Presentazione partner</p>
            <h2>Un ecosistema operativo completo, con Yashi integrato tra i partner strategici ISA.</h2>
          </div>

          <div className="home-enterprise-partners-carousel stagger-item" aria-label="Carrousel partner ISA">
            <div className="home-enterprise-partners-lane lane-forward">
              <div className="home-enterprise-partners-track track-forward">
                {partnerCarouselItems.map((partner, index) => (
                  <a
                    key={`${partner.name}-carousel-top-${index}`}
                    href={partner.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`home-enterprise-partner-chip${partner.name === "Yashi" ? " is-featured" : ""}`}
                  >
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      width={132}
                      height={42}
                      className="home-enterprise-partner-chip-logo"
                    />
                    <span>{partner.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="home-enterprise-partners-lane lane-reverse">
              <div className="home-enterprise-partners-track track-reverse">
                {partnerCarouselReverseItems.map((partner, index) => (
                  <a
                    key={`${partner.name}-carousel-bottom-${index}`}
                    href={partner.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`home-enterprise-partner-chip${partner.name === "Yashi" ? " is-featured" : ""}`}
                  >
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      width={132}
                      height={42}
                      className="home-enterprise-partner-chip-logo"
                    />
                    <span>{partner.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="home-enterprise-partners-presentation stagger-item">
            <motion.article
              className="home-enterprise-partners-intro"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={revealTransition}
            >
              <h3>Partnership tecnologiche attive</h3>
              <p>
                Collaboriamo con vendor internazionali per infrastruttura, software, didattica digitale e workspace evoluti.
                Ogni partner contribuisce a una delivery enterprise coerente, dalla consulenza all&apos;operativita quotidiana.
              </p>
              <div className="home-enterprise-partners-links">
                {partners.map((partner) => (
                  <a
                    key={`partner-pill-${partner.name}`}
                    href={partner.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`home-enterprise-partner-pill${partner.name === "Yashi" ? " is-featured" : ""}`}
                  >
                    {partner.name}
                  </a>
                ))}
              </div>
            </motion.article>

            {spotlightPartner ? (
              <motion.a
                href={spotlightPartner.href}
                target="_blank"
                rel="noreferrer"
                className="home-enterprise-partner-spotlight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.01 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ ...revealTransition, delay: 0.08 }}
              >
                <Image
                  src={spotlightScene.image}
                  alt={`Focus partner ${spotlightPartner.name}`}
                  width={980}
                  height={520}
                  className="home-enterprise-partner-image"
                />
                <span className="home-enterprise-partner-overlay" aria-hidden="true" />
                <div className="home-enterprise-partner-copy">
                  <Image
                    src={spotlightPartner.image}
                    alt={spotlightPartner.name}
                    width={180}
                    height={62}
                    className="home-enterprise-partner-logo"
                  />
                  <span className="home-enterprise-partner-focus">{spotlightScene.focus}</span>
                  <h3>{spotlightPartner.name}</h3>
                  <p>{spotlightScene.line}</p>
                  <span className="home-enterprise-partner-action">Visita partner</span>
                </div>
              </motion.a>
            ) : null}
          </div>

          <div className="home-enterprise-partners-grid stagger-item">
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
                  className={`home-enterprise-partner-card tone-${(index % 4) + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -7, scale: 1.014 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ ...revealTransition, delay: index * 0.08 }}
                >
                  <Image
                    src={scene.image}
                    alt={`Visual partner ${partner.name}`}
                    width={980}
                    height={520}
                    className="home-enterprise-partner-image"
                  />
                  <span className="home-enterprise-partner-overlay" aria-hidden="true" />
                  <div className="home-enterprise-partner-copy">
                    <Image src={partner.image} alt={partner.name} width={180} height={62} className="home-enterprise-partner-logo" />
                    <span className="home-enterprise-partner-focus">{scene.focus}</span>
                    <h3>{partner.name}</h3>
                    <p>{scene.line}</p>
                    <span className="home-enterprise-partner-action">Visita partner</span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>

        {yashiPartner ? (
          <section className="home-enterprise-yashi scroll-section" data-stagger="fast" data-motion="signature">
            <div className="home-enterprise-yashi-grid stagger-item">
              <motion.a
                href={yashiPartner.href}
                target="_blank"
                rel="noreferrer"
                className="home-enterprise-yashi-media"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                whileHover={{ y: -5, scale: 1.01 }}
                transition={revealTransition}
              >
                <Image
                  src={yashiScene.image}
                  alt="Yashi partnership visual"
                  width={1180}
                  height={720}
                  className="home-enterprise-yashi-image"
                />
                <span className="home-enterprise-partner-overlay" aria-hidden="true" />
                <div className="home-enterprise-yashi-badge">
                  <Image src={yashiPartner.image} alt={yashiPartner.name} width={190} height={66} className="home-enterprise-partner-logo" />
                  <span>{yashiScene.focus}</span>
                </div>
              </motion.a>

              <motion.article
                className="home-enterprise-yashi-copy"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ ...revealTransition, delay: 0.06 }}
              >
                <p className="home-uxmax-kicker">Partner spotlight</p>
                <h2>Yashi: display interattivi per formazione e collaborazione enterprise.</h2>
                <p>
                  {yashiScene.line} Integriamo le tecnologie Yashi nei progetti ISA per scuole, enti e aziende che vogliono
                  ambienti digitali moderni e operativi.
                </p>
                <div className="home-enterprise-yashi-actions">
                  <a href={yashiPartner.href} target="_blank" rel="noreferrer" className="btn-primary">
                    Visita Yashi
                  </a>
                  <Link href="/servizi/tecnologia-didattica" className="btn-secondary">
                    Soluzioni didattiche ISA
                  </Link>
                </div>
              </motion.article>
            </div>
          </section>
        ) : null}

        <motion.section
          className="home-enterprise-contact scroll-section"
          data-stagger="slow"
          data-motion="contact"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={revealTransition}
        >
          <div className="stagger-item">
            <p className="home-uxmax-kicker">Contatto diretto</p>
            <h2>Parliamo del tuo prossimo progetto digitale enterprise.</h2>
            <p>
              {companyInfo.address} | Tel. {companyInfo.phone} | {companyInfo.email}
            </p>
          </div>
          <div className="home-enterprise-contact-actions stagger-item">
            <Link href="/azienda/contatti" className="btn-primary">
              Richiedi consulenza
            </Link>
            <Link href="/assistenza" className="btn-secondary">
              Vai all'assistenza
            </Link>
          </div>
        </motion.section>
      </div>
    </SiteFrame>
  );
}