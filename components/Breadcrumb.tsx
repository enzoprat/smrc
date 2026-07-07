import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";

export type Crumb = { name: string; path: string };

/** Fil d'Ariane + JSON-LD BreadcrumbList. */
export function Breadcrumb({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const all: Crumb[] = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm">
      <JsonLd data={breadcrumbLd(all)} />
      <ol className={`flex flex-wrap items-center gap-2 ${dark ? "text-white/60" : "text-ink-500"}`}>
        {all.map((c, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {isLast ? (
                <span className={dark ? "text-gold" : "text-ink-900 font-medium"}>{c.name}</span>
              ) : (
                <Link href={c.path} className="hover:text-gold transition-colors">
                  {c.name}
                </Link>
              )}
              {!isLast && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
