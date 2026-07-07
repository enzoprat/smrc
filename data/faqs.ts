/**
 * FAQ — principalement à destination des parents de l'école de rugby.
 * Utilisée aussi pour le JSON-LD FAQPage (SEO).
 * Données dans faqs.json (éditable depuis l'admin via commit GitHub).
 */
import data from "./faqs.json";

export type Faq = {
  id: string;
  question: string;
  answer: string;
  topic: "ecole" | "club" | "billetterie";
};

export const faqs: Faq[] = data as Faq[];

export function faqsByTopic(topic: Faq["topic"]): Faq[] {
  return faqs.filter((f) => f.topic === topic);
}
