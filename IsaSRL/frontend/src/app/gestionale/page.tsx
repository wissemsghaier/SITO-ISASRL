import Image from "next/image";
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

const verticalizations = [
  "Forza vendita su tablet con sincronizzazione al sistema centrale.",
  "Tentata vendita con DDT, fatture, incassi e gestione lotti.",
  "Picking merci con supporto evasione ordini e inventario.",
  "Cooperative agricole: conferimenti, liquidazione soci e quaderno di campagna.",
  "Produzione serre, legnami, fitofarmaci, mangimifici, oleifici e sementi elette.",
  "Officine meccaniche con gestione commesse e pianificazione manutenzioni.",
];

const cofinModules = [
  "Contabilita finanziaria conforme all'art. 48 DPR 97/2003.",
  "Riscossione quote: diretta, ruoli, bollettini, MAV, SDD ex RID e PagoPA.",
  "Moduli Albo, Praticanti, Patrimoniale, Formazione, Delibere e Terne.",
  "Import fatture elettroniche PA (xml/p7m) con registrazione contabile automatica.",
  "Integrazione con protocollazione ProteusEvo e conservazione sostitutiva a norma.",
];

const gestionaleVisuals = [
  {
    label: "ERP Command",
    title: "Governance dei processi core",
    text: "Dashboard e flussi integrati per presidiare ordini, documenti, produzione e contabilita.",
    image: "/site/premium-final/08-operations-platform.jpg",
    imageAlt: "Dashboard ERP e processi aziendali",
  },
  {
    label: "Professional Boards",
    title: "Ordini e Collegi digitali",
    text: "Cofin e ProteusEvo per workflow amministrativi evoluti e piena tracciabilita normativa.",
    image: "/site/premium-final/07-compliance-signature.jpg",
    imageAlt: "Backoffice ordini professionali",
  },
  {
    label: "Strategic Control",
    title: "Decisioni basate su dati",
    text: "Indicatori operativi in tempo reale per accelerare efficienza e crescita.",
    image: "/site/premium-final/09-kpi-performance.jpg",
    imageAlt: "Cockpit analitico gestionale",
  },
];

const gestionaleTrustPoints = [
  {
    title: "Mappa processi e ownership",
    text: "Ogni modulo e collegato a responsabilita chiare per ridurre attrito operativo e tempi morti.",
  },
  {
    title: "Controllo KPI in tempo reale",
    text: "Cruscotti leggibili per guidare decisioni rapide su vendite, margini e carichi di lavoro.",
  },
  {
    title: "Adozione assistita dei team",
    text: "Formazione e supporto continuo per trasformare il gestionale in vantaggio competitivo stabile.",
  },
];

