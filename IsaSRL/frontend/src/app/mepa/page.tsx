import Image from "next/image";
import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { SiteFrame } from "@/components/site-frame";

export default function MepaPage() {
  return (
    <SiteFrame activePath="/mepa">
      <InternalPageTemplate
        variant="studio"
        eyebrow="MEPA"
        title="Acquisti in rete PA e tecnologia didattica"
        subtitle="Progetti MEPA per scuole, enti e pubblica amministrazione orientati all'impatto reale."
        paragraphs={[
          "Esperienza consolidata in forniture su rete MEPA con approccio consulenziale e tecnico.",
          "Monitor interattivi, aule immersive e laboratori digitali con installazione certificata.",
          "Progettazione reti e piattaforme educational per ambienti formativi connessi e performanti.",
        ]}
        image="/site/mepa.png"
        imageAlt="Forniture tecnologiche per scuola e pubblica amministrazione"
        mediaSecondaryImage="/site/aulainformatica2.jpg"
        mediaSecondaryAlt="Aula digitale con dispositivi"
        highlights={[
          "Fornitore accreditato",
          "Aule immersive",
          "Reti scolastiche",
          "Supporto post-progetto",
        ]}
        ctaLabel="Attiva un progetto PA"
        ctaHref="/contatti"
        details={[
          {
            title: "Aule informatiche",
            text: "Progettazione completa con impianti a norma e integrazione tecnologica scalabile.",
          },
          {
            title: "Reti internet",
            text: "LAN e WiFi ad alta affidabilita per garantire connettivita continua.",
          },
          {
            title: "Software educational",
            text: "Fornitura certificata e supporto per piattaforme digitali e licenze educative.",
          },
        ]}
      />

      <section className="studio-offer-grid reveal reveal-3 scroll-section">
        <article className="studio-offer-card stagger-item">
          <Image src="/site/aulainformatica2.jpg" alt="Aula informatica" width={640} height={360} className="studio-offer-image" />
          <h3>Digital Classrooms</h3>
          <p>Allestimenti completi con dispositivi, cablaggio e configurazione operativa.</p>
        </article>
        <article className="studio-offer-card stagger-item">
          <Image src="/site/LIM.jpg" alt="Lavagna interattiva" width={640} height={360} className="studio-offer-image" />
          <h3>Interactive Learning</h3>
          <p>Monitor touch e strumenti collaborativi per didattica moderna e coinvolgente.</p>
        </article>
        <article className="studio-offer-card stagger-item">
          <Image src="/site/carta_docente.png" alt="Carta docente" width={640} height={360} className="studio-offer-image" />
          <h3>Funding Alignment</h3>
          <p>Supporto su strumenti di acquisto e programmi dedicati al settore education.</p>
        </article>
        <article className="studio-offer-card stagger-item">
          <Image src="/site/monitor.jpg" alt="Monitor professionali" width={640} height={360} className="studio-offer-image" />
          <h3>Managed Delivery</h3>
          <p>Coordinamento end-to-end dalla gara alla messa in esercizio delle soluzioni.</p>
        </article>
      </section>

      <section className="ultra-premium-band reveal reveal-3 scroll-section">
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Public Procurement</p>
          <h3>Process Reliability</h3>
          <p>Governance dell&apos;intero ciclo di fornitura con controllo documentale e tecnico.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Education Design</p>
          <h3>Future Learning Spaces</h3>
          <p>Ambienti didattici progettati per collaborazione, interazione e continuita operativa.</p>
        </article>
      </section>

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
