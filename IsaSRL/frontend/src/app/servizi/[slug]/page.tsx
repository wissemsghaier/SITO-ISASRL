import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ContactBanner,
  ExecutiveTrustBand,
  PartnersSection,
} from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { PremiumRouteShell } from "@/components/premium-route-shell";
import { ServicePageSummary } from "@/components/services-selector";
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

const motionToneBySlug: Record<
  string,
  {
    badge: string;
    title: string;
    note: string;
  }
> = {
  "fatturazione-elettronica": {
    badge: "Pulse Finance",
    title: "Flusso documentale continuo",
    note: "Pattern dinamico orientato a velocita e tracciabilita del ciclo fatture.",
  },
  "business-continuity": {
    badge: "Resilience Grid",
    title: "Protezione sempre attiva",
    note: "Movimento morbido e ridondante per comunicare continuita operativa.",
  },
  "gestionale-su-misura": {
    badge: "Operations Matrix",
    title: "Controllo processi in tempo reale",
    note: "Layer direzionale che richiama dashboard e orchestrazione dei workflow.",
  },
  "tecnologia-didattica": {
    badge: "Learning Orbit",
    title: "Esperienza didattica immersiva",
    note: "Forme leggere e progressive per evocare ambienti education interattivi.",
  },
  "firma-digitale": {
    badge: "Signature Beam",
    title: "Compliance con gesto semplice",
    note: "Linea cinetica elegante ispirata a firma digitale e validazione documentale.",
  },
  whistleblowing: {
    badge: "Shield Signal",
    title: "Canale sicuro e riservato",
    note: "Pattern protettivo con ritmo discreto per segnalazioni ad alta sensibilita.",
  },
};

const defaultMotionTone = {
  badge: "ISA Motion",
  title: "Servizio premium in evoluzione",
  note: "Micro-animazione distintiva con identita visiva dedicata.",
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

  const motionTone = motionToneBySlug[service.slug] || defaultMotionTone;

  return (
    <SiteFrame activePath="/servizi">
      <PremiumRouteShell
        eyebrow={`Servizio dedicato | ${service.menuLabel}`}
        title={`${service.menuLabel}: una pagina su misura con taglio executive`}
        description={service.description}
        chips={service.highlights}
      >
        <section
          className="service-mini-motion-bg premium-route-section reveal reveal-3 scroll-section"
          data-service-motion={service.slug}
        >
          <div className="service-mini-motion-copy">
            <p>{motionTone.badge}</p>
            <h3>{motionTone.title}</h3>
            <span>{motionTone.note}</span>
          </div>
          <div className="service-mini-motion-stage" aria-hidden="true">
            <span className="service-mini-blob service-mini-blob-a" />
            <span className="service-mini-blob service-mini-blob-b" />
            <span className="service-mini-blob service-mini-blob-c" />
            <span className="service-mini-line service-mini-line-a" />
            <span className="service-mini-line service-mini-line-b" />
          </div>
        </section>

        <InternalPageTemplate
          variant="studio"
          eyebrow={service.eyebrow}
          title={service.title}
          subtitle={service.teaser}
          paragraphs={[
            "Pagina progettata in stile premium per una presentazione ad alto valore percepito.",
            "Contenuto basato sul patrimonio storico isasrl.it e aggiornato con linguaggio commerciale moderno.",
            "UX orientata alla conversione: beneficio immediato, deliverable chiari e call to action sempre visibile.",
          ]}
          image={service.heroImage}
          imageAlt={service.heroAlt}
          mediaSecondaryImage="/site/premium-final/11-monitoring-delivery.jpg"
          mediaSecondaryAlt="Delivery operativa monitorata"
          highlights={service.highlights}
          ctaLabel="Richiedi proposta personalizzata"
          ctaHref="/contatti"
          details={service.deliverables.slice(0, 3).map((item, index) => ({
            title: `Focus ${index + 1}`,
            text: item,
          }))}
        />

        <ExecutiveTrustBand
          eyebrow="Prestazioni e fiducia"
          title="Un servizio costruito per risultati misurabili"
          description="Struttura UX premium da progetto enterprise: contenuti chiari, proof tecnico e onboarding progressivo del cliente."
          points={service.highlights.map((highlight) => ({
            title: highlight,
            text: "Allineamento operativo, governance chiara e supporto costante per aumentare il valore nel tempo.",
          }))}
          primaryCtaLabel="Contatta il team ISA"
          primaryCtaLabelB="Ricevi proposta entro 24 ore"
          primaryCtaHref="/contatti"
          secondaryCtaLabel="Torna al catalogo servizi"
          secondaryCtaLabelB="Confronta altri servizi"
          secondaryCtaHref="/servizi"
        />

        <ServicePageSummary service={service} />
        <PartnersSection />
        <ContactBanner />
      </PremiumRouteShell>
    </SiteFrame>
  );
}
