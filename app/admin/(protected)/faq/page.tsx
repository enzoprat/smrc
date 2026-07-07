import { faqs } from "@/data/faqs";
import { DatasetEditor, type FieldDef } from "@/components/admin/DatasetEditor";

export const metadata = { title: "FAQ", robots: { index: false } };

const fields: FieldDef[] = [
  { key: "id", label: "Identifiant", type: "text", placeholder: "f1" },
  {
    key: "topic",
    label: "Rubrique",
    type: "select",
    options: [
      { value: "ecole", label: "École de rugby" },
      { value: "club", label: "Club" },
      { value: "billetterie", label: "Billetterie" },
    ],
  },
  { key: "question", label: "Question", type: "text", full: true },
  { key: "answer", label: "Réponse", type: "textarea" },
];

export default function AdminFaqPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold uppercase text-ink-900">FAQ</h1>
        <p className="mt-1 text-ink-600">
          Questions fréquentes (notamment école de rugby). Utilisées aussi pour le référencement.
        </p>
      </header>
      <DatasetEditor
        type="faq"
        fields={fields}
        initial={faqs as unknown as Record<string, unknown>[]}
        idPrefix="f"
        template={{ topic: "ecole", question: "", answer: "" }}
      />
    </div>
  );
}
