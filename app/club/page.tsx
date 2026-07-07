import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Placeholder } from "@/components/Placeholder";
import { CTASection } from "@/components/CTASection";
import { ArrowRight, Users } from "@/components/Icons";
import { clubValues, organigramme } from "@/data/club";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Le Club | Saint-Médard Rugby Club",
  description:
    "Découvrez le Saint-Médard Rugby Club : histoire, valeurs, stade Robert Monseau, organigramme et vie associative à Saint-Médard-en-Jalles.",
  path: "/club",
});

export default function ClubPage() {
  return (
    <>
      <PageHero
        eyebrow="Le Club"
        title="Un club, une famille, un territoire"
        description="Depuis plus d'un siècle, le SMRC fait vivre le rugby et ses valeurs à Saint-Médard-en-Jalles."
        crumbs={[{ name: "Le Club", path: "/club" }]}
      />

      {/* Présentation */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle
              eyebrow="Notre histoire"
              title="Plus de 120 ans de passion"
              subtitle="Né en 1905, le Saint-Médard Rugby Club est l'un des clubs historiques de la métropole bordelaise."
            />
            <p className="mt-6 text-ink-600">
              De génération en génération, le club a su transmettre une culture du jeu, de l'effort et
              du collectif. Aujourd'hui, le SMRC réunit une équipe première ambitieuse, une école de
              rugby dynamique et une communauté de bénévoles, supporters et partenaires fidèles.
            </p>
            <Link
              href="/club/histoire"
              className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-gold-700 hover:text-gold-600"
            >
              Découvrir notre histoire <ArrowRight width={16} height={16} />
            </Link>
          </div>
          <Placeholder src="" alt="Équipe du SMRC" label="Photo d'équipe" ratio="aspect-[4/3]" className="rounded-lg shadow-card" />
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-ink-900 py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Nos valeurs" title="Ce qui nous fait avancer" dark align="center" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {clubValues.map((v, i) => (
              <div key={v.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
                <span className="font-display text-3xl font-extrabold text-gold/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold uppercase text-white">{v.title}</h3>
                <p className="mt-2 text-sm text-white/60">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stade */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Placeholder src="" alt="Stade Robert Monseau" label="Stade Robert Monseau" ratio="aspect-[4/3]" className="rounded-lg shadow-card" />
          <div>
            <SectionTitle
              eyebrow="Notre stade"
              title="Stade Robert Monseau"
              subtitle="Le cœur battant du club, théâtre de nos matchs à domicile et de la formation des jeunes."
            />
            <p className="mt-6 text-ink-600">
              Situé rue Charles Capsec à Saint-Médard-en-Jalles, le stade Robert Monseau accueille
              chaque week-end joueurs, familles et supporters dans une ambiance unique.
            </p>
            <Link
              href="/club/stade-robert-monseau"
              className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-gold-700 hover:text-gold-600"
            >
              Infos pratiques & accès <ArrowRight width={16} height={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Organigramme + Bénévoles */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Organisation"
            title="Celles et ceux qui font le club"
            subtitle="Le SMRC fonctionne grâce à l'engagement de dirigeants et de bénévoles passionnés."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {organigramme.map((m) => (
              <div key={m.role} className="flex items-center gap-4 rounded-lg bg-bone p-5 ring-1 ring-black/5">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm bg-ink-900 text-gold">
                  <Users width={22} height={22} />
                </span>
                <div>
                  <p className="font-display text-base font-bold uppercase text-ink-900">{m.name}</p>
                  <p className="text-sm text-ink-500">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-500">[À confirmer : noms et fonctions des dirigeants]</p>
        </div>
      </section>

      <CTASection
        eyebrow="Anciens & bénévoles"
        title="Envie de contribuer à la vie du club ?"
        text="Anciens joueurs, parents, supporters : le club a besoin de toutes les bonnes volontés."
        primary={{ label: "Devenir bénévole", href: "/contact" }}
        secondary={{ label: "Nous contacter", href: "/contact" }}
      />
    </>
  );
}
