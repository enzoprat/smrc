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
  /** Nom utilisé pour filtrer le calendrier/résultats si différent du nom d'équipe. */
  matchName?: string;
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
      "Vitrine du club, l'équipe Première évolue en Nationale 2, le quatrième niveau national, pour la saison 2026-2027. Composée de joueurs formés au club et de renforts expérimentés, elle porte les ambitions sportives du SMRC tout en incarnant les valeurs qui font son identité : engagement, solidarité et esprit de compétition.",
    href: "/equipes/equipe-premiere",
    accent: "gold",
    layout: "full",
    matchName: "Nationale 2",
  },
  {
    slug: "espoirs",
    name: "Espoirs",
    category: "Seniors · Réserve",
    description:
      "Le tremplin entre la formation et le haut niveau. Les Espoirs préparent la relève de l'équipe première.",
    intro:
      "Véritable passerelle vers l'équipe Première, les Espoirs permettent aux jeunes joueurs de poursuivre leur progression au plus haut niveau amateur. Composée majoritairement de joueurs de moins de 23 ans, l'équipe allie formation, développement et performance, avec l'objectif de préparer les talents de demain.",
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
      "Les Jalloises représentent l'équipe Seniors féminine du SMRC. Engagées en rugby à X dans le cadre d'une entente avec le club de Martignas, elles portent avec fierté les couleurs du club dans un esprit de convivialité, d'engagement et de compétition.",
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
          "Les Salamanders sont l'équipe loisirs féminine du SMRC. Elles pratiquent le Rugby à 5, une discipline sans plaquage, accessible à toutes, qui privilégie le plaisir de jouer, la convivialité et l'esprit d'équipe. Débutantes ou anciennes joueuses, chacune y trouve sa place.",
      },
      {
        name: "Les Vieux Crampons",
        description:
          "Les Vieux Crampons sont l'équipe loisirs masculine du SMRC. Engagés en Rugby à 5, ils partagent la passion du rugby dans une pratique conviviale, sans contact, où le plaisir, le fair-play et la bonne humeur sont au cœur de chaque rencontre.",
      },
    ],
  },
];

export function getTeam(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}

/** Options d'équipe pour les sélecteurs de l'admin (staff, joueurs, entraînements). */
export const teamOptions = teams.map((t) => ({ value: t.slug, label: t.name }));
