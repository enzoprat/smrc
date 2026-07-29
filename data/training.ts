/**
 * Créneaux d'entraînement des équipes. Données dans training.json
 * (éditable depuis l'admin via commit GitHub).
 * Chaque créneau est rattaché à une équipe via son `team` (slug d'équipe).
 */
import data from "./training.json";

export type TrainingSession = {
  id: string;
  team: string; // slug d'équipe (voir data/teams.ts)
  day: string;
  time: string;
  place: string;
};

export const training: TrainingSession[] = data as TrainingSession[];

export function trainingByTeam(slug: string): TrainingSession[] {
  return training.filter((t) => t.team === slug);
}
