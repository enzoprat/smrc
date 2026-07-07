import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Placeholder } from "@/components/Placeholder";
import { MatchCard } from "@/components/MatchCard";
import { ResultCard } from "@/components/ResultCard";
import { CTASection } from "@/components/CTASection";
import { firstTeamPlayers, firstTeamStaff } from "@/data/teams";
import { getUpcomingMatches } from "@/data/matches";
import { getResults, standings } from "@/data/results";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Équipe Première (Fédérale 1) | Saint-Médard Rugby Club",
  description:
    "L'équipe première du SMRC en Fédérale 1 : effectif, staff, calendrier, résultats et classement. Venez encourager les jaune et noir !",
  path: "/equipes/equipe-premiere",
});

export default function EquipePremierePage() {
  const matches = getUpcomingMatches().filter((m) => m.team === "Équipe Première").slice(0, 2);
  const teamResults = getResults().filter((r) => r.team === "Équipe Première").slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow="Équipes · Fédérale 1"
        title="Équipe Première"
        description="Le fer de lance du club, porteur des ambitions et des couleurs du SMRC au plus haut niveau régional."
        crumbs={[
          { name: "Équipes", path: "/equipes" },
          { name: "Équipe Première", path: "/equipes/equipe-premiere" },
        ]}
      />

      {/* Présentation */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Placeholder src="" alt="Équipe première du SMRC" label="Équipe première" ratio="aspect-[4/3]" className="rounded-lg shadow-card" />
          <div>
            <SectionTitle eyebrow="Présentation" title="Les jaune et noir" />
            <p className="mt-6 text-ink-600">
              Engagée en {site.division}, l'équipe première incarne l'ambition du club. Un groupe
              soudé, formé en grande partie au club, qui défend les couleurs du SMRC chaque week-end
              devant son public au stade Robert Monseau.
            </p>
            <p className="mt-4 text-ink-600">[À confirmer : présentation détaillée de la saison en cours]</p>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="bg-ink-900 py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Encadrement" title="Le staff" dark />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {firstTeamStaff.map((s, i) => (
              <div key={i} className="overflow-hidden rounded-lg bg-white/[0.03] ring-1 ring-white/10">
                <Placeholder src={s.image} alt={s.name} label="Staff" ratio="aspect-square" />
                <div className="p-4">
                  <p className="font-display text-base font-bold uppercase text-white">{s.name}</p>
                  <p className="text-sm text-gold">{s.role}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/40">[À confirmer : staff réel]</p>
        </div>
      </section>

      {/* Effectif */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Effectif" title="Les joueurs" subtitle="L'effectif de la saison en cours." />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {firstTeamPlayers.map((p, i) => (
              <div key={i} className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <Placeholder src={p.image} alt={p.name} label={p.position} ratio="aspect-[3/4]" />
                <div className="p-4">
                  <p className="font-display text-base font-bold uppercase text-ink-900">{p.name}</p>
                  <p className="text-sm text-ink-500">
                    {p.position}
                    {p.age ? ` · ${p.age} ans` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-500">[À confirmer : effectif réel]</p>
        </div>
      </section>

      {/* Calendrier / résultats / classement */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionTitle eyebrow="Prochains matchs" title="Calendrier" />
              <div className="mt-8 space-y-6">
                {matches.length ? (
                  matches.map((m) => <MatchCard key={m.id} match={m} />)
                ) : (
                  <p className="text-ink-500">[À confirmer : calendrier 2026/2027]</p>
                )}
              </div>
            </div>
            <div>
              <SectionTitle eyebrow="Derniers résultats" title="Résultats" />
              <div className="mt-8 space-y-6">
                {teamResults.length ? (
                  teamResults.map((r) => <ResultCard key={r.id} result={r} />)
                ) : (
                  <p className="text-ink-500">[À confirmer : résultats]</p>
                )}
              </div>
            </div>
          </div>

          {/* Classement */}
          <div className="mt-16">
            <SectionTitle eyebrow="Classement" title="Notre poule" />
            <div className="mt-8 overflow-hidden rounded-lg shadow-card ring-1 ring-black/5">
              <table className="w-full text-sm">
                <thead className="bg-ink-900 text-left font-display uppercase tracking-wide text-white">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Équipe</th>
                    <th className="px-4 py-3 text-center">J</th>
                    <th className="px-4 py-3 text-center">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 bg-white">
                  {standings.map((s) => (
                    <tr key={s.rank} className={s.isSmrc ? "bg-gold/10 font-semibold" : ""}>
                      <td className="px-4 py-3 text-ink-500">{s.rank}</td>
                      <td className="px-4 py-3 text-ink-900">{s.team}</td>
                      <td className="px-4 py-3 text-center text-ink-600">{s.played}</td>
                      <td className="px-4 py-3 text-center text-ink-900">{s.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-ink-500">[À confirmer : classement officiel]</p>
          </div>
        </div>
      </section>

      <CTASection
        title="Venez au prochain match"
        text="Rejoignez le public du stade Robert Monseau et poussez les jaune et noir vers la victoire."
        primary={{ label: "Voir le calendrier", href: "/calendrier-resultats" }}
        secondary={{ label: "Billetterie & abonnements", href: "/billetterie-abonnements" }}
      />
    </>
  );
}
