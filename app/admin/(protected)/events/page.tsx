import { events } from "@/data/events";
import { DatasetEditor, type FieldDef } from "@/components/admin/DatasetEditor";

export const metadata = { title: "Événements", robots: { index: false } };

const fields: FieldDef[] = [
  { key: "id", label: "Identifiant", type: "text", placeholder: "e1" },
  { key: "title", label: "Titre", type: "text" },
  { key: "date", label: "Date & heure", type: "datetime-local" },
  { key: "location", label: "Lieu", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "ctaLabel", label: "Libellé du bouton (optionnel)", type: "text" },
  { key: "ctaHref", label: "Lien du bouton (optionnel)", type: "text", placeholder: "/billetterie-abonnements" },
];

const trim = (s: string) => (s ? s.slice(0, 16) : s);

export default function AdminEventsPage() {
  const rows = events.map((e) => ({ ...e, date: trim(e.date) }));
  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold uppercase text-ink-900">Événements</h1>
        <p className="mt-1 text-ink-600">Repas supporters, soirées, tournois et vie du club.</p>
      </header>
      <DatasetEditor
        type="events"
        fields={fields}
        initial={rows}
        idPrefix="e"
        template={{
          title: "",
          date: "",
          location: "Stade Robert Monseau",
          description: "",
          ctaLabel: "",
          ctaHref: "",
        }}
      />
    </div>
  );
}
