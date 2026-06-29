import Image from "next/image";
import {
  ContactBanner,
  PartnersSection,
  PremiumSignatureSection,
  ServicesStrip,
} from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

const fatelFeatures = [
  "Gestione volumi elevati di fatture emesse e ricevute.",
  "Firma, invio e conservazione con flusso operativo semplificato.",
  "Gestione spesometro e liquidazioni IVA.",
  "Integrazione nativa con gestionali Zucchetti e connettori per terze parti.",
];

const backupFeatures = [
  "Backup giornaliero automatico e verificato.",
  "Server cloud sempre pronto per scenari di emergenza.",
  "Ripartenza operativa da qualsiasi postazione connessa a internet.",
  "Archiviazione certificata per continuita e compliance documentale.",
];

const serviceVisuals = [
  {
    label: "Architecture",
    title: "Stack tecnologico modulare",
    text: "Progettiamo servizi componibili per scalabilita, sicurezza e governance nel tempo.",
    image: "/site/soluzioni-ict.jpg",
    imageAlt: "Architettura stack tecnologico",
  },
  {
    label: "Execution",
    title: "Delivery operativa",
    text: "Implementazione end-to-end con roadmap, onboarding e misurazione dei risultati.",
    image: "/site/HOME.jpg",
    imageAlt: "Delivery operativa dei servizi",
  },
  {
    label: "Performance",
    title: "Servizi orientati al ROI",
    text: "Ogni servizio e allineato agli obiettivi business con KPI chiari e monitoraggio continuo.",
    image: "/site/GettyImages-693472268.jpg",
    imageAlt: "Performance e crescita aziendale",
  },
];

export default function ServiziPage() {
  return (
    <SiteFrame activePath="/servizi">
      <InternalPageTemplate
        variant="studio"
        eyebrow="Soluzioni Integrate"
        title="Servizi digitali per crescere con metodo e continuita"
        subtitle="Dalla strategia alla delivery: costruiamo ecosistemi tecnologici che migliorano controllo, produttivita e resilienza."
        paragraphs={[
          "Progettiamo soluzioni software e infrastrutture allineate agli obiettivi reali del tuo business.",
          "Implementiamo reti LAN/WiFi, server e cloud con un approccio orientato a performance, sicurezza e scalabilita.",
          "Ti accompagniamo su fatturazione elettronica, business continuity e cybersecurity con governance misurabile.",
        ]}
        image="/site/HOME.jpg"
        imageAlt="Panoramica servizi ICT"
        mediaSecondaryImage="/site/soluzioni-ict.jpg"
        mediaSecondaryAlt="Architettura servizi ICT"
        highlights={["Architettura business", "Workflow automatizzati", "Security by design", "Governance delivery"]}
        ctaLabel="Prenota una consulenza servizi"
        ctaHref="/contatti"
        details={[
          {
            title: "Workflow amministrativo",
            text: "Ciclo documentale digitale con firma, conservazione e interscambio integrati in un unico flusso.",
          },
          {
            title: "Framework di continuita",
            text: "Strategie di backup e disaster recovery per garantire disponibilita e tempi di ripartenza rapidi.",
          },
          {
            title: "Sistemi e rete",
            text: "Infrastrutture affidabili con monitoraggio continuo e supporto evolutivo su misura.",
          },
        ]}
      />

      <PremiumSignatureSection
        eyebrow="Design dei servizi"
        title="Una piattaforma servizi costruita sul valore"
        description="Dal concept alla delivery, raccontiamo metodo, affidabilita e risultati con un linguaggio chiaro e autorevole."
        panels={serviceVisuals}
      />

      <section className="studio-offer-grid reveal reveal-3 scroll-section">
        <article className="studio-offer-card stagger-item">
          <Image src="/site/fatel.jpg" alt="Fatturazione elettronica" width={640} height={360} className="studio-offer-image" />
          <h3>Amministrazione e Compliance</h3>
          <p>Flussi digitali end-to-end per fatture, firma, conservazione e controllo documentale.</p>
        </article>
        <article className="studio-offer-card stagger-item">
          <Image src="/site/backup.jpg" alt="Backup e continuita" width={640} height={360} className="studio-offer-image" />
          <h3>Continuita Operativa</h3>
          <p>Policy di backup e recovery per mantenere servizi e dati sempre disponibili.</p>
        </article>
        <article className="studio-offer-card stagger-item">
          <Image src="/site/mepa.png" alt="MEPA e forniture" width={640} height={360} className="studio-offer-image" />
          <h3>Pubblica Amministrazione e Scuola</h3>
          <p>Progetti MEPA e ambienti didattici con supporto tecnico e onboarding completo.</p>
        </article>
        <article className="studio-offer-card stagger-item">
          <Image src="/site/LIM.jpg" alt="Tecnologie didattiche" width={640} height={360} className="studio-offer-image" />
          <h3>Workspace Intelligenti</h3>
          <p>Spazi digitali evoluti con integrazione hardware, rete e piattaforme software.</p>
        </article>
      </section>

      <section className="ultra-premium-band reveal reveal-3 scroll-section">
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Architettura Soluzioni</p>
          <h3>Servizi modulari e componibili</h3>
          <p>Componenti flessibili per creare stack tecnologici robusti, scalabili e semplici da governare.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Impatto sul Business</p>
          <h3>Performance misurabili</h3>
          <p>Approccio KPI-driven con monitoraggio continuo di produttivita, rischio e marginalita.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Percorso Cliente</p>
          <h3>Adozione guidata</h3>
          <p>Onboarding strutturato e supporto evolutivo per accelerare adozione e risultati operativi.</p>
        </article>
      </section>

      <section className="studio-offer-grid reveal reveal-3 scroll-section">
        <article className="studio-offer-card stagger-item">
          <h3>Fatel: fatturazione elettronica</h3>
          <p>
            Dalla storica pagina servizi_fatel: una piattaforma completa per digitalizzare
            il ciclo attivo/passivo e collegarlo al gestionale aziendale.
          </p>
          <ul className="resource-links">
            {fatelFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </article>

        <article className="studio-offer-card stagger-item">
          <h3>Business continuity e backup</h3>
          <p>
            Dalla storica pagina servizi_backup: protezione dati e continuita operativa
            anche in caso di incidente infrastrutturale.
          </p>
          <ul className="resource-links">
            {backupFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </article>
      </section>

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
