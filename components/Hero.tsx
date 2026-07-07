import Link from "next/link";
import { site } from "@/data/site";
import { ArrowRight } from "./Icons";

/** Hero plein écran de la page d'accueil. */
export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-ink-900">
      {/* Fond : dégradé sombre + grain + halo doré (placeholder en attendant photo match) */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-800 via-ink-900 to-black" />
      <div className="absolute inset-0 bg-grain opacity-50" />
      <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold/5 blur-3xl" />
      {/* Lignes de terrain stylisées */}
      <div className="absolute inset-y-0 left-1/2 w-px bg-white/5" />
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-gold via-gold-300 to-gold" />

      <div className="container-x relative pt-24">
        <div className="max-w-3xl animate-fade-up">
          <span className="mb-5 inline-flex items-center gap-2 rounded-sm border border-gold/30 bg-gold/10 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Depuis {site.foundedYear} · {site.division} · Gironde
          </span>
          <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            Saint-Médard
            <br />
            <span className="text-gold">Rugby Club</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70 sm:text-xl">{site.tagline}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/calendrier-resultats" className="btn-gold">
              Voir le prochain match
              <ArrowRight width={18} height={18} />
            </Link>
            <Link href="/ecole-de-rugby#inscription" className="btn-outline">
              Inscrire mon enfant
            </Link>
            <Link href="/partenaires/devenir-partenaire" className="btn-outline">
              Devenir partenaire
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
