import type { Metadata } from "next";
import { site } from "@/data/site";

type SeoArgs = {
  title: string;
  description: string;
  path?: string; // ex: "/ecole-de-rugby"
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

/** Génère un objet Metadata Next.js cohérent (canonical, OG, Twitter). */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noIndex = false,
}: SeoArgs): Metadata {
  const url = new URL(path, site.url).toString();
  const ogImage = image || new URL("/opengraph-image", site.url).toString();
  const fullTitle = title.includes(site.shortName) || title.includes(site.name)
    ? title
    : `${title} | ${site.shortName}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
