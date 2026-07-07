import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Couche de lecture des actualités stockées en MDX dans /content/actualites.
 * Lecture au build (Server Components). L'écriture passe par l'API GitHub (admin).
 */

export type Article = {
  slug: string;
  title: string;
  date: string; // ISO
  category: string;
  excerpt: string;
  image?: string;
  author?: string;
  status: "published" | "draft";
  seoTitle?: string;
  seoDescription?: string;
  content: string; // corps MDX brut
};

export type ArticleMeta = Omit<Article, "content">;

const CONTENT_DIR = path.join(process.cwd(), "content", "actualites");

function ensureDir(): boolean {
  return fs.existsSync(CONTENT_DIR);
}

/** Lit tous les fichiers MDX et renvoie les métadonnées (brouillons inclus si demandé). */
export function getAllArticles(includeDrafts = false): Article[] {
  if (!ensureDir()) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const articles = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = (data.slug as string) || file.replace(/\.mdx$/, "");
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString(),
      category: data.category ?? "Club",
      excerpt: data.excerpt ?? "",
      image: data.image || undefined,
      author: data.author || undefined,
      status: (data.status as Article["status"]) ?? "published",
      seoTitle: data.seoTitle || undefined,
      seoDescription: data.seoDescription || undefined,
      content,
    } satisfies Article;
  });

  return articles
    .filter((a) => includeDrafts || a.status === "published")
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getArticleMetas(includeDrafts = false): ArticleMeta[] {
  return getAllArticles(includeDrafts).map(({ content, ...meta }) => meta);
}

export function getArticle(slug: string, includeDrafts = false): Article | undefined {
  return getAllArticles(includeDrafts).find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, category: string, limit = 3): ArticleMeta[] {
  const all = getArticleMetas();
  const sameCat = all.filter((a) => a.slug !== slug && a.category === category);
  const others = all.filter((a) => a.slug !== slug && a.category !== category);
  return [...sameCat, ...others].slice(0, limit);
}
