/**
 * Filières de formation du club (hors école de rugby, qui a sa page dédiée).
 * Une entrée = une page /formations/[slug].
 */

export type Formation = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  points: string[];
};

export const formations: Formation[] = [
  {
    slug: "cadettes",
    name: "Cadettes",
    tagline: "Le rugby au féminin pour les jeunes joueuses",
    intro:
      "La section Cadettes accueille les jeunes filles qui souhaitent découvrir le rugby ou progresser dans un cadre encadré et bienveillant. Formation technique, esprit d'équipe et plaisir de jouer sont au cœur du projet.",
    points: [
      "Encadrement par des éducateurs diplômés",
      "Progression technique et tactique adaptée",
      "Un collectif solidaire et une ambiance familiale",
      "La passerelle vers l'équipe Féminines seniors",
    ],
  },
  {
    slug: "pole-jeunes",
    name: "Pôle Jeunes",
    tagline: "La formation des jeunes joueurs du club",
    intro:
      "Le Pôle Jeunes rassemble les catégories de jeunes du SMRC sur le chemin de la formation. L'objectif : structurer la progression de chaque joueur, du perfectionnement technique jusqu'à la préparation au rugby adulte.",
    points: [
      "Un parcours de formation par catégorie d'âge",
      "Développement des fondamentaux et de l'esprit collectif",
      "Un encadrement à l'écoute de chaque profil",
      "La préparation vers les équipes seniors du club",
    ],
  },
  {
    slug: "cel",
    name: "CEL",
    tagline: "Le Centre d'Entraînement Labellisé du SMRC",
    intro:
      "Le CEL est une structure de formation dédiée à l'accompagnement des jeunes joueurs vers le haut niveau. Elle allie exigence sportive et suivi éducatif pour permettre à chacun de progresser dans les meilleures conditions.",
    points: [
      "Un cadre d'entraînement structuré et régulier",
      "Un accompagnement sportif et éducatif",
      "Le développement des joueurs à fort potentiel",
      "Une passerelle vers le rugby de compétition",
    ],
  },
];

export function getFormation(slug: string): Formation | undefined {
  return formations.find((f) => f.slug === slug);
}
