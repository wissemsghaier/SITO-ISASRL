import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import type { CSSProperties } from "react";
import { ServicesSelector } from "@/components/services-selector";
import { SiteFrame } from "@/components/site-frame";
import {
  getPremiumServiceBySlug,
  premiumServiceRouteSlugs,
  type ServiceCatalogItem,
  type ServiceLegacySection,
} from "@/lib/services-catalog";
import { getServiceTheme } from "@/lib/service-themes";
import styles from "./service-detail-redesign.module.css";

type LegacyVisual = {
  src: string;
  alt: string;
  caption: string;
};

type ServiceMotionProfile = {
  code: string;
  title: string;
  statement: string;
  bullets: [string, string, string];
};

type ServiceMotionBreakpoint = {
  modeLabel: string;
  heroBase: string;
  heroPeak: string;
  heroShiftX: string;
  heroShiftY: string;
  cardBase: string;
  cardPeak: string;
  cardShiftX: string;
  cardShiftY: string;
  panelDuration: string;
  heroDuration: string;
  cardDuration: string;
};

type ServiceMotionTuning = {
  desktop: ServiceMotionBreakpoint;
  mobile: ServiceMotionBreakpoint;
};

type GlobalMotionPreset = "soft" | "balanced" | "spectacular";

type GlobalMotionPresetConfig = {
  label: string;
  desktop: {
    scaleFactor: number;
    shiftFactor: number;
    speedFactor: number;
  };
  mobile: {
    scaleFactor: number;
    shiftFactor: number;
    speedFactor: number;
  };
};

const parseGlobalMotionPreset = (value: string | undefined): GlobalMotionPreset => {
  if (!value) {
    return "spectacular";
  }

  const normalized = value.toLowerCase();
  if (normalized === "soft" || normalized === "balanced" || normalized === "spectacular") {
    return normalized;
  }

  return "spectacular";
};

const GLOBAL_SERVICES_MOTION_PRESET_FALLBACK: GlobalMotionPreset = "spectacular";

const GLOBAL_SERVICES_MOTION_PRESET: GlobalMotionPreset = parseGlobalMotionPreset(
  process.env.NEXT_PUBLIC_SERVICE_MOTION_PRESET ?? GLOBAL_SERVICES_MOTION_PRESET_FALLBACK
);

const globalMotionPresetConfig: Record<GlobalMotionPreset, GlobalMotionPresetConfig> = {
  soft: {
    label: "Soft",
    desktop: {
      scaleFactor: 0.78,
      shiftFactor: 0.66,
      speedFactor: 1.24,
    },
    mobile: {
      scaleFactor: 0.84,
      shiftFactor: 0.76,
      speedFactor: 1.2,
    },
  },
  balanced: {
    label: "Balanced",
    desktop: {
      scaleFactor: 1,
      shiftFactor: 1,
      speedFactor: 1,
    },
    mobile: {
      scaleFactor: 1,
      shiftFactor: 1,
      speedFactor: 1,
    },
  },
  spectacular: {
    label: "Spectacular",
    desktop: {
      scaleFactor: 1.22,
      shiftFactor: 1.34,
      speedFactor: 0.84,
    },
    mobile: {
      scaleFactor: 1.06,
      shiftFactor: 1.1,
      speedFactor: 0.95,
    },
  },
};

const parseMotionScalar = (value: string) => Number.parseFloat(value);

const parseMotionPercent = (value: string) => Number.parseFloat(value.replace("%", ""));

const parseMotionSeconds = (value: string) => Number.parseFloat(value.replace("s", ""));

const clampMotionValue = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const formatScale = (value: number) => clampMotionValue(value, 1.002, 1.24).toFixed(3);

const formatPercent = (value: number) => `${clampMotionValue(value, -3.5, 3.5).toFixed(3)}%`;

const formatSeconds = (value: number) => `${clampMotionValue(value, 4.2, 24).toFixed(2)}s`;

const amplifyScale = (rawScale: string, factor: number) => {
  const numeric = parseMotionScalar(rawScale);
  const remapped = 1 + (numeric - 1) * factor;
  return formatScale(remapped);
};

const amplifyShift = (rawShift: string, factor: number) => {
  const numeric = parseMotionPercent(rawShift);
  return formatPercent(numeric * factor);
};

