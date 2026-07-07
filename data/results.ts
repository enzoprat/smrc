/**
 * Résultats des derniers matchs joués (results.json, éditable via l'admin).
 * Le classement reste défini ici (donnée structurelle de poule).
 */
import data from "./results.json";

export type Result = {
  id: string;
  team: string;
  competition: string;
  date: string; // ISO
  opponent: string;
  homeAway: "home" | "away";
  scoreHome: number;
  scoreAway: number;
};

export const results: Result[] = data as Result[];

/** Résultat le plus récent. */
export function getLatestResult(): Result | undefined {
  return [...results].sort((a, b) => +new Date(b.date) - +new Date(a.date))[0];
}

export function getResults(limit?: number): Result[] {
  const sorted = [...results].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return limit ? sorted.slice(0, limit) : sorted;
}

/** Issue d'un résultat du point de vue du SMRC. */
export function outcome(r: Result): "win" | "loss" | "draw" {
  const smrc = r.homeAway === "home" ? r.scoreHome : r.scoreAway;
  const opp = r.homeAway === "home" ? r.scoreAway : r.scoreHome;
  if (smrc > opp) return "win";
  if (smrc < opp) return "loss";
  return "draw";
}

/** Classement de la poule — [À confirmer : classement officiel] */
export type Standing = {
  rank: number;
  team: string;
  played: number;
  points: number;
  isSmrc?: boolean;
};

export const standings: Standing[] = [
  { rank: 1, team: "Stade Bordelais Avenir", played: 22, points: 78 },
  { rank: 2, team: "Saint-Médard RC", played: 22, points: 71, isSmrc: true },
  { rank: 3, team: "RC Pessac", played: 22, points: 66 },
  { rank: 4, team: "US Gironde", played: 22, points: 58 },
  { rank: 5, team: "Stade Langonnais", played: 22, points: 52 },
  { rank: 6, team: "AS Bassin", played: 22, points: 47 },
  { rank: 7, team: "RC Médoc", played: 22, points: 41 },
  { rank: 8, team: "US Cestas", played: 22, points: 35 },
];
