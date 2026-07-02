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
  { href: "/servizi", label: "Servizi" },
  { href: "/assistenza", label: "Assistenza" },
  { href: "/gestionale", label: "Gestione Aziendale" },
  { href: "/ordini-professionali", label: "Ordini Professionali" },
  { href: "/contatti", label: "Contatti" },
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
