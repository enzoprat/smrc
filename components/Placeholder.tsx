import Image from "next/image";

/**
 * Visuel d'illustration. Si `src` est fourni, affiche l'image (optimisée Next/Image).
 * Sinon, affiche un placeholder premium (dégradé sombre + grain + label),
 * en attendant les vraies photos du club.
 */

type PlaceholderProps = {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  /** ratio sous forme de classe aspect-* tailwind, ex "aspect-video" */
  ratio?: string;
  priority?: boolean;
};

export function Placeholder({
  src,
  alt,
  label,
  className = "",
  ratio = "aspect-video",
  priority = false,
}: PlaceholderProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${ratio} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative ${ratio} ${className} overflow-hidden bg-ink-800`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ink-700 via-ink-900 to-black" />
      <div className="absolute inset-0 bg-grain opacity-60" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-2xl" />
      <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gold" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
        <Image
          src="/logo-smrc.png"
          alt=""
          width={72}
          height={72}
          className="h-16 w-16 object-contain opacity-25"
        />
        {label && (
          <span className="font-display text-xs uppercase tracking-widest text-gold/70">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
