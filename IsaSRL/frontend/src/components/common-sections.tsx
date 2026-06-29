import Image from "next/image";
import Link from "next/link";
import { companyInfo, partners, serviceCards } from "@/lib/site-data";

type SignaturePanel = {
  label: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
};

type PremiumSignatureSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  panels: SignaturePanel[];
};

type ExecutiveTrustItem = {
  title: string;
  text: string;
};

type ExecutiveTrustBandProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: ExecutiveTrustItem[];
  primaryCtaLabel: string;
  primaryCtaLabelB?: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaLabelB?: string;
  secondaryCtaHref?: string;
};

export function ServicesStrip() {
  return (
    <section
      className="service-band premium-route-section reveal reveal-3 scroll-section"
      data-motion="services"
      data-stagger="fast"
      data-distance="12px"
    >
      <div className="service-grid">
        {serviceCards.map((service) => (
          <article key={service.title} className="service-card stagger-item premium-route-stagger">
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <a href="/contatti">Parla con un consulente</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section
      className="partners premium-route-section reveal reveal-2 scroll-section"
      data-motion="partners"
      data-stagger="fast"
      data-distance="11px"
    >
      <div className="section-head">
        <h2>Partner tecnologici ISA</h2>
        <a href="/contatti">Avvia una partnership</a>
      </div>
      <div className="partner-row">
        {partners.map((partner) => (
          <a
            key={partner.name}
            className="partner-item stagger-item premium-route-stagger"
            href={partner.href}
            target="_blank"
            rel="noreferrer"
          >
            <Image src={partner.image} alt={partner.name} width={150} height={52} className="partner-logo" />
            <p>{partner.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export function ContactBanner() {
  return (
    <section
      id="contact"
      className="contact-banner premium-route-section reveal reveal-2 scroll-section"
      data-motion="contact"
      data-stagger="slow"
      data-distance="16px"
    >
      <div>
        <h2>Vuoi accelerare il tuo progetto digitale?</h2>
        <p>
          Confrontati con un consulente ISA e ricevi una proposta concreta sulle tue priorita.
        </p>
      </div>
      <div className="contact-actions">
        <a href={`tel:+39${companyInfo.phone.replace(/\s+/g, "")}`}>{companyInfo.phone}</a>
        <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
        <a href={`mailto:${companyInfo.email}`} className="btn-primary">
          Richiedi una consulenza
        </a>
      </div>
    </section>
  );
}

export function ExecutiveTrustBand({
  eyebrow,
  title,
  description,
  points,
  primaryCtaLabel,
  primaryCtaLabelB,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaLabelB,
  secondaryCtaHref,
}: ExecutiveTrustBandProps) {
  return (
    <section
      className="executive-trust-band premium-route-section reveal reveal-2 scroll-section"
      data-motion="trust"
      data-stagger="slow"
      data-distance="17px"
    >
      <div className="executive-trust-head">
        <p className="signature-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="executive-trust-grid">
        {points.map((point) => (
          <article key={point.title} className="executive-trust-card stagger-item premium-route-stagger">
            <h3>{point.title}</h3>
            <p>{point.text}</p>
          </article>
        ))}
      </div>

      <div className="executive-trust-actions">
        <Link href={primaryCtaHref} className="btn-primary executive-trust-primary">
          <span className="ab-copy-a">{primaryCtaLabel}</span>
          <span className="ab-copy-b">{primaryCtaLabelB || primaryCtaLabel}</span>
        </Link>
        {secondaryCtaLabel && secondaryCtaHref ? (
          <Link href={secondaryCtaHref} className="executive-trust-secondary">
            <span className="ab-copy-a">{secondaryCtaLabel}</span>
            <span className="ab-copy-b">{secondaryCtaLabelB || secondaryCtaLabel}</span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export function PremiumSignatureSection({
  eyebrow,
  title,
  description,
  panels,
}: PremiumSignatureSectionProps) {
  return (
    <section
      className="signature-section premium-route-section reveal reveal-3 scroll-section"
      data-motion="signature"
      data-stagger="slow"
      data-distance="15px"
    >
      <div className="signature-head">
        <p className="signature-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="signature-grid">
        {panels.map((panel) => (
          <article key={panel.title} className="signature-card stagger-item premium-route-stagger">
            <div className="signature-media">
              <Image
                src={panel.image}
                alt={panel.imageAlt}
                width={760}
                height={480}
                className="signature-image"
              />
              <span className="signature-label">{panel.label}</span>
            </div>

            <div className="signature-copy">
              <h3>{panel.title}</h3>
              <p>{panel.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
