import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/site-frame";
import {
  getPremiumServiceBySlug,
  premiumServiceSlugs,
} from "@/lib/services-catalog";

type ServicePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return premiumServiceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getPremiumServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Servizio non trovato | ISA SRL",
    };
  }

  return {
    title: `${service.menuLabel} | ISA SRL`,
    description: service.teaser,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getPremiumServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <SiteFrame activePath="/servizi" minimalGlobal>
      <article
        className="service-detail-clean shell-card reveal reveal-2 scroll-section"
        data-stagger="fast"
      >
        <header className="service-detail-head stagger-item">
          <p className="service-detail-kicker">Servizio dedicato</p>
          <h1>{service.menuLabel}</h1>
          <p>{service.description}</p>
          <div className="service-detail-actions">
            <Link href="/servizi" className="btn-secondary">
              Torna ai servizi
            </Link>
            <Link href="/contatti" className="btn-primary">
              Richiedi informazioni
            </Link>
          </div>
        </header>

        <section className="service-detail-media stagger-item">
          <Image
            src={service.heroImage}
            alt={service.heroAlt}
            width={1200}
            height={680}
            className="service-detail-image"
            priority
          />
        </section>

        <section className="service-detail-copy stagger-item">
          {service.legacyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        {service.legacySections.length ? (
          <section className="service-detail-grid">
            {service.legacySections.map((section) => (
              <article key={section.title} className="service-detail-card stagger-item">
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </article>
            ))}
          </section>
        ) : null}

        {service.legacyChecklist.length ? (
          <section className="service-detail-checklist stagger-item">
            <h2>Dettagli principali</h2>
            <ul>
              {service.legacyChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {service.legacyFooterNote ? (
          <section className="service-detail-note stagger-item">
            <p>{service.legacyFooterNote}</p>
          </section>
        ) : null}
      </article>
    </SiteFrame>
  );
}
