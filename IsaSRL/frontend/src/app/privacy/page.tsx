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

const policyHighlights = [
  {
    title: "Trasparenza",
    text: "Informiamo in modo chiaro su finalita, tempi e basi giuridiche del trattamento dati.",
  },
  {
    title: "Sicurezza",
    text: "Applichiamo misure tecniche e organizzative per proteggere integrita e riservatezza.",
  },
  {
    title: "Diritti interessati",
    text: "Garantiamo accesso, rettifica, cancellazione e opposizione nei termini previsti dal GDPR.",
  },
];

const privacyVisuals = [
  {
    label: "Data Trust",
    title: "Governance dati strutturata",
    text: "Processi, ruoli e controlli per trattamenti conformi, verificabili e continuativi.",
    image: "/site/premium-final/10-modular-architecture.jpg",
    imageAlt: "Governance data protection",
  },
  {
    label: "Compliance Flow",
    title: "Policy sempre aggiornate",
    text: "Documentazione legale mantenuta con approccio operativo e accountability trasparente.",
    image: "/site/premium-final/11-monitoring-delivery.jpg",
    imageAlt: "Monitoraggio compliance",
  },
  {
    label: "User Clarity",
    title: "Informative accessibili",
    text: "Un framework comunicativo chiaro per utenti, clienti e partner aziendali.",
    image: "/site/premium-final/12-solution-workshop.jpg",
    imageAlt: "Chiarezza informativa privacy",
  },
];

const privacyTrustPoints = [
  {
    title: "Documentazione sempre consultabile",
    text: "Policy e informative centralizzate per facilitare accesso ai contenuti legali e ridurre ambiguita.",
  },
  {
    title: "Accountability operativa",
    text: "Ruoli e controlli definiti per mantenere coerenza tra processi interni e requisiti normativi.",
  },
  {
    title: "Esperienza utente trasparente",
    text: "Linguaggio semplice e CTA chiare per accompagnare utenti e clienti nelle richieste privacy.",
  },
];

export default function PrivacyPage() {
  return (
    <SiteFrame activePath="/privacy">
      <PremiumRouteShell
        eyebrow="Privacy e Fiducia"
        title="Privacy design executive per trasparenza e controllo reale"
        description="Conserviamo tutti i contenuti storici ma con una struttura premium: lettura piu fluida, fiducia immediata e conversione verso il contatto legale."
        chips={[
          "Governance GDPR",
          "Policy trasparenti",
          "Protezione dati",
          "Fiducia utente",
        ]}
      >
        <InternalPageTemplate
          variant="studio"
          eyebrow="Privacy e Fiducia"
          title="Protezione dati con regole chiare e responsabilita reali"
          subtitle="Una sezione pensata per spiegare in modo semplice come gestiamo i dati di utenti, clienti e partner."
          paragraphs={[
            "La protezione dei dati personali e parte integrante del nostro modo di lavorare.",
            "I trattamenti sono gestiti in conformita al Regolamento UE 2016/679 (GDPR) e alla normativa applicabile.",
            "Qui trovi documenti ufficiali aggiornati, consultabili e scaricabili in ogni momento.",
          ]}
          image="/site/premium-final/10-modular-architecture.jpg"
          imageAlt="Documentazione privacy e compliance"
          mediaSecondaryImage="/site/premium-final/12-solution-workshop.jpg"
          mediaSecondaryAlt="Legal governance ISA"
          highlights={[
            "Governance GDPR",
            "Policy trasparenti",
            "Protezione dati",
            "Fiducia utente",
          ]}
          ctaLabel="Contatta il team privacy"
          ctaHref="/contatti"
          details={policyHighlights}
        />

        <ExecutiveTrustBand
          eyebrow="Policy trust"
          title="Informative chiare per rafforzare la fiducia digitale"
          description="Sistema di conversione con ritmo editoriale uniforme: contesto legale chiaro, prove di affidabilita e accesso diretto al supporto."
          points={privacyTrustPoints}
          primaryCtaLabel="Parla con il team privacy"
          primaryCtaLabelB="Contatta subito il referente privacy"
          primaryCtaHref="/contatti"
          secondaryCtaLabel="Apri i documenti ufficiali"
          secondaryCtaLabelB="Consulta policy e documenti"
          secondaryCtaHref="/privacy#policy-docs"
        />

        <PremiumSignatureSection
          eyebrow="Architettura privacy"
          title="Legal design orientato a chiarezza e controllo"
          description="Una presentazione pensata per rendere accessibili documenti, diritti e responsabilita senza complessita inutili."
          panels={privacyVisuals}
        />

        <section id="policy-docs" className="policy-docs premium-route-section reveal reveal-2 scroll-section">
          <article className="stagger-item premium-route-stagger">
            <h3>Informativa Privacy</h3>
            <p>Quadro completo su finalita, basi giuridiche, tempi di conservazione e diritti dell&apos;interessato.</p>
            <Link href="/documents/Informativa_privacy.pdf" target="_blank">
              Apri documento PDF
            </Link>
          </article>
          <article className="stagger-item premium-route-stagger">
            <h3>Informativa Cookie</h3>
            <p>Dettagli su cookie tecnici, analitici e gestione preferenze per una navigazione trasparente.</p>
            <Link href="/documents/Informativa_cookie.pdf" target="_blank">
              Apri documento PDF
            </Link>
          </article>
          <article className="stagger-item premium-route-stagger">
            <h3>Informativa Clienti</h3>
            <p>Policy dedicata alla gestione dei dati contrattuali e alla relazione cliente-fornitore.</p>
            <Link href="/documents/Informativaclienti.pdf" target="_blank">
              Apri documento PDF
            </Link>
          </article>
          <article className="stagger-item premium-route-stagger">
            <h3>Informativa Clienti (versione storica)</h3>
            <p>Archivio documento legacy mantenuto per continuita informativa.</p>
            <Link href="/documents/Informativaclienti_old.pdf" target="_blank">
              Apri documento storico
            </Link>
          </article>
        </section>

        <section className="ultra-premium-band premium-route-section reveal reveal-3 scroll-section">
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Governance dati</p>
            <h3>Trattamenti responsabili</h3>
            <p>Politiche e controlli che bilanciano conformita normativa, rischio operativo e continuita del business.</p>
          </article>
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Fiducia utente</p>
            <h3>Comunicazione trasparente</h3>
            <p>Documentazione chiara, accessibile e verificabile per consolidare fiducia e accountability digitale.</p>
          </article>
        </section>

        <ServicesStrip />
        <PartnersSection />
        <ContactBanner />
      </PremiumRouteShell>
    </SiteFrame>
  );
}
