import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Placeholder } from "@/components/Placeholder";
import { CTASection } from "@/components/CTASection";
import { Check } from "@/components/Icons";
import { formations, getFormation } from "@/data/formations";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return formations.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const formation = getFormation(params.slug);
  if (!formation) return {};
  return buildMetadata({
    title: `${formation.name} | Formations | Saint-Médard Rugby Club`,
    description: formation.intro,
    path: `/formations/${formation.slug}`,
  });
}

export default function FormationPage({ params }: { params: { slug: string } }) {
  const formation = getFormation(params.slug);
  if (!formation) notFound();

  return (
    <>
      <PageHero
        eyebrow="Nos Formations"
        title={formation.name}
        description={formation.tagline}
        crumbs={[
          { name: "Nos Formations", path: "/ecole-de-rugby" },
          { name: formation.name, path: `/formations/${formation.slug}` },
        ]}
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Placeholder
            src=""
            alt={formation.name}
            label={formation.name}
            ratio="aspect-[4/3]"
            className="rounded-lg shadow-card"
          />
          <div>
            <SectionTitle eyebrow="Présentation" title={formation.tagline} />
            <p className="mt-6 text-ink-600">{formation.intro}</p>
            <ul className="mt-6 space-y-3">
              {formation.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink-700">
                  <Check width={20} height={20} className="mt-0.5 flex-shrink-0 text-gold-600" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="Envie de rejoindre nos formations ?"
        text="Contactez le club pour connaître les modalités, les créneaux et l'inscription."
        primary={{ label: "Nous contacter", href: "/contact" }}
        secondary={{ label: "École de Rugby", href: "/ecole-de-rugby" }}
      />
    </>
  );
}
