import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { PartnerForm } from "@/components/PartnerForm";
import { StatStrip } from "@/components/StatStrip";
import { Check } from "@/components/Icons";
import { partnerPacks } from "@/data/partners";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Devenir partenaire du SMRC | Club rugby Gironde",
  description:
    "Associez votre entreprise au Saint-Médard Rugby Club et développez votre visibilité locale grâce aux valeurs du rugby et au réseau d'entreprises du club.",
  path: "/partenaires/devenir-partenaire",
});

const reasons = [
  { title: "Visibilité locale", text: "Affichez votre marque auprès d'une communauté fidèle sur la métropole bordelaise." },
  { title: "Réseau d'entreprises", text: "Intégrez un réseau dynamique d'entrepreneurs et de décideurs locaux." },
  { title: "Hospitalité jour de match", text: "Recevez vos clients et collaborateurs dans un cadre convivial et unique." },
  { title: "Communication digitale", text: "Bénéficiez d'une présence sur le site, la newsletter et les réseaux sociaux." },
  { title: "Soutien à la formation", text: "Contribuez concrètement à la formation des jeunes de l'école de rugby." },
  { title: "Image de marque locale", text: "Associez votre entreprise aux valeurs fortes du rugby et du territoire." },
];

export default function DevenirPartenairePage() {
  const stats = [
    { value: String(site.foundedYear), label: "Année de fondation" },
    { value: site.division, label: "Équipe première" },
    { value: "U6 → Seniors", label: "Toutes catégories" },
    { value: "Gironde", label: "Ancrage local" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Partenaires"
        title="Associez votre entreprise aux valeurs du SMRC"
        description="Le partenariat, c'est gagnant-gagnant : votre visibilité grandit, le club se développe."
        crumbs={[
          { name: "Partenaires", path: "/partenaires" },
          { name: "Devenir partenaire", path: "/partenaires/devenir-partenaire" },
        ]}
      />

      {/* Stats */}
      <section className="bg-ink-900 py-12">
        <div className="container-x">
          <StatStrip stats={stats} />
        </div>
      </section>

      {/* Pourquoi */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Pourquoi nous rejoindre"
            title="6 bonnes raisons de devenir partenaire"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <div key={r.title} className="rounded-lg bg-bone p-6 ring-1 ring-black/5">
                <span className="font-display text-3xl font-extrabold text-gold/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold uppercase text-ink-900">{r.title}</h3>
                <p className="mt-2 text-sm text-ink-600">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packs */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Nos offres"
            title="Des packs adaptés à chaque entreprise"
            subtitle="Tarifs sur demande. Chaque pack peut être personnalisé selon vos objectifs."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partnerPacks.map((pack) => (
              <div
                key={pack.name}
                className={`flex flex-col rounded-lg p-6 ${
                  pack.featured ? "bg-ink-900 text-white shadow-card ring-2 ring-gold" : "bg-white ring-1 ring-black/5"
                }`}
              >
                {pack.featured && (
                  <span className="mb-3 inline-block w-fit rounded-sm bg-gold px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-ink-900">
                    Le plus choisi
                  </span>
                )}
                <h3 className={`font-display text-xl font-bold uppercase ${pack.featured ? "text-gold" : "text-ink-900"}`}>
                  {pack.name}
                </h3>
                <p className={`mt-2 text-sm ${pack.featured ? "text-white/70" : "text-ink-600"}`}>{pack.pitch}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {pack.benefits.map((b) => (
                    <li key={b} className={`flex items-start gap-2 text-sm ${pack.featured ? "text-white/80" : "text-ink-700"}`}>
                      <Check width={16} height={16} className="mt-0.5 flex-shrink-0 text-gold-600" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className={`mt-5 font-display text-sm font-semibold uppercase ${pack.featured ? "text-white" : "text-ink-900"}`}>
                  Prix sur demande
                </p>
                <a href="#formulaire" className={pack.featured ? "btn-gold mt-4" : "btn-dark mt-4"}>
                  Demander ce pack
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section id="formulaire" className="scroll-mt-24 bg-white py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Contact partenariat"
              title="Parlons de votre projet"
              subtitle="Remplissez ce formulaire : le responsable partenariats vous recontacte rapidement."
            />
            <div className="mt-8 rounded-lg bg-bone p-6 ring-1 ring-black/5">
              <h3 className="font-display text-lg font-bold uppercase text-ink-900">Ils nous font confiance</h3>
              <p className="mt-2 text-sm text-ink-600">
                « Être partenaire du SMRC, c'est soutenir le sport local et profiter d'une belle
                visibilité auprès des familles et des entreprises du territoire. »
              </p>
              <p className="mt-2 text-sm text-ink-500">[À confirmer : témoignages partenaires]</p>
            </div>
          </div>
          <div className="rounded-lg bg-bone p-6 ring-1 ring-black/5 sm:p-8">
            <PartnerForm />
          </div>
        </div>
      </section>
    </>
  );
}
