import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/assistenza.html", destination: "/assistenza", permanent: true },
      { source: "/assistenza_1.html", destination: "/assistenza", permanent: true },
      { source: "/assistenza_1", destination: "/assistenza", permanent: true },
      { source: "/servizi.html", destination: "/servizi", permanent: true },
      { source: "/servizi_fatel.html", destination: "/servizi", permanent: true },
      { source: "/servizi_backup.html", destination: "/servizi", permanent: true },
      { source: "/servizi_fatel", destination: "/servizi", permanent: true },
      { source: "/servizi_backup", destination: "/servizi", permanent: true },
      { source: "/prodotti_digitali.html", destination: "/firma-digitale", permanent: true },
      { source: "/firma_digitale.html", destination: "/firma-digitale", permanent: true },
      { source: "/prodotti_digitali", destination: "/firma-digitale", permanent: true },
      { source: "/firma_digitale", destination: "/firma-digitale", permanent: true },
      { source: "/forniture_mepa.html", destination: "/mepa", permanent: true },
      { source: "/forniture_mepa", destination: "/mepa", permanent: true },
      { source: "/gestionale_azienda.html", destination: "/gestionale", permanent: true },
      { source: "/gestionale_ordini.html", destination: "/gestionale", permanent: true },
      { source: "/gestionale_azienda", destination: "/gestionale", permanent: true },
      { source: "/gestionale_ordini", destination: "/gestionale", permanent: true },
      { source: "/contatti.html", destination: "/contatti", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/whistleblowing.html", destination: "/whistleblowing", permanent: true },
      { source: "/prova.html", destination: "/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
