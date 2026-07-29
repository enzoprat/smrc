import { players } from "@/data/players";
import { teamOptions } from "@/data/teams";
import { DatasetEditor, type FieldDef } from "@/components/admin/DatasetEditor";

export const metadata = { title: "Joueurs", robots: { index: false } };

const fields: FieldDef[] = [
  { key: "id", label: "Identifiant", type: "text", placeholder: "j1" },
  { key: "team", label: "Équipe", type: "select", options: teamOptions, required: true },
  { key: "name", label: "Nom", type: "text" },
  { key: "position", label: "Poste", type: "text", placeholder: "Pilier" },
  { key: "age", label: "Âge (optionnel)", type: "number" },
  { key: "image", label: "Photo (optionnel)", type: "file" },
];

export default function AdminPlayersPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold uppercase text-ink-900">Joueurs</h1>
        <p className="mt-1 text-ink-600">
          Effectifs des équipes. Chaque joueur est rattaché à une équipe.
        </p>
      </header>
      <DatasetEditor
        type="players"
        fields={fields}
        initial={players as unknown as Record<string, unknown>[]}
        idPrefix="j"
        template={{ team: "equipe-premiere", name: "", position: "", age: "", image: "" }}
      />
    </div>
  );
}
