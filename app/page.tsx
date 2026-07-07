import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { StatStrip } from "@/components/StatStrip";
import { MatchCard } from "@/components/MatchCard";
import { ResultCard } from "@/components/ResultCard";
import { NewsCard } from "@/components/NewsCard";
import { TeamCard } from "@/components/TeamCard";
import { PartnerLogoGrid } from "@/components/PartnerLogoGrid";
import { CTASection } from "@/components/CTASection";
import { Placeholder } from "@/components/Placeholder";
import { ArrowRight, Check, MapPin, Phone, Mail } from "@/components/Icons";
import { getNextMatch } from "@/data/matches";
import { getLatestResult } from "@/data/results";
import { getArticleMetas } from "@/lib/content";
import { teams } from "@/data/teams";
import { partners } from "@/data/partners";
import { getUpcomingEvents } from "@/data/events";
import { site } from "@/data/site";
import { formatShortDate } from "@/lib/format";

export default function HomePage() {
  const nextMatch = getNextMatch();
  const lastResult = getLatestResult();
  const news = getArticleMetas().slice(0, 3);
  const events = getUpcomingEvents(3);

  const stats = [
    { value: String(site.foundedYear), label: "Année de fondation" },
    { value: site.division, label: "Équipe première" },
    { value: "École de rugby", label: "Formation des jeunes" },
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
                <p className="text-white/60">[À confirmer : calendrier 2026/2027]</p>
              )}
            </div>
            <div>
              <span className="mb-4 inline-block font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Dernier résultat
              </span>
              {lastResult ? (
                <ResultCard result={lastResult} featured />
              ) : (
                <p className="text-white/60">[À confirmer : résultats]</p>
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
            title="120 ans d'histoire jaune et noir"
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

      {/* École de rugby */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Placeholder
              src=""
              alt="École de rugby du SMRC"
              label="École de rugby"
              ratio="aspect-[4/3]"
              className="rounded-lg shadow-card"
            />
            <div>
              <SectionTitle
                eyebrow="École de rugby"
                title="Votre enfant veut découvrir le rugby ?"
                subtitle="De 4 à 14 ans, filles et garçons, dans un cadre familial, sécurisé et encadré par des éducateurs passionnés."
              />
              <ul className="mt-6 space-y-3">
                {[
                  "Découverte du rugby sans plaquage chez les plus jeunes",
                  "Apprentissage des valeurs : respect, entraide, plaisir",
                  "Encadrement par des éducateurs diplômés",
                  "Séances d'essai gratuites en début de saison",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-ink-700">
                    <Check width={20} height={20} className="mt-0.5 flex-shrink-0 text-gold-600" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/ecole-de-rugby" className="btn-gold">
                  Découvrir l'école de rugby
                </Link>
                <Link href="/ecole-de-rugby#inscription" className="btn-dark">
                  Inscrire mon enfant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Équipes */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Nos équipes"
            title="De l'école de rugby à la Fédérale 1"
            subtitle="Toutes les générations portent les mêmes couleurs et le même esprit."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {teams.map((t) => (
              <TeamCard key={t.slug} team={t} />
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
            <PartnerLogoGrid partners={partners.slice(0, 8)} />
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

      {/* Vie du club */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Vie du club"
            title="Bien plus qu'un club de rugby"
            subtitle="Événements, repas supporters, bénévolat, anciens joueurs : le SMRC, c'est une grande famille."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {events.map((e) => (
              <article key={e.id} className="card flex flex-col p-6">
                <span className="font-display text-xs uppercase tracking-widest text-gold-700">
                  {formatShortDate(e.date)}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight text-ink-900">
                  {e.title}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
                  <MapPin width={14} height={14} /> {e.location}
                </p>
                <p className="mt-3 flex-1 text-sm text-ink-600">{e.description}</p>
                {e.ctaHref && (
                  <Link
                    href={e.ctaHref}
                    className="mt-4 inline-flex items-center gap-1 font-display text-sm font-semibold uppercase tracking-wide text-gold-700 hover:text-gold-600"
                  >
                    {e.ctaLabel} <ArrowRight width={16} height={16} />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Boutique / Abonnements */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-2">
            <PromoCard
              eyebrow="Boutique"
              title="Portez les couleurs du club"
              text="Maillots, textiles et accessoires aux couleurs jaune et noir. Affichez votre fierté SMRC."
              href="/boutique"
              cta="Accéder à la boutique"
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
