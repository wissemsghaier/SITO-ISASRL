import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

export default function WhistleblowingPage() {
  return (
    <SiteFrame activePath="/whistleblowing">
      <InternalPageTemplate
        variant="studio"
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
        mediaSecondaryImage="/site/whistleblowing_mini.jpg"
        mediaSecondaryAlt="Segnalazioni protette"
        highlights={[
          "D.Lgs. 24/2023",
          "Canale riservato",
          "Anonimato protetto",
          "Risk governance",
        ]}
        ctaLabel="Parla con un consulente compliance"
        ctaHref="/contatti"
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

      <section className="studio-kpi-band reveal reveal-3 scroll-section">
        <article className="studio-kpi-card stagger-item">
          <h3>Analisi preliminare</h3>
          <p>Valutazione gap normativi e disegno del modello organizzativo interno.</p>
        </article>
        <article className="studio-kpi-card stagger-item">
          <h3>Canale operativo</h3>
          <p>Attivazione processo di raccolta, istruttoria e gestione escalation.</p>
        </article>
        <article className="studio-kpi-card stagger-item">
          <h3>Formazione e controllo</h3>
          <p>Training dedicato e monitoraggio continuo dei livelli di conformita.</p>
        </article>
      </section>

      <section className="ultra-premium-band reveal reveal-3 scroll-section">
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Regulatory Design</p>
          <h3>Compliance Architecture</h3>
          <p>Canali, ruoli e procedure modellati per auditabilita e protezione delle parti coinvolte.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Risk Intelligence</p>
          <h3>Proactive Monitoring</h3>
          <p>Approccio preventivo per intercettare segnali deboli e ridurre esposizione reputazionale.</p>
        </article>
      </section>

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
