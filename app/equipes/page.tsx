import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { TeamCard } from "@/components/TeamCard";
import { CTASection } from "@/components/CTASection";
import { teams } from "@/data/teams";
import { findImage } from "@/lib/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nos équipes | Saint-Médard Rugby Club",
  description:
    "Découvrez toutes les équipes seniors du SMRC : équipe première (Nationale 2), espoirs, Les Jalloises (féminines) et le rugby loisir.",
  path: "/equipes",
});

export default function EquipesPage() {
  return (
    <>
      <PageHero
        eyebrow="Équipes"
        title="Toutes nos équipes"
        description="De l'école de rugby à l'équipe première, toutes les générations portent les couleurs jaune et noir."
        crumbs={[{ name: "Équipes", path: "/equipes" }]}
      />

      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Le club"
            title="Une formation complète"
            subtitle="Chaque catégorie a sa place et son rôle dans la grande famille du SMRC."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((t) => (
              <TeamCard
                key={t.slug}
                team={{ ...t, image: findImage("accueil/categories", t.slug) ?? t.image }}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Envie de rejoindre une équipe ?"
        text="Débutant ou expérimenté, jeune ou senior : contactez le club pour trouver votre place."
        primary={{ label: "Rejoindre le club", href: "/contact" }}
        secondary={{ label: "École de rugby", href: "/ecole-de-rugby" }}
      />
    </>
  );
}
