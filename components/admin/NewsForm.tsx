"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { newsCategories } from "@/data/categories";

export type NewsFormValues = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  author: string;
  status: "published" | "draft";
  seoTitle: string;
  seoDescription: string;
  content: string;
};

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const empty: NewsFormValues = {
  slug: "",
  title: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Club",
  excerpt: "",
  image: "",
  author: "Le SMRC",
  status: "draft",
  seoTitle: "",
  seoDescription: "",
  content: "",
};

const inputCls =
  "w-full rounded-sm border border-ink-900/15 px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";
const labelCls =
  "mb-1 block font-display text-xs font-semibold uppercase tracking-wide text-ink-600";

export function NewsForm({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial?: Partial<NewsFormValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<NewsFormValues>({ ...empty, ...initial });
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  const originalSlug = mode === "edit" ? initial?.slug ?? "" : "";

  function set<K extends keyof NewsFormValues>(key: K, value: NewsFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  function onTitle(value: string) {
    setValues((prev) => ({
      ...prev,
      title: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
    setStatus("idle");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, originalSlug }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Échec de l'enregistrement.");
      setStatus("saved");
      setMessage("Actualité enregistrée. Le site se met à jour dans quelques instants.");
      router.push("/admin/news");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Erreur inconnue.");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Titre</label>
            <input
              value={values.title}
              onChange={(e) => onTitle(e.target.value)}
              required
              className={inputCls}
              placeholder="Titre de l'actualité"
            />
          </div>

          <div>
            <label className={labelCls}>Slug (URL)</label>
            <input
              value={values.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
              className={inputCls}
              placeholder="mon-actualite"
            />
            <p className="mt-1 text-xs text-ink-500">/actualites/{values.slug || "…"}</p>
          </div>

          <div>
            <label className={labelCls}>Date</label>
            <input
              type="date"
              value={values.date}
              onChange={(e) => set("date", e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Catégorie</label>
            <select
              value={values.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputCls}
            >
              {newsCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Statut</label>
            <select
              value={values.status}
              onChange={(e) => set("status", e.target.value as NewsFormValues["status"])}
              className={inputCls}
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Auteur</label>
            <input
              value={values.author}
              onChange={(e) => set("author", e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Image (chemin ou URL, optionnel)</label>
            <input
              value={values.image}
              onChange={(e) => set("image", e.target.value)}
              className={inputCls}
              placeholder="/news/mon-image.jpg"
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Chapô / Extrait</label>
            <textarea
              value={values.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={2}
              className={inputCls}
              placeholder="Résumé affiché sur les cartes et listes."
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Contenu (Markdown / MDX)</label>
            <textarea
              value={values.content}
              onChange={(e) => set("content", e.target.value)}
              rows={16}
              className={`${inputCls} font-mono`}
              placeholder={"## Sous-titre\n\nVotre texte en **Markdown**…"}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5">
        <h2 className="mb-4 font-display text-lg font-bold uppercase text-ink-900">Référencement (SEO)</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Titre SEO (optionnel)</label>
            <input
              value={values.seoTitle}
              onChange={(e) => set("seoTitle", e.target.value)}
              className={inputCls}
              placeholder="Par défaut : le titre de l'article"
            />
          </div>
          <div>
            <label className={labelCls}>Meta description (optionnel)</label>
            <input
              value={values.seoDescription}
              onChange={(e) => set("seoDescription", e.target.value)}
              className={inputCls}
              placeholder="Par défaut : l'extrait"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/news")}
          className="text-sm font-medium text-ink-600 hover:underline"
        >
          ← Annuler
        </button>
        <div className="flex items-center gap-3">
          {message && (
            <span className={`text-sm ${status === "error" ? "text-red-600" : "text-emerald-600"}`}>
              {message}
            </span>
          )}
          <button type="submit" disabled={status === "saving"} className="btn-gold">
            {status === "saving" ? "Enregistrement..." : mode === "create" ? "Créer" : "Enregistrer"}
          </button>
        </div>
      </div>
    </form>
  );
}