const amplifySpeed = (rawDuration: string, factor: number) => {
  const numeric = parseMotionSeconds(rawDuration);
  return formatSeconds(numeric * factor);
};

const applyPresetToBreakpoint = (
  breakpoint: ServiceMotionBreakpoint,
  preset: GlobalMotionPresetConfig["desktop"]
): ServiceMotionBreakpoint => ({
  ...breakpoint,
  heroBase: amplifyScale(breakpoint.heroBase, preset.scaleFactor),
  heroPeak: amplifyScale(breakpoint.heroPeak, preset.scaleFactor),
  heroShiftX: amplifyShift(breakpoint.heroShiftX, preset.shiftFactor),
  heroShiftY: amplifyShift(breakpoint.heroShiftY, preset.shiftFactor),
  cardBase: amplifyScale(breakpoint.cardBase, preset.scaleFactor),
  cardPeak: amplifyScale(breakpoint.cardPeak, preset.scaleFactor),
  cardShiftX: amplifyShift(breakpoint.cardShiftX, preset.shiftFactor),
  cardShiftY: amplifyShift(breakpoint.cardShiftY, preset.shiftFactor),
  panelDuration: amplifySpeed(breakpoint.panelDuration, preset.speedFactor),
  heroDuration: amplifySpeed(breakpoint.heroDuration, preset.speedFactor),
  cardDuration: amplifySpeed(breakpoint.cardDuration, preset.speedFactor),
});

const applyGlobalMotionPreset = (
  tuning: ServiceMotionTuning,
  presetKey: GlobalMotionPreset
): ServiceMotionTuning => {
  const preset = globalMotionPresetConfig[presetKey];

  return {
    desktop: applyPresetToBreakpoint(tuning.desktop, preset.desktop),
    mobile: applyPresetToBreakpoint(tuning.mobile, preset.mobile),
  };
};

const serviceVisualsBySlug: Record<string, LegacyVisual[]> = {
  "fatturazione-elettronica": [
    {
      src: "/site/fatturazione_pa.png",
      alt: "Fatturazione elettronica con interscambio SDI",
      caption: "Pannello fatturazione PA",
    },
    {
      src: "/site/fatel.jpg",
      alt: "Software Fatel per gestione fatture",
      caption: "Software Fatel",
    },
  ],
  "business-continuity": [
    {
      src: "/site/backup.jpg",
      alt: "Business continuity con backup remoto",
      caption: "Server remoto pronto",
    },
  ],
  "gestionale-su-misura": [
    {
      src: "/site/gestionali1.jpg",
      alt: "Gestionale su misura Adhoc Revolution",
      caption: "Adhoc Revolution",
    },
    {
      src: "/site/gestionali3.jpg",
      alt: "Verticalizzazioni gestionali per reparti",
      caption: "Verticalizzazioni collaudate",
    },
    {
      src: "/site/gestionali.jpg",
      alt: "Processi aziendali con ERP integrato",
      caption: "Processi unificati",
    },
  ],
  "tecnologia-didattica": [
    {
      src: "/site/monitor.jpg",
      alt: "Monitor interattivi per scuole",
      caption: "Monitor interattivi",
    },
    {
      src: "/site/aulainformatica2.jpg",
      alt: "Aula informatica con postazioni digitali",
      caption: "Aule informatiche",
    },
    {
      src: "/site/carta_docente.png",
      alt: "Supporto forniture didattiche digitali",
      caption: "Forniture educational",
    },
  ],
  "firma-digitale": [
    {
      src: "/site/edatalia.png",
      alt: "Fornitore accreditato Edatalia",
      caption: "Firma grafometrica",
    },
    {
      src: "/site/firma-elettronica-blu.jpg",
      alt: "Firma digitale Namirial",
      caption: "Firma digitale",
    },
  ],
  whistleblowing: [
    {
      src: "/site/whistleblowing_img.jpg",
      alt: "Canale whistleblowing riservato",
      caption: "Canale sicuro",
    },
    {
      src: "/site/whistleblowing_mini.jpg",
      alt: "Compliance whistleblowing",
      caption: "Compliance e tutela",
    },
  ],
};

