import Image from "next/image";
import type { CSSProperties } from "react";
import { ServicesSelector } from "@/components/services-selector";
import { SiteFrame } from "@/components/site-frame";
import { premiumServiceCatalog } from "@/lib/services-catalog";
import { getServiceTheme } from "@/lib/service-themes";
import styles from "./servizi-hub.module.css";

export default function ServiziPage() {
  return (
    <SiteFrame activePath="/servizi" minimalGlobal>
      <section className={`${styles.hubStage} reveal reveal-2 scroll-section`} data-stagger="fast">
        <div className={`${styles.selectorWrap} stagger-item`}>
          <ServicesSelector />
        </div>

        <div className={`${styles.serviceDeck} stagger-item`}>
          {premiumServiceCatalog.map((service) => {
            const theme = getServiceTheme(service.slug);
            const heroThumb = theme.gallery[0];

            return (
              <article
                key={service.slug}
                className={`${styles.serviceCard} stagger-item`}
                style={{
                  "--service-accent": theme.accent,
                  "--service-soft": theme.accentSoft,
                } as CSSProperties}
              >
                <div className={styles.thumbWrap}>
                  <Image
                    src={heroThumb.src}
                    alt={heroThumb.alt}
                    width={960}
                    height={560}
                    className={styles.thumbImage}
                  />
                </div>
                <h2>{service.menuLabel}</h2>
                <p>{service.legacyParagraphs[0] ?? service.legacySections[0]?.text ?? service.menuLabel}</p>
              </article>
            );
          })}
        </div>
      </section>
    </SiteFrame>
  );
}
