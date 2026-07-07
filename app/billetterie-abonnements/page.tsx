import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { CTASection } from "@/components/CTASection";
import { Check } from "@/components/Icons";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Billetterie & Abonnements | Saint-Médard Rugby Club",
  description:
    "Abonnements saison, repas supporters, packs et dons : soutenez le SMRC et vivez chaque match au stade Robert Monseau.",
  path: "/billetterie-abonnements",
});

const offers = [
  {
    name: "Abonnement saison",
    desc: "Accédez à tous les matchs à domicile de la saison.",
    benefits: ["Accès à tous les matchs à domicile", "Tarif préférentiel", "Soutien direct au club"],
    cta: "S'abonner",
    featured: true,
  },
  {
    name: "Repas supporters",
    desc: "Partagez un moment convivial avant chaque match à domicile.",
    benefits: ["Repas au club house", "Ambiance famille rugby", "Sur réservation"],
    cta: "Réserver un repas",
  },
  {
    name: "Pack supporter",
    desc: "Le pack pour vivre la saison à fond aux couleurs du club.",
    benefits: ["Goodies aux couleurs SMRC", "Avantages partenaires", "Surprises de la saison"],
    cta: "Commander le pack",
  },
  {
    name: "Faire un don",
    desc: "Soutenez la formation des jeunes et la vie du club.",
    benefits: ["Soutien à l'école de rugby", "Reçu fiscal éventuel", "Tout montant compte"],
    cta: "Faire un don",
  },
];

export default function BilletteriePage() {
  return (
    <>
      <PageHero
        eyebrow="Soutenir le club"
        title="Billetterie & Abonnements"
        description="Vivez chaque match au stade et soutenez le SMRC tout au long de la saison."
        crumbs={[{ name: "Billetterie & Abonnements", path: "/billetterie-abonnements" }]}
      />

      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Nos offres" title="Choisissez votre formule" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {offers.map((o) => (
              <div
                key={o.name}
                className={`flex flex-col rounded-lg p-6 ${
                  o.featured ? "bg-ink-900 text-white shadow-card ring-2 ring-gold" : "bg-white ring-1 ring-black/5"
                }`}
              >
                <h3 className={`font-display text-xl font-bold uppercase ${o.featured ? "text-gold" : "text-ink-900"}`}>
                  {o.name}
                </h3>
                <p className={`mt-2 text-sm ${o.featured ? "text-white/70" : "text-ink-600"}`}>{o.desc}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {o.benefits.map((b) => (
                    <li key={b} className={`flex items-start gap-2 text-sm ${o.featured ? "text-white/80" : "text-ink-700"}`}>
                      <Check width={16} height={16} className="mt-0.5 flex-shrink-0 text-gold-600" />
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={site.external.helloAsso}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={o.featured ? "btn-gold mt-5" : "btn-dark mt-5"}
                >
                  {o.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-500">[À confirmer : tarifs et liens HelloAsso]</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Infos pratiques" title="Retrait & accès" />
          <div className="mt-6 space-y-3 text-ink-600">
            <p>
              Les abonnements et billets sont à retirer auprès du club ou présentés directement à
              l'entrée du stade Robert Monseau les jours de match.
            </p>
            <p>[À confirmer : modalités de retrait, points de vente et horaires]</p>
          </div>
        </div>
      </section>

      <CTASection
        title="Rendez-vous au stade Robert Monseau"
        text="Préparez votre venue : retrouvez toutes les infos d'accès et de parking."
        primary={{ label: "Infos stade & accès", href: "/club/stade-robert-monseau" }}
        secondary={{ label: "Voir le calendrier", href: "/calendrier-resultats" }}
      />
    </>
  );
}
