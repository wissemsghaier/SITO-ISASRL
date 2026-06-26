import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

export default function WhistleblowingPage() {
  return (
    <SiteFrame activePath="/whistleblowing">
      <InternalPageTemplate
        eyebrow="Compliance"
        title="Whistleblowing e tutela delle segnalazioni"
        subtitle="Canale riservato e protetto per segnalare illeciti, frodi e rischi aziendali."
        paragraphs={[
          "Il whistleblowing consente di segnalare in modo sicuro violazioni di leggi e regolamenti.",
          "La normativa D.Lgs. 24/2023 richiede canali interni conformi per aziende e organizzazioni.",
          "La tutela e estesa a dipendenti, collaboratori, professionisti, azionisti e amministratori.",
        ]}
        image="/site/whistleblowing_img.jpg"
        imageAlt="Sicurezza e compliance aziendale"
        details={[
          {
            title: "Canale protetto",
            text: "Segnalazioni riservate con accesso controllato e gestione conforme.",
          },
          {
            title: "Riduzione rischio",
            text: "Prevenzione di frodi e comportamenti non conformi con processi tracciabili.",
          },
          {
            title: "Conformita normativa",
            text: "Supporto operativo per adeguamento alle direttive europee e italiane.",
          },
        ]}
      />
      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
