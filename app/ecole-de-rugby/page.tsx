import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Placeholder } from "@/components/Placeholder";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { Check, Users, Clock, Trophy } from "@/components/Icons";
import { faqsByTopic } from "@/data/faqs";
import { faqLd } from "@/lib/jsonld";
import { findImage } from "@/lib/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "École de rugby à Saint-Médard-en-Jalles | SMRC",
  description:
    "Découvrez l'école de rugby du Saint-Médard Rugby Club : catégories jeunes, entraînements, encadrement, inscriptions et valeurs éducatives.",
  path: "/ecole-de-rugby",
});

const ageCategories = [
  { cat: "Baby Rugby", age: "à partir de 3 ans", focus: "Éveil, motricité et découverte par le jeu" },
  { cat: "U6 – U8", age: "4 à 7 ans", focus: "Découverte, motricité, jeu sans plaquage" },
  { cat: "U10 – U12", age: "8 à 11 ans", focus: "Apprentissage technique et collectif" },
  { cat: "U14", age: "12 à 13 ans", focus: "Perfectionnement et premières compétitions" },
];

const eduValues = [
  "Respect des autres, des règles et de l'arbitre",
  "Esprit d'équipe et solidarité",
  "Confiance en soi et dépassement",
  "Plaisir de jouer avant tout",
];

export default function EcoleRugbyPage() {
  const faqs = faqsByTopic("ecole");

  return (
    <>
      <JsonLd data={faqLd(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />

      <PageHero
        eyebrow="École de rugby"
        title="L'école de rugby du SMRC"
        description="Faites découvrir le rugby à votre enfant dans un cadre familial, sécurisé et encadré par des éducateurs passionnés."
        crumbs={[{ name: "École de Rugby", path: "/ecole-de-rugby" }]}
      />

      {/* Message rassurant */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Placeholder src={findImage("accueil/categories", "ecole-de-rugby")} alt="Enfants à l'école de rugby du SMRC" label="École de rugby" ratio="aspect-[4/3]" className="rounded-lg shadow-card" />
          <div>
            <SectionTitle
              eyebrow="Pour les parents"
              title="Un premier pas en toute confiance"
              subtitle="Le rugby est avant tout un sport d'éducation, de respect et de plaisir."
            />
            <p className="mt-6 text-ink-600">
              Chez les plus jeunes, on joue <strong>sans plaquage</strong> : le rugby éducatif privilégie
              la motricité, le jeu et la progression. Le contact est introduit progressivement, toujours
              encadré par des éducateurs diplômés, avec du matériel et des règles adaptés à chaque âge.
            </p>
            <p className="mt-4 text-ink-600">
              Filles et garçons sont les bienvenus : votre enfant trouvera sa place et apprendra à
              grandir dans le respect des autres.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {eduValues.map((v) => (
                <li key={v} className="flex items-start gap-2 text-sm text-ink-700">
                  <Check width={18} height={18} className="mt-0.5 flex-shrink-0 text-gold-600" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Catégories d'âge */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Catégories" title="À chaque âge son rugby" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ageCategories.map((c) => (
              <div key={c.cat} className="card flex flex-col p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-gold text-ink-900">
                  <Users width={24} height={24} />
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold uppercase text-ink-900">{c.cat}</h3>
                <p className="mt-1 text-sm font-semibold text-gold-700">{c.age}</p>
                <p className="mt-3 text-ink-600">{c.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Label 3 étoiles */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-lg bg-gold p-8 text-center sm:p-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-sm bg-ink-900 text-gold">
              <Trophy width={32} height={32} />
            </span>
            <h2 className="font-display text-2xl font-bold uppercase text-ink-900 sm:text-3xl">
              École de rugby labellisée 3 étoiles
            </h2>
            <p className="max-w-2xl text-ink-900/80">
              L'École de rugby a été labellisée 3 étoiles par la FFR. L'attribution du label est le
              symbole de la reconnaissance par la Fédération Française de Rugby de l'École de Rugby
              dans sa démarche de qualité engagée dans les domaines suivants : l'accueil,
              l'accompagnement et la formation des joueurs ainsi que le développement de l'activité.
            </p>
          </div>
        </div>
      </section>

      {/* Horaires + encadrement */}
      <section className="bg-ink-900 py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Entraînements" title="Horaires" dark />
            <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <p className="flex items-center gap-2 text-white/80">
                <Clock width={20} height={20} className="text-gold" />
                Entraînement les mercredis et/ou samedis.
              </p>
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Encadrement" title="Des éducateurs diplômés" dark />
            <p className="mt-6 text-white/70">
              L'école de rugby est encadrée par une équipe d'éducateurs formés et diplômés, attentifs à
              la sécurité, à la progression et à l'épanouissement de chaque enfant.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="FAQ parents" title="Vos questions, nos réponses" align="center" />
          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Rejoignez-nous"
        title="Offrez le rugby à votre enfant"
        text="Une séance d'essai gratuite, et c'est souvent le début d'une belle aventure."
        primary={{ label: "Nous contacter", href: "/contact" }}
        secondary={{ label: "Règlement intérieur", href: "/ecole-de-rugby/reglement-interieur" }}
      />
    </>
  );
}
