import Link from "next/link";
import { getArticleMetas } from "@/lib/content";
import { categoryStyles } from "@/data/categories";
import { formatShortDate } from "@/lib/format";
import { DeleteNewsButton } from "@/components/admin/DeleteNewsButton";

export const metadata = { title: "Actualités", robots: { index: false } };

export default function AdminNewsPage() {
  const articles = getArticleMetas(true);

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase text-ink-900">Actualités</h1>
          <p className="mt-1 text-ink-600">Créez, modifiez, publiez ou supprimez les articles du site.</p>
        </div>
        <Link href="/admin/news/new" className="btn-gold">
          + Nouvelle actualité
        </Link>
      </header>

      {articles.length === 0 ? (
        <p className="rounded-lg bg-white p-6 text-center text-ink-500 ring-1 ring-black/5">
          Aucune actualité. Cliquez sur « Nouvelle actualité ».
        </p>
      ) : (
        <div className="space-y-3">
          {articles.map((a) => (
            <div
              key={a.slug}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-sm ring-1 ring-black/5"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`tag ${categoryStyles[a.category] ?? "bg-ink-100 text-ink-700"}`}>
                    {a.category}
                  </span>
                  {a.status === "draft" && (
                    <span className="tag bg-amber-100 text-amber-800">Brouillon</span>
                  )}
                  <span className="text-xs text-ink-500">{formatShortDate(a.date)}</span>
                </div>
                <p className="mt-1 truncate font-display text-lg font-semibold text-ink-900">{a.title}</p>
              </div>
              <div className="flex items-center gap-4">
                {a.status === "published" && (
                  <Link
                    href={`/actualites/${a.slug}`}
                    target="_blank"
                    className="text-sm font-medium text-ink-600 hover:underline"
                  >
                    Voir
                  </Link>
                )}
                <Link
                  href={`/admin/news/edit/${a.slug}`}
                  className="text-sm font-medium text-gold-700 hover:underline"
                >
                  Modifier
                </Link>
                <DeleteNewsButton slug={a.slug} title={a.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
