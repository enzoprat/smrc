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
  price?: string;
  featured?: boolean;
};

export const partnerPacks: PartnerPack[] = [
  {
    name: "Pack Privilège",
    pitch: "Une première marche pour associer votre entreprise au club.",
    price: "3 000 €",
    benefits: [
      "Panneau affichage stade : 2x1",
      "Panneau partenaires",
      "2 abonnements match à domicile",
      "Membre XV des Jalles",
      "Invitation soirée Partenaires",
      "Annonce du partenariat",
      "Accès terrasse partenaires",
    ],
  },
  {
    name: "Partenaire Performance",
    pitch: "Associez votre entreprise à l'élite du rugby et profitez d'une expérience premium autour du CEL.",
    price: "5 000 €",
    benefits: [
      "Logo sur les supports officiels du club (site, réseaux, affiches)",
      "Présence sur les équipements et le textile du CEL",
      "Repas d'avant-match pour 2 à 4 collaborateurs (match seniors)",
      "Partenaire de la mi-temps : annonce micro + programmes",
      "Bracelet VIP et gratuité buvette les jours de match",
      "Journée team building avec nos coachs",
      "Parrainage du stage performance et cohésion du CEL",
      "Exclusivité possible : 12 000 €",
    ],
  },
  {
    name: "Pack Premium",
    pitch: "Une visibilité forte au stade et sur nos supports de communication.",
    price: "6 000 €",
    benefits: [
      "Panneau affichage stade : 4x1",
      "Panneau partenaires entrée stade",
      "6 abonnements match à domicile",
      "Membre XV des Jalles",
      "Parution à la mi-temps & dans la Gazette",
      "Invitation soirée Partenaires",
      "Annonce du partenariat",
      "All Digital",
      "Bracelet noir & accès terrasse",
      "2 accès salon l'Argilus du Roi",
    ],
  },
  {
    name: "Pack Excellence",
    pitch: "Notre offre la plus complète pour une présence maximale toute la saison.",
    price: "10 000 €",
    benefits: [
      "Panneau affichage stade : 4x3 ou à la demande",
      "Panneau partenaires entrée stade",
      "10 abonnements match à domicile & extérieur",
      "5 membres XV des Jalles",
      "Parrain d'un match de votre choix",
      "Parution dans la Gazette",
      "Hospitalité : 6 bracelets noirs",
      "Posts sponsorisés réseaux sociaux",
      "Invitation soirée Partenaires",
      "4 places salon l'Argilus du Roi",
      "All Digital",
    ],
    featured: true,
  },
];

/** Offre à la carte — prestations sur mesure, distinctes des packs. */
export const alaCarteOffer = {
  name: "Offre à la carte",
  pitch: "Une opération sur mesure, construite avec vous selon vos objectifs.",
  benefits: [
    "Séminaire avec traiteur et service",
    "Team building : découverte rugby, Koh-Lanta, journée cohésion",
    "Menu Nationale 2 : 8 places et une table de 8",
  ],
};
