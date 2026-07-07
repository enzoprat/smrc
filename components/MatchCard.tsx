import Link from "next/link";
import type { Match } from "@/data/matches";
import { formatDate, formatTime } from "@/lib/format";
import { Calendar, Clock, MapPin, ArrowRight } from "./Icons";
import { site } from "@/data/site";

/** Carte "prochain match" type scoreboard sportif. */
export function MatchCard({ match, featured = false }: { match: Match; featured?: boolean }) {
  const isHome = match.homeAway === "home";
  const smrcName = site.shortName;

  return (
    <article
      className={`relative overflow-hidden rounded-lg ${
        featured ? "bg-ink-900 text-white shadow-card" : "bg-white text-ink-900 shadow-card ring-1 ring-black/5"
      }`}
    >
      {featured && <div className="absolute inset-x-0 top-0 h-1 bg-gold" />}
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className={featured ? "tag-dark" : "tag"}>{match.team}</span>
          <span className={`text-xs uppercase tracking-wide ${featured ? "text-white/50" : "text-ink-500"}`}>
            {match.competition}
          </span>
        </div>

        {/* Affiche */}
        <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <Team name={isHome ? smrcName : match.opponent} highlight={isHome} dark={featured} />
          <div className="flex flex-col items-center">
            <span className={`font-display text-2xl font-bold ${featured ? "text-gold" : "text-ink-400"}`}>
              VS
            </span>
          </div>
          <Team name={isHome ? match.opponent : smrcName} highlight={!isHome} dark={featured} align="right" />
        </div>

        {/* Infos */}
        <div
          className={`mt-6 flex flex-col gap-2 border-t pt-5 text-sm ${
            featured ? "border-white/10 text-white/70" : "border-black/5 text-ink-600"
          }`}
        >
          <span className="flex items-center gap-2">
            <Calendar width={16} height={16} className="text-gold" />
            <span className="capitalize">{formatDate(match.date)}</span>
          </span>
          <span className="flex items-center gap-2">
            <Clock width={16} height={16} className="text-gold" />
            {formatTime(match.date)}
          </span>
          <span className="flex items-center gap-2">
            <MapPin width={16} height={16} className="text-gold" />
            {match.venue} · {isHome ? "Domicile" : "Extérieur"}
          </span>
        </div>

        {featured && (
          <Link href="/calendrier-resultats" className="btn-gold mt-6 w-full">
            Voir le calendrier
            <ArrowRight width={18} height={18} />
          </Link>
        )}
      </div>
    </article>
  );
}

function Team({
  name,
  highlight,
  dark,
  align = "left",
}: {
  name: string;
  highlight: boolean;
  dark: boolean;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <div
        className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-sm font-display text-sm font-bold ${
          highlight ? "bg-gold text-ink-900" : dark ? "bg-white/10 text-white" : "bg-ink-900/5 text-ink-700"
        }`}
      >
        {name.slice(0, 3).toUpperCase()}
      </div>
      <p className="font-display text-base font-bold uppercase leading-tight sm:text-lg">{name}</p>
    </div>
  );
}
