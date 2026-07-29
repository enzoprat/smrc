/**
 * Effectifs des équipes. Données dans players.json (éditable depuis l'admin via commit GitHub).
 * Chaque joueur est rattaché à une équipe via son `team` (slug d'équipe).
 */
import data from "./players.json";

export type Player = {
  id: string;
  team: string; // slug d'équipe (voir data/teams.ts)
  name: string;
  position: string;
  age?: number;
  image?: string;
};

export const players: Player[] = data as Player[];

export function playersByTeam(slug: string): Player[] {
  return players.filter((p) => p.team === slug);
}
