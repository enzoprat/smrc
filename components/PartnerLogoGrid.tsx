import Image from "next/image";
import type { Partner } from "@/data/partners";

/** Grille de logos partenaires (placeholder texte si pas de logo). */
export function PartnerLogoGrid({ partners }: { partners: Partner[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {partners.map((p) => {
        const inner = (
          <div className="flex h-24 items-center justify-center rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:shadow-card">
            {p.logo ? (
              <Image
                src={p.logo}
                alt={p.name}
                width={160}
                height={64}
                className="max-h-14 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
              />
            ) : (
              <span className="text-center font-display text-sm font-semibold uppercase tracking-wide text-ink-400">
                {p.name}
              </span>
            )}
          </div>
        );
        return p.url ? (
          <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
            {inner}
          </a>
        ) : (
          <div key={p.id}>{inner}</div>
        );
      })}
    </div>
  );
}
