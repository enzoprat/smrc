"use client";

import Image from "next/image";
import { useRef } from "react";
import { partnersByTier, tierLabels, type Partner, type PartnerTier } from "@/data/partners";

const ORDER: PartnerTier[] = ["majeur", "officiel", "soutien", "institutionnel"];

/**
 * Partenaires regroupés par catégorie, chacune présentée dans un carrousel
 * horizontal (défilement + boutons) — plus lisible sur mobile qu'une longue
 * grille verticale.
 */
export function PartnerSlider({ dark = false }: { dark?: boolean }) {
  const groups = ORDER.map((tier) => ({ tier, list: partnersByTier(tier) })).filter(
    (g) => g.list.length > 0,
  );

  return (
    <div className="space-y-10">
      {groups.map(({ tier, list }) => (
        <TierRow key={tier} title={tierLabels[tier]} partners={list} dark={dark} />
      ))}
    </div>
  );
}

function TierRow({
  title,
  partners,
  dark,
}: {
  title: string;
  partners: Partner[];
  dark: boolean;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  function scroll(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.85), behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3
          className={`font-display text-lg font-bold uppercase tracking-wide ${
            dark ? "text-gold" : "text-ink-900"
          }`}
        >
          {title}
        </h3>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Précédent"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-sm ring-1 transition-colors ${
              dark
                ? "text-white ring-white/20 hover:bg-white/10"
                : "text-ink-900 ring-black/10 hover:bg-bone"
            }`}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Suivant"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-sm ring-1 transition-colors ${
              dark
                ? "text-white ring-white/20 hover:bg-white/10"
                : "text-ink-900 ring-black/10 hover:bg-bone"
            }`}
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {partners.map((p) => {
          const inner = (
            <>
              <div className="flex h-24 items-center justify-center rounded-lg bg-white p-4 shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
                {p.logo ? (
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={160}
                    height={64}
                    className="max-h-14 w-auto object-contain"
                  />
                ) : (
                  <span className="text-center font-display text-sm font-semibold uppercase tracking-wide text-ink-400">
                    {p.name}
                  </span>
                )}
              </div>
              <p
                className={`mt-2 line-clamp-2 text-center text-xs font-semibold uppercase tracking-wide ${
                  dark ? "text-white/70" : "text-ink-600"
                }`}
              >
                {p.name}
              </p>
            </>
          );
          return p.url ? (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.name}
              className="group w-36 flex-shrink-0 snap-start sm:w-40"
            >
              {inner}
            </a>
          ) : (
            <div key={p.id} className="group w-36 flex-shrink-0 snap-start sm:w-40">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
