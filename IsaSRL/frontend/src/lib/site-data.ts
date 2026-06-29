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
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/assistenza", label: "Assistenza" },
  { href: "/servizi", label: "Servizi" },
  { href: "/firma-digitale", label: "Firma Digitale" },
  { href: "/mepa", label: "MEPA" },
  { href: "/gestionale", label: "Gestionale" },
  { href: "/whistleblowing", label: "Whistleblowing" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contatti", label: "Contatti" },
];

export const serviceCards: ServiceCard[] = [
  {
    title: "Gestionale Aziendale",
    text: "Soluzioni ERP su misura con assistenza e verticalizzazioni dedicate alle PMI.",
  },
  {
    title: "Cloud e Business Continuity",
    text: "Backup automatico e infrastruttura resiliente per garantire operativita continua.",
  },
  {
    title: "Fatturazione Elettronica",
    text: "Gestione del ciclo attivo e passivo con interscambio integrato.",
  },
  {
    title: "Firma Digitale",
    text: "Attivazione rapida, conservazione sostitutiva e processi paperless.",
  },
  {
    title: "Cybersecurity e Compliance",
    text: "Protezione dei dati, monitoraggio e policy di sicurezza aziendale.",
  },
  {
    title: "Ordini Professionali",
    text: "Software dedicato per protocollazione, delibere e gestione amministrativa.",
  },
];

export const partners: Partner[] = [
  { name: "Zucchetti", image: "/site/zucchetti_logo.jpg", href: "http://www.zucchetti.it/website/cms/home.html" },
  { name: "Dell", image: "/site/DELL_logo.jpg", href: "https://www.dell.com/it-it" },
  { name: "HP", image: "/site/HP_logo.jpg", href: "https://store.hp.com" },
  { name: "Yashi", image: "/site/YASHI_logo.jpg", href: "https://www.yashiweb.com/" },
];

export const companyInfo = {
  phone: "0932 252022",
  email: "info@isasrl.it",
  address: "Via delle Betulle, 137 Ragusa (RG) 97100",
  vat: "01445260886",
  group: "Gruppo Zutec",
};
