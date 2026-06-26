import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

export default function AssistenzaPage() {
  return (
    <SiteFrame activePath="/assistenza">
      <InternalPageTemplate
        eyebrow="Supporto Tecnico"
        title="Assistenza telefonica e remota"
        subtitle="Supporto operativo rapido via telefono e intervento remoto specializzato."
        paragraphs={[
          "Servizio di assistenza telefonica dedicata al numero 0932 252022 con risposta professionale.",
          "Intervento remoto con strumenti affidabili come Supremo, Live Care e AnyDesk.",
          "Gestione guidata dei ticket e supporto continuo per software, rete e infrastrutture aziendali.",
        ]}
        image="/site/assistenza.jpg"
        imageAlt="Assistenza tecnica professionale"
        details={[
          {
            title: "Supporto telefonico",
            text: "Team esperto per diagnostica rapida e orientamento immediato alla soluzione.",
          },
          {
            title: "Assistenza remota",
            text: "Accesso sicuro e tracciabile al sistema per ridurre i tempi di fermo operativo.",
          },
          {
            title: "Intervento documentato",
            text: "Procedure strutturate, report di attivita e approccio orientato alla continuita.",
          },
        ]}
      />
      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
