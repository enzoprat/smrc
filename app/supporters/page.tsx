import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { SupporterForm } from "@/components/SupporterForm";
import { CTASection } from "@/components/CTASection";
import { Check } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Rejoindre les supporters | Saint-Médard Rugby Club",
  description:
    "Rejoignez les supporters du SMRC : suivez le club, vibrez chaque week-end au stade Robert Monseau et faites vivre les couleurs jaune et noir.",
  path: "/supporters",
});

const perks = [
  "Toute l'actualité du club et des équipes",
  "Les rendez-vous et les jours de match",
  "L'ambiance de la communauté jaune et noir",
];

export default function SupportersPage() {
  return (
    <>
      <PageHero
        eyebrow="Supporters"
        title="Rejoignez les supporters"
        description="Chaque week-end, nos jaunes et noirs ont besoin de votre soutien. Rejoignez la communauté du SMRC."
        crumbs={[{ name: "Supporters", path: "/supporters" }]}
      />

      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionTitle eyebrow="Pourquoi nous rejoindre" title="Vivez le club de l'intérieur" />
            <p className="mt-6 text-ink-600">
              Devenir supporter, c'est faire partie de la grande famille du SMRC. Inscrivez-vous pour
              rester informé et soutenir les équipes tout au long de la saison.
            </p>
            <ul className="mt-8 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink-700">
                  <Check width={20} height={20} className="mt-0.5 flex-shrink-0 text-gold-600" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-card ring-1 ring-black/5 sm:p-8">
            <SectionTitle eyebrow="Inscription" title="Vos coordonnées" />
            <div className="mt-8">
              <SupporterForm />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Soutenez le club autrement"
        text="Abonnements, billetterie, boutique et partenariats : il existe mille façons de faire vivre le SMRC."
        primary={{ label: "Billetterie & abonnements", href: "/billetterie-abonnements" }}
        secondary={{ label: "Boutique", href: "/boutique" }}
      />
    </>
  );
}
