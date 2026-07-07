/** Catégories d'actualités, partagées entre le site public et l'admin. */

export const newsCategories = [
  "Club",
  "Matchs",
  "École de rugby",
  "Partenaires",
  "Événements",
  "Vie associative",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

/** Couleur de tag par catégorie (classes Tailwind). */
export const categoryStyles: Record<string, string> = {
  Club: "bg-gold/15 text-gold-700",
  Matchs: "bg-ink-900 text-gold",
  "École de rugby": "bg-emerald-100 text-emerald-800",
  Partenaires: "bg-blue-100 text-blue-800",
  Événements: "bg-orange-100 text-orange-800",
  "Vie associative": "bg-purple-100 text-purple-800",
};
