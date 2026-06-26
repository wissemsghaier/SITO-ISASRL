import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

export default function ServiziPage() {
  return (
    <SiteFrame activePath="/servizi">
      <InternalPageTemplate
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
      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
