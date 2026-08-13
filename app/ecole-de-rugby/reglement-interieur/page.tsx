import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { CTASection } from "@/components/CTASection";
import { Check } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Règlement intérieur de l'École de Rugby | SMRC",
  description:
    "Le règlement intérieur de l'école de rugby du Saint-Médard Rugby Club (saison 2026-2027) : horaires, prise en charge, communication, sécurité, respect et sanctions.",
  path: "/ecole-de-rugby/reglement-interieur",
});

const PDF_HREF = "/docs/reglement-interieur-edr-2026-2027.pdf";

const priseEnCharge = [
  {
    t: "Entraînement",
    d: "Dès l'arrivée au terrain (1/4 h maxi avant l'heure de début de séance) jusqu'au départ après la douche, lors de la prise en charge par les parents ou la sortie de l'enceinte des terrains le cas échéant.",
  },
  {
    t: "Déplacements",
    d: "Entre les heures de rendez-vous et de retour, lors de la prise en charge par les parents.",
  },
  {
    t: "Match à domicile",
    d: "Entre l'heure de rendez-vous au lieu indiqué sur la convocation et la fin de match, lors de la prise en charge par les parents ou la sortie de l'enceinte des terrains le cas échéant.",
  },
  {
    t: "Activités diverses",
    d: "Entre les heures indiquées.",
  },
];

const sanctions = [
  "Avertissement verbal à l'enfant",
  "Avertissement verbal aux parents",
  "Avertissement écrit aux parents (courriels par exemple)",
  "Suspension temporaire",
  "Radiation (sans remboursement de la cotisation)",
];

