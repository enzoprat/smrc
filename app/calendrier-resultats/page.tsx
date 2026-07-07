import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { CalendarResults } from "@/components/CalendarResults";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { getUpcomingMatches } from "@/data/matches";
import { getResults, standings } from "@/data/results";
import { eventLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Calendrier & Résultats | Saint-Médard Rugby Club",
  description:
    "Retrouvez le calendrier des matchs, les derniers résultats et le classement des équipes du Saint-Médard Rugby Club.",
  path: "/calendrier-resultats",
});

export default function CalendrierPage() {
  const matches = getUpcomingMatches();
  const results = getResults();

  return (
    <>
      {matches.map((m) => (
        <JsonLd
          key={m.id}
          data={eventLd({
            name: `${site.shortName} vs ${m.opponent}`,
            startDate: m.date,
            location: m.venue,
            url: "/calendrier-resultats",
          })}
        />
      ))}

      <PageHero
        eyebrow="Saison"
        title="Calendrier & Résultats"
        description="Tous les rendez-vous des jaune et noir : matchs à venir, résultats et classement."
        crumbs={[{ name: "Calendrier & Résultats", path: "/calendrier-resultats" }]}
      />

      <section className="bg-bone py-16 sm:py-20">
        <div className="container-x">
          <CalendarResults matches={matches} results={results} />
        </div>
      </section>

      {/* Classement */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <SectionTitle eyebrow="Classement" title="La poule de l'équipe première" />
          <div className="mt-8 overflow-x-auto rounded-lg shadow-card ring-1 ring-black/5">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-ink-900 text-left font-display uppercase tracking-wide text-white">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Équipe</th>
                  <th className="px-4 py-3 text-center">Joués</th>
                  <th className="px-4 py-3 text-center">Points</th>
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
          <p className="mt-4 text-sm text-ink-500">
            [À confirmer : classement officiel] · Données complètes sur le site de la{" "}
            <a href={site.external.ffr} target="_blank" rel="noopener noreferrer" className="text-gold-700 underline">
              FFR
            </a>
            .
          </p>
        </div>
      </section>

      <CTASection
        title="Vivez les matchs au stade"
        text="Abonnez-vous pour la saison et ne manquez aucun match à domicile."
        primary={{ label: "Billetterie & abonnements", href: "/billetterie-abonnements" }}
        secondary={{ label: "Infos stade", href: "/club/stade-robert-monseau" }}
      />
    </>
  );
}
