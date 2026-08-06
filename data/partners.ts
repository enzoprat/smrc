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

/** id du partenaire à mettre en tête de sa catégorie (créateur du site). */
const PINNED_PARTNER_ID = "p8";

export function partnersByTier(tier: PartnerTier): Partner[] {
  return partners
    .filter((p) => p.tier === tier)
    .sort((a, b) => {
      if (a.id === PINNED_PARTNER_ID) return -1;
      if (b.id === PINNED_PARTNER_ID) return 1;
      return 0;
    });
}

/** Offres de partenariat — prix sur demande. */
export type PartnerPack = {
  name: string;
  pitch: string;
  benefits: string[];
  price?: string;
  featured?: boolean;
};

export const partnerPacks: PartnerPack[] = [
  {
    name: "Pack Découverte",
    pitch: "Rejoignez le réseau des partenaires et soutenez le club.",
    price: "500 €",
    benefits: [
      "Club 1905 — accès au réseau des partenaires",
      "Annonce du partenariat",
      "Invitation à la soirée partenaires",
      "4 abonnements",
    ],
  },
  {
    name: "Partenaire Territoire",
    pitch: "Ancrez votre marque au cœur du stade et de la vie du club.",
    price: "1 000 €",
    benefits: [
      "Club 1905 — accès au réseau des partenaires",
      "Abri de touche",
      "Invitation à la soirée partenaires",
      "Annonce du partenariat",
      "4 abonnements",
    ],
    featured: true,
  },
];