const serviceMotionBySlug: Record<string, ServiceMotionProfile> = {
  "fatturazione-elettronica": {
    code: "FLOW-01",
    title: "Pipeline documentale ad alta precisione",
    statement: "Animazioni lineari e scansioni progressive per raccontare firma, invio SDI e conservazione.",
    bullets: ["Import e validazione", "Firma e invio in un clic", "Conservazione monitorata"],
  },
  "business-continuity": {
    code: "REC-24",
    title: "Assetto resiliente sempre attivo",
    statement: "Pulse radiali e drift controllato per evocare continuita operativa e ripartenza immediata.",
    bullets: ["Backup giornaliero", "Replica remota", "Recovery rapido"],
  },
  "gestionale-su-misura": {
    code: "ERP-X",
    title: "Matrice operativa per ogni reparto",
    statement: "Movimenti a griglia e parallasse modulare per rappresentare orchestrazione tra funzioni aziendali.",
    bullets: ["Verticalizzazione", "Controllo processi", "Evoluzione continua"],
  },
  "tecnologia-didattica": {
    code: "CAMPUS",
    title: "Esperienza didattica ad alta energia",
    statement: "Transizioni ampie e beacon dinamici per riflettere ambienti immersivi e collaborazione in aula.",
    bullets: ["MEPA", "Reti LAN e WiFi", "Software educational"],
  },
  "firma-digitale": {
    code: "TRUST",
    title: "Percorso paperless certificato",
    statement: "Curve fluide e segni calligrafici animati per valorizzare fiducia, compliance e velocita di attivazione.",
    bullets: ["eIDAS", "Namirial", "Edatalia"],
  },
  whistleblowing: {
    code: "SAFE-CHAN",
    title: "Canale protetto a prova di audit",
    statement: "Segnali discreti e onde concentriche per comunicare riservatezza, protezione e governance normativa.",
    bullets: ["D.Lgs. 24/2023", "Direttiva UE 2019/1937", "Tutela segnalante"],
  },
};

