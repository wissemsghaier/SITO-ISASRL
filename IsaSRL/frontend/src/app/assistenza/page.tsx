import {
  ContactBanner,
  PartnersSection,
  PremiumSignatureSection,
  ServicesStrip,
} from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

const assistanceVisuals = [
  {
    label: "Remote Ops",
    title: "Control center assistenza",
    text: "Monitoraggio live delle richieste con priorita e tempi di intervento tracciati.",
    image: "/site/monitor.jpg",
    imageAlt: "Control center assistenza",
  },
  {
    label: "Rapid Support",
    title: "Supporto tecnico specialistico",
    text: "Assistenza remota con procedure guidate, escalation e riduzione dei fermi operativi.",
    image: "/site/assistenza.jpg",
    imageAlt: "Tecnico in attivita di assistenza",
  },
  {
    label: "Continuity",
    title: "Protezione continuita business",
    text: "Approccio proattivo per mantenere processi critici sempre disponibili e affidabili.",
    image: "/site/backup.jpg",
    imageAlt: "Strategia di continuita operativa",
  },
];

export default function AssistenzaPage() {
  return (
    <SiteFrame activePath="/assistenza">
      <InternalPageTemplate
        variant="studio"
        eyebrow="Assistenza Operativa"
        title="Assistenza tecnica continua, da remoto e sul campo"
        subtitle="Un presidio unico per incidere su tempi di risposta, continuita operativa e serenita del tuo team." 
        paragraphs={[
          "Help desk specialistico al numero 0932 252022 con triage immediato e prioritizzazione delle urgenze.",
          "Intervento remoto sicuro con strumenti professionali per ridurre fermi operativi e tempi di ripartenza.",
          "Gestione ticket end-to-end con report chiari, passaggio di competenze e miglioramento continuo.",
        ]}
        image="/site/assistenza.jpg"
        imageAlt="Assistenza tecnica professionale"
        mediaSecondaryImage="/site/monitor.jpg"
        mediaSecondaryAlt="Postazione supporto remoto"
        highlights={["Help desk dedicato", "Intervento remoto", "Governance ticket", "SLA chiari"]}
        ctaLabel="Richiedi supporto immediato"
        ctaHref="/contatti"
        details={[
          {
            title: "Presa in carico rapida",
            text: "Classificazione istantanea delle criticita per assegnare priorita e specialisti in tempi ridotti.",
          },
          {
            title: "Intervento remoto sicuro",
            text: "Accesso tracciabile e conforme per risolvere rapidamente criticita su software, rete e sistemi.",
          },
          {
            title: "Conoscenza che resta in azienda",
            text: "Ogni attivita viene documentata per creare procedure riutilizzabili dal tuo team interno.",
          },
        ]}
      />

      <PremiumSignatureSection
        eyebrow="Supporto specializzato"
        title="Un modello assistenza progettato per continuita"
        description="Comunicazione chiara, responsabilita definite e una regia tecnica orientata ai risultati operativi."
        panels={assistanceVisuals}
      />

      <section className="studio-kpi-band reveal reveal-3 scroll-section">
        <article className="studio-kpi-card stagger-item">
          <h3>Risposta rapida</h3>
          <p>Presa in carico veloce con workflow di priorita per contenere l&apos;impatto sul business.</p>
        </article>
        <article className="studio-kpi-card stagger-item">
          <h3>Presidio continuo</h3>
          <p>Canale tecnico sempre attivo con escalation guidata e coordinamento con i referenti aziendali.</p>
        </article>
        <article className="studio-kpi-card stagger-item">
          <h3>Trasferimento competenze</h3>
          <p>Affianchiamo il team interno per aumentare autonomia, resilienza e capacita di gestione quotidiana.</p>
        </article>
      </section>

      <section className="studio-offer-grid reveal reveal-3 scroll-section">
        <article className="studio-offer-card stagger-item">
          <h3>Strumenti di assistenza remota</h3>
          <p>Canali ufficiali per attivare il supporto in modo rapido e sicuro.</p>
          <ul className="resource-links">
            <li>
              <a href="https://anydesk.it/download?os=win" target="_blank" rel="noreferrer">
                Download AnyDesk
              </a>
            </li>
            <li>
              <a href="/downloads/Supremo_ISAsrl.exe" target="_blank" rel="noreferrer">
                Download Supremo ISA
              </a>
            </li>
            <li>
              <a href="https://logins.livecare.net/liveletexecustom/2Q5CT3D5CIP23I9P" target="_blank" rel="noreferrer">
                Accesso Live Care
              </a>
            </li>
            <li>
              <a href="https://www.isasrl.it/FILES/LiveLet.exe" target="_blank" rel="noreferrer">
                Download LiveLet (legacy)
              </a>
            </li>
          </ul>
        </article>
        <article className="studio-offer-card stagger-item">
          <h3>Documentazione interventi</h3>
          <p>Materiale contrattuale e percorsi di contatto per richiedere supporto personalizzato.</p>
          <ul className="resource-links">
            <li>
              <a href="/documents/Contratto_Intervento_remoto.pdf" target="_blank" rel="noreferrer">
                Contratto intervento remoto (PDF)
              </a>
            </li>
            <li>
              <a href="/contatti">
                Richiedi supporto tecnico personalizzato
              </a>
            </li>
          </ul>
        </article>
      </section>

      <section className="ultra-premium-band reveal reveal-3 scroll-section">
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Qualita del servizio</p>
          <h3>SLA operativi trasparenti</h3>
          <p>Priorita, escalation e tempi di risposta monitorati con un modello operativo condiviso.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Intelligenza operativa</p>
          <h3>Know-how condiviso</h3>
          <p>Ogni intervento genera conoscenza utile per ridurre dipendenze e prevenire fermi futuri.</p>
        </article>
      </section>

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
