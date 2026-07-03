"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  fusion: "Blue Harmony",
  warm: "Azure Sunset",
  techno: "Electric Blue Modern",
};

const serviceVisualBySlug: Record<string, string> = {
  "gestionale-su-misura": "/site/premium-final/10-modular-architecture.jpg",
  "business-continuity": "/site/premium-final/04-business-continuity.jpg",
  "fatturazione-elettronica": "/site/premium-final/06-digital-invoicing.jpg",
  "firma-digitale": "/site/premium-final/07-compliance-signature.jpg",
  "tecnologia-didattica": "/site/premium-final/02-education-lab.jpg",
  whistleblowing: "/site/premium-final/09-kpi-performance.jpg",
};

const enterpriseHighlights = [
  {
    title: "Una consulenza professionale al tuo servizio",
    text: "Team specializzato nella digitalizzazione di processi amministrativi, gestionali e documentali.",
    image: "/site/premium-final/01-assistance-support.jpg",
  },
  {
    title: "Sviluppiamo personalizzazioni in ambito ERP",
    text: "Verticalizzazioni operative su misura per PMI, studi professionali ed enti organizzati.",
    image: "/site/premium-final/10-modular-architecture.jpg",
  },
  {
    title: "Assistenza dedicata specialistica",
    text: "Supporto continuo per stabilita, sicurezza e continuita del lavoro quotidiano.",
    image: "/site/premium-final/11-monitoring-delivery.jpg",
  },
] as const;

