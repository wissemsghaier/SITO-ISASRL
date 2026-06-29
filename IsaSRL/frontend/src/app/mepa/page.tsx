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

const mepaVisuals = [
  {
    label: "Education Tech",
    title: "Aule immersive e laboratori digitali",
    text: "Spazi didattici di nuova generazione con hardware, software e metodologia operativa integrata.",
    image: "/site/premium-final/02-education-lab.jpg",
    imageAlt: "Aula informatica avanzata",
  },
  {
    label: "Public Delivery",
    title: "Forniture PA ad alta affidabilita",
    text: "Processi di fornitura tracciati dalla gara alla messa in esercizio con presidio tecnico costante.",
    image: "/site/premium-final/11-monitoring-delivery.jpg",
    imageAlt: "Progetto fornitura MEPA",
  },
  {
    label: "Future Learning",
    title: "Ambienti formativi performanti",
    text: "Connettivita, monitor interattivi e supporto post attivazione per continuita didattica.",
    image: "/site/premium-final/03-digital-workspace.jpg",
    imageAlt: "Monitor interattivi in classe",
  },
];

const mepaTrustPoints = [
  {
    title: "Filiera delivery controllata",
    text: "Dalla gara all'attivazione con milestone tracciate e responsabilita operative sempre visibili.",
  },
  {
    title: "Presetup per ambienti education",
    text: "Configurazioni tecniche validate prima della consegna per accelerare l'adozione in aula.",
  },
  {
    title: "Supporto post avvio",
    text: "Affianchiamo scuole e uffici pubblici con assistenza strutturata dopo il go-live.",
  },
];

export default function MepaPage() {
  return (
    <SiteFrame activePath="/mepa">
      <PremiumRouteShell
        eyebrow="PA e Education"
        title="Progetti MEPA con governance premium e risultati misurabili"
        description="Un percorso unificato per scuole e pubblica amministrazione: visual chiari, execution controllata e supporto continuo dal procurement al post-attivazione."
        chips={[
          "Fornitore qualificato",
          "Ambienti education",
          "Reti affidabili",
          "Supporto post delivery",
        ]}
      >
        <InternalPageTemplate
          variant="studio"
          eyebrow="PA e Education"
          title="Progetti MEPA per scuola e pubblica amministrazione"
          subtitle="Qualita tecnica, esecuzione controllata e supporto continuativo per ambienti didattici e uffici pubblici."
          paragraphs={[
            "Gestiamo forniture MEPA con metodologia strutturata, governance documentale e presidio tecnico dedicato.",
            "Realizziamo aule immersive, laboratori digitali e ambienti collaborativi con installazione certificata.",
            "Progettiamo reti e piattaforme educational per garantire continuita didattica, stabilita e performance.",
          ]}
          image="/site/premium-final/02-education-lab.jpg"
          imageAlt="Forniture tecnologiche per scuola e pubblica amministrazione"
          mediaSecondaryImage="/site/premium-final/08-operations-platform.jpg"
          mediaSecondaryAlt="Aula digitale con dispositivi"
          highlights={[
            "Fornitore qualificato",
            "Ambienti education",
            "Reti affidabili",
            "Supporto post delivery",
          ]}
          ctaLabel="Parla con il team MEPA"
          ctaHref="/contatti"
          details={[
            {
              title: "Digital classroom design",
              text: "Progettazione completa con impianti a norma e integrazione scalabile dei dispositivi.",
            },
            {
              title: "Connectivity assurance",
              text: "LAN e WiFi ad alta affidabilita per garantire connessione stabile in ogni area didattica.",
            },
            {
              title: "Educational platforms",
              text: "Fornitura certificata di software e licenze con supporto operativo per docenti e staff tecnico.",
            },
          ]}
        />

        <ExecutiveTrustBand
          eyebrow="Proof of execution"
          title="Affidabilita operativa per progetti pubblici"
          description="Struttura conversion-oriented: credibilita tecnica, chiarezza decisionale e call to action sempre leggibili."
          points={mepaTrustPoints}
          primaryCtaLabel="Prenota una call MEPA"
          primaryCtaLabelB="Attiva assessment MEPA rapido"
          primaryCtaHref="/contatti"
          secondaryCtaLabel="Scopri i servizi integrati"
          secondaryCtaLabelB="Esplora stack servizi PA"
          secondaryCtaHref="/servizi"
        />

        <PremiumSignatureSection
          eyebrow="Innovazione pubblica"
          title="MEPA con focus su impatto, affidabilita e continuita"
          description="Una narrazione che valorizza competenze tecniche, governance del progetto e risultati concreti sul territorio."
          panels={mepaVisuals}
        />

        <section className="studio-offer-grid premium-route-section reveal reveal-3 scroll-section">
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/02-education-lab.jpg" alt="Aula informatica" width={640} height={360} className="studio-offer-image" />
            <h3>Aule digitali</h3>
            <p>Allestimenti completi con dispositivi, cablaggio e configurazione operativa.</p>
          </article>
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/03-digital-workspace.jpg" alt="Lavagna interattiva" width={640} height={360} className="studio-offer-image" />
            <h3>Didattica interattiva</h3>
            <p>Monitor touch e strumenti collaborativi per didattica moderna e coinvolgente.</p>
          </article>
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/12-solution-workshop.jpg" alt="Carta docente" width={640} height={360} className="studio-offer-image" />
            <h3>Allineamento fondi</h3>
            <p>Supporto su strumenti di acquisto e programmi dedicati al settore education.</p>
          </article>
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/11-monitoring-delivery.jpg" alt="Monitor professionali" width={640} height={360} className="studio-offer-image" />
            <h3>Delivery gestita</h3>
            <p>Coordinamento end-to-end dalla gara alla messa in esercizio delle soluzioni.</p>
          </article>
        </section>

        <section className="ultra-premium-band premium-route-section reveal reveal-3 scroll-section">
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Procurement pubblico</p>
            <h3>Affidabilita di processo</h3>
            <p>Governance dell&apos;intero ciclo di fornitura con controllo documentale e tecnico.</p>
          </article>
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Design education</p>
            <h3>Spazi didattici evoluti</h3>
            <p>Ambienti didattici progettati per collaborazione, interazione e continuita operativa.</p>
          </article>
        </section>

        <ServicesStrip />
        <PartnersSection />
        <ContactBanner />
      </PremiumRouteShell>
    </SiteFrame>
  );
}
