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

function isHomeVisualMode(value: string | undefined): value is HomeVisualMode {
  return value === "soft" || value === "intense";
}

function isHomeColorProfile(value: string | undefined): value is HomeColorProfile {
  return value === "fusion" || value === "warm" || value === "techno";
}

const homeBadgeByColorProfile: Record<HomeColorProfile, string> = {
  fusion: "Zutec Inspired Fusion",
  warm: "Zutec Inspired Warm",
  techno: "Zutec Inspired Tech",
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

const testimonials = [
  {
    name: "Dina Palermo",
    text: "Serieta e professionalita al servizio dei clienti, con supporto rapido e competente.",
  },
  {
    name: "Mirror Srl",
    text: "Soluzioni concrete, affiancamento operativo e visione chiara sull'evoluzione digitale.",
  },
  {
    name: "Anna Andrei",
    text: "Un partner affidabile per software Zucchetti, assistenza e personalizzazione processi.",
  },
] as const;

export default function Home() {
  const { variant, copy } = useLeadVariant();
  const activeHomeVisualMode: HomeVisualMode = isHomeVisualMode(process.env.NEXT_PUBLIC_HOME_VISUAL_MODE)
    ? process.env.NEXT_PUBLIC_HOME_VISUAL_MODE
    : "soft";
  const activeHomeColorProfile: HomeColorProfile = isHomeColorProfile(process.env.NEXT_PUBLIC_HOME_COLOR_PROFILE)
    ? process.env.NEXT_PUBLIC_HOME_COLOR_PROFILE
    : "fusion";

  const featuredServices = premiumServiceCatalog.slice(0, 6);
  const showcasePartners = partners.slice(0, 5);
  const yashiPartner = partners.find((partner) => partner.name === "Yashi");

  useTrackAbImpression({ variant, ctaId: "hero-primary", pagePath: "/" });
  useTrackAbImpression({ variant, ctaId: "hero-secondary", pagePath: "/" });

  return (
    <SiteFrame
      activePath="/"
      pageVariant="home-zutec"
      statusBadge={<div className="home-zutec-pill">{homeBadgeByColorProfile[activeHomeColorProfile]}</div>}
    >
      <div className={`home-zutec home-zutec-visual-${activeHomeVisualMode} home-zutec-color-${activeHomeColorProfile}`}>
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
                ISA nasce dall'esperienza nel software gestionale e nell'assistenza specializzata. Oggi offre un ecosistema di servizi
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
            <p className="home-zutec-kicker stagger-item">Le nostre certificazioni e partnership</p>
            <div className="home-zutec-certs-row stagger-item">
              {showcasePartners.map((partner) => (
                <a key={`cert-${partner.name}`} href={partner.href} target="_blank" rel="noreferrer" className="home-zutec-cert-chip">
                  <Image src={partner.image} alt={partner.name} width={130} height={42} className="home-zutec-cert-logo" />
                  <span>{partner.name}</span>
                </a>
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

        <section className="home-zutec-testimonials scroll-section" data-stagger="fast" data-motion="partners">
          <div className="home-zutec-wrap">
            <div className="home-zutec-head stagger-item">
              <p>Cosa dicono di noi</p>
              <h2>Esperienze concrete di aziende e professionisti che lavorano con ISA.</h2>
            </div>

            <div className="home-zutec-testimonials-grid">
              {testimonials.map((quote, index) => (
                <motion.article
                  key={quote.name}
                  className="home-zutec-testimonial-card stagger-item"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.84, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                >
                  <p>{quote.text}</p>
                  <strong>{quote.name}</strong>
                </motion.article>
              ))}
            </div>
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
