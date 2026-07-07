import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getArticleMetas } from "@/lib/content";

/** Sitemap dynamique : pages statiques + actualités publiées. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");

  const staticPaths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/actualites", priority: 0.9, changeFrequency: "daily" },
    { path: "/club", priority: 0.7, changeFrequency: "monthly" },
    { path: "/club/histoire", priority: 0.5, changeFrequency: "yearly" },
    { path: "/club/stade-robert-monseau", priority: 0.5, changeFrequency: "yearly" },
    { path: "/equipes", priority: 0.7, changeFrequency: "monthly" },
    { path: "/equipes/equipe-premiere", priority: 0.7, changeFrequency: "weekly" },
    { path: "/ecole-de-rugby", priority: 0.8, changeFrequency: "monthly" },
    { path: "/calendrier-resultats", priority: 0.9, changeFrequency: "weekly" },
    { path: "/partenaires", priority: 0.6, changeFrequency: "monthly" },
    { path: "/partenaires/devenir-partenaire", priority: 0.6, changeFrequency: "monthly" },
    { path: "/boutique", priority: 0.5, changeFrequency: "monthly" },
    { path: "/billetterie-abonnements", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const articleEntries: MetadataRoute.Sitemap = getArticleMetas().map((a) => ({
    url: `${base}/actualites/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
