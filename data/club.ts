/**
 * Contenu éditorial du club : valeurs, histoire (timeline), organigramme.
 */

export const clubValues = [
  {
    title: "Engagement",
    text: "Sur le terrain comme en dehors, on donne tout pour le maillot, le club et la ville.",
  },
  {
    title: "Formation",
    text: "De l'école de rugby à l'équipe première, nous formons des joueurs et des citoyens.",
  },
  {
    title: "Respect",
    text: "De l'adversaire, de l'arbitre, des règles et des valeurs : c'est l'âme du rugby.",
  },
  {
    title: "Transmission",
    text: "Les anciens transmettent aux jeunes une culture, une histoire et un état d'esprit.",
  },
  {
    title: "Ancrage local",
    text: "Le SMRC est un acteur de la vie de Saint-Médard-en-Jalles et de la Gironde.",
  },
];

export type TimelineEntry = {
  year: string;
  title: string;
  text: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "1905",
    title: "Naissance du club",
    text: "Le rugby prend racine à Saint-Médard-en-Jalles au sein de l'association sportive de la commune. C'est le début d'une longue histoire jaune et noir.",
  },
  {
    year: "1965",
    title: "Premier grand titre",
    text: "Le club décroche le championnat régional Côte d'Argent Honneur, première consécration d'un club en plein essor.",
  },
  {
    year: "1975",
    title: "Accession en première division",
    text: "Les Poudriers atteignent la première division et s'y maintiennent plusieurs saisons, portés par un public fidèle.",
  },
  {
    year: "1999",
    title: "Naissance du SMRC",
    text: "La section rugby prend son autonomie et devient le Saint-Médard Rugby Club, tourné vers la formation et la performance.",
  },
  {
    year: "2004",
    title: "Champion de France Honneur",
    text: "Sacré champion de France Honneur, le club accède à la Fédérale 3 et entame une progression régulière dans les divisions nationales.",
  },
  {
    year: "2009",
    title: "Montée en Fédérale 1",
    text: "Après l'accession en Fédérale 2 en 2006, le SMRC rejoint la Fédérale 1 et s'installe durablement à ce niveau.",
  },
  {
    year: "2019",
    title: "Descente en Fédérale 2",
    text: "Après plusieurs saisons au plus haut niveau régional, le club connaît une descente en Fédérale 2, point de départ d'un nouveau projet de reconstruction.",
  },
  {
    year: "2022",
    title: "Montée en Fédérale 1",
    text: "Porté par un groupe rajeuni et une formation solide, le SMRC retrouve la Fédérale 1 et relance sa dynamique sportive.",
  },
  {
    year: "2026",
    title: "Montée en Nationale 2",
    text: "Le club franchit un nouveau cap en accédant à la Nationale 2, récompense d'un projet sportif ambitieux et d'une formation exigeante.",
  },
];

export type OrgMember = {
  name: string;
  role: string;
};

// [À confirmer : organigramme et noms des dirigeants]
export const organigramme: OrgMember[] = [
  { name: "Président", role: "Présidence" },
  { name: "Vice-président", role: "Vice-présidence" },
  { name: "Secrétaire général", role: "Secrétariat" },
  { name: "Trésorier", role: "Trésorerie" },
  { name: "Responsable école de rugby", role: "Formation jeunes" },
  { name: "Responsable partenaires", role: "Partenariats & événements" },
];