export default function Home() {
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(true);
  const { variant, copy } = useLeadVariant();
  const activeHomeVisualMode: HomeVisualMode = isHomeVisualMode(process.env.NEXT_PUBLIC_HOME_VISUAL_MODE)
    ? process.env.NEXT_PUBLIC_HOME_VISUAL_MODE
    : "intense";
  const activeHomeColorProfile: HomeColorProfile = isHomeColorProfile(process.env.NEXT_PUBLIC_HOME_COLOR_PROFILE)
    ? process.env.NEXT_PUBLIC_HOME_COLOR_PROFILE
    : "techno";

  const featuredServices = premiumServiceCatalog.slice(0, 6);
  const showcasePartners = partners.filter((partner) => partner.name !== "Edatalia").slice(0, 5);
  const yashiPartner = partners.find((partner) => partner.name === "Yashi");

  useTrackAbImpression({ variant, ctaId: "hero-primary", pagePath: "/" });
  useTrackAbImpression({ variant, ctaId: "hero-secondary", pagePath: "/" });

  useEffect(() => {
    if (!isAnnouncementOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAnnouncementOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isAnnouncementOpen]);

  return (
    <SiteFrame
      activePath="/"
      pageVariant="home-zutec"
      statusBadge={<div className="home-zutec-pill">{homeBadgeByColorProfile[activeHomeColorProfile]}</div>}
    >
      <div className={`home-zutec home-zutec-visual-${activeHomeVisualMode} home-zutec-color-${activeHomeColorProfile}`}>
        {isAnnouncementOpen && (
          <section className="home-zutec-announcement" role="dialog" aria-modal="true" aria-label="Annonce collaboration Zutec">
            <motion.article
              className="home-zutec-announcement-card"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.2, 0.95, 0.35, 1] }}
            >
              <button
                type="button"
                className="home-zutec-announcement-close"
                aria-label="Fermer l'annonce"
                onClick={() => {
                  setIsAnnouncementOpen(false);
                  trackAbClick({ variant, ctaId: "zutec-announcement-close", pagePath: "/" });
                }}
              >
                ×
              </button>

              <div className="home-zutec-announcement-head">
                <span className="home-zutec-announcement-link-mark">Collaboration ISA x Zutec</span>
                <a
                  href="https://zutec.it"
                  target="_blank"
                  rel="noreferrer"
                  className="home-zutec-announcement-zutec-mark"
                  onClick={() => trackAbClick({ variant, ctaId: "zutec-announcement-logo", pagePath: "/" })}
                >
                  <Image src="/site/logos/zutec-official.png" alt="Logo Zutec" width={132} height={26} className="home-zutec-announcement-zutec-logo" />
                </a>
              </div>

              <div className="home-zutec-announcement-grid">
                <div className="home-zutec-announcement-copy">
                  <p className="home-zutec-kicker">Annonce officielle</p>
                  <h2>ISA collabore avec Zutec et rejoint son ecosysteme pour accelerer la transformation digitale des entreprises.</h2>
                  <p>
                    Ce rapprochement strategique renforce les competences, le support operationnel et la capacite d&apos;innovation pour
                    offrir des solutions encore plus solides.
                  </p>
                  <div className="home-zutec-announcement-actions">
                    <a
                      href="https://zutec.it"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary"
                      onClick={() => trackAbClick({ variant, ctaId: "zutec-announcement-primary", pagePath: "/" })}
                    >
                      Visiter zutec.it
                    </a>
                    <Link
                      href="/news"
                      className="btn-secondary"
                      onClick={() => {
                        setIsAnnouncementOpen(false);
                        trackAbClick({ variant, ctaId: "zutec-announcement-news", pagePath: "/" });
                      }}
                    >
                      Lire le communique
                    </Link>
                  </div>
                </div>

                <div className="home-zutec-announcement-media">
                  <Image
                    src="/site/premium-final/03-digital-workspace.jpg"
                    alt="Annonce de collaboration ISA et Zutec"
                    width={900}
                    height={620}
                    className="home-zutec-announcement-image"
                  />
                </div>
              </div>
            </motion.article>
          </section>
        )}

        <section className="home-zutec-collab scroll-section" data-stagger="slow" data-motion="trust" data-distance="24px">
          <div className="home-zutec-wrap">
            <motion.article
              className="home-zutec-collab-banner stagger-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/site/premium-final/12-solution-workshop.jpg"
                alt="Sfondo collaborazione ISA e Zutec"
                width={1600}
                height={860}
                className="home-zutec-collab-bg"
              />
              <div className="home-zutec-collab-overlay" aria-hidden="true" />

              <div className="home-zutec-collab-badge" aria-hidden="true">
                <span>Software</span>
                <span>Gestione Del</span>
                <span>Personale</span>
                <small>Scopri</small>
              </div>

              <div className="home-zutec-collab-card">
                <span className="home-zutec-collab-close" aria-hidden="true">
                  ×
                </span>
                <a
                  href="https://zutec.it"
                  target="_blank"
                  rel="noreferrer"
                  className="home-zutec-collab-logo-link"
                  onClick={() => trackAbClick({ variant, ctaId: "zutec-logo-link", pagePath: "/" })}
                >
                  <Image src="/site/logos/zutec-official.png" alt="Logo ufficiale Zutec" width={250} height={86} className="home-zutec-collab-logo" />
                </a>
                <p>
                  Siamo lieti di comunicare che ISA Srl entra nel Gruppo Zutec, rafforzando la presenza sul mercato e la capacita di
                  sviluppo della societa.
                </p>
                <p>
                  L&apos;operazione rappresenta un passaggio strategico per consolidare competenze, risorse e visione condivisa al servizio
                  delle imprese.
                </p>
                <p>Diamo il benvenuto al team ISA nella grande famiglia Zutec.</p>
                <Link href="/news" className="home-zutec-collab-inline-link">
                  Leggi la comunicazione completa
                </Link>
              </div>
            </motion.article>
          </div>
        </section>

        <section className="home-zutec-hero scroll-section" data-stagger="slow" data-motion="hero" data-distance="20px">
          <div className="home-zutec-wrap home-zutec-hero-grid">
            <motion.div
              className="home-zutec-copy stagger-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.95, ease: [0.2, 0.95, 0.32, 1] }}
            >
              <p className="home-zutec-kicker">Partner Zucchetti certificato</p>
              <h1>Digitalizziamo processi aziendali con metodo, tecnologia e supporto continuo.</h1>
              <p>
                ISA nasce dall&apos;esperienza nel software gestionale e nell&apos;assistenza specializzata. Oggi offre un ecosistema di servizi
                dedicati a imprese, studi professionali ed enti, con una delivery orientata ai risultati.
              </p>
              <div className="home-zutec-actions">
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
                  Chi siamo
                </Link>
              </div>

              <div className="home-zutec-top-meta">
                <span>Dal 1994</span>
                <span>{companyInfo.group}</span>
                <span>Ragusa</span>
              </div>

              <div className="home-zutec-metrics">
                <article>
                  <strong>30+</strong>
                  <span>Anni esperienza</span>
                </article>
                <article>
                  <strong>6</strong>
                  <span>Linee di servizio core</span>
                </article>
                <article>
                  <strong>5</strong>
                  <span>Partner principali</span>
                </article>
              </div>
            </motion.div>

            <motion.div
              className="home-zutec-hero-media stagger-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.08, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src="/site/premium-final/12-solution-workshop.jpg" alt="Consulenza ISA" width={1200} height={800} className="home-zutec-hero-image" />
              <div className="home-zutec-hero-badge">
                <strong>ISA S.r.l.</strong>
                <span>Software, assistenza e personalizzazioni ERP</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="home-zutec-certs scroll-section" data-stagger="fast" data-motion="trust">
          <div className="home-zutec-wrap">
            <div className="home-zutec-partners-head stagger-item">
              <p className="home-zutec-kicker">Ecosistema partner</p>
              <h2>Una rete tecnologica integrata, con competenze complementari per progetti enterprise.</h2>
            </div>

            <div className="home-zutec-partners-stage">
              {showcasePartners.map((partner, index) => (
                <motion.a
                  key={`partner-showcase-${partner.name}`}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer"
                  className="home-zutec-partner-tile stagger-item"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.55, delay: index * 0.07, ease: [0.2, 0.95, 0.35, 1] }}
                  whileHover={{ y: -7, scale: 1.015 }}
                >
                  <span className="home-zutec-partner-sheen" aria-hidden="true" />
                  <div className="home-zutec-partner-logo-wrap">
                    <Image src={partner.image} alt={partner.name} width={145} height={52} className="home-zutec-partner-logo" />
                  </div>
                  <div className="home-zutec-partner-copy">
                    <strong>{partner.name}</strong>
                    <p>Soluzioni integrate e supporto specialistico con workflow condivisi.</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="home-zutec-services scroll-section" data-stagger="fast" data-motion="services">
          <div className="home-zutec-wrap">
            <div className="home-zutec-head stagger-item">
              <p>I nostri servizi</p>
              <h2>Soluzioni software e consulenza operativa per gestire processi, persone e performance.</h2>
            </div>

            <div className="home-zutec-services-list">
              {featuredServices.map((service, index) => (
                <motion.article
                  key={service.slug}
                  className={`home-zutec-service-row stagger-item ${index % 2 === 0 ? "media-left" : "media-right"}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.32 }}
                  transition={{ duration: 0.46, delay: index * 0.045, ease: [0.2, 0.95, 0.35, 1] }}
                  whileHover={{ y: -5, scale: 1.004 }}
                >
                  <div className="home-zutec-service-media">
                    <Image
                      src={serviceVisualBySlug[service.slug] ?? "/site/premium-final/08-operations-platform.jpg"}
                      alt={service.title}
                      width={1100}
                      height={700}
                      className="home-zutec-service-image"
                    />
                  </div>

                  <div className="home-zutec-service-copy">
                    <p className="home-zutec-service-tag">Partner Zucchetti certificato</p>
                    <h3>{service.title}</h3>
                    <p className="home-zutec-service-teaser">{service.teaser}</p>
                    <ul>
                      {service.highlights.slice(0, 4).map((item) => (
                        <li key={`${service.slug}-${item}`}>{item}</li>
                      ))}
                    </ul>
                    <Link href={`/servizi/${service.slug}`}>Scopri di piu</Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-zutec-values scroll-section" data-stagger="fast" data-motion="detail">
          <div className="home-zutec-wrap home-zutec-values-grid">
            {enterpriseHighlights.map((item) => (
              <motion.article
                key={item.title}
                className="home-zutec-value-card stagger-item"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: 0.62, ease: [0.2, 0.95, 0.32, 1] }}
                whileHover={{ y: -5 }}
              >
                <Image src={item.image} alt={item.title} width={960} height={620} className="home-zutec-value-image" />
                <div className="home-zutec-value-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="home-zutec-bottom-cta scroll-section" data-stagger="slow" data-motion="contact">
          <div className="home-zutec-wrap home-zutec-bottom-grid">
            <div className="home-zutec-bottom-copy stagger-item">
              <p className="home-zutec-kicker">Parla con noi</p>
              <h2>Progettiamo insieme il prossimo step digitale della tua azienda.</h2>
              <p>
                {companyInfo.address} | Tel. {companyInfo.phone} | {companyInfo.email}
              </p>
              <div className="home-zutec-actions">
                <Link href="/azienda/contatti" className="btn-primary">
                  Richiedi consulenza
                </Link>
                <Link href="/assistenza" className="btn-secondary">
                  Assistenza remota
                </Link>
              </div>
            </div>

            {yashiPartner ? (
              <a href={yashiPartner.href} target="_blank" rel="noreferrer" className="home-zutec-bottom-media stagger-item">
                <Image src="/site/premium-final/02-education-lab.jpg" alt="Yashi interactive display" width={960} height={620} className="home-zutec-bottom-image" />
              </a>
            ) : null}
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
