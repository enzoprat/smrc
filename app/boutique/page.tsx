import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Placeholder } from "@/components/Placeholder";
import { CTASection } from "@/components/CTASection";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Boutique | Saint-Médard Rugby Club",
  description:
    "La boutique officielle du SMRC : maillots, textiles et accessoires aux couleurs jaune et noir pour soutenir le club.",
  path: "/boutique",
});

const products = [
  { name: "Maillot domicile", price: "Prix [À confirmer]", cat: "Textile" },
  { name: "Polo supporter", price: "Prix [À confirmer]", cat: "Textile" },
  { name: "Sweat capuche SMRC", price: "Prix [À confirmer]", cat: "Textile" },
  { name: "Écharpe jaune & noir", price: "Prix [À confirmer]", cat: "Accessoire" },
  { name: "Casquette club", price: "Prix [À confirmer]", cat: "Accessoire" },
  { name: "Sac de sport", price: "Prix [À confirmer]", cat: "Accessoire" },
];

export default function BoutiquePage() {
  return (
    <>
      <PageHero
        eyebrow="Boutique"
        title="Portez les couleurs du club"
        description="Maillots, textiles et accessoires officiels : affichez votre fierté jaune et noir."
        crumbs={[{ name: "Boutique", path: "/boutique" }]}
      />

      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Pack supporter"
            title="Les essentiels du club"
            subtitle="Une sélection de produits aux couleurs du SMRC. Boutique en ligne à venir."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.name} className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <Placeholder src="" alt={p.name} label={p.cat} ratio="aspect-square" />
                <div className="p-4">
                  <span className="text-xs uppercase tracking-wide text-gold-700">{p.cat}</span>
                  <h3 className="font-display text-base font-bold uppercase text-ink-900">{p.name}</h3>
                  <p className="mt-1 text-sm text-ink-500">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-500">[À confirmer : catalogue, prix et lien boutique]</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x">
          <div className="grid gap-6 rounded-lg bg-ink-900 p-8 text-white sm:p-12 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-2">
              <SectionTitle
                eyebrow="Commander"
                title="Boutique en ligne & dons"
                subtitle="Commandez vos produits ou soutenez le club via notre billetterie en ligne."
                dark
              />
            </div>
            <div className="flex flex-col gap-3">
              <a href={site.external.boutique} target="_blank" rel="noopener noreferrer" className="btn-gold">
                Accéder à la boutique
              </a>
              <a href={site.external.helloAsso} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Faire un don (HelloAsso)
              </a>
              <p className="text-xs text-white/40">[À confirmer : lien HelloAsso]</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Soutenez le club autrement"
        text="Abonnements, repas supporters et dons : il existe mille façons de faire vivre le SMRC."
        primary={{ label: "Billetterie & abonnements", href: "/billetterie-abonnements" }}
        secondary={{ label: "Devenir partenaire", href: "/partenaires/devenir-partenaire" }}
      />
    </>
  );
}
