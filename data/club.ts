/**
 * Contenu éditorial du club : valeurs, histoire (timeline), organigramme.
 * [À confirmer : dates et données historiques exactes]
 */

export const clubValues = [
  {
    title: "Engagement",
    text: "Sur le terrain comme en dehors, on donne tout pour le maillot, les coéquipiers et le club.",
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

// [À confirmer : dates historiques exactes du club]
export const timeline: TimelineEntry[] = [
  {
    year: "1905",
    title: "Naissance du club",
    text: "Les origines du rugby à Saint-Médard-en-Jalles. Le club plante les racines d'une longue histoire jaune et noir.",
  },
  {
    year: "Années 1950-70",
    title: "Enracinement local",
    text: "Le club s'installe durablement dans le paysage sportif girondin et fidélise plusieurs générations de joueurs et supporters.",
  },
  {
    year: "Années 1990-2000",
    title: "Structuration & formation",
    text: "Montée en puissance de l'école de rugby et structuration de la formation des jeunes.",
  },
  {
    year: "Aujourd'hui",
    title: "Ambition & territoire",
    text: "Une équipe première en Fédérale 1, une école de rugby dynamique et un club fédérateur sur la métropole bordelaise.",
  },
];

// [À confirmer : palmarès officiel]
export const palmares = [
  "Titres et accessions [À confirmer]",
  "Parcours en Coupe / Phases finales [À confirmer]",
  "Distinctions formation / école de rugby [À confirmer]",
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
