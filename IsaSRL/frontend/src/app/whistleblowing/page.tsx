import {
  ContactBanner,
  ExecutiveTrustBand,
  PartnersSection,
  PremiumSignatureSection,
  ServicesStrip,
} from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { PremiumRouteShell } from "@/components/premium-route-shell";
import { SiteFrame } from "@/components/site-frame";

const whistleVisuals = [
  {
    label: "Protected Channel",
    title: "Segnalazioni in ambiente sicuro",
    text: "Infrastruttura riservata per proteggere identita, contenuti e percorso di gestione.",
    image: "/site/premium-final/05-control-center.png",
    imageAlt: "Canale whistleblowing sicuro",
  },
  {
    label: "Governance",
    title: "Processo auditabile end-to-end",
    text: "Ruoli, tempi e stati della segnalazione con tracciabilita e compliance normativa.",
    image: "/site/premium-final/11-monitoring-delivery.jpg",
    imageAlt: "Governance processo whistleblowing",
  },
  {
    label: "Risk Radar",
    title: "Prevenzione proattiva del rischio",
    text: "Analisi tempestiva dei segnali critici per ridurre impatti legali e reputazionali.",
    image: "/site/premium-final/09-kpi-performance.jpg",
    imageAlt: "Monitoraggio rischio reputazionale",
  },
];

const whistleTrustPoints = [
  {
    title: "Canali protetti by design",
    text: "Configurazione tecnica e procedurale per garantire riservatezza durante tutto il ciclo della segnalazione.",
  },
  {
    title: "Processo tracciato e auditabile",
    text: "Ogni passaggio viene monitorato con regole di governance chiare per compliance e accountability.",
  },
  {
    title: "Supporto operativo continuativo",
    text: "Affianchiamo il team interno su policy, ruoli e formazione per una gestione stabile nel tempo.",
  },
];

export default function WhistleblowingPage() {
  return (
    <SiteFrame activePath="/whistleblowing">
      <PremiumRouteShell
        eyebrow="Integrita e Compliance"
        title="Whistleblowing executive per protezione reale e governance continua"
        description="Stessa sostanza normativa, ma con un'esperienza piu chiara: fiducia, controllo operativo e call to action immediata per attivare il percorso."
        chips={[
          "D.Lgs. 24/2023",
          "Canale riservato",
          "Protection by design",
          "Risk governance",
        ]}
      >
        <InternalPageTemplate
          variant="studio"
          eyebrow="Integrita e Compliance"
          title="Whistleblowing sicuro per organizzazioni responsabili"
          subtitle="Canale riservato, governance strutturata e tutela effettiva dei segnalanti in linea con la normativa vigente."
          paragraphs={[
            "Il whistleblowing abilita segnalazioni sicure su illeciti, frodi e violazioni regolamentari.",
            "Il D.Lgs. 24/2023 richiede canali interni conformi, tracciabili e protetti.",
            "La tutela riguarda dipendenti, collaboratori, professionisti, azionisti e organi amministrativi.",
          ]}
          image="/site/premium-final/05-control-center.png"
          imageAlt="Sicurezza e compliance aziendale"
          mediaSecondaryImage="/site/premium-final/11-monitoring-delivery.jpg"
          mediaSecondaryAlt="Segnalazioni protette"
          highlights={[
            "D.Lgs. 24/2023",
            "Canale riservato",
            "Protection by design",
            "Risk governance",
          ]}
          ctaLabel="Richiedi consulenza whistleblowing"
          ctaHref="/contatti"
          details={[
            {
              title: "Canale protetto",
              text: "Segnalazioni riservate con accesso controllato, tracciabilita e gestione conforme.",
            },
            {
              title: "Riduzione del rischio",
              text: "Prevenzione proattiva di frodi e condotte non conformi con processi auditabili.",
            },
            {
              title: "Conformita normativa",
              text: "Supporto operativo per allineare policy, ruoli e workflow alle direttive europee e italiane.",
            },
          ]}
        />

        <ExecutiveTrustBand
          eyebrow="Compliance trust"
          title="Un canale che protegge persone, brand e organizzazione"
          description="Polish UX orientato alla conversione: valore normativo comprensibile, prova di affidabilita e invito all'azione diretto."
          points={whistleTrustPoints}
          primaryCtaLabel="Attiva il canale whistleblowing"
          primaryCtaLabelB="Richiedi setup canale conforme"
          primaryCtaHref="/contatti"
          secondaryCtaLabel="Consulta la privacy policy"
          secondaryCtaLabelB="Verifica policy e tutele"
          secondaryCtaHref="/privacy"
        />

        <PremiumSignatureSection
          eyebrow="Compliance operativa"
          title="Whistleblowing con linguaggio chiaro e autorevole"
          description="Una struttura pensata per comunicare responsabilita normativa, protezione dei segnalanti e gestione moderna del rischio."
          panels={whistleVisuals}
        />

        <section className="studio-kpi-band premium-route-section reveal reveal-3 scroll-section">
          <article className="studio-kpi-card stagger-item premium-route-stagger">
            <h3>Analisi preliminare</h3>
            <p>Valutazione dei gap normativi e disegno del modello organizzativo interno.</p>
          </article>
          <article className="studio-kpi-card stagger-item premium-route-stagger">
            <h3>Canale operativo</h3>
            <p>Attivazione del processo di raccolta, istruttoria e gestione escalation.</p>
          </article>
          <article className="studio-kpi-card stagger-item premium-route-stagger">
            <h3>Formazione e controllo</h3>
            <p>Formazione dedicata e monitoraggio continuo dei livelli di conformita.</p>
          </article>
        </section>

        <section className="ultra-premium-band premium-route-section reveal reveal-3 scroll-section">
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Regulatory design</p>
            <h3>Architettura compliance</h3>
            <p>Canali, ruoli e procedure modellati per auditabilita e protezione delle parti coinvolte.</p>
          </article>
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Risk intelligence</p>
            <h3>Monitoraggio proattivo</h3>
            <p>Approccio preventivo per intercettare segnali deboli e ridurre esposizione reputazionale.</p>
          </article>
        </section>

        <ServicesStrip />
        <PartnersSection />
        <ContactBanner />
      </PremiumRouteShell>
    </SiteFrame>
  );
}
