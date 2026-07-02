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
  routeAliases?: string[];
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
  legacySources?: string[];
  legacyParagraphs: string[];
  legacySections: ServiceLegacySection[];
  legacyChecklist: string[];
  legacyFooterNote?: string;
};

export const premiumServiceCatalog: ServiceCatalogItem[] = [
  {
    slug: "fatturazione-elettronica",
    routeAliases: [
      "servizi-fatel",
      "servizi_fatel",
      "servizi_fatel.html",
      "servizi-fatel.html",
      "fatel",
      "fatel.html",
      "fatturazione",
      "fatturazione-elettronica",
      "fatturazioneelettronica",
      "fatturazione-eletronica",
      "faturazione-elettronica",
      "fatture-elettroniche",
      "fatturazione-pa",
    ],
    title: "Fatturazione elettronica",
    menuLabel: "Fatturazione Elettronica",
    shortLabel: "Fatturazione",
    eyebrow: "Ciclo digitale",
    teaser: "Firma, invio, conservazione e interscambio in un flusso unico.",
    description: "Contenuto estratto dai file legacy servizi_fatel.html presenti in SITO ISASRL e isasrl.it.",
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
    legacySources: ["SITO ISASRL/servizi_fatel.html", "SITO ISASRL/isasrl.it/servizi_fatel.html"],
    legacyParagraphs: [
      "In un mondo che si evolve rapidamente Zucchetti offre le suluzioni del domani.",
      "Grazie al Software Fatel si possono gestire importanti volumi di fatture emesse e ricevute con estrema semplicità.",
      "Basterà un solo clic per firmare, spedire, conservare, grazie ad una moderna interfaccia user friendly, inoltre consente di gestire lo spesometro e le liquidazioni IVA.",
      "Il software è predisposto per collegarsi ai gestionali della famiglia Zucchetti, con degli opportuni connettori può anche essere collegato ad altri gestionali.",
    ],
    legacySections: [
      {
        title: "Software Fatel",
        text: "Consente la gestione di importanti volumi di fatture emesse e ricevute con estrema semplicità operativa.",
      },
      {
        title: "Workflow completo",
        text: "Con un solo clic puoi firmare, spedire e conservare con una moderna interfaccia user friendly.",
      },
      {
        title: "Spesometro e IVA",
        text: "La piattaforma consente di gestire lo spesometro e le liquidazioni IVA nello stesso flusso.",
      },
      {
        title: "Connettori gestionali",
        text: "Il software è predisposto per collegarsi ai gestionali della famiglia Zucchetti e anche ad altri gestionali.",
      },
    ],
    legacyChecklist: [],
  },
  {
    slug: "business-continuity",
    routeAliases: [
      "business-continue",
      "business-continuity",
      "businesscontinue",
      "busines-continue",
      "busines-continuity",
      "servizi-backup",
      "servizi_backup",
      "servizi_backup.html",
      "servizi-backup.html",
      "backup",
      "bckup",
      "business-continuite",
    ],
    title: "Business continuity",
    menuLabel: "Business Continuity",
    shortLabel: "Continuity",
    eyebrow: "Resilienza operativa",
    teaser: "Backup automatico e server remoto pronto in emergenza.",
    description: "Contenuto estratto dai file legacy servizi_backup.html presenti in SITO ISASRL e isasrl.it.",
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
    legacySources: ["SITO ISASRL/servizi_backup.html", "SITO ISASRL/isasrl.it/servizi_backup.html"],
    legacyParagraphs: [
      "Grazie ad un backup giornaliero automatico il tuo business non teme sorprese.",
      "In caso di emergenza il server remoto è sempre pronto, basta un pc connesso ad internet per riavere il controllo dei tuoi dati.",
    ],
    legacySections: [
      {
        title: "Backup giornaliero automatico",
        text: "Il servizio protegge la continuità operativa con un backup giornaliero automatico.",
      },
      {
        title: "Server remoto sempre pronto",
        text: "In caso di emergenza il server remoto è pronto e accessibile da un pc connesso ad internet.",
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
    routeAliases: [
      "gestionale-azienda",
      "gestionale_azienda",
      "gestionale_azienda.html",
      "gestionaleaziendale",
      "gestionale-su-misura",
      "gestionale-sumisura",
      "adhoc-revolution",
      "ad-hoc-revolution",
      "adhocrevolution",
      "adoc-revolution",
    ],
    title: "Gestionale su misura",
    menuLabel: "Gestionale su Misura",
    shortLabel: "Gestionale",
    eyebrow: "Controllo processi",
    teaser: "Adhoc Revolution con verticalizzazioni gia collaudate per PMI.",
    description: "Contenuto estratto dai file legacy gestionale_azienda.html presenti in SITO ISASRL e isasrl.it.",
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
    legacySources: ["SITO ISASRL/gestionale_azienda.html", "SITO ISASRL/isasrl.it/gestionale_azienda.html"],
    legacyParagraphs: [
      "Concessionario e partner Zucchetti con grande attenzione all'esigenze del cliente finale, offrimo la vendita, l'assistenza e la verticalizzazione del gestionale più diffuso tra le piccole e medie imprese Adhoc Revolution.",
      "Un programma che mira ad aumentare l'efficenza e la dinamicità dell'azienda, inoltre mettiamo a disposizione tutta la nostra esperienza in vari ambiti specifici con suluzioni già realizzate e ampiamente collaudate.",
    ],
    legacySections: [
      {
        title: "Forza Vendita",
        text: "Strumento al servizio dell'Agente di Vendita, con funzioni analitiche di gestione e alta efficenza di sincronizzazione con il sistema centrale, realizzata su tablet windows.",
      },
      {
        title: "Tentata Vendita",
        text: "Gestione della vendita diretta con possibilità di emettere DDT, Fatture e registrare incassi, con gestione lotti e funzioni analitiche di supporto alla vendita, su palmare industriale.",
      },
      {
        title: "Picking Merci",
        text: "Studiato per supportare il magazziniere nelle fasi di evasione ordini, rilevazione inventariale e movimentazione merci, con gestione lotti e ubicazioni, su palmare industriale.",
      },
      {
        title: "Cooperative Agricole",
        text: "Vasta verticalizzazione che consente di gestire i prodotti dal conferimento alla vendita, gestendo la liquidazione dei soci, il quaderno di campagna, e molto altro.",
      },
      {
        title: "Produzione Serre",
        text: "Gestione delle fasi di realizzazione, con particolare attenzione alla coordinazione degli operatori e delle lavorazioni, con generazione packing list, saldi di magazzino per la merce grezza e sfrido dei materiali.",
      },
      {
        title: "Legnami",
        text: "Consente di trattare il prodotto anche in Mt Cubi e Mt lineari per agevolare la vendita e la movimenzazione dei legnami.",
      },
      {
        title: "Fitofarmaci",
        text: "Consente di tracciare è gestire i prodotti fitofarmaci secondo le norme di legge.",
      },
      {
        title: "Mangimifici",
        text: "Grazie a una distinta base dinamica consente di gestire la creazione del prodotto e l'etichetta a norma di legge.",
      },
      {
        title: "Oleifici",
        text: "Consente di gestire dinamicamente i registri SIAN.",
      },
      {
        title: "Sementi Elette",
        text: "Consente di gestire dinamicamente i registri Sementi Elette.",
      },
      {
        title: "Officina Meccanica",
        text: "Ampia verticalizzazione che comprende la gestione delle commesse di lavorazione con la possibilità di tracciare uno storico degli automezzi e di pianificare le manutenzioni.",
      },
    ],
    legacyChecklist: [],
  },
  {
    slug: "tecnologia-didattica",
    routeAliases: [
      "forniture-mepa",
      "forniture_mepa",
      "forniture_mepa.html",
      "fornituremepa",
      "mepa",
      "mepa-acquisti",
      "acquisti-in-rete-pa",
      "tecnologia-didattica",
      "tecnologiadidattica",
      "tecnologia-didatica",
    ],
    title: "Tecnologia didattica",
    menuLabel: "Tecnologia Didattica",
    shortLabel: "Didattica",
    eyebrow: "Education e PA",
    teaser: "Forniture MEPA e innovazione tecnologica per scuole e PA.",
    description: "Contenuto estratto dai file legacy forniture_mepa.html presenti in SITO ISASRL e isasrl.it.",
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
    legacySources: ["SITO ISASRL/forniture_mepa.html", "SITO ISASRL/isasrl.it/forniture_mepa.html"],
    legacyParagraphs: [
      "Fornitore Accreditato MePa, da anni al servizio della pubblica amministrazione, abbiamo la capicità e l'esperienza di portare innovazione nelle scuole.",
    ],
    legacySections: [
      {
        title: "Monitor interattivi e aule immersive",
        text: "Sempre all'avanguardia grazie alla continua ricerca dei prodotti più innovativi, massima cura nell'istallazione e manutenzione.",
      },
      {
        title: "Aule informatiche",
        text: "Progettazione e realizzazione e fornitura di tutte le componenti tecnologiche con impianti a norma di legge e certificazione DM 37/08.",
      },
      {
        title: "Reti Internet",
        text: "Vasta esperienza nella progettazione e realizzazone d' impianti Lan e Wifi per garantire la massima connettività.",
      },
      {
        title: "Software Educational",
        text: "Fornitore certificato Microsoft, offriamo vendita diretta.",
      },
    ],
    legacyChecklist: [],
  },
  {
    slug: "firma-digitale",
    routeAliases: [
      "prodotti-digitali",
      "prodotti_digitali",
      "prodotti_digitali.html",
      "prodottidigitali",
      "firma",
      "firma-digitale",
      "firma_digitale",
      "firma_digitale.html",
      "firmadigitale",
      "firma-grafometrica",
      "firma-elettronica",
    ],
    title: "Firma digitale",
    menuLabel: "Firma Digitale",
    shortLabel: "Firma",
    eyebrow: "Compliance documentale",
    teaser: "Firma grafometrica e firma digitale con attivazione rapida.",
    description: "Contenuto estratto dai file legacy firma_digitale.html e prodotti_digitali.html presenti in SITO ISASRL e isasrl.it.",
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
    legacySources: [
      "SITO ISASRL/firma_digitale.html",
      "SITO ISASRL/prodotti_digitali.html",
      "SITO ISASRL/isasrl.it/firma_digitale.html",
      "SITO ISASRL/isasrl.it/prodotti_digitali.html",
    ],
    legacyParagraphs: [
      "Stanco della Carta ?",
      "Segui l'innovazione con la firma grafometrica dei tuoi Documenti di Trasporto.",
      "Una soluzione innovativa e immediata, integrata nel tuo gestionale.",
      "Sicura e affidabile, con certificazione eIDAS a garanzia giuridica.",
      "Rendi smart le tue consegne, passa a Firmar Online !",
      "Attiva la tua firma digitale in pochi minuti !",
      "Ti aspettiamo in negozio.",
      "E' necessario un documento d'identità valido, codice Fiscale, smartphone, mail e PEC.",
      "E' necessario un documento d'identità valido, codice Fiscale, numero di cellulare, mail e PEC.",
    ],
    legacySections: [
      {
        title: "Firma grafometrica",
        text: "Soluzione innovativa e immediata integrata nel gestionale, con certificazione eIDAS a garanzia giuridica.",
      },
      {
        title: "Firma Digitale Namirial",
        text: "Attivazione della firma digitale in pochi minuti presso il nostro negozio con supporto dedicato.",
      },
      {
        title: "Fornitore accreditato Edatalia",
        text: "Percorso dedicato alla firma grafometrica dei Documenti di Trasporto con flusso digitale completo.",
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
    routeAliases: [
      "whistle-blowing",
      "whistleblowing",
      "whistleblowing.html",
      "whisteblowing",
      "wistleblowing",
      "whistleblowin",
    ],
    title: "Whistleblowing",
    menuLabel: "Whistleblowing",
    shortLabel: "Whistleblowing",
    eyebrow: "Canali protetti",
    teaser: "Canale segnalazioni riservato e conforme alla normativa.",
    description: "Contenuto estratto dai file legacy whistleblowing.html presenti in SITO ISASRL e isasrl.it.",
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
    legacySources: ["SITO ISASRL/whistleblowing.html", "SITO ISASRL/isasrl.it/whistleblowing.html"],
    legacyParagraphs: [
      "Il Whistleblowing è uno strumento di compliance aziendale, tramite il quale è possibile segnalare, in modo riservato e protetto, eventuali illeciti riscontrati, quali violazioni di leggi o regolamenti, reati e casi di corruzione o frode, oltre a situazioni di pericolo per la salute e la sicurezza pubblica.",
      "Il whistleblower (colui che segnala) è quindi una persona che segnala un illecito, una frode o un pericolo che ha rilevato.",
      "Adottare un sistema di Whistleblowing è oggi un obbligo, infatti il D.Lgs. 24/2023 ha recepito la Direttiva UE 2019/1937, ponendo a carico delle aziende l'adozione entro il 17/12/2023 di un canale di segnalazione interno di eventuali illeciti.",
      "La normativa estende la tutela, in precedenza prevista per i soli dipendenti, anche a collaboratori autonomi, liberi professionisti, volontari, azionisti e amministratori.",
      "Scopri la Nostra Offerta !",
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

const normalizeServiceSlug = (value: unknown) => {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^\/+|\/+$/g, "")
    .replace(/^servizi\//, "")
    .replace(/\.(html?|php|asp)$/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
  };

  const compactServiceSlug = (value: unknown) => normalizeServiceSlug(value).replace(/[^a-z0-9]/g, "");

export const premiumServiceRouteSlugs = Array.from(
  new Set(
    premiumServiceCatalog.flatMap((service) => [service.slug, ...(service.routeAliases ?? [])].map(normalizeServiceSlug))
  )
);

const serviceLookup = new Map<string, ServiceCatalogItem>();
const lookupKeysByService = new Map<string, Set<string>>();

premiumServiceCatalog.forEach((service) => {
  const keys = new Set<string>();
  [service.slug, ...(service.routeAliases ?? [])].forEach((candidate) => {
    const normalized = normalizeServiceSlug(candidate);
    const compact = compactServiceSlug(candidate);

    if (normalized) {
      keys.add(normalized);
      serviceLookup.set(normalized, service);
    }

    if (compact) {
      keys.add(compact);
      serviceLookup.set(compact, service);
    }
  });

  lookupKeysByService.set(service.slug, keys);
});

const levenshteinDistance = (a: string, b: string) => {
  if (a === b) {
    return 0;
  }

  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) {
    matrix[i][0] = i;
  }

  for (let j = 0; j < cols; j += 1) {
    matrix[0][j] = j;
  }

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[rows - 1][cols - 1];
};

const serviceKeywordHints: Record<string, string[]> = {
  "fatturazione-elettronica": ["fatel", "fattur", "fatture", "elettron"],
  "business-continuity": ["backup", "continu", "busines", "serverremoto"],
  "gestionale-su-misura": ["gestionale", "adhoc", "zucchetti", "forzavendita"],
  "tecnologia-didattica": ["mepa", "forniture", "didatt", "acquistiinrete"],
  "firma-digitale": ["firma", "prodottidigitali", "namirial", "edatalia"],
  whistleblowing: ["whistle", "blowing", "segnal", "illecit"],
};

const findServiceByKeywords = (compactInput: string) => {
  const match = premiumServiceCatalog.find((service) =>
    (serviceKeywordHints[service.slug] ?? []).some((hint) => compactInput.includes(hint))
  );

  return match;
};

const findClosestService = (compactInput: string) => {
  if (!compactInput) {
    return undefined;
  }

  let bestService: ServiceCatalogItem | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;

  premiumServiceCatalog.forEach((service) => {
    const keys = lookupKeysByService.get(service.slug);
    if (!keys) {
      return;
    }

    keys.forEach((key) => {
      const compactKey = key.replace(/[^a-z0-9]/g, "");
      if (!compactKey) {
        return;
      }

      const distance = levenshteinDistance(compactInput, compactKey);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestService = service;
      }
    });
  });

  if (!bestService) {
    return undefined;
  }

  const maxDistance = compactInput.length >= 12 ? 3 : 2;
  return bestDistance <= maxDistance ? bestService : undefined;
};

export const getPremiumServiceBySlug = (slug: unknown) =>
  (() => {
    const normalizedSlug = normalizeServiceSlug(slug);
    const compactSlug = compactServiceSlug(slug);

    if (!normalizedSlug && !compactSlug) {
      return undefined;
    }

    const exact = serviceLookup.get(normalizedSlug) ?? serviceLookup.get(compactSlug);
    if (exact) {
      return exact;
    }

    const keywordMatch = findServiceByKeywords(compactSlug);
    if (keywordMatch) {
      return keywordMatch;
    }

    return findClosestService(compactSlug);
  })();
