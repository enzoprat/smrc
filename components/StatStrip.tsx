type Stat = { value: string; label: string };

/** Bande "chiffres clés" sur fond sombre. */
export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 divide-x divide-y divide-white/10 border border-white/10 sm:grid-cols-4 sm:divide-y-0">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center justify-center px-4 py-8 text-center">
          <span className="font-display text-3xl font-extrabold text-gold sm:text-4xl lg:text-5xl">
            {s.value}
          </span>
          <span className="mt-2 font-display text-xs font-semibold uppercase tracking-widest text-white/60">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
