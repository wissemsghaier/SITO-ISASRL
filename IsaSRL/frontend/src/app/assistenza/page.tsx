import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

export default function AssistenzaPage() {
  return (
    <SiteFrame activePath="/assistenza">
      <InternalPageTemplate
        variant="studio"
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
        mediaSecondaryImage="/site/monitor.jpg"
        mediaSecondaryAlt="Postazione supporto remoto"
        highlights={["Supporto diretto", "Intervento remoto", "Ticketing evoluto", "SLA trasparenti"]}
        ctaLabel="Richiedi assistenza"
        ctaHref="/contatti"
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

      <section className="studio-kpi-band reveal reveal-3 scroll-section">
        <article className="studio-kpi-card stagger-item">
          <h3>Diagnosi in tempi brevi</h3>
          <p>Classificazione priorita e piano di azione con presa in carico strutturata.</p>
        </article>
        <article className="studio-kpi-card stagger-item">
          <h3>Canale tecnico continuo</h3>
          <p>Monitoraggio alert, escalation e allineamento con i responsabili di reparto.</p>
        </article>
        <article className="studio-kpi-card stagger-item">
          <h3>Trasferimento competenze</h3>
          <p>Sessioni operative per rendere il team interno piu autonomo e resiliente.</p>
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
