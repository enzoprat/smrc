import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { CTASection } from "@/components/CTASection";
import { Trophy } from "@/components/Icons";
import { timeline, palmares } from "@/data/club";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Notre histoire | Saint-Médard Rugby Club",
  description:
    "120 ans de rugby jaune et noir : fondation, grandes dates, palmarès et évolution du Saint-Médard Rugby Club.",
  path: "/club/histoire",
});

export default function HistoirePage() {
  return (
    <>
      <PageHero
        eyebrow="Le Club"
        title="Notre histoire"
        description="Plus d'un siècle de rugby, de formation et d'attachement au territoire girondin."
        crumbs={[
          { name: "Le Club", path: "/club" },
          { name: "Notre histoire", path: "/club/histoire" },
        ]}
      />

      {/* Timeline */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x max-w-4xl">
          <SectionTitle eyebrow="Grandes dates" title="Une histoire jaune et noir" />
          <ol className="mt-12 space-y-0">
            {timeline.map((entry, i) => (
              <li key={i} className="relative grid grid-cols-[auto_1fr] gap-6 pb-12 last:pb-0">
                {/* Ligne verticale + point */}
                <div className="flex flex-col items-center">
                  <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-sm bg-gold font-display text-sm font-bold uppercase text-ink-900">
                    {entry.year.length > 4 ? "•" : entry.year}
                  </span>
                  {i < timeline.length - 1 && <span className="mt-2 w-px flex-1 bg-ink-900/10" />}
                </div>
                <div className="pt-1">
                  <span className="font-display text-sm font-semibold uppercase tracking-wide text-gold-700">
                    {entry.year}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold uppercase text-ink-900 sm:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-ink-600">{entry.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-ink-500">[À confirmer : dates historiques exactes du club]</p>
        </div>
      </section>

      {/* Palmarès */}
      <section className="bg-ink-900 py-16 sm:py-24">
        <div className="container-x max-w-4xl">
          <SectionTitle eyebrow="Palmarès" title="Nos titres et distinctions" dark />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {palmares.map((p, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-white/80">
                <Trophy width={22} height={22} className="mt-0.5 flex-shrink-0 text-gold" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Identité */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x max-w-3xl text-center">
          <SectionTitle
            eyebrow="Identité"
            title="Le jaune et noir, une fierté locale"
            align="center"
          />
          <p className="mt-6 text-lg text-ink-600">
            Les couleurs jaune et noir du SMRC sont bien plus qu'un maillot : elles incarnent
            l'attachement à Saint-Médard-en-Jalles, la transmission entre générations et l'esprit de
            famille qui anime le club depuis sa fondation.
          </p>
        </div>
      </section>

      <CTASection
        title="Écrivez la suite de notre histoire"
        text="Rejoignez le club comme joueur, bénévole ou supporter et faites partie de l'aventure."
        primary={{ label: "Rejoindre le club", href: "/contact" }}
        secondary={{ label: "Découvrir les équipes", href: "/equipes" }}
      />
    </>
  );
}
