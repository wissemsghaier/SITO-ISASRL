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

const ordiniPanels = [
  {
    label: "Cofin",
    title: "Gestionale per Ordini e Collegi professionali",
    text: "Contabilita finanziaria, riscossione quote, formazione, albo, praticanti, delibere e terne in un'unica piattaforma.",
    image: "/site/premium-final/08-operations-platform.jpg",
    imageAlt: "Dashboard Cofin per ordini professionali",
  },
  {
    label: "Compliance",
    title: "Import Fatture Elettroniche PA",
    text: "Gestione XML/P7M con registrazioni contabili automatiche e passaggio verso protocollazione e conservazione.",
    image: "/site/premium-final/07-compliance-signature.jpg",
    imageAlt: "Processi documentali e compliance",
  },
  {
    label: "ProteusEvo",
    title: "Protocollo documentale a norma",
    text: "Tracciamento completo delle operazioni e conservazione sostitutiva del registro giornaliero in modalita automatizzata.",
    image: "/site/premium-final/05-control-center.png",
    imageAlt: "Sistema di protocollazione documenti",
  },
];

const ordiniTrust = [
  {
    title: "Copertura funzionale completa",
    text: "Moduli amministrativi, contabili e documentali integrati senza frammentazione operativa.",
  },
  {
    title: "Aderenza normativa",
    text: "Processi progettati per rispettare Art. 48 DPR 97/2003 e regole di protocollazione/conservazione.",
  },
  {
    title: "Integrazione evolutiva",
    text: "Collegamento con ProteusEvo e workflow digitali per continuita e auditabilita.",
  },
];

const cofinModules = [
  "Contabilita Finanziaria conforme all'Art. 48 del DPR n. 97/2003.",
  "Riscossione quote: diretta, ruoli esattoriali, bollettini postali, MAV, SDD ex RID e PagoPA.",
  "Moduli: Patrimoniale, Formazione, Albo, Praticanti, Gestione Rate, Prestiti d'Onore, Delibere e Terne.",
  "Import Fatture Elettroniche PA (xml/p7m) con generazione automatica delle registrazioni contabili.",
  "Albo con gestione STP e export per Anagrafe Tributaria, REGINDE e INI-PEC.",
];

export default function OrdiniProfessionaliPage() {
  return (
    <SiteFrame activePath="/ordini-professionali">
      <PremiumRouteShell
        eyebrow="Ordini e Collegi"
        title="Cofin e ProteusEvo per la gestione professionale"
        description="Contenuti originali di gestionale_ordini.html riportati nel nuovo sito con la stessa base informativa e un'esperienza piu moderna."
        chips={["Cofin", "ProteusEvo", "Contabilita finanziaria", "Conservazione digitale"]}
      >
        <InternalPageTemplate
          variant="studio"
          eyebrow="Ordini e Collegi Professionali"
          title="Gestione amministrativa e protocollazione evoluta"
          subtitle="Una risposta integrata ai problemi gestionali degli Ordini e Collegi professionali."
          paragraphs={[
            "Cofin offre una gestione completa: contabilita finanziaria, quote, albo, formazione e moduli specialistici.",
            "La piattaforma consente import fatture elettroniche PA nel formato xml/p7m con registrazioni contabili automatiche.",
            "ProteusEvo garantisce tracciamento documentale, protocollazione conforme DPCM 3/12/2013 e conservazione a norma.",
          ]}
          image="/site/premium-final/09-kpi-performance.jpg"
          imageAlt="Gestionale ordini professionali"
          mediaSecondaryImage="/site/premium-final/07-compliance-signature.jpg"
          mediaSecondaryAlt="Compliance amministrativa e documentale"
          highlights={["Contabilita finanziaria", "Quote e ruoli", "Protocollo evoluto", "Conservazione digitale"]}
          ctaLabel="Richiedi demo Cofin"
          ctaHref="/contatti"
          details={[
            {
              title: "Gestione quote completa",
              text: "Emissione, incasso e rendicontazione con canali multipli e flussi standardizzati.",
            },
            {
              title: "Workflow documentale",
              text: "Dal protocollo alla conservazione sostitutiva con tracciamento puntuale delle operazioni.",
            },
            {
              title: "Visione integrata",
              text: "Modello unico per processi amministrativi, economici e normativi di ordini/collegi.",
            },
          ]}
        />

        <ExecutiveTrustBand
          eyebrow="Dati legacy verificati"
          title="Le stesse informazioni del sito storico, in formato professionale"
          description="I contenuti principali di gestionale_ordini.html sono stati mantenuti e organizzati per una lettura decisionale piu rapida."
          points={ordiniTrust}
          primaryCtaLabel="Parla con un consulente"
          primaryCtaLabelB="Prenota assessment per Ordini"
          primaryCtaHref="/contatti"
          secondaryCtaLabel="Scarica brochure"
          secondaryCtaLabelB="Apri documentazione tecnica"
          secondaryCtaHref="/ordini-professionali#docs"
        />

        <PremiumSignatureSection
          eyebrow="Prodotti"
          title="Cofin e ProteusEvo"
          description="Suite dedicata alla governance amministrativa, contabile e documentale degli enti professionali."
          panels={ordiniPanels}
        />

        <section className="studio-offer-grid premium-route-section reveal reveal-3 scroll-section">
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <h3>Funzionalita principali Cofin</h3>
            <ul className="resource-links">
              {cofinModules.map((module) => (
                <li key={module}>{module}</li>
              ))}
            </ul>
          </article>
        </section>

        <section id="docs" className="studio-offer-grid premium-route-section reveal reveal-3 scroll-section">
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <h3>Documentazione ufficiale</h3>
            <ul className="resource-links">
              <li>
                <Link href="/documents/DepliantCofin.pdf" target="_blank">Depliant Cofin (PDF)</Link>
              </li>
              <li>
                <Link href="/documents/ProteusEvo.pdf" target="_blank">Brochure ProteusEvo (PDF)</Link>
              </li>
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
