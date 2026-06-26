import Link from "next/link";
import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
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

export default function PrivacyPage() {
  return (
    <SiteFrame activePath="/privacy">
      <InternalPageTemplate
        eyebrow="Legal"
        title="Privacy e Cookie Policy"
        subtitle="Documentazione legale aggiornata per clienti, partner e visitatori del sito."
        paragraphs={[
          "La tutela dei dati personali e un pilastro centrale dei servizi ISA.",
          "Le informazioni raccolte vengono trattate in conformita al Regolamento UE 2016/679 (GDPR).",
          "Di seguito puoi scaricare i documenti completi su privacy e cookie policy.",
        ]}
        image="/site/GettyImages-693472268.jpg"
        imageAlt="Documentazione privacy e compliance"
        details={policyHighlights}
      />

      <section className="policy-docs reveal reveal-2 scroll-section">
        <article className="stagger-item">
          <h3>Informativa Privacy</h3>
          <p>Documento completo sul trattamento dei dati personali e sui diritti dell&apos;interessato.</p>
          <Link href="/documents/Informativa_privacy.pdf" target="_blank">
            Scarica PDF
          </Link>
        </article>
        <article className="stagger-item">
          <h3>Informativa Cookie</h3>
          <p>Dettagli su cookie tecnici, analitici e preferenze di navigazione del sito.</p>
          <Link href="/documents/Informativa_cookie.pdf" target="_blank">
            Scarica PDF
          </Link>
        </article>
      </section>

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
