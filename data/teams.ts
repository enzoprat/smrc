/**
 * Équipes du club. Une entrée = une page dédiée (/equipes/[slug]).
 * Le staff, l'effectif et les entraînements sont éditables depuis l'admin
 * (data/staff.json, data/players.json, data/training.json).
 */

export type Team = {
  slug: string;
  name: string;
  category: string;
  description: string;
  intro?: string;
  image?: string;
  href: string;
  accent?: "gold" | "ink";
  layout: "full" | "simple";
  subTeams?: { name: string; description: string }[];
};

export const teams: Team[] = [
  {
    slug: "equipe-premiere",
    name: "Équipe Première",
    category: "Seniors · Nationale 2",
    description:
      "Le fer de lance du club. Une équipe ambitieuse qui porte les couleurs jaune et noir au plus haut niveau.",
    intro:
      "Engagée en Nationale 2, l'équipe première incarne l'ambition du club. Un groupe soudé, formé en grande partie au club, qui défend les couleurs du SMRC chaque week-end devant son public au stade Robert Monseau.",
    href: "/equipes/equipe-premiere",
    accent: "gold",
    layout: "full",
  },
  {
    slug: "espoirs",
    name: "Espoirs",
    category: "Seniors · Réserve",
    description:
      "Le tremplin entre la formation et le haut niveau. Les Espoirs préparent la relève de l'équipe première.",
    intro:
      "Les Espoirs assurent la transition entre la formation et le groupe senior. C'est ici que les jeunes joueurs franchissent un cap, gagnent en expérience et s'aguerrissent avant de rejoindre l'équipe première.",
    href: "/equipes/espoirs",
    layout: "full",
  },
  {
    slug: "feminines",
    name: "Les Jalloises",
    category: "Seniors · Féminines",
    description:
      "Le rugby féminin du SMRC : engagement, solidarité et plaisir de jeu pour toutes les joueuses.",
    intro:
      "Les Jalloises portent haut les couleurs du rugby féminin au SMRC. Engagement, solidarité et convivialité : l'équipe accueille toutes les joueuses, débutantes comme confirmées, dans un esprit familial.",
    href: "/equipes/feminines",
    layout: "simple",
  },
  {
    slug: "loisirs",
    name: "Loisirs",
    category: "Seniors · Loisir",
    description:
      "Le rugby plaisir, sans pression et dans la convivialité, avec les Salamanders et les Vieux Crampons.",
    intro:
      "Le rugby loisir du SMRC, c'est le plaisir du jeu et la troisième mi-temps avant tout. Deux groupes se partagent le terrain dans une ambiance détendue et chaleureuse.",
    href: "/equipes/loisirs",
    layout: "simple",
    subTeams: [
      {
        name: "Les Salamanders",
        description:
          "Le rugby loisir dans sa version la plus conviviale : on se retrouve pour le plaisir de jouer, quel que soit son niveau.",
      },
      {
        name: "Les Vieux Crampons",
        description:
          "Les anciens du club qui ne raccrochent pas les crampons : passion intacte, esprit d'équipe et bonne humeur garantie.",
      },
    ],
  },
];

export function getTeam(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}

/** Options d'équipe pour les sélecteurs de l'admin (staff, joueurs, entraînements). */
export const teamOptions = teams.map((t) => ({ value: t.slug, label: t.name }));
