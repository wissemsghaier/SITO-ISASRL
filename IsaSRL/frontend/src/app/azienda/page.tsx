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

const companyVisuals = [
  {
    label: "Visione",
    title: "Idee, innovazione e tecnologie",
    text: "ISA nasce come V.A.R. di soluzioni chiavi in mano hardware e software con forte orientamento all'innovazione.",
    image: "/site/premium-final/12-solution-workshop.jpg",
    imageAlt: "Team e innovazione aziendale",
  },
  {
    label: "Metodo",
    title: "Software verticalizzato per il cliente",
    text: "Con partner altamente qualificati come Zucchetti sviluppiamo soluzioni contabili, amministrative, logistiche e di analisi.",
    image: "/site/premium-final/08-operations-platform.jpg",
    imageAlt: "Gestionali verticalizzati per aziende",
  },
  {
    label: "Continuita",
    title: "Esperienza e supporto sul territorio",
    text: "Dal 1994 accompagniamo aziende e professionisti con approccio concreto, supporto continuo e risultati misurabili.",
    image: "/site/premium-final/11-monitoring-delivery.jpg",
    imageAlt: "Supporto tecnico continuativo",
  },
];

const trustPoints = [
  {
    title: "Approccio chiavi in mano",
    text: "Dall'analisi iniziale alla delivery, un unico interlocutore tecnico-commerciale.",
  },
  {
    title: "Competenza multi-dominio",
    text: "Software, infrastrutture, compliance e assistenza integrati in una visione unica.",
  },
  {
    title: "Partnership consolidate",
    text: "Collaboriamo con partner di primo livello per garantire solidita e continuita operativa.",
  },
];

export default function AziendaPage() {
  return (
    <SiteFrame activePath="/azienda">
      <PremiumRouteShell
        eyebrow="Azienda"
        title="Informatica Soluzioni Aziendali"
        description="Contenuti storici del sito isasrl.it riportati in un layout moderno: stessa sostanza, maggiore chiarezza e migliore esperienza utente."
        chips={["Dal 1994", "V.A.R. hardware/software", "Partner Zucchetti", "Gruppo Zutec"]}
      >
        <section id="chi-siamo" className="azienda-anchor-section">
          <InternalPageTemplate
            variant="studio"
            eyebrow="La nostra storia"
            title="ISA: idee, innovazione e tecnologie"
            subtitle="L'azienda nasce come V.A.R. di soluzioni chiavi in mano hardware e software, con offerta ad alto contenuto tecnologico."
            paragraphs={[
              "Da sempre attenta alle tecnologie informatiche emergenti, ISA adotta scelte di avanguardia soprattutto nel software aziendale.",
              "Grazie alla collaborazione con partner qualificati come Zucchetti realizziamo software verticalizzato per esigenze contabili, amministrative, logistiche e di analisi.",
              "Lavoriamo con una logica orientata alle esigenze reali del cliente, con personalizzazione e accompagnamento continuo nel tempo.",
            ]}
            image="/site/premium-final/10-modular-architecture.jpg"
            imageAlt="Soluzioni ICT aziendali"
            mediaSecondaryImage="/site/premium-final/09-kpi-performance.jpg"
            mediaSecondaryAlt="Piattaforme software verticali"
            highlights={["Qualita progettuale", "Continuita operativa", "Sviluppo verticale", "Supporto dedicato"]}
            ctaLabel="Parla con il team ISA"
            ctaHref="/contatti"
            details={[
              {
                title: "Missione",
                text: "Trasformare tecnologia e processi in risultati concreti per imprese, enti e professionisti.",
              },
              {
                title: "Posizionamento",
                text: "Sistemi hardware e software integrati con approccio pragmatico e orientato al valore.",
              },
              {
                title: "Evoluzione",
                text: "Dal 30 aprile 2026 ISA e parte del gruppo Zutec per rafforzare competenze e offerta.",
              },
            ]}
          />
        </section>

        <ExecutiveTrustBand
          eyebrow="Affidabilita"
          title="Una struttura solida, con dati e servizi reali"
          description="Le informazioni storiche del sito originale vengono mantenute e rese piu leggibili per i clienti attuali e futuri."
          points={trustPoints}
          primaryCtaLabel="Contatta ISA"
          primaryCtaLabelB="Prenota una consulenza aziendale"
          primaryCtaHref="/contatti"
          secondaryCtaLabel="Vai alle news"
          secondaryCtaLabelB="Leggi gli aggiornamenti"
          secondaryCtaHref="/news"
        />

        <PremiumSignatureSection
          eyebrow="Profilo aziendale"
          title="Le informazioni chiave di ISA"
          description="Storytelling aziendale basato sui dati reali di isasrl.it: identita, metodo e continuita operativa."
          panels={companyVisuals}
        />

        <section
          id="lavora-con-noi"
          className="studio-offer-grid premium-route-section reveal reveal-3 scroll-section"
        >
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <h3>Lavora con noi</h3>
            <p>
              Cerchiamo professionisti orientati a innovazione, affidabilita e qualita del servizio.
            </p>
            <p>
              Invia la tua candidatura tramite la pagina contatti indicando area di interesse,
              esperienza e competenze tecniche.
            </p>
            <Link href="/contatti">Invia candidatura</Link>
          </article>
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <h3>Comunicazione ufficiale</h3>
            <p>
              ISA srl e stata acquisita dal gruppo <a href="https://zutec.it/" target="_blank" rel="noreferrer">Zutec S.r.l.</a> dal 30 aprile 2026.
            </p>
            <p>
              La partnership amplia l&apos;offerta e accelera l&apos;innovazione mantenendo il presidio sul territorio.
            </p>
          </article>
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <h3>Contatti storici confermati</h3>
            <p>Via delle Betulle, 137 - Ragusa (RG) 97100.</p>
            <p>Telefono: 0932 252022 r.a. | Email: info@isasrl.it.</p>
            <Link href="/contatti">Vai alla pagina contatti completa</Link>
          </article>
        </section>

        <ServicesStrip />
        <PartnersSection />
        <ContactBanner />
      </PremiumRouteShell>
    </SiteFrame>
  );
}
