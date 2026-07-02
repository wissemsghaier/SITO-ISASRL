"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { partners } from "@/lib/site-data";

const getActivePageLabel = (pathname: string): string => {
  if (pathname === "/") {
    return "Home";
  }

  if (pathname.startsWith("/servizi")) {
    return "Servizi";
  }

  if (pathname === "/assistenza") {
    return "Assistenza";
  }

  if (pathname === "/gestionale") {
    return "Gestione Aziendale";
  }

  if (pathname === "/ordini-professionali") {
    return "Ordini Professionali";
  }

  if (pathname === "/contatti") {
    return "Contatti";
  }

  if (pathname === "/news") {
    return "News";
  }

  if (pathname === "/azienda") {
    return "Azienda";
  }

  return "Pagina attiva";
};

export function PartnersSectionClient() {
  const pathname = usePathname() || "/";
  const activePageLabel = getActivePageLabel(pathname);

  return (
    <section
      className="partners premium-route-section reveal reveal-2 scroll-section"
      data-motion="partners"
      data-stagger="fast"
      data-distance="11px"
    >
      <div className="section-head partners-head">
        <h2>Partner tecnologici ISA</h2>
        <div className="partners-head-tools">
          <span className="partners-active-badge" aria-label={`Pagina attiva: ${activePageLabel}`}>
            <span className="partners-active-dot" aria-hidden="true" />
            <span>Pagina</span>
            <strong>{activePageLabel}</strong>
          </span>
          <Link href="/contatti">Avvia una partnership</Link>
        </div>
      </div>
      <div className="partner-row">
        {partners.map((partner) => (
          <a
            key={partner.name}
            className="partner-item stagger-item premium-route-stagger"
            href={partner.href}
            target="_blank"
            rel="noreferrer"
          >
            <Image src={partner.image} alt={partner.name} width={150} height={52} className="partner-logo" />
            <p>{partner.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