const serviceMotionTuningBySlug: Record<string, ServiceMotionTuning> = {
  "fatturazione-elettronica": {
    desktop: {
      modeLabel: "Cinema Max",
      heroBase: "1.058",
      heroPeak: "1.165",
      heroShiftX: "-1.95%",
      heroShiftY: "-1.22%",
      cardBase: "1.042",
      cardPeak: "1.132",
      cardShiftX: "1.42%",
      cardShiftY: "-0.42%",
      panelDuration: "5.6s",
      heroDuration: "9.1s",
      cardDuration: "9.8s",
    },
    mobile: {
      modeLabel: "Soft",
      heroBase: "1.015",
      heroPeak: "1.05",
      heroShiftX: "-0.45%",
      heroShiftY: "-0.35%",
      cardBase: "1.01",
      cardPeak: "1.042",
      cardShiftX: "0.35%",
      cardShiftY: "-0.12%",
      panelDuration: "11.8s",
      heroDuration: "15.8s",
      cardDuration: "16.4s",
    },
  },
  "business-continuity": {
    desktop: {
      modeLabel: "Cinema Max",
      heroBase: "1.046",
      heroPeak: "1.148",
      heroShiftX: "0.42%",
      heroShiftY: "-1.65%",
      cardBase: "1.034",
      cardPeak: "1.114",
      cardShiftX: "0.88%",
      cardShiftY: "-0.92%",
      panelDuration: "5.8s",
      heroDuration: "9.6s",
      cardDuration: "10.6s",
    },
    mobile: {
      modeLabel: "Soft",
      heroBase: "1.012",
      heroPeak: "1.046",
      heroShiftX: "0.15%",
      heroShiftY: "-0.45%",
      cardBase: "1.008",
      cardPeak: "1.038",
      cardShiftX: "0.3%",
      cardShiftY: "-0.2%",
      panelDuration: "12.6s",
      heroDuration: "16.6s",
      cardDuration: "17.2s",
    },
  },
  "gestionale-su-misura": {
    desktop: {
      modeLabel: "Cinema Max",
      heroBase: "1.052",
      heroPeak: "1.154",
      heroShiftX: "1.48%",
      heroShiftY: "-1.02%",
      cardBase: "1.036",
      cardPeak: "1.121",
      cardShiftX: "1.24%",
      cardShiftY: "-0.36%",
      panelDuration: "5.3s",
      heroDuration: "9.0s",
      cardDuration: "9.9s",
    },
    mobile: {
      modeLabel: "Soft",
      heroBase: "1.014",
      heroPeak: "1.048",
      heroShiftX: "0.4%",
      heroShiftY: "-0.28%",
      cardBase: "1.009",
      cardPeak: "1.04",
      cardShiftX: "0.35%",
      cardShiftY: "-0.1%",
      panelDuration: "11.9s",
      heroDuration: "15.9s",
      cardDuration: "16.7s",
    },
  },
  "tecnologia-didattica": {
    desktop: {
      modeLabel: "Cinema Max",
      heroBase: "1.06",
      heroPeak: "1.176",
      heroShiftX: "0.82%",
      heroShiftY: "-1.9%",
      cardBase: "1.044",
      cardPeak: "1.136",
      cardShiftX: "1.64%",
      cardShiftY: "-0.7%",
      panelDuration: "4.9s",
      heroDuration: "8.2s",
      cardDuration: "9.1s",
    },
    mobile: {
      modeLabel: "Soft",
      heroBase: "1.016",
      heroPeak: "1.053",
      heroShiftX: "0.24%",
      heroShiftY: "-0.5%",
      cardBase: "1.01",
      cardPeak: "1.043",
      cardShiftX: "0.45%",
      cardShiftY: "-0.18%",
      panelDuration: "12.2s",
      heroDuration: "15.3s",
      cardDuration: "16.2s",
    },
  },
  "firma-digitale": {
    desktop: {
      modeLabel: "Cinema Max",
      heroBase: "1.048",
      heroPeak: "1.136",
      heroShiftX: "1.06%",
      heroShiftY: "-0.86%",
      cardBase: "1.032",
      cardPeak: "1.108",
      cardShiftX: "0.94%",
      cardShiftY: "-0.32%",
      panelDuration: "6.2s",
      heroDuration: "9.8s",
      cardDuration: "10.9s",
    },
    mobile: {
      modeLabel: "Soft",
      heroBase: "1.012",
      heroPeak: "1.043",
      heroShiftX: "0.24%",
      heroShiftY: "-0.26%",
      cardBase: "1.008",
      cardPeak: "1.036",
      cardShiftX: "0.3%",
      cardShiftY: "-0.08%",
      panelDuration: "12.8s",
      heroDuration: "16.9s",
      cardDuration: "17.6s",
    },
  },
  whistleblowing: {
    desktop: {
      modeLabel: "Cinema Max",
      heroBase: "1.04",
      heroPeak: "1.122",
      heroShiftX: "0.54%",
      heroShiftY: "-1.12%",
      cardBase: "1.028",
      cardPeak: "1.096",
      cardShiftX: "0.58%",
      cardShiftY: "-0.56%",
      panelDuration: "6.7s",
      heroDuration: "10.6s",
      cardDuration: "11.5s",
    },
    mobile: {
      modeLabel: "Soft",
      heroBase: "1.01",
      heroPeak: "1.036",
      heroShiftX: "0.15%",
      heroShiftY: "-0.28%",
      cardBase: "1.006",
      cardPeak: "1.03",
      cardShiftX: "0.18%",
      cardShiftY: "-0.14%",
      panelDuration: "13.4s",
      heroDuration: "17.3s",
      cardDuration: "18.2s",
    },
  },
};

const getVisualsForService = (service: ServiceCatalogItem): LegacyVisual[] => {
  const visuals = serviceVisualsBySlug[service.slug];
  if (visuals?.length) {
    return visuals;
  }

  return [
    {
      src: service.heroImage,
      alt: service.heroAlt,
      caption: service.shortLabel,
    },
  ];
};

const getLegacyLeadText = (service: ServiceCatalogItem) =>
  service.legacyParagraphs.map((paragraph) => paragraph.trim()).find(Boolean) ??
  service.legacySections.map((section) => section.text.trim()).find(Boolean) ??
  service.legacyChecklist.map((item) => item.trim()).find(Boolean) ??
  service.menuLabel;

