import Image from "next/image";
import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

export default function GestionalePage() {
  return (
    <SiteFrame activePath="/gestionale">
      <InternalPageTemplate
        variant="studio"
        eyebrow="Gestionale"
        title="Gestionale aziendale e ordini professionali"
        subtitle="Suite evolute per PMI, studi professionali e organizzazioni complesse."
        paragraphs={[
          "Adhoc Revolution integra contabilita, documenti, magazzino, produzione e forza vendita in un'unica piattaforma.",
          "Cofin digitalizza Ordini e Collegi professionali con moduli verticali, workflow approvativi e controllo economico.",
          "ProteusEvo abilita protocollazione, tracciabilita e conservazione a norma per processi amministrativi affidabili.",
        ]}
        image="/site/gestionali.jpg"
        imageAlt="Dashboard gestionale professionale"
        mediaSecondaryImage="/site/gestionali1.jpg"
        mediaSecondaryAlt="Visuale processi aziendali"
        highlights={[
          "ERP modulare",
          "Workflow automation",
          "Controllo KPI",
          "Conformita amministrativa",
        ]}
        ctaLabel="Richiedi assessment"
        ctaHref="/contatti"
        details={[
          {
            title: "Adhoc Revolution",
            text: "Personalizzazioni per cooperative, produzione, officine, commercio e logistica multi-sede.",
          },
          {
            title: "Cofin",
            text: "Contabilita finanziaria, quote, incassi e gestione amministrativa avanzata per enti professionali.",
          },
          {
            title: "ProteusEvo",
            text: "Protocollo evoluto con conservazione sostitutiva e piena tracciabilita dei documenti.",
          },
        ]}
      />

      <section className="studio-offer-grid reveal reveal-3 scroll-section">
        <article className="studio-offer-card stagger-item">
          <Image src="/site/gestionali1.jpg" alt="ERP operations" width={640} height={360} className="studio-offer-image" />
          <h3>Operations Hub</h3>
          <p>Controllo centralizzato di ordini, magazzino e marginalita in tempo reale.</p>
        </article>
        <article className="studio-offer-card stagger-item">
          <Image src="/site/gestionali3.jpg" alt="Professional backoffice" width={640} height={360} className="studio-offer-image" />
          <h3>Professional Backoffice</h3>
          <p>Automazione pratiche, scadenze e rendicontazione per enti e studi professionali.</p>
        </article>
        <article className="studio-offer-card stagger-item">
          <Image src="/site/monitor.jpg" alt="Analytics cockpit" width={640} height={360} className="studio-offer-image" />
          <h3>Analytics Cockpit</h3>
          <p>Indicatori decisionali e reporting manageriale per guidare la crescita aziendale.</p>
        </article>
        <article className="studio-offer-card stagger-item">
          <Image src="/site/aula-informatica1.jpg" alt="Digital transformation" width={640} height={360} className="studio-offer-image" />
          <h3>Transformation Program</h3>
          <p>Roadmap su misura con training e governance operativa del cambiamento.</p>
        </article>
      </section>

      <section className="ultra-premium-band reveal reveal-3 scroll-section">
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Process Governance</p>
          <h3>Decision Control Layer</h3>
          <p>Strumenti di governo per monitorare performance operative e priorita manageriali.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Organizational Upgrade</p>
          <h3>Adoption Framework</h3>
          <p>Metodologia di adozione con supporto ai team, riduzione attrito e misurazione ROI.</p>
        </article>
      </section>

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
