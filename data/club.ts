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
    title: "Le rugby prend racine",
    text: "Le rugby prend racine à Saint-Médard-en-Jalles avec l'association rugby de l'ASSM. C'est le début d'une longue histoire en jaune et noir.",
  },
  {
    year: "1933",
    title: "L'ASSM devient omnisports",
    text: "L'émergence du sport dans la ville de Saint-Médard-en-Jalles fait devenir l'ASSM en omnisports.",
  },
  {
    year: "1969",
    title: "Montée en Troisième Division Nationale",
    text: "Le club accède à la Troisième Division Nationale.",
  },
  {
    year: "1972",
    title: "Montée en Deuxième Division Nationale",
    text: "Après une saison conclue par une qualification en phases finales, les Jaune et Noir ont validé leur montée en Deuxième Division Nationale en s'imposant 13 à 6 face à Bizanos. Leur parcours s'est ensuite arrêté au tour suivant, avec une défaite 21 à 10 contre Aiguillon.",
  },
  {
    year: "1974",
    title: "Montée en Première Division Nationale",
    text: "Après avoir éliminé Vierzon puis Clamart (6-0), l'ASSM décroche sa montée en Première Division Nationale en battant Poitiers 10 à 6. Son parcours s'arrête au tour suivant face à Salles.",
  },
  {
    year: "1979",
    title: "Descente en Deuxième Division Nationale",
    text: "Après plusieurs saisons au plus haut niveau, l'ASSM termine dernière de sa poule et est reléguée en Deuxième Division Nationale. Cette descente marque la fin d'une des plus belles périodes de l'histoire du club.",
  },
  {
    year: "1983",
    title: "Montée en Première Division Nationale (Groupe B)",
    text: "Après trois saisons d'éliminations précoces en phases finales, l'ASSM retrouve la Première Division Nationale. Les Jaune et Noir éliminent successivement Saint-Junien (24-9), Morcenx (12-12, qualification au nombre d'expulsés), puis le club de la Police de Paris (18-15) pour décrocher leur montée. Leur parcours s'achève en quarts de finale face à Arras (30-10).",
  },
  {
    year: "1985",
    title: "Descente en Deuxième Division Nationale",
    text: "L'équipe termine avant-dernière de sa poule et est reléguée en Deuxième Division, où elle reste quelques saisons.",
  },
  {
    year: "1999",
    title: "Naissance du SMRC",
    text: "La section Rugby de l'ASSM se sépare de l'entité Omnisport et devient le Saint-Médard Rugby Club (SMRC).",
  },
  {
    year: "2004",
    title: "Montée en Fédérale 3",
    text: "Sacré champion de France Honneur, le club accède à la Fédérale 3 et entame une progression régulière dans les divisions nationales.",
  },
  {
    year: "2006",
    title: "Montée en Fédérale 2",
    text: "Le SMRC poursuit sa progression et accède à la Fédérale 2.",
  },
  {
    year: "2009",
    title: "Montée en Fédérale 1",
    text: "Le SMRC rejoint la Fédérale 1 et s'installe durablement à ce niveau.",
  },
  {
    year: "2013",
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

export const organigramme: OrgMember[] = [
  { name: "Jean-Luc Castaing", role: "Co-Président" },
  { name: "Olivier Arregle", role: "Co-Président" },
  { name: "Hervé Dubes", role: "Co-Président" },
  { name: "David Labarbe", role: "Vice-Président" },
  { name: "Nicolas Monginous", role: "Vice-Président" },
  { name: "Gaëtan Ramond", role: "Vice-Président" },
  { name: "Michel Touron", role: "Secrétaire Général" },
  { name: "Dominique Fautrier", role: "Trésorier" },
];
