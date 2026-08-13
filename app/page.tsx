import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { StatStrip } from "@/components/StatStrip";
import { MatchCard } from "@/components/MatchCard";
import { ResultCard } from "@/components/ResultCard";
import { NewsCard } from "@/components/NewsCard";
import { TeamCard } from "@/components/TeamCard";
import { PartnerSlider } from "@/components/PartnerSlider";
import { CTASection } from "@/components/CTASection";
import { ArrowRight, MapPin, Phone, Mail } from "@/components/Icons";
import { getNextMatch } from "@/data/matches";
import { getLatestResult } from "@/data/results";
import { getArticleMetas } from "@/lib/content";
import { teams, type Team } from "@/data/teams";
import { site } from "@/data/site";
import { findImage } from "@/lib/gallery";

/** Catégories jeunes présentées sur l'accueil (pages dédiées : école de rugby & formations). */
const youthTeams: Team[] = [
  {
    slug: "ecole-de-rugby",
    name: "École de Rugby",
    category: "Jeunes · dès 3 ans",
    description:
      "De Baby à U14 : la découverte du rugby dans un cadre éducatif, sécurisé et familial.",
    href: "/ecole-de-rugby",
    layout: "simple",
  },
  {
    slug: "juniors",
    name: "Juniors",
    category: "Jeunes · U19",
    description: "La dernière marche avant les seniors : formation et compétition pour les plus grands.",
    href: "/formations/pole-jeunes",
    layout: "simple",
  },
  {
    slug: "cadets",
    name: "Cadets",
    category: "Jeunes · U16",
    description: "Perfectionnement technique et esprit collectif pour les jeunes joueurs du club.",
    href: "/formations/pole-jeunes",
    layout: "simple",
  },
  {
    slug: "cadettes",
    name: "Cadettes",
    category: "Jeunes · Féminines",
    description: "Le rugby au féminin pour les jeunes joueuses, dans un cadre encadré et bienveillant.",
    href: "/formations/cadettes",
    layout: "simple",
  },
];

/** Ordre d'affichage des cartes équipes sur l'accueil. */
const homeTeamsOrder = [
  "equipe-premiere",
  "espoirs",
  "feminines",
  "juniors",
  "cadets",
  "cadettes",
  "ecole-de-rugby",
  "loisirs",
];
const homeTeams = homeTeamsOrder
  .map((slug) => [...teams, ...youthTeams].find((t) => t.slug === slug))
  .filter((t): t is Team => Boolean(t));

