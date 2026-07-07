/**
 * Équipes du club. Pour ajouter une équipe, ajouter une entrée ici.
 * `href` peut pointer vers une page dédiée (créée dans app/equipes/...).
 */

export type Player = {
  name: string;
  position: string;
  age?: number;
  image?: string;
};

export type StaffMember = {
  name: string;
  role: string;
  image?: string;
};

export type Team = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  href: string;
  accent?: "gold" | "ink";
};

export const teams: Team[] = [
  {
    slug: "equipe-premiere",
    name: "Équipe Première",
    category: "Seniors · Fédérale 1",
    description:
      "Le fer de lance du club. Une équipe ambitieuse qui porte les couleurs jaune et noir au plus haut niveau régional.",
    href: "/equipes/equipe-premiere",
    accent: "gold",
  },
  {
    slug: "espoirs",
    name: "Espoirs",
    category: "Seniors · Réserve",
    description:
      "Le tremplin entre la formation et le haut niveau. Les Espoirs préparent la relève de l'équipe première.",
    href: "/equipes",
  },
  {
    slug: "feminines",
    name: "Féminines",
    category: "Seniors · Féminines",
    description:
      "Le rugby féminin du SMRC : engagement, solidarité et plaisir de jeu pour toutes les joueuses.",
    href: "/equipes",
  },
  {
    slug: "u18",
    name: "U18",
    category: "Jeunes · Cadets",
    description:
      "La transition vers le rugby adulte. Performance, intensité et apprentissage du haut niveau.",
    href: "/equipes",
  },
  {
    slug: "u16",
    name: "U16",
    category: "Jeunes · Minimes",
    description:
      "Une catégorie clé de la formation, où l'on construit les bases techniques et l'esprit collectif.",
    href: "/equipes",
  },
  {
    slug: "ecole-de-rugby",
    name: "École de Rugby",
    category: "U6 à U14",
    description:
      "Le cœur du club : découverte, plaisir et valeurs du rugby pour les plus jeunes, dans un cadre familial.",
    href: "/ecole-de-rugby",
    accent: "gold",
  },
];

/** Effectif de l'équipe première — [À confirmer : effectif réel] */
export const firstTeamPlayers: Player[] = [
  { name: "Joueur 1", position: "Pilier", age: 27 },
  { name: "Joueur 2", position: "Talonneur", age: 25 },
  { name: "Joueur 3", position: "Deuxième ligne", age: 29 },
  { name: "Joueur 4", position: "Troisième ligne", age: 24 },
  { name: "Joueur 5", position: "Demi de mêlée", age: 22 },
  { name: "Joueur 6", position: "Demi d'ouverture", age: 26 },
  { name: "Joueur 7", position: "Centre", age: 23 },
  { name: "Joueur 8", position: "Ailier", age: 21 },
  { name: "Joueur 9", position: "Arrière", age: 28 },
];

/** Staff de l'équipe première — [À confirmer : staff réel] */
export const firstTeamStaff: StaffMember[] = [
  { name: "Entraîneur principal", role: "Manager" },
  { name: "Entraîneur avants", role: "Mêlée / touche" },
  { name: "Entraîneur arrières", role: "Jeu déployé" },
  { name: "Préparateur physique", role: "Performance" },
];

export function getTeam(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}
