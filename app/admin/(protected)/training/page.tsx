import { training } from "@/data/training";
import { teamOptions } from "@/data/teams";
import { DatasetEditor, type FieldDef } from "@/components/admin/DatasetEditor";

export const metadata = { title: "Entraînements", robots: { index: false } };

const fields: FieldDef[] = [
  { key: "id", label: "Identifiant", type: "text", placeholder: "e1" },
  { key: "team", label: "Équipe", type: "select", options: teamOptions, required: true },
  { key: "day", label: "Jour", type: "text", placeholder: "Mardi" },
  { key: "time", label: "Horaire", type: "text", placeholder: "19h00 - 21h00" },
  { key: "place", label: "Lieu", type: "text", placeholder: "Stade Robert Monseau" },
];

export default function AdminTrainingPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold uppercase text-ink-900">Entraînements</h1>
        <p className="mt-1 text-ink-600">
          Créneaux d'entraînement par équipe (jour, horaire, lieu).
        </p>
      </header>
      <DatasetEditor
        type="training"
        fields={fields}
        initial={training as unknown as Record<string, unknown>[]}
        idPrefix="e"
        template={{ team: "equipe-premiere", day: "", time: "", place: "Stade Robert Monseau" }}
      />
    </div>
  );
}
