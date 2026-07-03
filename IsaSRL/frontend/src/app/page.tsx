"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteFrame } from "@/components/site-frame";
import { trackAbClick, useTrackAbImpression } from "@/lib/ab-analytics";
import { useLeadVariant } from "@/lib/lead-copy";
import { companyInfo, partners } from "@/lib/site-data";
import { premiumServiceCatalog } from "@/lib/services-catalog";

type HomeVisualMode = "soft" | "intense";
type HomeColorProfile = "fusion" | "warm" | "techno";
type HomeArtDirection = "industrial" | "glass-neon";

function isHomeVisualMode(value: string | undefined): value is HomeVisualMode {
  return value === "soft" || value === "intense";
}

function isHomeColorProfile(value: string | undefined): value is HomeColorProfile {
  return value === "fusion" || value === "warm" || value === "techno";
}

function isHomeArtDirection(value: string | undefined): value is HomeArtDirection {
  return value === "industrial" || value === "glass-neon";
}

const homeBadgeByColorProfile: Record<HomeColorProfile, string> = {
  fusion: "Rift Blue Fusion",
  warm: "Rift Blue Ember",
  techno: "Rift Blue Neon",
};

const homeBadgeByArtDirection: Record<HomeArtDirection, string> = {
  industrial: "Industrial Dark",
  "glass-neon": "Glass Neon",
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
    title: "Origine ISA",
    text: "Nascita come V.A.R. con soluzioni hardware e software chiavi in mano.",
  },
  {
    year: "2026",
    title: "Evoluzione Gruppo Zutec",
    text: "Dal 30 aprile 2026, nuova accelerazione industriale su delivery enterprise.",
  },
  {
    year: "Oggi",
    title: "Execution continua",
    text: "Servizi verticali, governance operativa e supporto con presidio costante.",
  },
] as const;