export default function HomePage() {
  const nextMatch = getNextMatch();
  const lastResult = getLatestResult();
  const news = getArticleMetas().slice(0, 3);

  const stats = [
    { value: String(site.foundedYear), label: "Année de fondation" },
    { value: site.division, label: "Équipe première" },
    { value: "École de rugby", label: "Labellisée 3 étoiles" },
    { value: "Jaune & Noir", label: "Nos couleurs" },
  ];

  return (
    <>
      <Hero />

      {/* Prochain match + dernier résultat */}
      <section className="relative -mt-px bg-ink-800 py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Prochain match
              </span>
              {nextMatch ? (
                <MatchCard match={nextMatch} featured />
              ) : (
                <p className="text-white/60">Prochain match bientôt annoncé.</p>
              )}
            </div>
            <div>
              <span className="mb-4 inline-block font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Dernier résultat
              </span>
              {lastResult ? (
                <ResultCard result={lastResult} featured />
              ) : (
                <p className="text-white/60">Résultats à venir.</p>
              )}
              <Link
                href="/calendrier-resultats"
                className="mt-4 inline-flex items-center gap-1 font-display text-sm font-semibold uppercase tracking-wide text-gold hover:text-gold-300"
              >
                Tous les résultats <ArrowRight width={16} height={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="bg-ink-900 py-16 sm:py-20">
        <div className="container-x">
          <SectionTitle
            eyebrow="Le club en chiffres"
            title="121 ans d'histoire jaune et noir"
            subtitle="Un club historique, formateur et ancré dans son territoire girondin."
            dark
          />
          <div className="mt-10">
            <StatStrip stats={stats} />
          </div>
        </div>
      </section>

      {/* Actualités */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle
              eyebrow="Actualités"
              title="Les dernières news du club"
              subtitle="Matchs, école de rugby, partenaires, événements : toute la vie du SMRC."
            />
            <Link href="/actualites" className="btn-dark hidden sm:inline-flex">
              Toutes les actualités
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
          <Link href="/actualites" className="btn-dark mt-8 w-full sm:hidden">
            Toutes les actualités
          </Link>
        </div>
      </section>

      {/* Équipes */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Nos équipes"
            title="De l'école de rugby à la Nationale 2"
            subtitle="Toutes les générations portent les mêmes couleurs et le même esprit."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {homeTeams.map((t) => (
              <TeamCard key={t.slug} team={{ ...t, image: findImage("accueil/categories", t.slug) ?? t.image }} />
            ))}
          </div>
        </div>
      </section>

      {/* Devenir partenaire */}
      <section className="bg-ink-900 py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Partenaires"
            title="Associez votre entreprise aux valeurs du rugby"
            subtitle="Ils font vivre le rugby à Saint-Médard-en-Jalles. Rejoignez le réseau d'entreprises du club."
            dark
          />
          <div className="mt-10">
            <PartnerSlider dark />
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/partenaires/devenir-partenaire" className="btn-gold">
              Devenir partenaire
            </Link>
            <Link href="/partenaires" className="btn-outline">
              Voir tous nos partenaires
            </Link>
          </div>
        </div>
      </section>

      {/* Boutique / Abonnements */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-2">
            <PromoCard
              eyebrow="Supporters"
              title="Rejoignez les supporters"
              text="Chaque week-end nos jaunes et noirs ont besoin de votre soutien, rejoignez-nous."
              href="/supporters"
              cta="Rejoindre les supporters"
            />
            <PromoCard
              eyebrow="Abonnements & billetterie"
              title="Vivez chaque match au stade"
              text="Abonnements saison, repas supporters, packs et dons pour soutenir le club au quotidien."
              href="/billetterie-abonnements"
              cta="Voir les abonnements"
              dark
            />
          </div>
        </div>
      </section>

      {/* Contact rapide */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-8 rounded-lg bg-ink-900 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTitle
                eyebrow="Contact"
                title="Une question ? Parlons-en"
                subtitle="Inscription, partenariat, bénévolat ou simple renseignement : l'équipe du club vous répond."
                dark
              />
              <Link href="/contact" className="btn-gold mt-6">
                Nous contacter
              </Link>
            </div>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <MapPin width={20} height={20} className="mt-0.5 text-gold" />
                <span>
                  {site.contact.venue}, {site.contact.street}, {site.contact.postalCode}{" "}
                  {site.contact.city}
                </span>
              </li>
              <li>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-gold">
                  <Phone width={20} height={20} className="text-gold" /> {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 hover:text-gold">
                  <Mail width={20} height={20} className="text-gold" /> {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Rejoignez l'aventure"
        title="Le rugby, ça se vit ensemble"
        text="Joueur, parent, supporter, bénévole ou entreprise : il y a une place pour vous au SMRC."
        primary={{ label: "Rejoindre le club", href: "/contact" }}
        secondary={{ label: "Voir les actualités", href: "/actualites" }}
      />
    </>
  );
}

function PromoCard({
  eyebrow,
  title,
  text,
  href,
  cta,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-lg p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10 ${
        dark ? "bg-ink-900" : "bg-gold"
      }`}
    >
      <div>
        <span
          className={`font-display text-xs font-semibold uppercase tracking-[0.2em] ${
            dark ? "text-gold" : "text-ink-900/60"
          }`}
        >
          {eyebrow}
        </span>
        <h3
          className={`mt-2 font-display text-2xl font-bold uppercase leading-tight sm:text-3xl ${
            dark ? "text-white" : "text-ink-900"
          }`}
        >
          {title}
        </h3>
        <p className={`mt-3 max-w-sm ${dark ? "text-white/70" : "text-ink-900/70"}`}>{text}</p>
      </div>
      <span
        className={`mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide ${
          dark ? "text-gold" : "text-ink-900"
        }`}
      >
        {cta}
        <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
