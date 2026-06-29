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
        eyebrow="Managed Support"
        title="Assistenza mission-critical multi-canale"
        subtitle="Un modello operativo premium che unisce presa in carico rapida, intervento remoto e continuita dei servizi." 
        paragraphs={[
          "Help desk specialistico al numero 0932 252022 con triage tecnico strutturato e prioritizzazione immediata.",
          "Intervento remoto sicuro con strumenti professionali per ridurre downtime e accelerare il ripristino operativo.",
          "Governance ticket end-to-end con reportistica, trasferimento competenze e miglioramento continuo.",
        ]}
        image="/site/assistenza.jpg"
        imageAlt="Assistenza tecnica professionale"
        mediaSecondaryImage="/site/monitor.jpg"
        mediaSecondaryAlt="Postazione supporto remoto"
        highlights={["Help desk dedicato", "Remote operations", "Ticket governance", "SLA enterprise"]}
        ctaLabel="Attiva il supporto premium"
        ctaHref="/contatti"
        details={[
          {
            title: "Triage tecnico immediato",
            text: "Classificazione istantanea delle criticita per indirizzare la soluzione migliore in tempi ridotti.",
          },
          {
            title: "Remote intervention",
            text: "Accesso sicuro, tracciabile e conforme per interventi rapidi su software, rete e sistemi.",
          },
          {
            title: "Service intelligence",
            text: "Ogni attivita viene documentata per costruire un patrimonio operativo riutilizzabile dal team interno.",
          },
        ]}
      />

      <PremiumSignatureSection
        eyebrow="Supporto premium"
        title="Esperienza assistenza riprogettata"
        description="Una regia visiva moderna per comunicare affidabilita tecnica, velocita e presidio operativo continuo."
        panels={assistanceVisuals}
      />

      <section className="studio-kpi-band reveal reveal-3 scroll-section">
        <article className="studio-kpi-card stagger-item">
          <h3>Response accelera</h3>
          <p>Presa in carico rapida con workflow di priorita per contenere l&apos;impatto sul business.</p>
        </article>
        <article className="studio-kpi-card stagger-item">
          <h3>Presidio continuo</h3>
          <p>Canale tecnico sempre attivo con escalation guidata e coordinamento con i referenti aziendali.</p>
        </article>
        <article className="studio-kpi-card stagger-item">
          <h3>Competence transfer</h3>
          <p>Formazione operativa per aumentare autonomia, resilienza e maturita digitale del team interno.</p>
        </article>
      </section>

      <section className="studio-offer-grid reveal reveal-3 scroll-section">
        <article className="studio-offer-card stagger-item">
          <h3>Strumenti di assistenza remota</h3>
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
          <p className="ultra-kicker">Service Excellence</p>
          <h3>Operational SLA</h3>
          <p>Gestione priorita, escalation e tempi di risposta con modello operativo trasparente.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Support Intelligence</p>
          <h3>Knowledge Transfer</h3>
          <p>Ogni intervento produce know-how condiviso per ridurre dipendenze e downtime futuro.</p>
        </article>
      </section>

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