export default function ReglementInterieurPage() {
  return (
    <>
      <PageHero
        eyebrow="École de Rugby"
        title="Règlement intérieur"
        description="Saison 2026-2027 — les règles de vie de l'école de rugby, pour le bien et le respect de tous."
        crumbs={[
          { name: "École de Rugby", path: "/ecole-de-rugby" },
          { name: "Règlement intérieur", path: "/ecole-de-rugby/reglement-interieur" },
        ]}
      />

      {/* Préambule + téléchargement */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Préambule" title="Une discipline au service de tous" />
          <p className="mt-6 text-lg text-ink-600">
            La vie à l'intérieur de l'école nécessite des participants une discipline inhérente à la
            vie en collectivité d'une part, et contribue à l'éducation générale d'autre part. Pour
            cela, quelques règles de base ont été établies afin que chacun en ait connaissance et les
            respecte.
          </p>
          <p className="mt-4 text-ink-600">
            Il est par ailleurs demandé à l'ensemble des parties prenantes (joueurs, parents,
            éducateurs, dirigeants…) de prendre connaissance, valider et respecter les chartes
            distribuées en début de saison.
          </p>
          <a
            href={PDF_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-8 inline-flex"
          >
            Télécharger le règlement (PDF)
          </a>
        </div>
      </section>

      {/* Respect des horaires */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Article 1" title="Respect des horaires" />
          <p className="mt-6 text-ink-600">
            Les séances d'entraînement débutent à 16h00 (pour les baby) ou à 17h15 le mercredi et à
            09h45 ou 11h le samedi, suivant la catégorie d'âge. Les enfants doivent être en tenue
            pour commencer à l'heure précise. Tout retard répétitif et non valable pourrait entraîner
            un refus par les éducateurs de prendre en charge l'enfant pour la séance.
          </p>
          <p className="mt-4 text-ink-600">
            Les horaires de rendez-vous pour les départs en déplacement sont donnés au plus juste pour
            ne pas contraindre les enfants et les familles. Merci de les respecter pour le bien et le
            respect de tous. En cas de retard ou d'absence prévisible, prévenir au plus tôt les
            éducateurs respectifs de chaque catégorie.
          </p>

          <h3 className="mt-8 font-display text-lg font-bold uppercase text-ink-900">
            La prise en charge par le club
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {priseEnCharge.map((p) => (
              <div key={p.t} className="card p-6">
                <h4 className="font-display text-base font-bold uppercase text-ink-900">{p.t}</h4>
                <p className="mt-2 text-sm text-ink-600">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communication */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Article 2" title="Communication" />
          <p className="mt-6 text-ink-600">
            Chaque mois, un calendrier prévisionnel des activités sera actualisé et envoyé aux
            référents de catégorie. Les entraînements, rencontres et autres tournois sont mentionnés
            sur l'application SportEasy, à partir de laquelle il est impératif d'indiquer les présences
            et absences.
          </p>
          <p className="mt-4 rounded-lg bg-gold/15 p-4 font-medium text-ink-900 ring-1 ring-gold/30">
            Cette application en ligne est le seul moyen de communication interne de l'EdR du
            SMRC-ASSAM.
          </p>
        </div>
      </section>

      {/* Hygiène / Santé */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Article 3" title="Hygiène / Santé" />
          <p className="mt-6 text-ink-600">
            Des vestiaires sont à la disposition de l'école avec des douches. Les enfants devront
            apporter des affaires (savon, serviette) pour se laver après les entraînements et les
            matchs. Des vêtements de rechange devront également être apportés, en particulier les jours
            de mauvais temps.
          </p>
          <p className="mt-4 text-sm italic text-ink-500">
            NB : les bijoux, montres, habits de valeur, téléphones ne sont pas nécessaires et donc
            fortement déconseillés (risque de perte, vol ou dégradation). L'école de rugby ne pourra en
            être tenue pour responsable.
          </p>
          <p className="mt-4 rounded-lg bg-red-50 p-4 font-medium text-red-800 ring-1 ring-red-200">
            Le tabac, l'alcool et la drogue sont strictement interdits à partir de l'instant où
            l'enfant est pris en charge par le club (entraînements, déplacements, avant et après
            matchs). Tout manquement à cette règle conduira les éducateurs à le signaler aux parents :
            un avertissement sera donné, avec une exclusion temporaire ou définitive en cas de récidive.
          </p>
        </div>
      </section>

      {/* Sécurité */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Article 4" title="Sécurité" />
          <p className="mt-6 text-ink-600">
            L'école n'est pas responsable pendant les déplacements des enfants entre leur domicile et
            les lieux de rendez-vous. Les vélos et 2 roues à moteur sont interdits à l'intérieur des
            enceintes sportives des stades Monseau et Bords de Jalle.
          </p>
          <p className="mt-4 text-ink-600">
            En cas d'accident nécessitant l'intervention d'un médecin ou organisme médical
            (spécialiste, clinique, hôpital…) pendant que l'enfant est sous la responsabilité de
            l'école, il sera établi une déclaration d'accident qui devra être remplie par l'éducateur,
            le représentant du blessé (avec la signature du blessé dans la mesure du possible) et le
            médecin ayant traité l'enfant le cas échéant.
          </p>
          <p className="mt-4 text-ink-600">
            Elle sera retournée au secrétaire administratif de l'EdR, qui la complétera et l'enverra à
            la mutuelle du rugby dans les 5 jours qui suivent la date de l'accident. Cette mutuelle
            fera le complément des remboursements de la sécurité sociale sur présentation exclusive de
            l'original du relevé.
          </p>
          <p className="mt-4 text-sm italic text-ink-500">
            Il vaut mieux faire une déclaration, en cas de doute sur la nature de l'accident, pour se
            prémunir d'éventuelles séquelles.
          </p>
        </div>
      </section>

      {/* Politesse - Respect - Prévention violences */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Article 5" title="Politesse, respect, prévention des violences" />
          <p className="mt-6 text-ink-600">
            Les enfants doivent se respecter entre eux. Ils doivent le respect et l'obéissance aux
            éducateurs et autres dirigeants de l'école de rugby. Tout manquement à cette règle conduira
            les éducateurs à le signaler aux parents : un avertissement sera donné avec possibilité
            d'exclusion temporaire ou définitive, en cas de récidive ou de faute grave.
          </p>
          <p className="mt-4 text-ink-600">
            Dans le cadre de la prévention des violences sous quelque forme que ce soit, le SMRC
            s'engage aux côtés de la ligue de rugby Nouvelle-Aquitaine. Les témoins ou victimes de
            violences dans le cadre de l'activité rugby peuvent joindre le service C3PR au{" "}
            <a href="tel:0648143098" className="font-medium text-gold-700 hover:underline">
              06 48 14 30 98
            </a>{" "}
            ou à l'adresse{" "}
            <a href="mailto:sosviolences@ffr.fr" className="font-medium text-gold-700 hover:underline">
              sosviolences@ffr.fr
            </a>
            .
          </p>
          <p className="mt-4 text-sm text-ink-500">
            Autres contacts utiles : 119 (service national d'accueil téléphonique pour l'enfance en
            danger), 07 50 85 47 10 (association Colosse aux pieds d'argile), 06 14 42 01 74 (Comité
            éthique et sport), 06 07 45 26 11 (Comité national contre le bizutage), 06 01 43 31 94
            (SOS addictions).
          </p>
        </div>
      </section>

      {/* Droit à l'image */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Article 6" title="Droit à l'image" />
          <p className="mt-6 text-ink-600">
            Lors de son inscription, les parents (représentants légaux) autorisent ou non le SMRC à
            utiliser et publier l'image du joueur dans le cadre de ses activités au sein du club, sur
            tout support (papier, numérique, réseaux sociaux, presse…).
          </p>
        </div>
      </section>

      {/* Sanctions */}
      <section className="bg-ink-900 py-16 sm:py-24">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Article 7" title="Sanctions" dark />
          <p className="mt-6 text-white/70">
            Les sanctions mises en place pour les membres mineurs sont, par ordre de gravité :
          </p>
          <ul className="mt-8 grid gap-3">
            {sanctions.map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-white/80"
              >
                <Check width={20} height={20} className="mt-0.5 flex-shrink-0 text-gold" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        eyebrow="École de Rugby"
        title="Une question sur le fonctionnement de l'école ?"
        text="Consultez notre projet éducatif ou contactez l'équipe encadrante."
        primary={{ label: "Projet éducatif", href: "/ecole-de-rugby/projet-educatif" }}
        secondary={{ label: "Nous contacter", href: "/contact" }}
      />
    </>
  );
}
