export type NavLink = {
  href: string;
  label: string;
};

export type ServiceCard = {
  title: string;
  text: string;
};

export type Partner = {
  name: string;
  image: string;
  href: string;
  showcaseImage?: string;
  showcaseSummary?: string;
  footerLogoMaxWidth?: string;
  footerLogoMaxHeight?: string;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/servizi", label: "Servizi" },
  { href: "/assistenza", label: "Assistenza" },
  { href: "/gestionale", label: "Gestione Aziendale" },
  { href: "/ordini-professionali", label: "Ordini e collegi professionali" },
  { href: "/news", label: "News" },
  { href: "/azienda", label: "Azienda" },
];

export const serviceCards: ServiceCard[] = [
  {
    title: "Gestionale Aziendale",
    text: "Piattaforme ERP su misura con verticalizzazioni dedicate a PMI, studi ed enti.",
  },
  {
    title: "Cloud e Business Continuity",
    text: "Backup automatico e infrastruttura resiliente per garantire operativita continua e ripartenza rapida.",
  },
  {
    title: "Fatturazione Elettronica",
    text: "Gestione del ciclo attivo e passivo con interscambio, firma e conservazione integrati.",
  },
  {
    title: "Firma Digitale",
    text: "Attivazione rapida, validita legale e workflow documentali paperless.",
  },
  {
    title: "Cybersecurity e Compliance",
    text: "Protezione dati, monitoraggio continuo e policy di sicurezza allineate alla compliance.",
  },
  {
    title: "Ordini Professionali",
    text: "Software dedicato per protocollazione, delibere, quote e gestione amministrativa completa.",
  },
];

export const partners: Partner[] = [
  {
    name: "Zucchetti",
    image: "/site/zucchetti_logo_partner.jpg",
    href: "http://www.zucchetti.it/website/cms/home.html",
    showcaseImage: "/site/gestionali1.jpg",
    showcaseSummary: "Suite gestionali integrate per imprese orientate a controllo e crescita.",
    footerLogoMaxWidth: "94px",
    footerLogoMaxHeight: "24px",
  },
  {
    name: "Dell",
    image: "/site/DELL_logo.jpg",
    href: "https://www.dell.com/it-it",
    showcaseImage: "/site/GettyImages-693472268.jpg",
    showcaseSummary: "Infrastrutture affidabili per performance, scalabilita e resilienza operativa.",
    footerLogoMaxWidth: "54px",
    footerLogoMaxHeight: "26px",
  },
  {
    name: "HP",
    image: "/site/HP_logo.jpg",
    href: "https://store.hp.com",
    showcaseImage: "/site/assistenza.jpg",
    showcaseSummary: "Endpoint e soluzioni professionali per produttivita e continuita aziendale.",
    footerLogoMaxWidth: "62px",
    footerLogoMaxHeight: "28px",
  },
  {
    name: "Edatalia",
    image: "/site/edatalia.png",
    href: "https://www.edatalia.com/it/",
    showcaseImage: "/site/aulainformatica2.jpg",
    showcaseSummary: "Soluzioni per contenuti digitali, formazione e collaborazione documentale.",
    footerLogoMaxWidth: "94px",
    footerLogoMaxHeight: "26px",
  },
];

export const companyInfo = {
  phone: "0932 252022",
  email: "info@isasrl.it",
  address: "Via delle Betulle, 137 Ragusa (RG) 97100",
  vat: "01445260886",
  group: "Gruppo Zutec",
};
