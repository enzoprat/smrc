"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, headerCta } from "@/data/nav";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { ChevronDown, Menu } from "./Icons";

/** Header global, isolé. Navigation pilotée par data/nav.ts. */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Le header public est masqué sur l'espace d'administration.
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ink-900/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-ink-900/80"
            : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
                    isActive(item.href) ? "text-gold" : "text-white/90 hover:text-gold"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown width={14} height={14} />}
                </Link>

                {item.children && (
                  <div className="invisible absolute left-0 top-full w-64 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="overflow-hidden rounded-lg bg-white shadow-card ring-1 ring-black/5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block border-b border-black/5 px-4 py-3 transition-colors last:border-0 hover:bg-bone-200"
                        >
                          <span className="block font-display text-sm font-semibold uppercase tracking-wide text-ink-900">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="mt-0.5 block text-xs text-ink-500">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href={headerCta.href} className="btn-gold hidden xl:inline-flex">
              {headerCta.label}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              <Menu width={26} height={26} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
