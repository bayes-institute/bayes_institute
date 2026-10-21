type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
};

export function PageHero({ eyebrow, title, subtitle, image, imageAlt = '' }: PageHeroProps) {
  return (
    <section className="page-hero">
      <img src={image} alt={imageAlt} className="page-hero__img" />
      <div className="page-hero__overlay" aria-hidden="true" />
      <div className="page-hero__content">
        {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="page-hero__sub">{subtitle}</p>}
      </div>
    </section>
  );
}
