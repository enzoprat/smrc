import { site } from "@/data/site";

/** Fabriques de données structurées JSON-LD (schema.org). */

export function sportsOrganizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: site.name,
    alternateName: site.shortName,
    sport: "Rugby",
    foundingDate: String(site.foundedYear),
    url: site.url,
    logo: new URL("/logo.png", site.url).toString(),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.street,
      postalCode: site.contact.postalCode,
      addressLocality: site.contact.city,
      addressRegion: site.contact.region,
      addressCountry: "FR",
    },
    telephone: site.contact.phone,
    email: site.contact.email,
    sameAs: [site.social.facebook, site.social.instagram, site.social.youtube].filter(Boolean),
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: new URL("/logo.png", site.url).toString(),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.street,
      postalCode: site.contact.postalCode,
      addressLocality: site.contact.city,
      addressCountry: "FR",
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: new URL(it.path, site.url).toString(),
    })),
  };
}

export function eventLd(args: {
  name: string;
  startDate: string;
  location: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: args.name,
    startDate: args.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: args.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.contact.city,
        addressCountry: "FR",
      },
    },
    organizer: { "@type": "SportsOrganization", name: site.name, url: site.url },
    url: args.url ? new URL(args.url, site.url).toString() : site.url,
  };
}

export function articleLd(args: {
  title: string;
  description: string;
  date: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    datePublished: args.date,
    dateModified: args.date,
    image: args.image ? new URL(args.image, site.url).toString() : undefined,
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: new URL("/logo.png", site.url).toString() },
    },
    mainEntityOfPage: new URL(args.path, site.url).toString(),
  };
}

export function faqLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}
