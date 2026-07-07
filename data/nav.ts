/**
 * Source unique de vérité pour la navigation du site.
 * Pour ajouter une page au menu, il suffit d'ajouter une entrée ici.
 */

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Actualités", href: "/actualites" },
  {
    label: "Le Club",
    href: "/club",
    children: [
      { label: "Présentation", href: "/club", description: "Histoire, valeurs et organisation" },
      { label: "Notre histoire", href: "/club/histoire", description: "120 ans de rugby jaune et noir" },
      {
        label: "Stade Robert Monseau",
        href: "/club/stade-robert-monseau",
        description: "Accès, infos pratiques, jour de match",
      },
    ],
  },
  {
    label: "Équipes",
    href: "/equipes",
    children: [
      { label: "Toutes les équipes", href: "/equipes" },
      { label: "Équipe Première", href: "/equipes/equipe-premiere" },
    ],
  },
  { label: "École de Rugby", href: "/ecole-de-rugby" },
  { label: "Calendrier & Résultats", href: "/calendrier-resultats" },
  {
    label: "Partenaires",
    href: "/partenaires",
    children: [
      { label: "Nos partenaires", href: "/partenaires" },
      { label: "Devenir partenaire", href: "/partenaires/devenir-partenaire" },
    ],
  },
  { label: "Boutique", href: "/boutique" },
  { label: "Contact", href: "/contact" },
];

/** CTA mis en avant dans le header */
export const headerCta = {
  label: "Inscrire mon enfant",
  href: "/ecole-de-rugby#inscription",
};

/** Liens regroupés pour le footer */
export const footerNav = {
  club: [
    { label: "Le Club", href: "/club" },
    { label: "Notre histoire", href: "/club/histoire" },
    { label: "Stade Robert Monseau", href: "/club/stade-robert-monseau" },
    { label: "Actualités", href: "/actualites" },
    { label: "Contact", href: "/contact" },
  ],
  teams: [
    { label: "Équipe Première", href: "/equipes/equipe-premiere" },
    { label: "Toutes les équipes", href: "/equipes" },
    { label: "École de Rugby", href: "/ecole-de-rugby" },
    { label: "Calendrier & Résultats", href: "/calendrier-resultats" },
  ],
  support: [
    { label: "Devenir partenaire", href: "/partenaires/devenir-partenaire" },
    { label: "Nos partenaires", href: "/partenaires" },
    { label: "Boutique", href: "/boutique" },
    { label: "Billetterie & Abonnements", href: "/billetterie-abonnements" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  ],
};
