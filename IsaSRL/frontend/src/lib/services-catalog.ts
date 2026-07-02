export type ServiceIconKey =
  | "invoice"
  | "continuity"
  | "erp"
  | "education"
  | "signature"
  | "whistleblowing";

export type ServiceCatalogItem = {
  slug: string;
  title: string;
  menuLabel: string;
  shortLabel: string;
  eyebrow: string;
  teaser: string;
  description: string;
  highlights: string[];
  deliverables: string[];
  heroImage: string;
  heroAlt: string;
  icon: ServiceIconKey;
  legacySource: string;
};

export const premiumServiceCatalog: ServiceCatalogItem[] = [
  {
    slug: "fatturazione-elettronica",
    title: "Fatturazione elettronica",
    menuLabel: "Fatturazione Elettronica",
    shortLabel: "Fatturazione",
    eyebrow: "Ciclo digitale",
    teaser:
      "Firma, invio, conservazione e interscambio in un flusso unico con integrazione Zucchetti.",
    description:
      "Dalla storica esperienza Fatel: gestione volumi elevati di fatture emesse/ricevute, dashboard operativa e pieno controllo fiscale con un'esperienza utente moderna.",
    highlights: [
      "Firma e invio in un clic",
      "Conservazione sostitutiva",
      "Spesometro e liquidazioni IVA",
      "Connettori con gestionali esterni",
    ],
    deliverables: [
      "Configurazione completa ambiente Fatel e profili utente.",
      "Workflow documentale guidato per emissione e ricezione.",
      "Monitoraggio stato fatture e gestione eccezioni.",
      "Formazione operativa per team amministrativo.",
    ],
    heroImage: "/site/premium-final/07-compliance-signature.jpg",
    heroAlt: "Pannello fatturazione elettronica e firma digitale",
    icon: "invoice",
    legacySource: "servizi_fatel.html",
  },
  {
    slug: "business-continuity",
    title: "Business continuity",
    menuLabel: "Business Continuity",
    shortLabel: "Continuity",
    eyebrow: "Resilienza operativa",
    teaser:
      "Backup automatico verificato, archiviazione certificata e server cloud pronto al failover.",
    description:
      "Dalla storica pagina servizi_backup: policy di continuita con ripartenza rapida da qualsiasi postazione connessa a internet.",
    highlights: [
      "Backup giornaliero automatico",
      "Disaster recovery pronto all'uso",
      "Server cloud di emergenza",
      "Ripartenza rapida post incidente",
    ],
    deliverables: [
      "Assessment rischio dati e mappa criticita operative.",
      "Piano backup multi-livello con verifica periodica.",
      "Runbook di emergenza con tempi RTO/RPO definiti.",
      "Simulazioni di recovery e report di affidabilita.",
    ],
    heroImage: "/site/premium-final/04-business-continuity.jpg",
    heroAlt: "Infrastruttura cloud per business continuity",
    icon: "continuity",
    legacySource: "servizi_backup.html",
  },
  {
    slug: "gestionale-su-misura",
    title: "Gestionale su misura",
    menuLabel: "Gestionale su Misura",
    shortLabel: "Gestionale",
    eyebrow: "Controllo processi",
    teaser:
      "Contabilita, documenti, magazzino, produzione e forza vendita in una piattaforma unica.",
    description:
      "Ispirato alla legacy gestionale_azienda: verticalizzazioni per PMI, cooperative e aziende con processi complessi e forte esigenza di governance.",
    highlights: [
      "ERP personalizzato per settore",
      "Workflow documentale completo",
      "Controllo magazzino e produzione",
      "KPI e dashboard decisionali",
    ],
    deliverables: [
      "Analisi processi e blueprint applicativo su misura.",
      "Configurazione moduli ERP e integrazione dati legacy.",
      "Automazione documenti, ordini e cicli approvativi.",
      "Onboarding utente con supporto post go-live.",
    ],
    heroImage: "/site/premium-final/08-operations-platform.jpg",
    heroAlt: "Dashboard gestionale aziendale",
    icon: "erp",
    legacySource: "gestionale_azienda.html",
  },
  {
    slug: "tecnologia-didattica",
    title: "Tecnologia didattica",
    menuLabel: "Tecnologia Didattica",
    shortLabel: "Didattica",
    eyebrow: "Education e PA",
    teaser:
      "Forniture su rete MEPA, ambienti didattici digitali e supporto tecnico post attivazione.",
    description:
      "Dal patrimonio forniture_mepa: spazi formativi moderni, dispositivi interattivi, networking e governance delivery per scuole ed enti pubblici.",
    highlights: [
      "Forniture certificate MEPA",
      "Aule e laboratori digitali",
      "Installazione e collaudo",
      "Supporto tecnico continuativo",
    ],
    deliverables: [
      "Progettazione tecnica di aule immersive e laboratori.",
      "Fornitura hardware e software con installazione certificata.",
      "Piano adozione docenti e personale amministrativo.",
      "Assistenza post consegna con SLA condivisi.",
    ],
    heroImage: "/site/premium-final/02-education-lab.jpg",
    heroAlt: "Aula digitale con tecnologia didattica",
    icon: "education",
    legacySource: "forniture_mepa.html",
  },
  {
    slug: "firma-digitale",
    title: "Firma digitale",
    menuLabel: "Firma Digitale",
    shortLabel: "Firma",
    eyebrow: "Compliance documentale",
    teaser:
      "Attivazione, rinnovo e gestione firma digitale per processi paperless con valore legale.",
    description:
      "Servizio dedicato alla dematerializzazione documentale: onboarding rapido, policy chiare e supporto operativo su workflow legali e amministrativi.",
    highlights: [
      "Attivazione rapida",
      "Validita legale garantita",
      "Workflow paperless",
      "Supporto rinnovi e policy",
    ],
    deliverables: [
      "Setup firma remota o token fisico con verifica identita.",
      "Integrazione firma in flussi approvativi aziendali.",
      "Gestione scadenze certificati e piani rinnovo.",
      "Supporto tecnico e normativo continuativo.",
    ],
    heroImage: "/site/premium-final/07-compliance-signature.jpg",
    heroAlt: "Firma digitale e conformita normativa",
    icon: "signature",
    legacySource: "firma_digitale.html",
  },
  {
    slug: "whistleblowing",
    title: "Whistleblowing",
    menuLabel: "Whistleblowing",
    shortLabel: "Whistleblowing",
    eyebrow: "Canali protetti",
    teaser:
      "Canale segnalazioni conforme, tracciato e sicuro per aziende ed enti soggetti a normativa.",
    description:
      "Soluzione completa per gestione segnalazioni interne con riservatezza, audit trail e controllo dei tempi di presa in carico.",
    highlights: [
      "Conformita normativa",
      "Canale sicuro e anonimo",
      "Audit trail completo",
      "Governance segnalazioni",
    ],
    deliverables: [
      "Attivazione piattaforma e policy operative dedicate.",
      "Definizione ruoli, livelli accesso e processo escalation.",
      "Formazione incaricati e monitoraggio KPI compliance.",
      "Supporto aggiornamenti normativi e reportistica.",
    ],
    heroImage: "/site/premium-final/06-security-compliance.jpg",
    heroAlt: "Piattaforma whistleblowing conforme",
    icon: "whistleblowing",
    legacySource: "whistleblowing.html",
  },
];

export const premiumServiceSlugs = premiumServiceCatalog.map((service) => service.slug);

export const getPremiumServiceBySlug = (slug: string) =>
  premiumServiceCatalog.find((service) => service.slug === slug);
