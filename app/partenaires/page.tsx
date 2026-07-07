import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { PartnerLogoGrid } from "@/components/PartnerLogoGrid";
import { CTASection } from "@/components/CTASection";
import { partnersByTier, tierLabels, type PartnerTier } from "@/data/partners";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nos partenaires | Saint-Médard Rugby Club",
  description:
    "Ils font vivre le rugby à Saint-Médard-en-Jalles. Découvrez les entreprises et institutions partenaires du SMRC.",
  path: "/partenaires",
});

const order: PartnerTier[] = ["majeur", "officiel", "soutien", "institutionnel"];

export default function PartenairesPage() {
  return (
    <>
      <PageHero
        eyebrow="Partenaires"
        title="Nos partenaires"
        description="Ils font vivre le rugby à Saint-Médard-en-Jalles. Merci à toutes les entreprises et institutions qui soutiennent le club."
        crumbs={[{ name: "Partenaires", path: "/partenaires" }]}
      />

      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x space-y-14">
          {order.map((tier) => {
            const list = partnersByTier(tier);
            if (!list.length) return null;
            return (
              <div key={tier}>
                <SectionTitle eyebrow="Ils nous soutiennent" title={tierLabels[tier]} />
                <div className="mt-8">
                  <PartnerLogoGrid partners={list} />
                </div>
              </div>
            );
          })}
          <p className="text-sm text-ink-500">[À confirmer : liste réelle des partenaires et logos]</p>
        </div>
      </section>

      <CTASection
        eyebrow="Rejoignez-les"
        title="Associez votre entreprise au SMRC"
        text="Visibilité locale, réseau d'entreprises, hospitalité jour de match : découvrez nos offres de partenariat."
        primary={{ label: "Devenir partenaire", href: "/partenaires/devenir-partenaire" }}
        secondary={{ label: "Nous contacter", href: "/contact" }}
      />
    </>
  );
}
