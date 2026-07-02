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
  legacyParagraphs: string[];
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
    heroImage: "/site/fatel.jpg",
    heroAlt: "Servizio legacy Fatturazione Elettronica Fatel",
    icon: "invoice",
    legacySource: "servizi_fatel.html",
    legacyParagraphs: [
      "Grazie al software Fatel e possibile gestire volumi importanti di fatture emesse e ricevute con estrema semplicita.",
      "Con un solo clic puoi firmare, spedire e conservare i documenti in un flusso operativo unico.",
      "La piattaforma copre spesometro, liquidazioni IVA e integrazione con gestionali Zucchetti o altri ERP tramite connettori.",
    ],
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
    heroImage: "/site/backup.jpg",
    heroAlt: "Business continuity con backup automatico",
    icon: "continuity",
    legacySource: "servizi_backup.html",
    legacyParagraphs: [
      "Un backup giornaliero automatico protegge i dati e riduce il rischio operativo del business.",
      "In caso di emergenza, il server remoto e sempre pronto alla ripartenza.",
      "Basta una postazione connessa a internet per tornare rapidamente al pieno controllo.",
    ],
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
    heroImage: "/site/gestionali1.jpg",
    heroAlt: "Gestionale su misura Adhoc Revolution",
    icon: "erp",
    legacySource: "gestionale_azienda.html",
    legacyParagraphs: [
      "Come partner Zucchetti supportiamo vendita, assistenza e verticalizzazione di Adhoc Revolution per PMI.",
      "Copriamo processi critici come forza vendita, tentata vendita e picking merci con strumenti dedicati.",
      "Le verticalizzazioni includono cooperative agricole, produzione serre, legnami, fitofarmaci, mangimifici, oleifici e officine.",
    ],
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
    heroImage: "/site/monitor.jpg",
    heroAlt: "Tecnologia didattica e MEPA per scuole e PA",
    icon: "education",
    legacySource: "forniture_mepa.html",
    legacyParagraphs: [
      "Fornitore accreditato MEPA, ISA porta innovazione nelle scuole e nella pubblica amministrazione con esperienza consolidata.",
      "Progettiamo monitor interattivi, aule immersive e laboratori informatici con installazioni certificate.",
      "Realizziamo reti LAN e WiFi e forniamo software educational per un ecosistema didattico completo.",
    ],
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
    heroImage: "/site/firma-elettronica-blu.jpg",
    heroAlt: "Firma digitale e firma grafometrica",
    icon: "signature",
    legacySource: "firma_digitale.html",
    legacyParagraphs: [
      "La firma grafometrica rende piu rapido il flusso documentale, integrandosi direttamente nel gestionale.",
      "La soluzione e certificata eIDAS per garantire valore legale e affidabilita operativa.",
      "Attiviamo la firma digitale in tempi rapidi con onboarding guidato e supporto dedicato.",
    ],
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
    heroImage: "/site/whistleblowing_img.jpg",
    heroAlt: "Canale whistleblowing conforme al D.Lgs. 24/2023",
    icon: "whistleblowing",
    legacySource: "whistleblowing.html",
    legacyParagraphs: [
      "Il whistleblowing permette di segnalare illeciti in modo riservato e protetto, riducendo il rischio aziendale.",
      "Il D.Lgs. 24/2023 richiede un canale interno di segnalazione per diverse categorie di enti privati.",
      "La nostra offerta combina conformita normativa, tutela dei segnalanti e governance operativa continua.",
    ],
  },
];

export const premiumServiceSlugs = premiumServiceCatalog.map((service) => service.slug);

export const getPremiumServiceBySlug = (slug: string) =>
  premiumServiceCatalog.find((service) => service.slug === slug);
