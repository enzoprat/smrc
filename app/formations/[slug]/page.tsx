import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Placeholder } from "@/components/Placeholder";
import { CTASection } from "@/components/CTASection";
import { Check, Users, Clock } from "@/components/Icons";
import { formations, getFormation } from "@/data/formations";
import { findImage } from "@/lib/gallery";
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
        eyebrow="Notre Formation"
        title={formation.name}
        description={formation.tagline}
        crumbs={[
          { name: "Notre Formation", path: "/ecole-de-rugby" },
          { name: formation.name, path: `/formations/${formation.slug}` },
        ]}
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Placeholder
            src={findImage("accueil/categories", formation.slug)}
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

      {/* Équipes de la filière */}
      {formation.teams && formation.teams.length > 0 && (
        <section className="bg-bone py-16 sm:py-24">
          <div className="container-x">
            <SectionTitle eyebrow="Nos équipes" title="Les équipes de la filière" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {formation.teams.map((t) => (
                <div key={t} className="card flex flex-col items-start p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-gold text-ink-900">
                    <Users width={24} height={24} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold uppercase text-ink-900">{t}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blocs de présentation */}
      {formation.blocks && formation.blocks.length > 0 && (
        <section className="bg-ink-900 py-16 sm:py-24">
          <div className="container-x">
            <SectionTitle eyebrow="Le programme" title="Ce que le CEL apporte aux joueurs" dark />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {formation.blocks.map((b) => (
                <div key={b.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="font-display text-lg font-bold uppercase text-white">{b.title}</h3>
                  <p className="mt-3 text-sm text-white/70">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Entraînements */}
      {formation.training && formation.training.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <div className="container-x">
            <SectionTitle eyebrow="Entraînements" title="Les créneaux" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {formation.training.map((s) => (
                <div key={`${s.day}-${s.time}`} className="rounded-lg bg-bone p-5 ring-1 ring-black/5">
                  <p className="flex items-center gap-2 font-display text-lg font-bold uppercase text-ink-900">
                    <Clock width={18} height={18} className="text-gold-600" />
                    {s.day}
                  </p>
                  <p className="mt-1 text-ink-600">{s.time}</p>
                  <p className="text-sm text-ink-500">{s.place}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Envie de rejoindre nos formations ?"
        text="Contactez le club pour connaître les modalités, les créneaux et l'inscription."
        primary={{ label: "Nous contacter", href: "/contact" }}
        secondary={{ label: "École de Rugby", href: "/ecole-de-rugby" }}
      />
    </>
  );
}
