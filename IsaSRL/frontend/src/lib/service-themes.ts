export type ServiceTheme = {
  slug: string;
  label: string;
  mood: string;
  accent: string;
  accentSoft: string;
  contrast: string;
  surface: string;
  glow: string;
  animationName: string;
  timelineTitle: string;
  signatureHeading: string;
  gallery: Array<{
    src: string;
    alt: string;
    label: string;
  }>;
  metrics: Array<{
    value: string;
    label: string;
  }>;
};

const fallbackTheme: ServiceTheme = {
  slug: "default",
  label: "Core Service",
  mood: "Affidabilita operativa",
  accent: "#1f6fce",
  accentSoft: "#74c2ff",
  contrast: "#cae8ff",
  surface: "linear-gradient(145deg, #0b3b71, #1f6fce)",
  glow: "rgba(74, 165, 255, 0.42)",
  animationName: "serviceWavePulse",
  timelineTitle: "Percorso di attivazione",
  signatureHeading: "Visual signature",
  gallery: [
    {
      src: "/site/premium-final/08-operations-platform.jpg",
      alt: "Piattaforma operativa",
      label: "Operations",
    },
    {
      src: "/site/premium-final/10-modular-architecture.jpg",
      alt: "Architettura modulare",
      label: "Architecture",
    },
    {
      src: "/site/premium-final/11-monitoring-delivery.jpg",
      alt: "Monitoraggio servizi",
      label: "Monitoring",
    },
  ],
  metrics: [
    { value: "99.9%", label: "Affidabilita target" },
    { value: "24/7", label: "Copertura operativa" },
    { value: "360", label: "Visione processo" },
  ],
};

