import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Placeholder } from "@/components/Placeholder";
import { MatchCard } from "@/components/MatchCard";
import { ResultCard } from "@/components/ResultCard";
import { CTASection } from "@/components/CTASection";
import { teams, getTeam } from "@/data/teams";
import { staffByTeam } from "@/data/staff";
import { playersByTeam } from "@/data/players";
import { trainingByTeam } from "@/data/training";
import { getUpcomingMatches } from "@/data/matches";
import { getResults, standings } from "@/data/results";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return teams.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const team = getTeam(params.slug);
  if (!team) return {};
  return buildMetadata({
    title: `${team.name} | Saint-Médard Rugby Club`,
    description: team.description,
    path: team.href,
  });
}

export default function TeamPage({ params }: { params: { slug: string } }) {
  const team = getTeam(params.slug);
  if (!team) notFound();

  const staff = staffByTeam(team.slug);
  const players = playersByTeam(team.slug);
  const sessions = trainingByTeam(team.slug);
  const isFull = team.layout === "full";
  const matches = isFull
    ? getUpcomingMatches().filter((m) => m.team === team.name).slice(0, 2)
    : [];
  const teamResults = isFull
    ? getResults().filter((r) => r.team === team.name).slice(0, 2)
    : [];
  const showFixtures = isFull && (matches.length > 0 || teamResults.length > 0);
  const showStandings = team.slug === "equipe-premiere";

  return (
    <>
      <PageHero
        eyebrow="Équipes"
        title={team.name}
        description={team.description}
        crumbs={[
          { name: "Équipes", path: "/equipes" },
          { name: team.name, path: team.href },
        ]}
      />

      {/* Présentation */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Placeholder
            src={team.image}
            alt={team.name}
            label={team.name}
            ratio="aspect-[4/3]"
            className="rounded-lg shadow-card"
          />
          <div>
            <SectionTitle eyebrow="Présentation" title="Les couleurs jaune et noir" />
            <p className="mt-6 text-ink-600">{team.intro ?? team.description}</p>
          </div>
        </div>
      </section>

      {/* Groupes (loisirs) */}
      {team.subTeams && team.subTeams.length > 0 && (
        <section className="bg-bone py-16 sm:py-24">
          <div className="container-x">
            <SectionTitle eyebrow="Nos groupes" title="Deux équipes loisir" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {team.subTeams.map((st) => (
                <div key={st.name} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-black/5">
                  <h3 className="font-display text-xl font-bold uppercase text-ink-900">{st.name}</h3>
                  <p className="mt-3 text-ink-600">{st.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Staff */}
      {isFull && staff.length > 0 && (
        <section className="bg-ink-900 py-16 sm:py-24">
          <div className="container-x">
            <SectionTitle eyebrow="Encadrement" title="Le staff" dark />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {staff.map((s) => (
                <div key={s.id} className="overflow-hidden rounded-lg bg-white/[0.03] ring-1 ring-white/10">
                  <Placeholder src={s.image} alt={s.name} label="Staff" ratio="aspect-square" />
                  <div className="p-4">
                    <p className="font-display text-base font-bold uppercase text-white">{s.name}</p>
                    <p className="text-sm text-gold">{s.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Effectif */}
      {isFull && players.length > 0 && (
        <section className="bg-bone py-16 sm:py-24">
          <div className="container-x">
            <SectionTitle eyebrow="Effectif" title="Les joueurs" subtitle="L'effectif de la saison en cours." />
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {players.map((p) => (
                <div key={p.id} className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5">
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
          </div>
        </section>
      )}

      {/* Entraînements */}
      {sessions.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <div className="container-x">
            <SectionTitle eyebrow="Entraînements" title="Les créneaux" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sessions.map((s) => (
                <div key={s.id} className="rounded-lg bg-bone p-5 ring-1 ring-black/5">
                  <p className="font-display text-lg font-bold uppercase text-ink-900">{s.day}</p>
                  <p className="mt-1 text-ink-600">{s.time}</p>
                  <p className="text-sm text-ink-500">{s.place}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calendrier / résultats */}
      {showFixtures && (
        <section className="bg-bone py-16 sm:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-2">
            {matches.length > 0 && (
              <div>
                <SectionTitle eyebrow="Prochains matchs" title="Calendrier" />
                <div className="mt-8 space-y-6">
                  {matches.map((m) => (
                    <MatchCard key={m.id} match={m} />
                  ))}
                </div>
              </div>
            )}
            {teamResults.length > 0 && (
              <div>
                <SectionTitle eyebrow="Derniers résultats" title="Résultats" />
                <div className="mt-8 space-y-6">
                  {teamResults.map((r) => (
                    <ResultCard key={r.id} result={r} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Classement (équipe première) */}
      {showStandings && (
        <section className="bg-white py-16 sm:py-24">
          <div className="container-x">
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
          </div>
        </section>
      )}

      <CTASection
        title="Envie de nous rejoindre ?"
        text="Débutant ou expérimenté : contactez le club pour trouver votre place dans l'équipe."
        primary={{ label: "Rejoindre le club", href: "/contact" }}
        secondary={{ label: "Calendrier & résultats", href: "/calendrier-resultats" }}
      />
    </>
  );
}
