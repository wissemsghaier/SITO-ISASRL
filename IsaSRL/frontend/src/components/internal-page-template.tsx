import Image from "next/image";
import Link from "next/link";

type DetailItem = {
  title: string;
  text: string;
};

type InternalPageTemplateProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  details: DetailItem[];
  variant?: "classic" | "studio";
  highlights?: string[];
  mediaSecondaryImage?: string;
  mediaSecondaryAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function InternalPageTemplate({
  eyebrow,
  title,
  subtitle,
  paragraphs,
  image,
  imageAlt,
  details,
  variant = "classic",
  highlights = [],
  mediaSecondaryImage,
  mediaSecondaryAlt,
  ctaLabel,
  ctaHref,
}: InternalPageTemplateProps) {
  if (variant === "studio") {
    return (
      <>
        <section className="studio-hero reveal reveal-2 scroll-section">
          <div className="studio-copy">
            <p className="studio-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="studio-subtitle">{subtitle}</p>

            {highlights.length ? (
              <div className="studio-chip-row">
                {highlights.map((item) => (
                  <span className="studio-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="studio-story-grid">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {ctaLabel && ctaHref ? (
              <Link href={ctaHref} className="studio-cta">
                {ctaLabel}
              </Link>
            ) : null}
          </div>

          <div className="studio-media">
            <Image src={image} alt={imageAlt} width={840} height={560} className="studio-main-image" />
            {mediaSecondaryImage ? (
              <Image
                src={mediaSecondaryImage}
                alt={mediaSecondaryAlt || imageAlt}
                width={360}
                height={240}
                className="studio-secondary-image"
              />
            ) : null}
            <div className="studio-floating-metric">
              <p>Delivery Focus</p>
              <strong>Fast, secure, measurable</strong>
              <span>Processi ottimizzati per performance e continuita.</span>
            </div>
          </div>
        </section>

        <section className="studio-detail-grid reveal reveal-3 scroll-section">
          {details.map((item, index) => (
            <article className="studio-detail-card stagger-item" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </section>
      </>
    );
  }

  return (
    <>
      <section className="internal-hero reveal reveal-2 scroll-section">
        <div className="internal-copy">
          <p className="internal-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="internal-subtitle">{subtitle}</p>
          <div className="internal-paragraphs">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="internal-media">
          <Image src={image} alt={imageAlt} width={760} height={520} className="internal-image" />
        </div>
      </section>

      <section className="detail-grid reveal reveal-3 scroll-section">
        {details.map((item) => (
          <article className="detail-card stagger-item" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}
