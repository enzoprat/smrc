import { NewsForm } from "@/components/admin/NewsForm";

export const metadata = { title: "Nouvelle actualité", robots: { index: false } };

export default function AdminNewsNewPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold uppercase text-ink-900">Nouvelle actualité</h1>
        <p className="mt-1 text-ink-600">Rédigez un nouvel article. Enregistrez en brouillon ou publiez directement.</p>
      </header>
      <NewsForm mode="create" />
    </div>
  );
}
