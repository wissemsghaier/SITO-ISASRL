import Image from "next/image";
import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

export default function FirmaDigitalePage() {
  return (
    <SiteFrame activePath="/firma-digitale">
      <InternalPageTemplate
        variant="studio"
        eyebrow="Prodotti Digitali"
        title="Firma Digitale e Firma Grafometrica"
        subtitle="Onboarding rapido, pieno valore legale e integrazione nei processi aziendali." 
        paragraphs={[
          "ISA e fornitore accreditato Namirial ed Edatalia per soluzioni di firma affidabili.",
          "Riduci carta, errori e tempi operativi con onboarding guidato e integrazione gestionale.",
          "Per attivare la firma sono necessari documento valido, codice fiscale, smartphone, email e PEC.",
        ]}
        image="/site/firma-elettronica-blu.jpg"
        imageAlt="Firma digitale professionale"
        mediaSecondaryImage="/site/firma-digitale-mini.png"
        mediaSecondaryAlt="Token e certificati digitali"
        highlights={[
          "Namirial",
          "Edatalia",
          "Workflow paperless",
          "Audit trail completo",
        ]}
        ctaLabel="Attiva la firma"
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