const getLegacyDescriptionText = (service: ServiceCatalogItem) => {
  const paragraphs = service.legacyParagraphs.map((paragraph) => paragraph.trim()).filter(Boolean);
  return (
    paragraphs[1] ??
    service.legacySections.map((section) => section.text.trim()).find(Boolean) ??
    service.legacyChecklist.map((item) => item.trim()).find(Boolean) ??
    paragraphs[0] ??
    getLegacyLeadText(service)
  );
};

const getLegacyHighlightItems = (service: ServiceCatalogItem) => {
  const fallback = service.legacyChecklist.length
    ? service.legacyChecklist
    : service.legacyParagraphs;

  return Array.from(new Set(fallback.map((item) => item.trim()).filter(Boolean))).slice(0, 6);
};

const getLegacyOutputItems = (service: ServiceCatalogItem) => {
  const fallback = service.legacyChecklist.length
    ? service.legacyChecklist
    : service.legacyParagraphs;

  return Array.from(new Set(fallback.map((item) => item.trim()).filter(Boolean))).slice(0, 6);
};

const getStoryBlocks = (service: ServiceCatalogItem): ServiceLegacySection[] => {
  return getLegacyOutputItems(service).map((item, index) => ({
    title: `Extrait ${index + 1}`,
    text: item,
  }));
};

