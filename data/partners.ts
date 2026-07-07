/**
 * Partenaires du club, regroupés par niveau.
 * Données dans partners.json (éditable depuis l'admin via commit GitHub).
 * [À confirmer : liste réelle des partenaires et logos]
 */
import data from "./partners.json";

export type PartnerTier = "majeur" | "officiel" | "soutien" | "institutionnel";

export type Partner = {
  id: string;
  name: string;
  tier: PartnerTier;
  url?: string;
  logo?: string; // chemin /partners/xxx.png — placeholder si vide
};

export const tierLabels: Record<PartnerTier, string> = {
  majeur: "Partenaires majeurs",
  officiel: "Partenaires officiels",
  soutien: "Partenaires soutien",
  institutionnel: "Partenaires institutionnels",
};

export const partners: Partner[] = data as Partner[];

export function partnersByTier(tier: PartnerTier): Partner[] {
  return partners.filter((p) => p.tier === tier);
}

/** Offres de partenariat — prix sur demande. */
export type PartnerPack = {
  name: string;
  pitch: string;
  benefits: string[];
  featured?: boolean;
};

export const partnerPacks: PartnerPack[] = [
  {
    name: "Pack Local",
    pitch: "Soutenez le club et affichez votre engagement local.",
    benefits: [
      "Logo sur le site internet du club",
      "Mention sur les réseaux sociaux",
      "Invitations jour de match",
    ],
  },
  {
    name: "Pack Club",
    pitch: "Une visibilité régulière auprès de la communauté SMRC.",
    benefits: [
      "Panneau publicitaire au stade Robert Monseau",
      "Logo sur le site et la newsletter",
      "Pack d'invitations + accès espace réception",
      "Mise en avant sur les réseaux sociaux",
    ],
  },
  {
    name: "Pack Premium",
    pitch: "Associez durablement votre marque aux couleurs jaune et noir.",
    benefits: [
      "Panneau premium et bâche bord de terrain",
      "Logo sur les supports de communication",
      "Hospitalité jour de match (loge / table)",
      "Présence sur le mur des partenaires",
      "Opérations de communication dédiées",
    ],
    featured: true,
  },
  {
    name: "Pack Majeur",
    pitch: "Devenez un partenaire de référence du SMRC.",
    benefits: [
      "Naming d'une tribune ou d'un événement",
      "Visibilité maillot / équipements",
      "Hospitalité VIP toute la saison",
      "Soirées réseau entreprises du club",
      "Plan de communication sur-mesure",
    ],
  },
];
