import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { CTASection } from "@/components/CTASection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Arbitres | Notre Formation | Saint-Médard Rugby Club",
  description:
    "La formation à l'arbitrage au Saint-Médard Rugby Club. Contenu à venir prochainement.",
  path: "/arbitres",
});

export default function ArbitresPage() {
  return (
    <>
      <PageHero
        eyebrow="Notre Formation"
        title="Arbitres"
        description="La formation à l'arbitrage au Saint-Médard Rugby Club."
        crumbs={[
          { name: "Notre Formation", path: "/ecole-de-rugby" },
          { name: "Arbitres", path: "/arbitres" },
        ]}
      />

      <section className="bg-white py-24 sm:py-32">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <SectionTitle eyebrow="Bientôt disponible" title="Page à venir" align="center" />
            <p className="mt-6 text-ink-600">
              Cette page est en cours de préparation. Revenez prochainement pour découvrir la
              formation à l'arbitrage au SMRC.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Une question sur l'arbitrage ?"
        text="Contactez le club pour en savoir plus sur la formation à l'arbitrage."
        primary={{ label: "Nous contacter", href: "/contact" }}
        secondary={{ label: "Notre Formation", href: "/ecole-de-rugby" }}
      />
    </>
  );
}
