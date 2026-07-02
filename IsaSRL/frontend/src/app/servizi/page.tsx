import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { premiumServiceCatalog } from "@/lib/services-catalog";

export default function ServiziPage() {
  return (
    <SiteFrame activePath="/servizi" minimalGlobal>
      <section className="service-hub shell-card reveal reveal-2 scroll-section" data-stagger="fast">
        <div className="service-hub-head">
          <p className="service-hub-kicker">Servizi</p>
          <h1>Seleziona un servizio</h1>
          <p>
            Ogni servizio ha una pagina dedicata con contenuti estratti dai file legacy in
            SITO ISASRL e isasrl.it. Apri la voce che ti interessa.
          </p>
        </div>

        <div className="service-hub-grid">
          {premiumServiceCatalog.map((service) => (
            <article key={service.slug} className="service-hub-card stagger-item">
              <p className="service-hub-source">Fonte: {service.legacySource}</p>
              {service.legacySources?.length ? (
                <p className="service-hub-source">Archivi: {service.legacySources.length} sorgenti</p>
              ) : null}
              <h2>{service.menuLabel}</h2>
              <p>{service.teaser}</p>
              <Link href={`/servizi/${service.slug}`} className="btn-primary">
                Apri pagina dedicata
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
