import Image from "next/image";
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

export function ServicesStrip() {
  return (
    <section className="service-band premium-route-section reveal reveal-3 scroll-section">
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
    <section className="partners premium-route-section reveal reveal-2 scroll-section">
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
    <section id="contact" className="contact-banner premium-route-section reveal reveal-2 scroll-section">
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

export function PremiumSignatureSection({
  eyebrow,
  title,
  description,
  panels,
}: PremiumSignatureSectionProps) {
  return (
    <section className="signature-section premium-route-section reveal reveal-3 scroll-section">
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