export default function GestionalePage() {
  return (
    <SiteFrame activePath="/gestionale">
      <PremiumRouteShell
        eyebrow="Gestione Aziendale"
        title="Piattaforme gestionali executive per decisioni piu veloci"
        description="Manteniamo la sostanza storica dei contenuti ma con un ritmo premium: proof di competenza, visual coerenti e CTA orientate al risultato."
        chips={[
          "ERP intelligence",
          "Workflow automation",
          "KPI in tempo reale",
          "Compliance by design",
        ]}
      >
        <InternalPageTemplate
          variant="studio"
          eyebrow="Gestione Aziendale"
          title="Piattaforme gestionali per decidere meglio e crescere"
          subtitle="Soluzioni complete per PMI, enti professionali e organizzazioni che richiedono controllo, tracciabilita e visione."
          paragraphs={[
            "Adhoc Revolution unifica contabilita, documenti, produzione e forza vendita in una control room operativa.",
            "Cofin digitalizza Ordini e Collegi con moduli verticali, workflow approvativi e controllo economico in tempo reale.",
            "ProteusEvo abilita protocollazione, tracciabilita e conservazione a norma per processi amministrativi robusti.",
          ]}
          image="/site/premium-final/08-operations-platform.jpg"
          imageAlt="Dashboard gestionale professionale"
          mediaSecondaryImage="/site/premium-final/09-kpi-performance.jpg"
          mediaSecondaryAlt="Visuale processi aziendali"
          highlights={[
            "ERP intelligence",
            "Workflow automation",
            "KPI in tempo reale",
            "Compliance by design",
          ]}
          ctaLabel="Richiedi assessment gestionale"
          ctaHref="/contatti"
          details={[
            {
              title: "ERP verticale",
              text: "Personalizzazioni per cooperative, produzione, officine, commercio e logistica multi-sede.",
            },
            {
              title: "Cofin platform",
              text: "Contabilita finanziaria, quote, incassi e gestione amministrativa avanzata per enti professionali.",
            },
            {
              title: "Digital protocol",
              text: "Protocollo evoluto con conservazione sostitutiva e piena tracciabilita dei documenti.",
            },
          ]}
        />

        <ExecutiveTrustBand
          eyebrow="Trust architecture"
          title="Controllo gestionale che genera fiducia operativa"
          description="Gerarchia UX orientata alla conversione: valore percepito immediato, prova tecnica e invito all'azione sempre presente."
          points={gestionaleTrustPoints}
          primaryCtaLabel="Parla con un consulente gestionale"
          primaryCtaLabelB="Prenota audit gestionale executive"
          primaryCtaHref="/contatti"
          secondaryCtaLabel="Scopri i servizi ISA"
          secondaryCtaLabelB="Confronta i servizi core"
          secondaryCtaHref="/servizi"
        />

        <PremiumSignatureSection
          eyebrow="Intelligenza operativa"
          title="Gestionale raccontato con taglio pratico e decisionale"
          description="Un linguaggio pensato per evidenziare controllo dei processi, affidabilita operativa e capacita di crescita."
          panels={gestionaleVisuals}
        />

        <section className="studio-offer-grid premium-route-section reveal reveal-3 scroll-section">
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/08-operations-platform.jpg" alt="ERP operations" width={640} height={360} className="studio-offer-image" />
            <h3>Hub Operativo</h3>
            <p>Controllo centralizzato di ordini, magazzino e marginalita in tempo reale.</p>
          </article>
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/07-compliance-signature.jpg" alt="Professional backoffice" width={640} height={360} className="studio-offer-image" />
            <h3>Backoffice Professionale</h3>
            <p>Automazione pratiche, scadenze e rendicontazione per enti e studi professionali.</p>
          </article>
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/09-kpi-performance.jpg" alt="Analytics cockpit" width={640} height={360} className="studio-offer-image" />
            <h3>Cockpit Analitico</h3>
            <p>Indicatori decisionali e reporting manageriale per guidare la crescita aziendale.</p>
          </article>
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/12-solution-workshop.jpg" alt="Digital transformation" width={640} height={360} className="studio-offer-image" />
            <h3>Programma di Trasformazione</h3>
            <p>Roadmap su misura con training e governance operativa del cambiamento.</p>
          </article>
        </section>

        <section className="ultra-premium-band premium-route-section reveal reveal-3 scroll-section">
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Governance processi</p>
            <h3>Controllo decisionale</h3>
            <p>Strumenti di governo per monitorare performance operative e priorita manageriali.</p>
          </article>
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Evoluzione organizzativa</p>
            <h3>Framework di adozione</h3>
            <p>Metodologia di adozione con supporto ai team, riduzione attrito e misurazione ROI.</p>
          </article>
        </section>

        <section className="studio-offer-grid premium-route-section reveal reveal-3 scroll-section">
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <h3>Verticalizzazioni Adhoc Revolution</h3>
            <p>
              Dalla storica pagina gestionale_azienda: esperienza consolidata in contesti
              produttivi, logistici e professionali ad alta specializzazione.
            </p>
            <ul className="resource-links">
              {verticalizations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="studio-offer-card stagger-item premium-route-stagger">
            <h3>Cofin e ProteusEvo per Ordini e Collegi</h3>
            <p>
              Dalla storica pagina gestionale_ordini: moduli integrati per governance
              amministrativa, contabile e documentale degli enti professionali.
            </p>
            <ul className="resource-links">
              {cofinModules.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>
                <a href="/documents/DepliantCofin.pdf" target="_blank" rel="noreferrer">
                  Scarica depliant Cofin (PDF)
                </a>
              </li>
              <li>
                <a href="/documents/ProteusEvo.pdf" target="_blank" rel="noreferrer">
                  Scarica brochure ProteusEvo (PDF)
                </a>
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
