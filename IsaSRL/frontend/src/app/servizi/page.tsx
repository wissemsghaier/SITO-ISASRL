import Image from "next/image";
import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

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

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
