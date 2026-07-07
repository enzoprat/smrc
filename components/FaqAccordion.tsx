"use client";

import { useState } from "react";
import type { Faq } from "@/data/faqs";
import { ChevronDown } from "./Icons";

/** Accordéon FAQ accessible. */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-black/10 overflow-hidden rounded-lg bg-white shadow-card ring-1 ring-black/5">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-bone-200"
            >
              <span className="font-display text-base font-semibold uppercase tracking-wide text-ink-900 sm:text-lg">
                {item.question}
              </span>
              <ChevronDown
                width={20}
                height={20}
                className={`flex-shrink-0 text-gold-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-ink-600">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
