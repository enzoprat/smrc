/**
 * Configuration globale du site SMRC.
 * Centralise les informations du club réutilisées partout (footer, SEO, JSON-LD, contact).
 */

export const site = {
  name: "Saint-Médard Rugby Club",
  shortName: "SMRC",
  tagline: "120 ans de rugby, de formation et de passion à Saint-Médard-en-Jalles.",
  // Ajuster avec l'URL de production réelle (utilisé pour le SEO / canonical / sitemap)
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://smrc33.fr",
  locale: "fr_FR",
  foundedYear: 1905,
  division: "Fédérale 1",
  colors: "Jaune & Noir",
  contact: {
    clubName: "Saint-Médard Rugby Club",
    venue: "Stade Robert Monseau",
    street: "Rue Charles Capsec",
    postalCode: "33160",
    city: "Saint-Médard-en-Jalles",
    region: "Gironde",
    country: "France",
    // [À confirmer : numéro de téléphone officiel]
    phone: "05 56 00 00 00",
    // [À confirmer : email officiel]
    email: "contact@smrc33.fr",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    // [À confirmer : liens réseaux sociaux officiels]
  },
  // Liens externes (billetterie / boutique) — à confirmer
  external: {
    helloAsso: "#", // [À confirmer : lien HelloAsso]
    boutique: "https://b5.intersport-boutique-club.fr/56-saint-medard-rugby-club",
    ffr: "https://www.ffr.fr/",
  },
};

export type Site = typeof site;
