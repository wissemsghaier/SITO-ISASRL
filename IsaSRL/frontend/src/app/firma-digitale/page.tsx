import Image from "next/image";
import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

export default function FirmaDigitalePage() {
  return (
    <SiteFrame activePath="/firma-digitale">
      <InternalPageTemplate
        eyebrow="Prodotti Digitali"
        title="Firma Digitale e Firma Grafometrica"
        subtitle="Attivazione rapida e processi paperless con pieno valore legale."
        paragraphs={[
          "ISA e fornitore accreditato Namirial ed Edatalia per soluzioni di firma affidabili.",
          "Riduci carta e tempi operativi con onboarding guidato e integrazione gestionale.",
          "Per attivare la firma sono necessari documento valido, codice fiscale, smartphone, email e PEC.",
        ]}
        image="/site/firma-elettronica-blu.jpg"
        imageAlt="Firma digitale professionale"
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
      </section>

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
