import Image from "next/image";
import {
  ContactBanner,
  PartnersSection,
  PremiumSignatureSection,
  ServicesStrip,
} from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { PremiumRouteShell } from "@/components/premium-route-shell";
import { SiteFrame } from "@/components/site-frame";

const fatelFeatures = [
  "Gestione volumi elevati di fatture emesse e ricevute.",
  "Firma, invio e conservazione con flusso operativo semplificato.",
  "Gestione spesometro e liquidazioni IVA.",
  "Integrazione nativa con gestionali Zucchetti e connettori per terze parti.",
];

const backupFeatures = [
  "Backup giornaliero automatico e verificato.",
  "Server cloud sempre pronto per scenari di emergenza.",
  "Ripartenza operativa da qualsiasi postazione connessa a internet.",
  "Archiviazione certificata per continuita e compliance documentale.",
];

const serviceVisuals = [
  {
    label: "Architecture",
    title: "Architettura operativa modulare",
    text: "Disegniamo servizi componibili che mantengono chiarezza su flussi, ownership e sicurezza.",
    image: "/site/premium-final/10-modular-architecture.jpg",
    imageAlt: "Architettura operativa dei servizi",
  },
  {
    label: "Execution",
    title: "Delivery guidata per step",
    text: "Roadmap, onboarding e controllo avanzamento con uno schema leggibile da business e IT.",
    image: "/site/premium-final/11-monitoring-delivery.jpg",
    imageAlt: "Delivery guidata dei servizi digitali",
  },
  {
    label: "Performance",
    title: "KPI leggibili e misurabili",
    text: "Ogni servizio e legato a indicatori chiari per aiutare decisioni rapide e miglioramento continuo.",
    image: "/site/premium-final/09-kpi-performance.jpg",
    imageAlt: "Analisi KPI e performance aziendale",
  },
];

export default function ServiziPage() {
  return (
    <SiteFrame activePath="/servizi">
      <PremiumRouteShell
        eyebrow="Servizi Premium"
        title="Una direzione visiva chiara per servizi complessi"
        description="Stesso significato, immagini diverse e struttura piu leggibile: ogni blocco spiega in modo immediato cosa facciamo e quale risultato ottiene il cliente."
        chips={["Messaggi chiari", "Visual coerenti", "Animazioni fluide", "Focus sui risultati"]}
      >
        <InternalPageTemplate
          variant="studio"
          eyebrow="Soluzioni Integrate"
          title="Servizi digitali per crescere con metodo e continuita"
          subtitle="Dalla strategia alla delivery: costruiamo ecosistemi tecnologici chiari, robusti e semplici da governare."
          paragraphs={[
            "Progettiamo soluzioni software e infrastrutture allineate agli obiettivi reali del tuo business.",
            "Implementiamo reti LAN/WiFi, server e cloud con un approccio orientato a performance, sicurezza e scalabilita.",
            "Ti accompagniamo su fatturazione elettronica, business continuity e cybersecurity con governance misurabile.",
          ]}
          image="/site/premium-final/08-operations-platform.jpg"
          imageAlt="Panoramica servizi ICT con dashboard"
          mediaSecondaryImage="/site/premium-final/10-modular-architecture.jpg"
          mediaSecondaryAlt="Architettura servizi ICT"
          highlights={["Architettura business", "Workflow automatizzati", "Security by design", "Governance delivery"]}
          ctaLabel="Prenota una consulenza servizi"
          ctaHref="/contatti"
          details={[
            {
              title: "Workflow amministrativo",
              text: "Ciclo documentale digitale con firma, conservazione e interscambio integrati in un unico flusso.",
            },
            {
              title: "Framework di continuita",
              text: "Strategie di backup e disaster recovery per garantire disponibilita e tempi di ripartenza rapidi.",
            },
            {
              title: "Sistemi e rete",
              text: "Infrastrutture affidabili con monitoraggio continuo e supporto evolutivo su misura.",
            },
          ]}
        />

        <PremiumSignatureSection
          eyebrow="Design dei servizi"
          title="Una piattaforma servizi costruita sul valore"
          description="Dal concept alla delivery, raccontiamo metodo, affidabilita e risultati con un linguaggio chiaro e autorevole."
          panels={serviceVisuals}
        />

        <section className="studio-offer-grid premium-route-section reveal reveal-3 scroll-section">
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/07-compliance-signature.jpg" alt="Fatturazione e firma elettronica" width={640} height={360} className="studio-offer-image" />
            <h3>Amministrazione e Compliance</h3>
            <p>Flussi digitali end-to-end per fatture, firma, conservazione e controllo documentale.</p>
          </article>
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/04-business-continuity.jpg" alt="Monitoraggio continuita operativa" width={640} height={360} className="studio-offer-image" />
            <h3>Continuita Operativa</h3>
            <p>Policy di backup e recovery per mantenere servizi e dati sempre disponibili.</p>
          </article>
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/02-education-lab.jpg" alt="Ambienti digitali per scuola e PA" width={640} height={360} className="studio-offer-image" />
            <h3>Pubblica Amministrazione e Scuola</h3>
            <p>Progetti MEPA e ambienti didattici con supporto tecnico e onboarding completo.</p>
          </article>
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/03-digital-workspace.jpg" alt="Workspace intelligenti con tecnologia integrata" width={640} height={360} className="studio-offer-image" />
            <h3>Workspace Intelligenti</h3>
            <p>Spazi digitali evoluti con integrazione hardware, rete e piattaforme software.</p>
          </article>
        </section>

        <section className="ultra-premium-band premium-route-section reveal reveal-3 scroll-section">
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Architettura Soluzioni</p>
            <h3>Servizi modulari e componibili</h3>
            <p>Componenti flessibili per creare stack tecnologici robusti, scalabili e semplici da governare.</p>
          </article>
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Impatto sul Business</p>
            <h3>Performance misurabili</h3>
            <p>Approccio KPI-driven con monitoraggio continuo di produttivita, rischio e marginalita.</p>
          </article>
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Percorso Cliente</p>
            <h3>Adozione guidata</h3>
            <p>Onboarding strutturato e supporto evolutivo per accelerare adozione e risultati operativi.</p>
          </article>
        </section>

        <section className="studio-offer-grid premium-route-section reveal reveal-3 scroll-section">
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <h3>Fatel: fatturazione elettronica</h3>
            <p>
              Dalla storica pagina servizi_fatel: una piattaforma completa per digitalizzare
              il ciclo attivo/passivo e collegarlo al gestionale aziendale.
            </p>
            <ul className="resource-links">
              {fatelFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className="studio-offer-card stagger-item premium-route-stagger">
            <h3>Business continuity e backup</h3>
            <p>
              Dalla storica pagina servizi_backup: protezione dati e continuita operativa
              anche in caso di incidente infrastrutturale.
            </p>
            <ul className="resource-links">
              {backupFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        </section>

        <ServicesStrip />
        <PartnersSection />
        <ContactBanner />
      </PremiumRouteShell>
    </SiteFrame>
  );
}
