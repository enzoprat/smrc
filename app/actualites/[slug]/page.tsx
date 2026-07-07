import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageHero } from "@/components/PageHero";
import { NewsCard } from "@/components/NewsCard";
import { Placeholder } from "@/components/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight } from "@/components/Icons";
import { getAllArticles, getArticle, getRelatedArticles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { articleLd } from "@/lib/jsonld";
import { formatDate } from "@/lib/format";
import { categoryStyles } from "@/data/categories";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticle(params.slug);
  if (!article) return buildMetadata({ title: "Article introuvable", description: "", noIndex: true });
  return buildMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    path: `/actualites/${article.slug}`,
    image: article.image,
    type: "article",
  });
}

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug, article.category);
  const catClass = categoryStyles[article.category] || "bg-gold/15 text-gold-700";

  return (
    <>
      <JsonLd
        data={articleLd({
          title: article.title,
          description: article.excerpt,
          date: article.date,
          path: `/actualites/${article.slug}`,
          image: article.image,
        })}
      />

      <PageHero
        eyebrow={article.category}
        title={article.title}
        crumbs={[
          { name: "Actualités", path: "/actualites" },
          { name: article.title, path: `/actualites/${article.slug}` },
        ]}
      />

      <article className="bg-white py-12 sm:py-16">
        <div className="container-x max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className={`rounded-sm px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-wider ${catClass}`}>
              {article.category}
            </span>
            <time className="text-sm capitalize text-ink-500" dateTime={article.date}>
              {formatDate(article.date)}
            </time>
            {article.author && <span className="text-sm text-ink-500">· {article.author}</span>}
          </div>

          <Placeholder
            src={article.image}
            alt={article.title}
            label={article.category}
            ratio="aspect-video"
            className="mb-10 rounded-lg shadow-card"
            priority
          />

          <div className="prose-smrc">
            <MDXRemote source={article.content} />
          </div>

          <div className="mt-12 border-t border-black/10 pt-8">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-gold-700 hover:text-gold-600"
            >
              <span aria-hidden>←</span> Retour aux actualités
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-bone py-16 sm:py-20">
          <div className="container-x">
            <h2 className="mb-10 font-display text-2xl font-bold uppercase text-ink-900 sm:text-3xl">
              Articles liés
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <NewsCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