const getLegacyPanelTitle = (service: ServiceCatalogItem) =>
  service.legacySections.map((section) => section.title.trim()).find(Boolean) ??
  service.legacyChecklist.map((item) => item.trim()).find(Boolean) ??
  service.menuLabel;

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return premiumServiceRouteSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getPremiumServiceBySlug(slug);

  if (!service) {
    return {
      title: "Servizio non trovato | ISA SRL",
    };
  }

  return {
    title: `${service.menuLabel} | ISA SRL`,
    description: getLegacyLeadText(service),
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getPremiumServiceBySlug(slug);

  if (!service) {
    redirect("/servizi");
  }

  const theme = getServiceTheme(service.slug);
  const visuals = getVisualsForService(service);
  const heroVisual = visuals[0];
  const galleryVisuals = visuals.length > 1 ? visuals.slice(1) : visuals;
  const storyBlocks = getStoryBlocks(service);
  const baseMotionTuning = serviceMotionTuningBySlug[service.slug] ?? {
    desktop: {
      modeLabel: "Cinema Max",
      heroBase: "1.05",
      heroPeak: "1.14",
      heroShiftX: "1.08%",
      heroShiftY: "-0.88%",
      cardBase: "1.03",
      cardPeak: "1.1",
      cardShiftX: "0.92%",
      cardShiftY: "-0.3%",
      panelDuration: "6.1s",
      heroDuration: "9.8s",
      cardDuration: "10.8s",
    },
    mobile: {
      modeLabel: "Soft",
      heroBase: "1.01",
      heroPeak: "1.04",
      heroShiftX: "0.22%",
      heroShiftY: "-0.28%",
      cardBase: "1.006",
      cardPeak: "1.032",
      cardShiftX: "0.2%",
      cardShiftY: "-0.1%",
      panelDuration: "12.8s",
      heroDuration: "16.8s",
      cardDuration: "17.6s",
    },
  };
  const activeMotionPreset = GLOBAL_SERVICES_MOTION_PRESET;
  const presetLabel = globalMotionPresetConfig[activeMotionPreset].label;
  const motionTuning = applyGlobalMotionPreset(baseMotionTuning, activeMotionPreset);
  const legacyLead = getLegacyLeadText(service);
  const legacyDescription = getLegacyDescriptionText(service);
  const legacyHighlights = getLegacyHighlightItems(service);
  const legacyPanelTitle = getLegacyPanelTitle(service);
  const legacyPanelBullets = getLegacyOutputItems(service).slice(0, 3);

  const themedStyle = {
    "--service-accent": theme.accent,
    "--service-soft": theme.accentSoft,
    "--service-contrast": theme.contrast,
    "--service-surface": theme.surface,
    "--service-glow": theme.glow,
    "--hero-base-desktop": motionTuning.desktop.heroBase,
    "--hero-peak-desktop": motionTuning.desktop.heroPeak,
    "--hero-shift-x-desktop": motionTuning.desktop.heroShiftX,
    "--hero-shift-y-desktop": motionTuning.desktop.heroShiftY,
    "--card-base-desktop": motionTuning.desktop.cardBase,
    "--card-peak-desktop": motionTuning.desktop.cardPeak,
    "--card-shift-x-desktop": motionTuning.desktop.cardShiftX,
    "--card-shift-y-desktop": motionTuning.desktop.cardShiftY,
    "--panel-duration-desktop": motionTuning.desktop.panelDuration,
    "--hero-duration-desktop": motionTuning.desktop.heroDuration,
    "--card-duration-desktop": motionTuning.desktop.cardDuration,
    "--hero-base-mobile": motionTuning.mobile.heroBase,
    "--hero-peak-mobile": motionTuning.mobile.heroPeak,
    "--hero-shift-x-mobile": motionTuning.mobile.heroShiftX,
    "--hero-shift-y-mobile": motionTuning.mobile.heroShiftY,
    "--card-base-mobile": motionTuning.mobile.cardBase,
    "--card-peak-mobile": motionTuning.mobile.cardPeak,
    "--card-shift-x-mobile": motionTuning.mobile.cardShiftX,
    "--card-shift-y-mobile": motionTuning.mobile.cardShiftY,
    "--panel-duration-mobile": motionTuning.mobile.panelDuration,
    "--hero-duration-mobile": motionTuning.mobile.heroDuration,
    "--card-duration-mobile": motionTuning.mobile.cardDuration,
  } as CSSProperties;

  return (
    <SiteFrame activePath="/servizi" minimalGlobal>
      <article
        className={`${styles.detailShell} scroll-section reveal reveal-2`}
        data-stagger="fast"
        data-service={service.slug}
        data-motion-preset={activeMotionPreset}
        style={themedStyle}
      >
        <header className={`${styles.heroHeader} stagger-item`}>
          <div className={styles.headerCopy}>
            <h1>{service.menuLabel}</h1>
            <p className={styles.lead}>{legacyLead}</p>
            <p className={styles.description}>{legacyDescription}</p>
          </div>

          <ul className={styles.highlightList}>
            {legacyHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </header>

        <section className={`${styles.heroStage} scroll-section`} data-stagger="fast" data-motion="hero">
          <figure className={`${styles.heroFrame} image-reveal stagger-item`}>
            <Image
              src={heroVisual.src}
              alt={heroVisual.alt}
              width={1280}
              height={760}
              priority
              className={styles.heroImage}
            />
            <figcaption>{heroVisual.caption}</figcaption>
          </figure>

          <aside className={`${styles.motionPanel} stagger-item`}>
            <h2>{legacyPanelTitle}</h2>
            <p>{legacyDescription}</p>

            <ul className={styles.motionBullets}>
              {legacyPanelBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className={`${styles.visualStrip} scroll-section`} data-stagger="fast" data-motion="services">
          <div className={styles.visualGrid}>
            {galleryVisuals.map((visual, index) => (
              <article
                key={`${service.slug}-${visual.src}`}
                className={`${styles.visualCard} stagger-item`}
                style={{ "--card-order": index } as CSSProperties}
              >
                <Image src={visual.src} alt={visual.alt} width={900} height={620} className={styles.visualImage} />
                <p>{visual.caption}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.storyMatrix} scroll-section`} data-stagger="fast" data-motion="detail">
          {storyBlocks.map((block, index) => (
            <article key={`${block.title}-${index}`} className="stagger-item">
              <p>{block.text}</p>
            </article>
          ))}
        </section>

        <section className={`${styles.narrativeSection} scroll-section`} data-stagger="fast" data-motion="trust">
          <div className={`${styles.narrativeCopy} stagger-item`}>
            {service.legacyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {service.legacyChecklist.length ? (
            <aside className={`${styles.checklistPanel} stagger-item`}>
              <ul>
                {service.legacyChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {service.legacyFooterNote ? <p>{service.legacyFooterNote}</p> : null}
            </aside>
          ) : null}
        </section>

        <section className={`${styles.selectorBlock} stagger-item`}>
          <ServicesSelector />
        </section>
      </article>
    </SiteFrame>
  );
}
