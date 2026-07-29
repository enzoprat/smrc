import Link from "next/link";
import type { Team } from "@/data/teams";
import { Placeholder } from "./Placeholder";

/** Carte d'équipe pour le hub /equipes et la home. Clique vers la page de l'équipe. */
export function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      href={team.href}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-ink-900 shadow-card"
    >
      <Placeholder
        src={team.image}
        alt={team.name}
        label={team.category}
        ratio="aspect-[4/5]"
        className="opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="font-display text-xs uppercase tracking-widest text-gold">{team.category}</span>
        <h3 className="mt-1 font-display text-2xl font-bold uppercase leading-tight text-white">
          {team.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/60">{team.description}</p>
      </div>
    </Link>
  );
}
