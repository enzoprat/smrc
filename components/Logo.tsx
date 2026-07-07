import Link from "next/link";
import Image from "next/image";

/** Logo officiel SMRC (emblème + wordmark). */
export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Saint-Médard Rugby Club — Accueil"
      className={`group flex items-center gap-3 ${className}`}
    >
      <Image
        src="/logo-smrc.png"
        alt="Saint-Médard Rugby Club"
        width={48}
        height={48}
        priority
        className="h-11 w-11 object-contain transition-transform group-hover:scale-105"
      />
      <span className="leading-none">
        <span
          className={`block font-display text-lg font-extrabold uppercase tracking-tight ${
            dark ? "text-ink-900" : "text-white"
          }`}
        >
          Saint-Médard
        </span>
        <span className="block font-display text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Rugby Club
        </span>
      </span>
    </Link>
  );
}
