import Image from "next/image";

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
};

export function InternalPageTemplate({
  eyebrow,
  title,
  subtitle,
  paragraphs,
  image,
  imageAlt,
  details,
}: InternalPageTemplateProps) {
  return (
    <>
      <section className="internal-hero reveal reveal-2">
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

      <section className="detail-grid reveal reveal-3">
        {details.map((item) => (
          <article className="detail-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}
