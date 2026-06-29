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
        variant="studio"
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
        mediaSecondaryImage="/site/logo_big.png"
        mediaSecondaryAlt="Legal governance ISA"
        highlights={[
          "GDPR ready",
          "Cookie governance",
          "Data protection",
          "Trasparenza utenti",
        ]}
        ctaLabel="Contatta il team privacy"
        ctaHref="/contatti"
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
        <article className="stagger-item">
          <h3>Informativa Clienti</h3>
          <p>Documento dedicato alle informative per clienti e gestione dei dati contrattuali.</p>
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
          <p>Politiche e controlli pensati per bilanciare compliance normativa e operativita aziendale.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">User Trust</p>
          <h3>Transparent Communication</h3>
          <p>Documentazione chiara e accessibile per rafforzare fiducia e accountability digitale.</p>
        </article>
      </section>

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
