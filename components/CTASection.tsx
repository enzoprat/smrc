import Link from "next/link";
import { ArrowRight } from "./Icons";

type CTAProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Bandeau d'appel à l'action sombre, à utiliser en fin de page/section. */
export function CTASection({ eyebrow, title, text, primary, secondary }: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-ink-900 to-ink-800" />
      <div className="absolute inset-0 bg-grain opacity-40" />
      <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />
      <div className="container-x relative flex flex-col items-start gap-8 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          {eyebrow && (
            <span className="mb-2 inline-block font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
            {title}
          </h2>
          {text && <p className="mt-4 text-lg text-white/70">{text}</p>}
        </div>
        <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
          <Link href={primary.href} className="btn-gold">
            {primary.label}
            <ArrowRight width={18} height={18} />
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn-outline">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
