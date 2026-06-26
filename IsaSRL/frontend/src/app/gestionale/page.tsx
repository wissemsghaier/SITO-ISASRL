import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

export default function GestionalePage() {
  return (
    <SiteFrame activePath="/gestionale">
      <InternalPageTemplate
        eyebrow="Gestionale"
        title="Gestionale aziendale e ordini professionali"
        subtitle="Verticalizzazioni Zucchetti per PMI, cooperative e ordini professionali."
        paragraphs={[
          "Adhoc Revolution: contabilità, documenti, magazzino, produzione e forza vendita.",
          "Cofin: gestione integrata per Ordini e Collegi professionali con moduli specialistici.",
          "ProteusEvo: protocollazione documentale e tracciamento conforme alle normative vigenti.",
        ]}
        image="/site/monitor.jpg"
        imageAlt="Piattaforma gestionale professionale"
        details={[
          {
            title: "Adhoc Revolution",
            text: "Personalizzazioni per cooperative agricole, produzione, officine e logistica.",
          },
          {
            title: "Cofin",
            text: "Contabilita finanziaria, riscossione quote e gestione amministrativa avanzata.",
          },
          {
            title: "ProteusEvo",
            text: "Protocollo evoluto con conservazione sostitutiva e piena tracciabilita dei documenti.",
          },
        ]}
      />
      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
