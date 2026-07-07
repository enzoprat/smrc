import { Breadcrumb, type Crumb } from "./Breadcrumb";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  crumbs?: Crumb[];
  image?: string;
};

/** En-tête de page intérieure : fond sombre, sur-titre jaune, fil d'Ariane. */
export function PageHero({ title, eyebrow, description, crumbs, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      {/* Fond image optionnelle */}
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-800 via-ink-900 to-black" />
      <div className="absolute inset-0 bg-grain opacity-50" />
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-gold via-gold-300 to-transparent" />

      <div className="container-x relative pb-14 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
        {crumbs && (
          <div className="mb-6">
            <Breadcrumb items={crumbs} dark />
          </div>
        )}
        {eyebrow && (
          <span className="mb-3 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-6 bg-gold" />
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl text-4xl font-bold uppercase leading-[1.02] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-white/70">{description}</p>
        )}
      </div>
    </section>
  );
}
