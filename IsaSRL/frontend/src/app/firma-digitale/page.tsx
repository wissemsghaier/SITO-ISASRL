import Image from "next/image";
import {
  ContactBanner,
  PartnersSection,
  PremiumSignatureSection,
  ServicesStrip,
} from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

const signatureVisuals = [
  {
    label: "Legal Value",
    title: "Firma con validita piena",
    text: "Processi digitali affidabili con garanzia di autenticita, integrita e non ripudio.",
    image: "/site/firma-elettronica-blu.jpg",
    imageAlt: "Firma digitale con validita legale",
  },
  {
    label: "Paperless Flow",
    title: "Workflow documentale smart",
    text: "Dalla firma alla conservazione, un percorso paperless semplice da adottare e governare.",
    image: "/site/firma-digitale-mini.png",
    imageAlt: "Workflow paperless",
  },
  {
    label: "Trust Desk",
    title: "Supporto operativo continuo",
    text: "Assistenza su rinnovi, policy e integrazioni per una gestione documentale senza attriti.",
    image: "/site/logo_big.png",
    imageAlt: "Supporto trust desk",
  },
];

export default function FirmaDigitalePage() {
  return (
    <SiteFrame activePath="/firma-digitale">
      <InternalPageTemplate
        variant="studio"
        eyebrow="Digital Trust"
        title="Firma digitale e grafometrica per processi enterprise"
        subtitle="Più velocita operativa, meno carta e pieno valore legale in ogni fase del ciclo documentale." 
        paragraphs={[
          "ISA e partner accreditato Namirial ed Edatalia per soluzioni di firma affidabili e conformi.",
          "Riduci tempi approvativi, errori manuali e costi amministrativi con workflow digitali governati.",
          "Per l&apos;attivazione: documento valido, codice fiscale, smartphone, email e PEC.",
        ]}
        image="/site/firma-elettronica-blu.jpg"
        imageAlt="Firma digitale professionale"
        mediaSecondaryImage="/site/firma-digitale-mini.png"
        mediaSecondaryAlt="Token e certificati digitali"
        highlights={[
          "Namirial",
          "Edatalia",
          "Paperless workflow",
          "Audit trail completo",
        ]}
        ctaLabel="Attiva la firma premium"
        ctaHref="/contatti"
        details={[
          {
            title: "Firma digitale Namirial",
            text: "Emissione certificato in tempi rapidi con supporto dedicato in sede.",
          },
          {
            title: "Firma grafometrica Edatalia",
            text: "Firma su tablet per documenti operativi con garanzie normative eIDAS.",
          },
          {
            title: "Integrazione nel gestionale",
            text: "Workflow con approvazione documentale, archiviazione e audit trail completo.",
          },
        ]}
      />

      <PremiumSignatureSection
        eyebrow="Digital trust experience"
        title="Un linguaggio visivo premium per la firma"
        description="La pagina comunica in modo più autorevole il valore commerciale e legale della digitalizzazione documentale."
        panels={signatureVisuals}
      />

      <section className="digital-grid reveal reveal-3 scroll-section">
        <article className="digital-card stagger-item">
          <Image src="/site/edatalia.png" alt="Edatalia" width={200} height={76} />
          <h3>Edatalia</h3>
          <p>Soluzioni di firma grafometrica per una gestione documentale smart e sicura.</p>
        </article>
        <article className="digital-card stagger-item">
          <Image src="/site/firma-elettronica-blu.jpg" alt="Namirial" width={220} height={120} />
          <h3>Namirial</h3>
          <p>Firma digitale qualificata per professionisti e imprese con procedure semplificate.</p>
        </article>
        <article className="digital-card stagger-item">
          <Image src="/site/logo_big.png" alt="ISA digital trust" width={220} height={120} />
          <h3>Digital Trust Desk</h3>
          <p>Supporto operativo per rinnovi certificati, policy firma e compliance documentale.</p>
        </article>
      </section>

      <section className="ultra-premium-band reveal reveal-3 scroll-section">
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Trust Engineering</p>
          <h3>Identity Assurance</h3>
          <p>Processi certificati per garantire integrita, autenticita e non ripudio dei documenti.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Workflow Value</p>
          <h3>Paperless Governance</h3>
          <p>Riduzione ciclo approvativo e piena tracciabilita degli step documentali critici.</p>
        </article>
      </section>

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
