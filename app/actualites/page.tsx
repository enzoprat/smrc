import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { NewsGrid } from "@/components/NewsGrid";
import { CTASection } from "@/components/CTASection";
import { getArticleMetas } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Actualités du Saint-Médard Rugby Club",
  description:
    "Toutes les actualités du SMRC : matchs, école de rugby, partenaires, événements et vie associative à Saint-Médard-en-Jalles.",
  path: "/actualites",
});

export default function ActualitesPage() {
  const articles = getArticleMetas();

  return (
    <>
      <PageHero
        eyebrow="Actualités"
        title="Toute l'actu du club"
        description="Matchs, école de rugby, partenaires, événements : suivez la vie du SMRC au plus près."
        crumbs={[{ name: "Actualités", path: "/actualites" }]}
      />

      <section className="bg-bone py-16 sm:py-20">
        <div className="container-x">
          {articles.length === 0 ? (
            <p className="text-center text-ink-500">
              Les premières actualités arrivent très bientôt.
            </p>
          ) : (
            <NewsGrid articles={articles} />
          )}
        </div>
      </section>

      <CTASection
        title="Ne manquez aucune actualité"
        text="Suivez le club sur les réseaux sociaux et venez vivre les matchs au stade Robert Monseau."
        primary={{ label: "Voir le calendrier", href: "/calendrier-resultats" }}
        secondary={{ label: "Nous contacter", href: "/contact" }}
      />
    </>
  );
}
