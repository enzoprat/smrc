import type { Result } from "@/data/results";
import { outcome } from "@/data/results";
import { formatShortDate } from "@/lib/format";
import { site } from "@/data/site";

const outcomeStyles = {
  win: { label: "Victoire", className: "bg-emerald-500/15 text-emerald-600" },
  loss: { label: "Défaite", className: "bg-red-500/15 text-red-600" },
  draw: { label: "Nul", className: "bg-ink-900/10 text-ink-600" },
};

/** Carte de résultat façon scoreboard. */
export function ResultCard({ result, featured = false }: { result: Result; featured?: boolean }) {
  const o = outcome(result);
  const style = outcomeStyles[o];
  const isHome = result.homeAway === "home";
  const smrcScore = isHome ? result.scoreHome : result.scoreAway;
  const oppScore = isHome ? result.scoreAway : result.scoreHome;

  return (
    <article
      className={`relative overflow-hidden rounded-lg ${
        featured ? "bg-ink-900 text-white shadow-card" : "bg-white shadow-card ring-1 ring-black/5"
      }`}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className={`rounded-sm px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-wider ${style.className}`}>
            {style.label}
          </span>
          <span className={`text-xs ${featured ? "text-white/50" : "text-ink-500"}`}>
            {formatShortDate(result.date)}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <p className={`text-right font-display text-base font-bold uppercase leading-tight ${featured ? "text-white" : "text-ink-900"}`}>
            {isHome ? site.shortName : result.opponent}
          </p>
          <div className="flex items-center gap-2 font-display text-3xl font-extrabold sm:text-4xl">
            <span className={isHome && o === "win" ? "text-gold" : featured ? "text-white" : "text-ink-900"}>
              {result.scoreHome}
            </span>
            <span className={featured ? "text-white/30" : "text-ink-300"}>—</span>
            <span className={!isHome && o === "win" ? "text-gold" : featured ? "text-white" : "text-ink-900"}>
              {result.scoreAway}
            </span>
          </div>
          <p className={`font-display text-base font-bold uppercase leading-tight ${featured ? "text-white" : "text-ink-900"}`}>
            {isHome ? result.opponent : site.shortName}
          </p>
        </div>

        <p className={`mt-5 text-center text-xs uppercase tracking-wide ${featured ? "text-white/50" : "text-ink-500"}`}>
          {result.team} · {result.competition}
        </p>
      </div>
    </article>
  );
}
