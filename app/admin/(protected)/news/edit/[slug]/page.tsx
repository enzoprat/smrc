import { notFound } from "next/navigation";
import { getArticle } from "@/lib/content";
import { NewsForm } from "@/components/admin/NewsForm";

export const metadata = { title: "Modifier l'actualité", robots: { index: false } };

export default function AdminNewsEditPage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug, true);
  if (!article) notFound();

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold uppercase text-ink-900">Modifier l'actualité</h1>
        <p className="mt-1 text-ink-600 truncate">{article.title}</p>
      </header>
      <NewsForm
        mode="edit"
        initial={{
          slug: article.slug,
          title: article.title,
          date: article.date.slice(0, 10),
          category: article.category,
          excerpt: article.excerpt,
          image: article.image ?? "",
          author: article.author ?? "Le SMRC",
          status: article.status,
          seoTitle: article.seoTitle ?? "",
          seoDescription: article.seoDescription ?? "",
          content: article.content,
        }}
      />
    </div>
  );
}
