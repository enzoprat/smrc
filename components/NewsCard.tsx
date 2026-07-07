import Link from "next/link";
import type { ArticleMeta } from "@/lib/content";
import { Placeholder } from "./Placeholder";
import { formatShortDate } from "@/lib/format";
import { categoryStyles } from "@/data/categories";

/** Carte d'actualité pour la grille et la home. */
export function NewsCard({ article, featured = false }: { article: ArticleMeta; featured?: boolean }) {
  const catClass = categoryStyles[article.category] || "bg-gold/15 text-gold-700";

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-lg bg-white shadow-card ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <Link href={`/actualites/${article.slug}`} className={featured ? "lg:w-1/2" : ""} aria-label={article.title}>
        <Placeholder
          src={article.image}
          alt={article.title}
          label={article.category}
          ratio={featured ? "aspect-video lg:aspect-auto lg:h-full" : "aspect-[16/10]"}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:w-1/2 lg:p-8" : ""}`}>
        <div className="mb-3 flex items-center gap-3">
          <span className={`rounded-sm px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-wider ${catClass}`}>
            {article.category}
          </span>
          <time className="text-xs text-ink-500" dateTime={article.date}>
            {formatShortDate(article.date)}
          </time>
        </div>
        <h3 className={`font-display font-bold uppercase leading-tight text-ink-900 ${featured ? "text-2xl lg:text-3xl" : "text-xl"}`}>
          <Link href={`/actualites/${article.slug}`} className="transition-colors hover:text-gold-600">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{article.excerpt}</p>
        <Link
          href={`/actualites/${article.slug}`}
          className="mt-4 inline-flex items-center gap-1 font-display text-sm font-semibold uppercase tracking-wide text-gold-700 transition-colors hover:text-gold-600"
        >
          Lire l'article
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
