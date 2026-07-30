"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Carrousel d'arrière-plan du hero d'accueil.
 * Fondu enchaîné automatique entre les photos déposées dans public/accueil/carrousel.
 */
export function HeroCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 6000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="absolute inset-0">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Voile sombre pour la lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900/90 via-ink-900/70 to-black/80" />
      <div className="absolute inset-0 bg-grain opacity-40" />
    </div>
  );
}
