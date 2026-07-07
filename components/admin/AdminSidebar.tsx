"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, Close } from "@/components/Icons";

const links = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/news", label: "Actualités" },
  { href: "/admin/matches", label: "Matchs & Résultats" },
  { href: "/admin/partners", label: "Partenaires" },
  { href: "/admin/events", label: "Événements" },
  { href: "/admin/faq", label: "FAQ" },
];

export function AdminSidebar({ email, githubReady }: { email: string; githubReady: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      {/* Topbar mobile */}
      <div className="flex items-center justify-between border-b border-black/10 bg-ink-900 px-5 py-4 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-gold font-display text-sm font-extrabold text-ink-900">
            SM
          </span>
          <span className="font-display text-sm font-bold uppercase text-white">Espace club</span>
        </Link>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="text-white">
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-ink-900 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="hidden items-center gap-3 border-b border-white/10 px-6 py-6 lg:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-gold font-display text-base font-extrabold text-ink-900">
              SM
            </span>
            <div>
              <p className="font-display text-sm font-bold uppercase text-white">Espace club</p>
              <p className="text-xs text-white/40">SMRC Admin</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-6" onClick={() => setOpen(false)}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block rounded-sm px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isActive(l.href) ? "bg-gold text-ink-900" : "text-white/70 hover:bg-white/5 hover:text-gold"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            {!githubReady && (
              <p className="mb-3 rounded-sm bg-amber-500/10 px-3 py-2 text-xs text-amber-300">
                GitHub non configuré : l'enregistrement est désactivé. Renseignez les variables
                d'environnement GITHUB_*.
              </p>
            )}
            <p className="truncate px-1 text-xs text-white/40">{email}</p>
            <div className="mt-2 flex gap-2">
              <Link href="/" className="flex-1 rounded-sm bg-white/5 px-3 py-2 text-center text-xs text-white/70 hover:bg-white/10">
                Voir le site
              </Link>
              <button onClick={logout} className="flex-1 rounded-sm bg-white/5 px-3 py-2 text-xs text-white/70 hover:bg-white/10">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
