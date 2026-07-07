"use client";

import { useState } from "react";
import type { ArticleMeta } from "@/lib/content";
import { NewsCard } from "./NewsCard";
import { newsCategories } from "@/data/categories";

/** Grille d'actualités avec filtres par catégorie. */
export function NewsGrid({ articles }: { articles: ArticleMeta[] }) {
  const [active, setActive] = useState<string>("Toutes");
  const cats = ["Toutes", ...newsCategories];

  const filtered = active === "Toutes" ? articles : articles.filter((a) => a.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`rounded-sm px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
              active === c
                ? "bg-ink-900 text-gold"
                : "bg-white text-ink-600 ring-1 ring-black/5 hover:bg-bone-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-ink-500">
          Aucune actualité dans cette catégorie pour le moment.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
