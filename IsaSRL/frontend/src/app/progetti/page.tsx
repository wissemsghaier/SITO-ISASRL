import Link from "next/link";
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

const projectPanels = [
  {
    label: "Software",
    title: "Applicazioni su misura per processi reali",
    text: "Sviluppiamo piattaforme che semplificano workflow operativi, amministrativi e commerciali.",
    image: "/site/premium-final/08-operations-platform.jpg",
    imageAlt: "Progetto software personalizzato ISA",
  },
  {
    label: "Cloud",
    title: "Infrastrutture resilienti e scalabili",
    text: "Dalle reti aziendali ai piani di continuita: ogni progetto e pensato per stabilita e crescita.",
    image: "/site/premium-final/04-business-continuity.jpg",
    imageAlt: "Progetto cloud e business continuity",
  },
  {
    label: "Governance",
    title: "Delivery trasparente e KPI condivisi",
    text: "Ogni iniziativa e accompagnata da milestone chiare, metriche leggibili e supporto evolutivo.",
    image: "/site/premium-final/11-monitoring-delivery.jpg",
    imageAlt: "Governance e monitoraggio progetto",
  },
];

const trustPoints = [
  {
    title: "Metodo unificato",
    text: "Dall'analisi al go-live seguiamo un framework operativo replicabile e comprensibile.",
  },
  {
    title: "Team multidisciplinare",
    text: "Coinvolgiamo competenze software, infrastruttura, sicurezza e formazione in un unico percorso.",
  },
  {
    title: "Risultato misurabile",
    text: "Ogni progetto ha indicatori di successo, controlli periodici e piano di ottimizzazione continuo.",
  },
];

const projectCards = [
  {
    title: "Progetto ERP verticale",
    text: "Digitalizzazione di amministrazione, magazzino e documenti con integrazione ai flussi esistenti.",
    href: "/servizi/gestionale-su-misura",
    cta: "Apri il servizio",
  },
  {
    title: "Programma digital trust",
    text: "Attivazione firma digitale, compliance documentale e governance operativa per processi paperless.",
    href: "/servizi/firma-digitale",
    cta: "Scopri firma digitale",
  },
  {
    title: "Piano resilienza IT",
    text: "Backup verificato, runbook di emergenza e ripartenza rapida per proteggere continuita e dati.",
    href: "/servizi/business-continuity",
    cta: "Scopri continuity",
  },
];

export default function ProgettiPage() {
  return (
    <SiteFrame activePath="/progetti">
      <PremiumRouteShell
        eyebrow="Progetti"
        title="Dalla consulenza allo sviluppo: progetti digitali su misura"
        description="Sezione progetti costruita con la stessa struttura narrativa di bssweb.it: valore iniziale, metodo operativo e percorsi di attivazione chiari."
        chips={["Software su misura", "Cloud e continuity", "Governance delivery", "KPI misurabili"]}
      >
        <InternalPageTemplate
          variant="studio"
          eyebrow="Project Delivery"
          title="Soluzioni digitali progettate per impatto reale"
          subtitle="Un approccio end-to-end: assessment, design, implementazione e miglioramento continuo."
          paragraphs={[
            "Ogni progetto parte da obiettivi di business chiari e da un'analisi concreta dei processi interni.",
            "Costruiamo soluzioni software e IT modulari, scalabili e governabili dal team cliente.",
            "Dopo il rilascio continuiamo con monitoraggio KPI, supporto evolutivo e roadmap di ottimizzazione.",
          ]}
          image="/site/premium-final/12-solution-workshop.jpg"
          imageAlt="Workshop di avvio progetto digitale"
          mediaSecondaryImage="/site/premium-final/10-modular-architecture.jpg"
          mediaSecondaryAlt="Architettura modulare dei progetti"
          highlights={[
            "Assessment iniziale",
            "Architettura modulare",
            "Delivery con milestone",
            "Ottimizzazione continua",
          ]}
          ctaLabel="Avvia un progetto con ISA"
          ctaHref="/contatti"
          details={[
            {
              title: "Ricerca e analisi",
              text: "Raccogliamo esigenze, rischi e priorita per impostare un piano realistico.",
            },
            {
              title: "Design e implementazione",
              text: "Sviluppiamo la soluzione con step progressivi e momenti di validazione condivisi.",
            },
            {
              title: "Test e miglioramento",
              text: "Misuriamo risultati, correggiamo deviazioni e consolidiamo la crescita nel tempo.",
            },
          ]}
        />

        <ExecutiveTrustBand
          eyebrow="Metodo"
          title="Tanti servizi, un solo metodo operativo"
          description="Lo stesso schema che applichiamo ai progetti enterprise: chiarezza decisionale, ownership e controllo avanzamento."
          points={trustPoints}
          primaryCtaLabel="Parla con il team progetti"
          primaryCtaLabelB="Richiedi kickoff progetto"
          primaryCtaHref="/contatti"
          secondaryCtaLabel="Esplora i servizi"
          secondaryCtaLabelB="Confronta le soluzioni"
          secondaryCtaHref="/servizi"
        />

        <PremiumSignatureSection
          eyebrow="Project focus"
          title="Tre direttrici per i progetti ISA"
          description="Software, infrastruttura e governance in un'unica regia per accelerare i risultati."
          panels={projectPanels}
        />

        <section className="studio-offer-grid premium-route-section reveal reveal-3 scroll-section">
          {projectCards.map((card) => (
            <article key={card.title} className="studio-offer-card stagger-item premium-route-stagger">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <Link href={card.href}>{card.cta}</Link>
            </article>
          ))}
        </section>

        <ServicesStrip />
        <PartnersSection />
        <ContactBanner />
      </PremiumRouteShell>
    </SiteFrame>
  );
}
