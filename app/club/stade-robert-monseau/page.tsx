import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Placeholder } from "@/components/Placeholder";
import { CTASection } from "@/components/CTASection";
import { MapPin, Clock, Check } from "@/components/Icons";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Stade Robert Monseau | Accès & infos pratiques | SMRC",
  description:
    "Toutes les infos pratiques pour venir au stade Robert Monseau à Saint-Médard-en-Jalles : adresse, accès, parking et jour de match.",
  path: "/club/stade-robert-monseau",
});

const mapsQuery = encodeURIComponent(
  `${site.contact.venue}, ${site.contact.street}, ${site.contact.postalCode} ${site.contact.city}`,
);

export default function StadePage() {
  const infos = [
    "Tribune et espaces familles",
    "Club house pour les repas supporters",
    "Terrains d'entraînement pour l'école de rugby",
    "Buvette les jours de match",
  ];

  return (
    <>
      <PageHero
        eyebrow="Le Club"
        title="Stade Robert Monseau"
        description="Le cœur du SMRC : matchs, entraînements et convivialité à Saint-Médard-en-Jalles."
        crumbs={[
          { name: "Le Club", path: "/club" },
          { name: "Stade Robert Monseau", path: "/club/stade-robert-monseau" },
        ]}
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Placeholder src="" alt="Stade Robert Monseau" label="Stade Robert Monseau" ratio="aspect-[4/3]" className="rounded-lg shadow-card" />
          <div>
            <SectionTitle eyebrow="Présentation" title="Notre maison" />
            <p className="mt-6 text-ink-600">
              Le stade Robert Monseau accueille les matchs à domicile de l'équipe première et les
              entraînements de toutes les catégories. C'est ici que vibre la communauté jaune et noir,
              dans une ambiance chaleureuse et familiale.
            </p>
            <ul className="mt-6 space-y-3">
              {infos.map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink-700">
                  <Check width={20} height={20} className="mt-0.5 flex-shrink-0 text-gold-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Accès */}
      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Accès" title="Comment venir au stade" />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <InfoBlock title="Adresse" icon={<MapPin width={20} height={20} />}>
                {site.contact.venue}
                <br />
                {site.contact.street}
                <br />
                {site.contact.postalCode} {site.contact.city}
              </InfoBlock>
              <InfoBlock title="Parking" icon={<MapPin width={20} height={20} />}>
                Parking à proximité du stade. [À confirmer : capacité et emplacement exact du parking]
              </InfoBlock>
              <InfoBlock title="Accès jour de match" icon={<Clock width={20} height={20} />}>
                Ouverture des portes avant le coup d'envoi, buvette et club house ouverts.
                [À confirmer : horaires d'ouverture jour de match]
              </InfoBlock>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Itinéraire Google Maps
              </a>
            </div>

            {/* Carte intégrée */}
            <div className="overflow-hidden rounded-lg shadow-card ring-1 ring-black/5">
              <iframe
                title="Carte du stade Robert Monseau"
                src={`https://maps.google.com/maps?q=${mapsQuery}&output=embed`}
                className="h-full min-h-[360px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Rendez-vous au stade Robert Monseau"
        text="Venez encourager les jaune et noir et vivre l'ambiance des jours de match."
        primary={{ label: "Voir le prochain match", href: "/calendrier-resultats" }}
        secondary={{ label: "Billetterie & abonnements", href: "/billetterie-abonnements" }}
      />
    </>
  );
}

function InfoBlock({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-lg bg-white p-5 ring-1 ring-black/5">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-sm bg-ink-900 text-gold">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-base font-bold uppercase text-ink-900">{title}</h3>
        <p className="mt-1 text-sm text-ink-600">{children}</p>
      </div>
    </div>
  );
}
