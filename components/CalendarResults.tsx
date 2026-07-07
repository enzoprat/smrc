"use client";

import { useMemo, useState } from "react";
import type { Match } from "@/data/matches";
import type { Result } from "@/data/results";
import { MatchCard } from "./MatchCard";
import { ResultCard } from "./ResultCard";

/** Vue calendrier + résultats avec filtre par équipe. */
export function CalendarResults({ matches, results }: { matches: Match[]; results: Result[] }) {
  const teamsList = useMemo(() => {
    const set = new Set<string>();
    matches.forEach((m) => set.add(m.team));
    results.forEach((r) => set.add(r.team));
    return ["Toutes les équipes", ...Array.from(set)];
  }, [matches, results]);

  const [team, setTeam] = useState("Toutes les équipes");

  const fMatches = team === "Toutes les équipes" ? matches : matches.filter((m) => m.team === team);
  const fResults = team === "Toutes les équipes" ? results : results.filter((r) => r.team === team);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {teamsList.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTeam(t)}
            className={`rounded-sm px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
              team === t ? "bg-ink-900 text-gold" : "bg-white text-ink-600 ring-1 ring-black/5 hover:bg-bone-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 font-display text-2xl font-bold uppercase text-ink-900">Prochains matchs</h2>
          <div className="space-y-6">
            {fMatches.length ? (
              fMatches.map((m) => <MatchCard key={m.id} match={m} />)
            ) : (
              <p className="text-ink-500">[À confirmer : calendrier 2026/2027]</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="mb-6 font-display text-2xl font-bold uppercase text-ink-900">Derniers résultats</h2>
          <div className="space-y-6">
            {fResults.length ? (
              fResults.map((r) => <ResultCard key={r.id} result={r} />)
            ) : (
              <p className="text-ink-500">[À confirmer : résultats]</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
