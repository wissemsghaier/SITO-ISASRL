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

const newsPanels = [
  {
    label: "Comunicazione",
    title: "ISA entra nel gruppo Zutec",
    text: "Dal 30 aprile 2026 ISA srl e stata acquisita da Zutec S.r.l. per rafforzare l'offerta tecnologica verso clienti e partner.",
    image: "/site/premium-final/12-solution-workshop.jpg",
    imageAlt: "Comunicazione acquisizione gruppo Zutec",
  },
  {
    label: "Focus",
    title: "Firma digitale in evidenza",
    text: "Soluzioni Namirial ed Edatalia per digitalizzare processi, ridurre carta e accelerare l'operativita.",
    image: "/site/premium-final/07-compliance-signature.jpg",
    imageAlt: "Firma digitale in evidenza",
  },
  {
    label: "Focus",
    title: "Whistleblowing e compliance",
    text: "Canali conformi e governance del rischio per aziende che devono rispettare i requisiti normativi vigenti.",
    image: "/site/premium-final/05-control-center.png",
    imageAlt: "Whistleblowing in evidenza",
  },
];

const trustPoints = [
  {
    title: "Comunicazioni verificate",
    text: "Le news riprendono i contenuti ufficiali presenti sul sito storico isasrl.it.",
  },
  {
    title: "Aggiornamenti utili al cliente",
    text: "Focus su novita strategiche, servizi in evidenza e documentazione operativa.",
  },
  {
    title: "Percorso diretto",
    text: "Ogni notizia porta a un'azione concreta: contatto, approfondimento o attivazione servizio.",
  },
];

export default function NewsPage() {
  return (
    <SiteFrame activePath="/news">
      <PremiumRouteShell
        eyebrow="News"
        title="In evidenza da isasrl.it"
        description="Sezione news costruita con i contenuti principali del sito storico, mantenendo i dati originali e una presentazione moderna."
        chips={["In evidenza", "Gruppo Zutec", "Firma digitale", "Whistleblowing"]}
      >
        <InternalPageTemplate
          variant="studio"
          eyebrow="Aggiornamenti"
          title="Novita e comunicazioni principali"
          subtitle="Raccogliamo qui le informazioni in evidenza del sito ISA per una consultazione rapida e chiara."
          paragraphs={[
            "ISA srl entra nel gruppo Zutec: una evoluzione strategica per potenziare l'offerta e ampliare le competenze.",
            "Restano centrali i servizi storici ad alto impatto: firma digitale, whistleblowing, fatturazione elettronica e continuita operativa.",
            "Questa sezione aiuta clienti e partner a trovare subito le novita piu importanti e i link di approfondimento.",
          ]}
          image="/site/premium-final/12-solution-workshop.jpg"
          imageAlt="Comunicazioni e novita ISA"
          mediaSecondaryImage="/site/premium-final/11-monitoring-delivery.jpg"
          mediaSecondaryAlt="Aggiornamenti operativi"
          highlights={["Comunicazioni ufficiali", "Novita servizi", "Approfondimenti", "Call to action rapide"]}
          ctaLabel="Richiedi informazioni"
          ctaHref="/contatti"
          details={[
            {
              title: "Evoluzione strategica",
              text: "Integrazione nel gruppo Zutec con continuita operativa e rafforzamento dei servizi.",
            },
            {
              title: "Servizi prioritari",
              text: "Focus su compliance, digital trust e piattaforme gestionali per aziende e professionisti.",
            },
            {
              title: "Canale aggiornato",
              text: "Una pagina unica per consultare notizie rilevanti senza perdere informazioni storiche.",
            },
          ]}
        />

        <ExecutiveTrustBand
          eyebrow="News affidabili"
          title="Informazioni storiche, organizzate meglio"
          description="La sezione conserva i dati originali e li trasforma in un percorso di lettura piu semplice per utenti e clienti."
          points={trustPoints}
          primaryCtaLabel="Contatta ISA"
          primaryCtaLabelB="Parla con un advisor ISA"
          primaryCtaHref="/contatti"
          secondaryCtaLabel="Vai ai servizi"
          secondaryCtaLabelB="Esplora le soluzioni disponibili"
          secondaryCtaHref="/servizi"
        />

        <PremiumSignatureSection
          eyebrow="In evidenza"
          title="Notizie e focus del sito storico"
          description="Dati estratti dal contenuto legacy e presentati con ordine editoriale moderno."
          panels={newsPanels}
        />

        <section className="studio-offer-grid premium-route-section reveal reveal-3 scroll-section">
          <article className="studio-offer-card stagger-item premium-route-stagger">
            <h3>Link rapidi alle sezioni in evidenza</h3>
            <ul className="resource-links">
              <li><Link href="/firma-digitale">Firma Digitale</Link></li>
              <li><Link href="/whistleblowing">Whistleblowing</Link></li>
              <li><Link href="/servizi">Fatturazione Elettronica e Business Continuity</Link></li>
              <li><Link href="/mepa">Tecnologia Didattica / MEPA</Link></li>
            </ul>
          </article>
        </section>

        <ServicesStrip />
        <PartnersSection />
        <ContactBanner />
      </PremiumRouteShell>
    </SiteFrame>
  );
}
