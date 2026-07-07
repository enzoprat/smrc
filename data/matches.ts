/**
 * Calendrier des matchs à venir.
 * Données stockées dans matches.json (éditable depuis l'admin via commit GitHub).
 */
import data from "./matches.json";

export type MatchStatus = "upcoming" | "live" | "finished";

export type Match = {
  id: string;
  team: string; // ex: "Équipe Première"
  competition: string; // ex: "Fédérale 1 — Poule 4"
  date: string; // ISO ex: "2026-09-13T15:00:00"
  opponent: string;
  homeAway: "home" | "away";
  venue: string;
  status: MatchStatus;
  scoreHome?: number;
  scoreAway?: number;
};

export const matches: Match[] = data as Match[];

/** Renvoie le prochain match (le plus proche dans le futur). */
export function getNextMatch(now: Date = new Date()): Match | undefined {
  return [...matches]
    .filter((m) => m.status === "upcoming" && new Date(m.date) >= now)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))[0];
}

export function getUpcomingMatches(limit?: number): Match[] {
  const sorted = [...matches]
    .filter((m) => m.status !== "finished")
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  return limit ? sorted.slice(0, limit) : sorted;
}
