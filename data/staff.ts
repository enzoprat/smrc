/**
 * Staff des équipes. Données dans staff.json (éditable depuis l'admin via commit GitHub).
 * Chaque membre est rattaché à une équipe via son `team` (slug d'équipe).
 */
import data from "./staff.json";

export type StaffMember = {
  id: string;
  team: string; // slug d'équipe (voir data/teams.ts)
  name: string;
  role: string;
  image?: string;
};

export const staff: StaffMember[] = data as StaffMember[];

export function staffByTeam(slug: string): StaffMember[] {
  return staff.filter((s) => s.team === slug);
}
