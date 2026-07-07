import { matches } from "@/data/matches";
import { results } from "@/data/results";
import { DatasetEditor, type FieldDef } from "@/components/admin/DatasetEditor";

export const metadata = { title: "Matchs & Résultats", robots: { index: false } };

const homeAway = [
  { value: "home", label: "Domicile" },
  { value: "away", label: "Extérieur" },
];

const matchFields: FieldDef[] = [
  { key: "id", label: "Identifiant", type: "text", placeholder: "m-2026-09-13" },
  { key: "team", label: "Équipe", type: "text" },
  { key: "competition", label: "Compétition", type: "text", full: true },
  { key: "date", label: "Date & heure", type: "datetime-local" },
  { key: "opponent", label: "Adversaire", type: "text" },
  { key: "homeAway", label: "Lieu", type: "select", options: homeAway },
  { key: "venue", label: "Stade", type: "text" },
  {
    key: "status",
    label: "Statut",
    type: "select",
    options: [
      { value: "upcoming", label: "À venir" },
      { value: "finished", label: "Terminé" },
    ],
  },
];

const resultFields: FieldDef[] = [
  { key: "id", label: "Identifiant", type: "text", placeholder: "r-2026-05-17" },
  { key: "team", label: "Équipe", type: "text" },
  { key: "competition", label: "Compétition", type: "text", full: true },
  { key: "date", label: "Date & heure", type: "datetime-local" },
  { key: "opponent", label: "Adversaire", type: "text" },
  { key: "homeAway", label: "Lieu", type: "select", options: homeAway },
  { key: "scoreHome", label: "Score domicile", type: "number" },
  { key: "scoreAway", label: "Score extérieur", type: "number" },
];

const trim = (s: string) => (s ? s.slice(0, 16) : s);

export default function AdminMatchesPage() {
  const matchRows = matches.map((m) => ({ ...m, date: trim(m.date) }));
  const resultRows = results.map((r) => ({ ...r, date: trim(r.date) }));

  return (
    <div className="space-y-14">
      <section>
        <header className="mb-6">
          <h1 className="font-display text-3xl font-bold uppercase text-ink-900">Calendrier des matchs</h1>
          <p className="mt-1 text-ink-600">Ajoutez, modifiez ou supprimez les matchs à venir.</p>
        </header>
        <DatasetEditor
          type="matches"
          fields={matchFields}
          initial={matchRows}
          idPrefix="m"
          template={{
            team: "Équipe Première",
            competition: "Fédérale 1 — Poule 4",
            date: "",
            opponent: "",
            homeAway: "home",
            venue: "Stade Robert Monseau",
            status: "upcoming",
          }}
        />
      </section>

      <section>
        <header className="mb-6">
          <h1 className="font-display text-3xl font-bold uppercase text-ink-900">Résultats</h1>
          <p className="mt-1 text-ink-600">Saisissez les scores des matchs joués.</p>
        </header>
        <DatasetEditor
          type="results"
          fields={resultFields}
          initial={resultRows}
          idPrefix="r"
          template={{
            team: "Équipe Première",
            competition: "Fédérale 1 — Poule 4",
            date: "",
            opponent: "",
            homeAway: "home",
            scoreHome: 0,
            scoreAway: 0,
          }}
        />
      </section>
    </div>
  );
}
