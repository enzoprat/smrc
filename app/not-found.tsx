import Link from "next/link";

export const metadata = { title: "Page introuvable | SMRC" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-ink-900 px-6 py-32 text-white">
      <div className="absolute inset-0 bg-grain opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-xl text-center">
        <p className="font-display text-7xl font-extrabold text-gold sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold uppercase sm:text-4xl">
          Touche en-but manquée
        </h1>
        <p className="mt-3 text-white/70">
          La page que vous cherchez n'existe pas ou a été déplacée. Retournez sur le terrain.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-gold">
            Retour à l'accueil
          </Link>
          <Link href="/calendrier-resultats" className="btn-outline">
            Calendrier & résultats
          </Link>
        </div>
      </div>
    </section>
  );
}
