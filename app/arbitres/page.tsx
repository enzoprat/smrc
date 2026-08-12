import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { StatStrip } from "@/components/StatStrip";
import { CTASection } from "@/components/CTASection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Arbitres | Notre Formation | Saint-Médard Rugby Club",
  description:
    "Le SMRC place l'arbitre au cœur de sa structure : 12 arbitres actifs dans toutes les catégories, une école d'arbitrage et un accueil soigné des arbitres à domicile.",
  path: "/arbitres",
});

const missions = [
  {
    title: "Analyse vidéo",
    text: "Revoir les rencontres pour progresser et affiner la prise de décision.",
  },
  {
    title: "Compréhension de la règle",
    text: "Transmettre et expliquer la règle à toutes les catégories du club.",
  },
  {
    title: "Gestion globale",
    text: "Assurer la coordination et le bon déroulement des matchs.",
  },
  {
    title: "École d'arbitrage",
    text: "Développer la formation et faire naître les vocations de demain.",
  },
];

export default function ArbitresPage() {
  const stats = [
    { value: "12", label: "Arbitres actifs" },
    { value: "U6 → Seniors", label: "Toutes catégories" },
    { value: "École", label: "d'arbitrage" },
    { value: "100 %", label: "Implication" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Notre Formation"
        title="Arbitres"
        description="Le SMRC met l'arbitre au cœur de sa structure."
        crumbs={[
          { name: "Notre Formation", path: "/ecole-de-rugby" },
          { name: "Arbitres", path: "/arbitres" },
        ]}
      />

      {/* Stats */}
      <section className="bg-ink-900 py-12">
        <div className="container-x">
          <StatStrip stats={stats} />
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              eyebrow="Au cœur du club"
              title="12 arbitres au service de tout le club"
              align="center"
            />
            <p className="mt-6 text-lg text-ink-600">
              Douze arbitres participent activement à l'évolution du SMRC et interviennent dans
              toutes les catégories, des plus jeunes aux seniors.
            </p>
          </div>
        </div>
      </section>

      {/* Missions */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Leurs missions"
            title="Un rôle complet, bien au-delà du sifflet"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {missions.map((m, i) => (
              <div key={m.title} className="rounded-lg bg-white p-6 ring-1 ring-black/5">
                <span className="font-display text-3xl font-extrabold text-gold/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold uppercase text-ink-900">{m.title}</h3>
                <p className="mt-2 text-sm text-ink-600">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accueil & vocations */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div className="rounded-lg bg-bone p-8 ring-1 ring-black/5">
            <h3 className="font-display text-xl font-bold uppercase text-ink-900">
              Accueil des arbitres à domicile
            </h3>
            <p className="mt-3 text-ink-600">
              À tour de rôle, nos arbitres assurent l'accueil des arbitres des rencontres jouées au
              stade. Une attention qui reflète l'esprit du club et le respect dû à l'arbitrage.
            </p>
          </div>
          <div className="rounded-lg bg-ink-900 p-8 text-white">
            <h3 className="font-display text-xl font-bold uppercase text-gold">
              Une source de vocations
            </h3>
            <p className="mt-3 text-white/80">
              Cette implication totale génère des vocations chez nos jeunes joueuses et joueurs, qui
              trouvent au SMRC un cadre pour découvrir et apprendre l'arbitrage.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Envie de rejoindre l'école d'arbitrage ?"
        text="Contactez le club pour en savoir plus sur la formation à l'arbitrage au SMRC."
        primary={{ label: "Nous contacter", href: "/contact" }}
        secondary={{ label: "Notre Formation", href: "/ecole-de-rugby" }}
      />
    </>
  );
}
