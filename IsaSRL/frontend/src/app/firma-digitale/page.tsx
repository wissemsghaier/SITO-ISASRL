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

const signatureVisuals = [
  {
    label: "Legal Value",
    title: "Firma con validita piena",
    text: "Processi digitali affidabili con garanzia di autenticita, integrita e non ripudio.",
    image: "/site/premium-final/07-compliance-signature.jpg",
    imageAlt: "Firma digitale con validita legale",
  },
  {
    label: "Paperless Flow",
    title: "Workflow documentale smart",
    text: "Dalla firma alla conservazione, un percorso paperless semplice da adottare e governare.",
    image: "/site/premium-final/06-digital-invoicing.jpg",
    imageAlt: "Workflow paperless",
  },
  {
    label: "Trust Desk",
    title: "Supporto operativo continuo",
    text: "Assistenza su rinnovi, policy e integrazioni per una gestione documentale senza attriti.",
    image: "/site/premium-final/05-control-center.png",
    imageAlt: "Supporto trust desk",
  },
];

const trustSignaturePoints = [
  {
    title: "Conformita normativa integrata",
    text: "Percorso eIDAS/GDPR con policy, emissione certificati e controlli documentati.",
  },
  {
    title: "Riduzione tempi approvativi",
    text: "Workflow digitali che velocizzano firma, validazione e conservazione senza passaggi manuali.",
  },
  {
    title: "Supporto continuativo",
    text: "Presidio tecnico su rinnovi, policy firma e integrazione con i processi aziendali.",
  },
];

export default function FirmaDigitalePage() {
  return (
    <SiteFrame activePath="/firma-digitale">
      <PremiumRouteShell
        eyebrow="Digital Trust"
        title="Firma digitale premium per processi rapidi e verificabili"
        description="Visual unificati, messaggi piu chiari e CTA conversion-first per trasformare la compliance in un vantaggio operativo reale."
        chips={[
          "Namirial",
          "Edatalia",
          "Paperless workflow",
          "Audit trail completo",
        ]}
      >
        <InternalPageTemplate
          variant="studio"
          eyebrow="Digital Trust"
          title="Firma digitale e grafometrica per processi veloci e conformi"
          subtitle="Piu efficienza operativa, meno carta e pieno valore legale in ogni fase del ciclo documentale."
          paragraphs={[
            "ISA e partner accreditato Namirial ed Edatalia per soluzioni di firma affidabili e conformi.",
            "Riduci tempi approvativi, errori manuali e costi amministrativi con workflow digitali governati.",
            "Per l&apos;attivazione: documento valido, codice fiscale, smartphone, email e PEC.",
          ]}
          image="/site/premium-final/07-compliance-signature.jpg"
          imageAlt="Firma digitale professionale"
          mediaSecondaryImage="/site/premium-final/06-digital-invoicing.jpg"
          mediaSecondaryAlt="Token e certificati digitali"
          highlights={[
            "Namirial",
            "Edatalia",
            "Paperless workflow",
            "Audit trail completo",
          ]}
          ctaLabel="Attiva la tua firma digitale"
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

        <ExecutiveTrustBand
          eyebrow="Trust conversion"
          title="Il percorso di firma che aumenta fiducia e velocita"
          description="Gerarchia di conversione ottimizzata: prova legale, affidabilita operativa e invito all'attivazione sempre evidente."
          points={trustSignaturePoints}
          primaryCtaLabel="Richiedi attivazione firma"
          primaryCtaLabelB="Avvia onboarding firma oggi"
          primaryCtaHref="/contatti"
          secondaryCtaLabel="Vai ai servizi digitali"
          secondaryCtaLabelB="Scopri il percorso paperless"
          secondaryCtaHref="/servizi"
        />

        <PremiumSignatureSection
          eyebrow="Esperienza trust"
          title="Firma digitale raccontata in modo chiaro e operativo"
          description="La sezione evidenzia il valore legale e organizzativo della digitalizzazione documentale con un linguaggio semplice."
          panels={signatureVisuals}
        />

        <section className="digital-grid premium-route-section reveal reveal-3 scroll-section">
          <article className="digital-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/06-digital-invoicing.jpg" alt="Edatalia" width={220} height={120} />
            <h3>Edatalia</h3>
            <p>Soluzioni di firma grafometrica per una gestione documentale smart e sicura.</p>
          </article>
          <article className="digital-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/07-compliance-signature.jpg" alt="Namirial" width={220} height={120} />
            <h3>Namirial</h3>
            <p>Firma digitale qualificata per professionisti e imprese con procedure semplificate.</p>
          </article>
          <article className="digital-card stagger-item premium-route-stagger">
            <Image src="/site/premium-final/05-control-center.png" alt="ISA digital trust" width={220} height={120} />
            <h3>Digital Trust Desk</h3>
            <p>Supporto operativo per rinnovi certificati, policy firma e compliance documentale.</p>
          </article>
        </section>

        <section className="ultra-premium-band premium-route-section reveal reveal-3 scroll-section">
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Ingegneria trust</p>
            <h3>Garanzia di identita</h3>
            <p>Processi certificati per garantire integrita, autenticita e non ripudio dei documenti.</p>
          </article>
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Valore operativo</p>
            <h3>Governance paperless</h3>
            <p>Riduzione ciclo approvativo e piena tracciabilita degli step documentali critici.</p>
          </article>
        </section>

        <ServicesStrip />
        <PartnersSection />
        <ContactBanner />
      </PremiumRouteShell>
    </SiteFrame>
  );
}
