type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
};

/** Titre de section réutilisable avec sur-titre jaune. */
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  dark = false,
}: SectionTitleProps) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
          <span className="h-px w-6 bg-gold" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl font-bold uppercase leading-[1.05] sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg ${
            dark ? "text-white/70" : "text-ink-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
