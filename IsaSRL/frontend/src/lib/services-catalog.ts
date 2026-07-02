export type ServiceIconKey =
  | "invoice"
  | "continuity"
  | "erp"
  | "education"
  | "signature"
  | "whistleblowing";

export type ServiceLegacySection = {
  title: string;
  text: string;
};

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
  legacySections: ServiceLegacySection[];
  legacyChecklist: string[];
  legacyFooterNote?: string;
};

export const premiumServiceCatalog: ServiceCatalogItem[] = [
  {
    slug: "fatturazione-elettronica",
    title: "Fatturazione elettronica",
    menuLabel: "Fatturazione Elettronica",
    shortLabel: "Fatturazione",
    eyebrow: "Ciclo digitale",
    teaser: "Firma, invio, conservazione e interscambio in un flusso unico.",
    description: "Contenuto estratto da servizi_fatel.html (legacy ISA).",
    highlights: [
      "Software Fatel",
      "Firma e invio in un clic",
      "Spesometro e liquidazioni IVA",
      "Connettori gestionali",
    ],
    deliverables: [
      "Gestione volumi elevati di fatture emesse e ricevute.",
      "Firma, spedizione e conservazione in un unico flusso.",
      "Supporto ad adempimenti IVA e interscambio.",
      "Integrazione con software Zucchetti e altri ERP.",
    ],
    heroImage: "/site/fatel.jpg",
    heroAlt: "Servizio legacy Fatturazione Elettronica Fatel",
    icon: "invoice",
    legacySource: "servizi_fatel.html",
    legacyParagraphs: [
      "In un mondo che si evolve rapidamente, Zucchetti offre soluzioni per una gestione digitale completa delle fatture.",
      "Grazie al software Fatel si possono gestire importanti volumi di fatture emesse e ricevute con estrema semplicita.",
    ],
    legacySections: [
      {
        title: "Workflow con un clic",
        text: "Basta un solo clic per firmare, spedire e conservare i documenti attraverso una interfaccia user friendly.",
      },
      {
        title: "Adempimenti fiscali",
        text: "Il servizio consente di gestire spesometro e liquidazioni IVA nello stesso flusso operativo.",
      },
      {
        title: "Integrazione gestionale",
        text: "Il software e predisposto per collegarsi ai gestionali Zucchetti e, tramite connettori, anche ad altri gestionali.",
      },
    ],
    legacyChecklist: [],
  },
  {
    slug: "business-continuity",
    title: "Business continuity",
    menuLabel: "Business Continuity",
    shortLabel: "Continuity",
    eyebrow: "Resilienza operativa",
    teaser: "Backup automatico e server remoto pronto in emergenza.",
    description: "Contenuto estratto da servizi_backup.html (legacy ISA).",
    highlights: [
      "Backup giornaliero automatico",
      "Server remoto pronto",
      "Ripartenza rapida",
      "Accesso via internet",
    ],
    deliverables: [
      "Protezione dati con backup giornaliero automatico.",
      "Server remoto disponibile in caso di emergenza.",
      "Ripartenza operativa da qualsiasi postazione connessa.",
      "Controllo rapido dei dati critici.",
    ],
    heroImage: "/site/backup.jpg",
    heroAlt: "Business continuity con backup automatico",
    icon: "continuity",
    legacySource: "servizi_backup.html",
    legacyParagraphs: [
      "Grazie a un backup giornaliero automatico, il tuo business non teme sorprese.",
      "In caso di emergenza il server remoto e sempre pronto: basta un PC connesso a internet per riavere il controllo dei dati.",
    ],
    legacySections: [
      {
        title: "Protezione continua",
        text: "Il servizio riduce il rischio operativo grazie a una strategia di backup costante.",
      },
      {
        title: "Ripartenza rapida",
        text: "In caso di incidente, il ripristino avviene in tempi brevi tramite infrastruttura remota.",
      },
    ],
    legacyChecklist: [
      "Backup giornaliero automatico",
      "Server remoto pronto in emergenza",
      "Accesso ai dati da postazioni connesse a internet",
    ],
  },
  {
    slug: "gestionale-su-misura",
    title: "Gestionale su misura",
    menuLabel: "Gestionale su Misura",
    shortLabel: "Gestionale",
    eyebrow: "Controllo processi",
    teaser: "Adhoc Revolution con verticalizzazioni gia collaudate per PMI.",
    description: "Contenuto estratto da gestionale_azienda.html (legacy ISA).",
    highlights: [
      "Adhoc Revolution Zucchetti",
      "Verticalizzazioni per settore",
      "Forza vendita e logistica",
      "Produzione e magazzino",
    ],
    deliverables: [
      "Vendita, assistenza e verticalizzazione del gestionale.",
      "Esperienza su processi commerciali, logistici e produttivi.",
      "Soluzioni gia realizzate e ampiamente collaudate.",
      "Supporto per ambiti specifici ad alta complessita.",
    ],
    heroImage: "/site/gestionali1.jpg",
    heroAlt: "Gestionale su misura Adhoc Revolution",
    icon: "erp",
    legacySource: "gestionale_azienda.html",
    legacyParagraphs: [
      "Concessionario e partner Zucchetti con attenzione alle esigenze del cliente finale.",
      "Offriamo vendita, assistenza e verticalizzazione di Adhoc Revolution, uno dei gestionali piu diffusi tra le piccole e medie imprese.",
      "Il programma punta ad aumentare efficienza e dinamicita aziendale con soluzioni specifiche gia collaudate.",
    ],
    legacySections: [
      {
        title: "Forza Vendita",
        text: "Strumento per agenti di vendita con funzioni analitiche e sincronizzazione con il sistema centrale su tablet Windows.",
      },
      {
        title: "Tentata Vendita",
        text: "Gestione della vendita diretta con emissione DDT, fatture, registrazione incassi e gestione lotti su palmare industriale.",
      },
      {
        title: "Picking Merci",
        text: "Supporto al magazziniere per evasione ordini, inventario e movimentazione merci con lotti e ubicazioni.",
      },
      {
        title: "Cooperative Agricole",
        text: "Gestione del prodotto dal conferimento alla vendita, liquidazione soci e quaderno di campagna.",
      },
      {
        title: "Produzione Serre",
        text: "Controllo delle fasi produttive, coordinazione operatori, packing list e gestione magazzino merce grezza e sfrido.",
      },
      {
        title: "Legnami",
        text: "Gestione del prodotto anche in metri cubi e metri lineari per agevolare vendita e movimentazione.",
      },
      {
        title: "Fitofarmaci",
        text: "Tracciamento e gestione dei prodotti fitofarmaci secondo normativa.",
      },
      {
        title: "Mangimifici",
        text: "Distinta base dinamica per creazione prodotto ed etichetta conforme.",
      },
      {
        title: "Oleifici",
        text: "Gestione dinamica dei registri SIAN.",
      },
      {
        title: "Sementi Elette",
        text: "Gestione dinamica dei registri dedicati alle sementi elette.",
      },
      {
        title: "Officina Meccanica",
        text: "Gestione commesse di lavorazione, storico automezzi e pianificazione manutenzioni.",
      },
    ],
    legacyChecklist: [],
  },
  {
    slug: "tecnologia-didattica",
    title: "Tecnologia didattica",
    menuLabel: "Tecnologia Didattica",
    shortLabel: "Didattica",
    eyebrow: "Education e PA",
    teaser: "Forniture MEPA e innovazione tecnologica per scuole e PA.",
    description: "Contenuto estratto da forniture_mepa.html (legacy ISA).",
    highlights: [
      "Forniture certificate MEPA",
      "Aule e laboratori digitali",
      "Reti LAN e WiFi",
      "Software educational",
    ],
    deliverables: [
      "Fornitore accreditato MEPA per la pubblica amministrazione.",
      "Progettazione e installazione di ambienti didattici innovativi.",
      "Impianti a norma con certificazione DM 37/08.",
      "Fornitura diretta software educational.",
    ],
    heroImage: "/site/monitor.jpg",
    heroAlt: "Tecnologia didattica e MEPA per scuole e PA",
    icon: "education",
    legacySource: "forniture_mepa.html",
    legacyParagraphs: [
      "Fornitore accreditato MePA, da anni al servizio della pubblica amministrazione.",
      "Esperienza e capacita per portare innovazione tecnologica nelle scuole.",
    ],
    legacySections: [
      {
        title: "Monitor interattivi e aule immersive",
        text: "Ricerca continua dei prodotti piu innovativi con massima cura in installazione e manutenzione.",
      },
      {
        title: "Aule informatiche",
        text: "Progettazione, realizzazione e fornitura delle componenti tecnologiche con impianti a norma e certificazione DM 37/08.",
      },
      {
        title: "Reti Internet",
        text: "Esperienza nella progettazione e realizzazione di impianti LAN e WiFi per garantire connettivita.",
      },
      {
        title: "Software Educational",
        text: "Fornitore certificato Microsoft con vendita diretta di soluzioni software per la didattica.",
      },
    ],
    legacyChecklist: [],
  },
  {
    slug: "firma-digitale",
    title: "Firma digitale",
    menuLabel: "Firma Digitale",
    shortLabel: "Firma",
    eyebrow: "Compliance documentale",
    teaser: "Firma grafometrica e firma digitale con attivazione rapida.",
    description: "Contenuto estratto da firma_digitale.html e prodotti_digitali.html (legacy ISA).",
    highlights: [
      "Fornitore accreditato Namirial",
      "Fornitore accreditato Edatalia",
      "Firma grafometrica DDT",
      "Attivazione in pochi minuti",
    ],
    deliverables: [
      "Attivazione firma digitale con onboarding guidato.",
      "Soluzione integrata nel gestionale per firma grafometrica.",
      "Supporto su documenti e prerequisiti di attivazione.",
      "Percorso operativo semplice per aziende e professionisti.",
    ],
    heroImage: "/site/firma-elettronica-blu.jpg",
    heroAlt: "Firma digitale e firma grafometrica",
    icon: "signature",
    legacySource: "firma_digitale.html",
    legacyParagraphs: [
      "Stanco della carta? Segui l'innovazione con la firma grafometrica dei tuoi documenti di trasporto.",
      "Una soluzione innovativa e immediata, integrata nel gestionale, sicura e affidabile, con certificazione eIDAS a garanzia giuridica.",
      "Attiva la tua firma digitale in pochi minuti: ti aspettiamo in negozio.",
    ],
    legacySections: [
      {
        title: "Firma grafometrica documenti di trasporto",
        text: "Rendi smart le consegne con firma digitale online e integrazione nel flusso gestionale.",
      },
      {
        title: "Firma Digitale Namirial",
        text: "Attivazione rapida del servizio con assistenza in fase di avvio.",
      },
    ],
    legacyChecklist: [
      "Documento di identita valido",
      "Codice fiscale",
      "Numero di cellulare",
      "Email",
      "PEC",
    ],
    legacyFooterNote: "Ti aspettiamo in negozio.",
  },
  {
    slug: "whistleblowing",
    title: "Whistleblowing",
    menuLabel: "Whistleblowing",
    shortLabel: "Whistleblowing",
    eyebrow: "Canali protetti",
    teaser: "Canale segnalazioni riservato e conforme alla normativa.",
    description: "Contenuto estratto da whistleblowing.html (legacy ISA).",
    highlights: [
      "Conformita normativa",
      "Canale sicuro e anonimo",
      "Tutela segnalante",
      "Adozione canale interno",
    ],
    deliverables: [
      "Implementazione del canale interno di segnalazione.",
      "Allineamento al D.Lgs. 24/2023 e Direttiva UE 2019/1937.",
      "Supporto organizzativo per la gestione delle segnalazioni.",
      "Tutela estesa a dipendenti e altri soggetti coinvolti.",
    ],
    heroImage: "/site/whistleblowing_img.jpg",
    heroAlt: "Canale whistleblowing conforme al D.Lgs. 24/2023",
    icon: "whistleblowing",
    legacySource: "whistleblowing.html",
    legacyParagraphs: [
      "Il whistleblowing e uno strumento di compliance aziendale con cui segnalare in modo riservato eventuali illeciti, violazioni, frodi o situazioni di pericolo.",
      "Il whistleblower e la persona che segnala un illecito, una frode o un pericolo rilevato all'interno del contesto lavorativo.",
    ],
    legacySections: [
      {
        title: "Obbligo normativo",
        text: "Il D.Lgs. 24/2023 recepisce la Direttiva UE 2019/1937 e richiede l'adozione di un canale interno di segnalazione.",
      },
      {
        title: "Scadenza di adozione",
        text: "Le aziende interessate dovevano adottare il canale interno entro il 17/12/2023.",
      },
      {
        title: "Tutela estesa",
        text: "La tutela non riguarda solo dipendenti ma anche collaboratori autonomi, professionisti, volontari, azionisti e amministratori.",
      },
    ],
    legacyChecklist: [
      "Enti privati con media oltre 50 dipendenti nell'ultimo anno",
      "Enti privati con modello organizzativo ex D.Lgs. 231/2001, anche con meno di 50 dipendenti",
    ],
    legacyFooterNote: "Scopri la nostra offerta.",
  },
];

export const premiumServiceSlugs = premiumServiceCatalog.map((service) => service.slug);

export const getPremiumServiceBySlug = (slug: string) =>
  premiumServiceCatalog.find((service) => service.slug === slug);