export const serviceThemeBySlug: Record<string, ServiceTheme> = {
  "fatturazione-elettronica": {
    slug: "fatturazione-elettronica",
    label: "Finance Flow",
    mood: "Automazione fiscale",
    accent: "#1867d8",
    accentSoft: "#49c4ff",
    contrast: "#c4e7ff",
    surface: "linear-gradient(145deg, #0a2f69, #1e67d7)",
    glow: "rgba(65, 169, 255, 0.45)",
    animationName: "serviceInvoiceBeam",
    timelineTitle: "Pipeline fatture",
    signatureHeading: "Digital invoicing signature",
    gallery: [
      {
        src: "/site/fatel.jpg",
        alt: "Dashboard fatturazione elettronica",
        label: "Fatel Core",
      },
      {
        src: "/site/premium-final/06-digital-invoicing.jpg",
        alt: "Flusso digitale fatture",
        label: "Flow",
      },
      {
        src: "/site/premium-final/07-compliance-signature.jpg",
        alt: "Conformita documentale",
        label: "Compliance",
      },
    ],
    metrics: [
      { value: "1-Click", label: "Firma e invio" },
      { value: "IVA", label: "Controllo adempimenti" },
      { value: "SDI", label: "Interscambio monitorato" },
    ],
  },
  "business-continuity": {
    slug: "business-continuity",
    label: "Recovery Mesh",
    mood: "Resilienza immediata",
    accent: "#0f7ba8",
    accentSoft: "#42d0de",
    contrast: "#bdefff",
    surface: "linear-gradient(145deg, #0a4e73, #1385ad)",
    glow: "rgba(73, 212, 224, 0.44)",
    animationName: "serviceShieldSweep",
    timelineTitle: "Protocollo continuita",
    signatureHeading: "Resilience control room",
    gallery: [
      {
        src: "/site/backup.jpg",
        alt: "Servizio backup per business continuity",
        label: "Backup",
      },
      {
        src: "/site/premium-final/04-business-continuity.jpg",
        alt: "Business continuity enterprise",
        label: "Continuity",
      },
      {
        src: "/site/premium-final/11-monitoring-delivery.jpg",
        alt: "Monitoraggio infrastrutture",
        label: "Monitoring",
      },
    ],
    metrics: [
      { value: "RTO", label: "Ripartenza rapida" },
      { value: "Daily", label: "Backup automatico" },
      { value: "Remote", label: "Accesso emergenza" },
    ],
  },
  "gestionale-su-misura": {
    slug: "gestionale-su-misura",
    label: "ERP Fabric",
    mood: "Orchestrazione processi",
    accent: "#255ecf",
    accentSoft: "#8ba7ff",
    contrast: "#d7e4ff",
    surface: "linear-gradient(145deg, #203f8a, #4a71de)",
    glow: "rgba(128, 154, 255, 0.44)",
    animationName: "serviceGridScan",
    timelineTitle: "Roadmap verticalizzazione",
    signatureHeading: "ERP orchestration layer",
    gallery: [
      {
        src: "/site/gestionali1.jpg",
        alt: "Piattaforma gestionale su misura",
        label: "Adhoc Revolution",
      },
      {
        src: "/site/gestionali3.jpg",
        alt: "Workflow aziendale integrato",
        label: "Workflow",
      },
      {
        src: "/site/premium-final/10-modular-architecture.jpg",
        alt: "Architettura ERP modulare",
        label: "Modular ERP",
      },
    ],
    metrics: [
      { value: "ERP", label: "Core aziendale" },
      { value: "PMI", label: "Target operativo" },
      { value: "Live", label: "Sincronizzazione dati" },
    ],
  },
  "tecnologia-didattica": {
    slug: "tecnologia-didattica",
    label: "Campus Spark",
    mood: "Esperienze educative immersive",
    accent: "#0d76b5",
    accentSoft: "#64e0ff",
    contrast: "#c8f4ff",
    surface: "linear-gradient(145deg, #0d4f87, #1086c8)",
    glow: "rgba(100, 224, 255, 0.42)",
    animationName: "serviceClassroomOrbit",
    timelineTitle: "Percorso progetto scuola",
    signatureHeading: "Education innovation stack",
    gallery: [
      {
        src: "/site/monitor.jpg",
        alt: "Monitor didattici avanzati",
        label: "Interactive displays",
      },
      {
        src: "/site/aula-informatica1.jpg",
        alt: "Aula informatica moderna",
        label: "Digital classroom",
      },
      {
        src: "/site/premium-final/02-education-lab.jpg",
        alt: "Laboratorio didattico innovativo",
        label: "Education lab",
      },
    ],
    metrics: [
      { value: "MEPA", label: "Fornitore accreditato" },
      { value: "LAN/WiFi", label: "Connettivita" },
      { value: "DM 37/08", label: "Impianti certificati" },
    ],
  },
  "firma-digitale": {
    slug: "firma-digitale",
    label: "Trust Signature",
    mood: "Conformita documentale",
    accent: "#3a5bd3",
    accentSoft: "#98b1ff",
    contrast: "#d8e3ff",
    surface: "linear-gradient(145deg, #2d44a6, #4f6fe0)",
    glow: "rgba(145, 171, 255, 0.42)",
    animationName: "serviceSignatureTrace",
    timelineTitle: "Flusso di firma",
    signatureHeading: "Trusted signature experience",
    gallery: [
      {
        src: "/site/firma-elettronica-blu.jpg",
        alt: "Firma digitale per imprese",
        label: "Digital signature",
      },
      {
        src: "/site/firma-digitale-mini.png",
        alt: "Servizi firma grafometrica",
        label: "Grafometrica",
      },
      {
        src: "/site/premium-final/07-compliance-signature.jpg",
        alt: "Conformita e firma documentale",
        label: "Trust compliance",
      },
    ],
    metrics: [
      { value: "eIDAS", label: "Conformita" },
      { value: "Fast", label: "Attivazione rapida" },
      { value: "Smart", label: "Flusso paperless" },
    ],
  },
  whistleblowing: {
    slug: "whistleblowing",
    label: "Safe Channel",
    mood: "Compliance e tutela",
    accent: "#1372a9",
    accentSoft: "#7ce8ff",
    contrast: "#c6f2ff",
    surface: "linear-gradient(145deg, #0b4c79, #1383ba)",
    glow: "rgba(124, 232, 255, 0.44)",
    animationName: "serviceSignalPulse",
    timelineTitle: "Attivazione canale interno",
    signatureHeading: "Protected reporting channel",
    gallery: [
      {
        src: "/site/whistleblowing_img.jpg",
        alt: "Piattaforma whistleblowing",
        label: "Secure channel",
      },
      {
        src: "/site/whistleblowing_mini.jpg",
        alt: "Compliance whistleblowing",
        label: "Policy",
      },
      {
        src: "/site/premium-final/09-kpi-performance.jpg",
        alt: "Controllo processi compliance",
        label: "Governance",
      },
    ],
    metrics: [
      { value: "D.Lgs.24", label: "Normativa" },
      { value: "UE 1937", label: "Direttiva" },
      { value: "Safe", label: "Tutela segnalante" },
    ],
  },
};

export const getServiceTheme = (slug: string): ServiceTheme =>
  serviceThemeBySlug[slug] ?? fallbackTheme;
