import Link from "next/link";
import { getArticleMetas } from "@/lib/content";
import { matches } from "@/data/matches";
import { results } from "@/data/results";
import { partners } from "@/data/partners";
import { events } from "@/data/events";
import { faqs } from "@/data/faqs";

export const metadata = { title: "Tableau de bord", robots: { index: false } };

export default function AdminDashboard() {
  const news = getArticleMetas(true);
  const drafts = news.filter((n) => n.status === "draft").length;

  const cards = [
    { href: "/admin/news", label: "Actualités", count: news.length, sub: `${drafts} brouillon(s)` },
    { href: "/admin/matches", label: "Matchs & Résultats", count: matches.length + results.length, sub: `${matches.length} à venir` },
    { href: "/admin/partners", label: "Partenaires", count: partners.length, sub: "tous niveaux" },
    { href: "/admin/events", label: "Événements", count: events.length, sub: "à venir" },
    { href: "/admin/faq", label: "FAQ", count: faqs.length, sub: "questions" },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold uppercase text-ink-900">Tableau de bord</h1>
        <p className="mt-1 text-ink-600">Gérez le contenu du site du Saint-Médard Rugby Club.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-lg bg-white p-6 shadow-card ring-1 ring-black/5 transition-transform hover:-translate-y-1"
          >
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-gold-700">{c.label}</p>
            <p className="mt-2 font-display text-4xl font-extrabold text-ink-900">{c.count}</p>
            <p className="mt-1 text-sm text-ink-500">{c.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow-card ring-1 ring-black/5">
        <h2 className="font-display text-lg font-bold uppercase text-ink-900">Actions rapides</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/news/new" className="btn-gold">
            + Nouvelle actualité
          </Link>
          <Link href="/admin/matches" className="btn-dark">
            Mettre à jour un résultat
          </Link>
          <Link href="/admin/events" className="btn-dark">
            Ajouter un événement
          </Link>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-ink-900 p-6 text-white">
        <h2 className="font-display text-lg font-bold uppercase text-gold">Comment ça marche</h2>
        <p className="mt-2 text-sm text-white/70">
          Chaque modification est enregistrée sous forme de fichier dans le dépôt GitHub du site. Un
          commit déclenche automatiquement un nouveau déploiement Vercel : vos changements apparaissent
          en ligne quelques instants après l'enregistrement.
        </p>
      </div>
    </div>
  );
}
