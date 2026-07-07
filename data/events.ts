/**
 * Événements et vie du club (repas supporters, soirées, lotos, tournois...).
 * Données dans events.json (éditable depuis l'admin via commit GitHub).
 */
import data from "./events.json";

export type ClubEvent = {
  id: string;
  title: string;
  date: string; // ISO
  location: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const events: ClubEvent[] = data as ClubEvent[];

export function getUpcomingEvents(limit?: number): ClubEvent[] {
  const sorted = [...events].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  return limit ? sorted.slice(0, limit) : sorted;
}
