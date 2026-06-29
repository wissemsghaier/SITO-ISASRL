import Link from "next/link";
import {
  ContactBanner,
  PartnersSection,
  PremiumSignatureSection,
  ServicesStrip,
} from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
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
    image: "/site/whistleblowing_img.jpg",
    imageAlt: "Governance data protection",
  },
  {
    label: "Compliance Flow",
    title: "Policy sempre aggiornate",
    text: "Documentazione legale mantenuta con approccio operativo e accountability trasparente.",
    image: "/site/monitor.jpg",
    imageAlt: "Monitoraggio compliance",
  },
  {
    label: "User Clarity",
    title: "Informative accessibili",
    text: "Un framework comunicativo chiaro per utenti, clienti e partner aziendali.",
    image: "/site/logo_big.png",
    imageAlt: "Chiarezza informativa privacy",
  },
];

export default function PrivacyPage() {
  return (
    <SiteFrame activePath="/privacy">
      <InternalPageTemplate
        variant="studio"
        eyebrow="Trust & Legal"
        title="Privacy governance e trasparenza normativa"
        subtitle="Un framework legale moderno per tutelare utenti, clienti e partner con chiarezza e responsabilita."
        paragraphs={[
          "La protezione dei dati personali e parte integrante della nostra proposta di valore.",
          "I trattamenti sono gestiti in conformita al Regolamento UE 2016/679 (GDPR) e alle norme applicabili.",
          "In questa sezione trovi la documentazione ufficiale in formato aggiornato e consultabile.",
        ]}
        image="/site/GettyImages-693472268.jpg"
        imageAlt="Documentazione privacy e compliance"
        mediaSecondaryImage="/site/logo_big.png"
        mediaSecondaryAlt="Legal governance ISA"
        highlights={[
          "GDPR governance",
          "Policy clarity",
          "Data protection",
          "User trust",
        ]}
        ctaLabel="Contatta il team compliance"
        ctaHref="/contatti"
        details={policyHighlights}
      />

      <PremiumSignatureSection
        eyebrow="Privacy architecture"
        title="Legal design con estetica premium"
        description="La sezione privacy evolve in un ecosistema visivo piu autorevole, con enfasi su trasparenza, controllo e fiducia."
        panels={privacyVisuals}
      />

      <section className="policy-docs reveal reveal-2 scroll-section">
        <article className="stagger-item">
          <h3>Informativa Privacy</h3>
          <p>Quadro completo su finalita, basi giuridiche, tempi di conservazione e diritti dell&apos;interessato.</p>
          <Link href="/documents/Informativa_privacy.pdf" target="_blank">
            Scarica PDF
          </Link>
        </article>
        <article className="stagger-item">
          <h3>Informativa Cookie</h3>
          <p>Dettagli su cookie tecnici, analitici e gestione preferenze per una navigazione trasparente.</p>
          <Link href="/documents/Informativa_cookie.pdf" target="_blank">
            Scarica PDF
          </Link>
        </article>
        <article className="stagger-item">
          <h3>Informativa Clienti</h3>
          <p>Policy dedicata alla gestione dei dati contrattuali e alla relazione cliente-fornitore.</p>
          <Link href="/documents/Informativaclienti.pdf" target="_blank">
            Scarica PDF
          </Link>
        </article>
        <article className="stagger-item">
          <h3>Informativa Clienti (versione storica)</h3>
          <p>Archivio documento legacy mantenuto per continuita informativa.</p>
          <Link href="/documents/Informativaclienti_old.pdf" target="_blank">
            Scarica PDF storico
          </Link>
        </article>
      </section>

      <section className="ultra-premium-band reveal reveal-3 scroll-section">
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Data Governance</p>
          <h3>Responsible Processing</h3>
          <p>Politiche e controlli che bilanciano conformita normativa, rischio operativo e continuita del business.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">User Trust</p>
          <h3>Transparent Communication</h3>
          <p>Documentazione chiara, accessibile e verificabile per consolidare fiducia e accountability digitale.</p>
        </article>
      </section>

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
