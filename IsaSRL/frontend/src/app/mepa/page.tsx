import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

export default function MepaPage() {
  return (
    <SiteFrame activePath="/mepa">
      <InternalPageTemplate
        eyebrow="MEPA"
        title="Acquisti in rete PA e tecnologia didattica"
        subtitle="Fornitore accreditato con soluzioni per scuole, enti e pubblica amministrazione."
        paragraphs={[
          "Esperienza consolidata in forniture su rete MEPA con attenzione all'innovazione didattica.",
          "Monitor interattivi, aule immersive e ambienti digitali con installazione certificata.",
          "Progettazione reti internet e fornitura software educational per ecosistemi formativi moderni.",
        ]}
        image="/site/mepa.png"
        imageAlt="Forniture tecnologiche per scuola e pubblica amministrazione"
        details={[
          {
            title: "Aule informatiche",
            text: "Progettazione completa con impianti a norma e integrazione tecnologica scalabile.",
          },
          {
            title: "Reti internet",
            text: "LAN e WiFi ad alta affidabilita per garantire connettivita continua.",
          },
          {
            title: "Software educational",
            text: "Fornitura certificata e supporto per piattaforme digitali e licenze educative.",
          },
        ]}
      />
      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
