import { partners } from "@/data/partners";
import { DatasetEditor, type FieldDef } from "@/components/admin/DatasetEditor";

export const metadata = { title: "Partenaires", robots: { index: false } };

const fields: FieldDef[] = [
  { key: "id", label: "Identifiant", type: "text", placeholder: "p1" },
  { key: "name", label: "Nom du partenaire", type: "text" },
  {
    key: "tier",
    label: "Niveau",
    type: "select",
    options: [
      { value: "majeur", label: "Majeur" },
      { value: "officiel", label: "Officiel" },
      { value: "soutien", label: "Soutien" },
      { value: "institutionnel", label: "Institutionnel" },
    ],
  },
  { key: "url", label: "Site web (optionnel)", type: "text", placeholder: "https://..." },
  { key: "logo", label: "Chemin du logo (optionnel)", type: "text", placeholder: "/partners/mon-logo.png" },
];

export default function AdminPartnersPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold uppercase text-ink-900">Partenaires</h1>
        <p className="mt-1 text-ink-600">Gérez les partenaires affichés sur le site.</p>
      </header>
      <DatasetEditor
        type="partners"
        fields={fields}
        initial={partners as unknown as Record<string, unknown>[]}
        idPrefix="p"
        template={{ name: "", tier: "soutien", url: "", logo: "" }}
      />
    </div>
  );
}
