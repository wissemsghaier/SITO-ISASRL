import Image from "next/image";
import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
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

export default function ServiziPage() {
  return (
    <SiteFrame activePath="/servizi">
      <InternalPageTemplate
        variant="studio"
        eyebrow="Servizi"
        title="Hardware, software e infrastrutture"
        subtitle="Soluzioni integrate per ottimizzare processi, sicurezza e produttivita."
        paragraphs={[
          "Fornitura e personalizzazione software gestionale per piccole e medie imprese.",
          "Progettazione reti LAN/WiFi, server dimensionati e soluzioni cloud di backup.",
          "Supporto su fatturazione elettronica, continuita operativa e sicurezza informatica.",
        ]}
        image="/site/HOME.jpg"
        imageAlt="Panoramica servizi ICT"
        mediaSecondaryImage="/site/soluzioni-ict.jpg"
        mediaSecondaryAlt="Architettura servizi ICT"
        highlights={["ERP e workflow", "Cloud architecture", "Security operations", "MEPA e PA"]}
        ctaLabel="Parla con un consulente"
        ctaHref="/contatti"
        details={[
          {
            title: "Fatturazione elettronica",
            text: "Processi digitali completi con firma, conservazione e interscambio integrato.",
          },
          {
            title: "Business continuity",
            text: "Strategie di backup, disaster recovery e controllo della disponibilita servizi.",
          },
          {
            title: "Sistemi e reti",
            text: "Infrastrutture affidabili, monitoraggio e supporto evolutivo su misura.",
          },
        ]}
      />

      <section className="studio-offer-grid reveal reveal-3 scroll-section">
        <article className="studio-offer-card stagger-item">
          <Image src="/site/fatel.jpg" alt="Fatturazione elettronica" width={640} height={360} className="studio-offer-image" />
          <h3>Finance & Compliance</h3>
          <p>Flussi digitali end-to-end per amministrazione, firma e conservazione.</p>
        </article>
        <article className="studio-offer-card stagger-item">
          <Image src="/site/backup.jpg" alt="Backup e continuita" width={640} height={360} className="studio-offer-image" />
          <h3>Business Continuity</h3>
          <p>Policy di backup e recovery per mantenere i servizi operativi senza interruzioni.</p>
        </article>
        <article className="studio-offer-card stagger-item">
          <Image src="/site/mepa.png" alt="MEPA e forniture" width={640} height={360} className="studio-offer-image" />
          <h3>Public & Education</h3>
          <p>Progetti MEPA e ambienti didattici con supporto tecnico e onboarding completo.</p>
        </article>
        <article className="studio-offer-card stagger-item">
          <Image src="/site/LIM.jpg" alt="Tecnologie didattiche" width={640} height={360} className="studio-offer-image" />
          <h3>Smart Workspaces</h3>
          <p>Spazi digitali intelligenti con integrazione hardware, rete e piattaforme software.</p>
        </article>
      </section>

      <section className="ultra-premium-band reveal reveal-3 scroll-section">
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Solution Architecture</p>
          <h3>Composable Services</h3>
          <p>Componenti modulari per creare stack tecnologici robusti, scalabili e governabili.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Business Impact</p>
          <h3>Measurable Performance</h3>
          <p>Approccio KPI-driven con monitoraggio continuo di produttivita, rischio e marginalita.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Client Journey</p>
          <h3>Adoption by Design</h3>
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