const partnerSceneByName: Record<string, { image: string; line: string; focus: string }> = {
  Zucchetti: {
    image: "/site/premium-final/12-solution-workshop.jpg",
    line: "Ecosistema software per ERP, HR e processi digitali ad alta continuita.",
    focus: "Software Core",
  },
  Dell: {
    image: "/site/premium-final/08-operations-platform.jpg",
    line: "Infrastrutture data-center orientate a performance, sicurezza e scalabilita.",
    focus: "Infrastructure",
  },
  HP: {
    image: "/site/premium-final/11-monitoring-delivery.jpg",
    line: "Workplace professionale per team ad alta produttivita e operazioni ibride.",
    focus: "Workplace",
  },
  Edatalia: {
    image: "/site/premium-final/03-digital-workspace.jpg",
    line: "Piattaforme digitali per collaborazione, formazione e processi documentali.",
    focus: "Knowledge",
  },
  Yashi: {
    image: "/site/premium-final/02-education-lab.jpg",
    line: "Interactive display per ambienti didattici e sale collaborative evolute.",
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
  const activeHomeArtDirection: HomeArtDirection = isHomeArtDirection(process.env.NEXT_PUBLIC_HOME_ART_DIRECTION)
    ? process.env.NEXT_PUBLIC_HOME_ART_DIRECTION
    : "glass-neon";

  const featuredServices = premiumServiceCatalog.slice(0, 6);
  const showcasePartners = partners.slice(0, 6);
  const yashiPartner = partners.find((partner) => partner.name === "Yashi");
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
      pageVariant="home-rift"
      statusBadge={
        <div className="home-rift-pill">
          {homeBadgeByColorProfile[activeHomeColorProfile]} | {homeBadgeByArtDirection[activeHomeArtDirection]}
        </div>
      }
    >
      <div
        className={`home-rift home-rift-style-${activeHomeArtDirection} home-rift-visual-${activeHomeVisualMode} home-rift-color-${activeHomeColorProfile}`}
      >
        <div className="home-rift-noise" aria-hidden="true" />

        <section className="home-rift-hero scroll-section" data-stagger="slow" data-motion="hero" data-distance="20px">
          <div className="home-rift-hero-grid">
            <div className="home-rift-copy stagger-item">
              <p className="home-rift-kicker">ISA Enterprise Rift</p>
              <h1>Una Home completamente nuova: dark, premium, ad alto impatto visivo.</h1>
              <p>
                Design ricostruito con una direzione radicalmente diversa: base blu profonda, accenti multipli, superfici layered,
                e struttura editoriale enterprise per presentare servizi, partner e leadership operativa.
              </p>

              <div className="home-rift-actions">
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
              </div>

              <div className="home-rift-company-chips">
                <span>HQ Ragusa</span>
                <span>{companyInfo.group}</span>
                <span>P.IVA {companyInfo.vat}</span>
              </div>
            </div>

            <div className="home-rift-milestones stagger-item">
              {enterpriseMilestones.map((step) => (
                <article key={step.year + step.title}>
                  <p>{step.year}</p>
                  <h3>{step.title}</h3>
                  <span>{step.text}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-rift-services scroll-section" data-stagger="fast" data-motion="services">
          <div className="home-rift-head stagger-item">
            <p>Service Grid</p>
            <h2>Servizi core in una struttura visuale completamente nuova, pronta per nuove immagini.</h2>
          </div>

          <div className="home-rift-services-grid stagger-item">
            {featuredServices.map((service, index) => (
              <motion.article
                key={service.slug}
                className={`home-rift-service-card tone-${(index % 6) + 1}`}
                whileHover={{ y: -8, scale: 1.012 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="home-rift-service-media">
                  <Image
                    src={serviceVisualBySlug[service.slug] ?? "/site/premium-final/08-operations-platform.jpg"}
                    alt={service.title}
                    width={960}
                    height={620}
                    className="home-rift-service-image"
                  />
                  <span className="home-rift-service-overlay" aria-hidden="true" />
                </div>

                <div className="home-rift-service-copy">
                  <span>{service.eyebrow}</span>
                  <h3>{service.title}</h3>
                  <p>{service.teaser}</p>
                  <Link href={`/servizi/${service.slug}`}>Apri servizio</Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="home-rift-partners scroll-section" data-stagger="fast" data-motion="partners">
          <div className="home-rift-head stagger-item">
            <p>Partner Wall</p>
            <h2>Ecosistema partner ripensato: banda logo + showcase cards con focus operativo.</h2>
          </div>

          <div className="home-rift-partner-band stagger-item" aria-label="Partner ISA">
            {showcasePartners.map((partner) => (
              <a key={`band-${partner.name}`} href={partner.href} target="_blank" rel="noreferrer" className="home-rift-partner-chip">
                <Image src={partner.image} alt={partner.name} width={120} height={38} className="home-rift-partner-chip-logo" />
                <span>{partner.name}</span>
              </a>
            ))}
          </div>

          <div className="home-rift-partners-grid stagger-item">
            {showcasePartners.map((partner, index) => {
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
                  className={`home-rift-partner-card tone-${(index % 4) + 1}`}
                  whileHover={{ y: -7, scale: 1.012 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={scene.image} alt={`Visual ${partner.name}`} width={960} height={560} className="home-rift-partner-image" />
                  <span className="home-rift-partner-overlay" aria-hidden="true" />

                  <div className="home-rift-partner-copy">
                    <Image src={partner.image} alt={partner.name} width={150} height={52} className="home-rift-partner-logo" />
                    <strong>{scene.focus}</strong>
                    <h3>{partner.name}</h3>
                    <p>{scene.line}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>

        {yashiPartner ? (
          <section className="home-rift-yashi scroll-section" data-stagger="fast" data-motion="signature">
            <div className="home-rift-yashi-grid stagger-item">
              <motion.a
                href={yashiPartner.href}
                target="_blank"
                rel="noreferrer"
                className="home-rift-yashi-media"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={yashiScene.image} alt="Yashi showcase" width={1200} height={760} className="home-rift-yashi-image" />
                <span className="home-rift-partner-overlay" aria-hidden="true" />
              </motion.a>

              <div className="home-rift-yashi-copy">
                <p className="home-rift-kicker">Yashi Spotlight</p>
                <h2>Focus Yashi in una sezione dedicata, con CTA separata e immagine sostituibile.</h2>
                <p>
                  {yashiScene.line} Questa area e stata progettata per essere facilmente aggiornata con nuovi visual e una narrativa commerciale
                  verticale per scuola, enti e business environments.
                </p>
                <div className="home-rift-actions">
                  <a href={yashiPartner.href} target="_blank" rel="noreferrer" className="btn-primary">
                    Visita Yashi
                  </a>
                  <Link href="/servizi/tecnologia-didattica" className="btn-secondary">
                    Soluzioni didattiche ISA
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="home-rift-contact scroll-section" data-stagger="slow" data-motion="contact">
          <div className="home-rift-contact-copy stagger-item">
            <p className="home-rift-kicker">Direct Contact</p>
            <h2>Vuoi finalizzare la nuova identita visuale con le tue immagini personalizzate?</h2>
            <p>
              {companyInfo.address} | Tel. {companyInfo.phone} | {companyInfo.email}
            </p>
          </div>

          <div className="home-rift-contact-actions stagger-item">
            <Link href="/azienda/contatti" className="btn-primary">
              Richiedi consulenza
            </Link>
            <Link href="/assistenza" className="btn-secondary">
              Vai all&apos;assistenza
            </Link>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
