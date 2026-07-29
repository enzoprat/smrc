import { staff } from "@/data/staff";
import { teamOptions } from "@/data/teams";
import { DatasetEditor, type FieldDef } from "@/components/admin/DatasetEditor";

export const metadata = { title: "Staff", robots: { index: false } };

const fields: FieldDef[] = [
  { key: "id", label: "Identifiant", type: "text", placeholder: "s1" },
  { key: "team", label: "Équipe", type: "select", options: teamOptions, required: true },
  { key: "name", label: "Nom", type: "text" },
  { key: "role", label: "Rôle", type: "text", placeholder: "Entraîneur principal" },
  { key: "image", label: "Photo (optionnel)", type: "file" },
];

export default function AdminStaffPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold uppercase text-ink-900">Staff</h1>
        <p className="mt-1 text-ink-600">
          Encadrement des équipes. Chaque membre est rattaché à une équipe.
        </p>
      </header>
      <DatasetEditor
        type="staff"
        fields={fields}
        initial={staff as unknown as Record<string, unknown>[]}
        idPrefix="s"
        template={{ team: "equipe-premiere", name: "", role: "", image: "" }}
      />
    </div>
  );
}
