import Image from "next/image";
import { companyInfo, partners, serviceCards } from "@/lib/site-data";

export function ServicesStrip() {
  return (
    <section className="service-band reveal reveal-3 scroll-section">
      <div className="service-grid">
        {serviceCards.map((service) => (
          <article key={service.title} className="service-card stagger-item">
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <a href="/contatti">Scopri di piu</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section className="partners reveal reveal-2 scroll-section">
      <div className="section-head">
        <h2>I nostri partner</h2>
        <a href="/contatti">Diventa partner tecnologico</a>
      </div>
      <div className="partner-row">
        {partners.map((partner) => (
          <a
            key={partner.name}
            className="partner-item stagger-item"
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
    <section id="contact" className="contact-banner reveal reveal-2 scroll-section">
      <div>
        <h2>Pronto a far crescere la tua azienda?</h2>
        <p>
          Parla con un consulente ISA e scopri la soluzione piu adatta alle tue esigenze.
        </p>
      </div>
      <div className="contact-actions">
        <a href={`tel:+39${companyInfo.phone.replace(/\s+/g, "")}`}>{companyInfo.phone}</a>
        <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
        <a href={`mailto:${companyInfo.email}`} className="btn-primary">
          Richiedi una consulenza gratuita
        </a>
      </div>
    </section>
  );
}
