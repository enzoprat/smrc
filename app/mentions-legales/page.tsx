import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales | Saint-Médard Rugby Club",
  description: "Mentions légales du site du Saint-Médard Rugby Club.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Informations"
        title="Mentions légales"
        description="Informations légales relatives au site et à l'association."
        crumbs={[{ name: "Mentions légales", path: "/mentions-legales" }]}
      />

      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <div className="prose-smrc mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-12">
            <h2>Éditeur du site</h2>
            <p>
              {site.contact.clubName}
              <br />
              {site.contact.street}, {site.contact.postalCode} {site.contact.city}, {site.contact.country}
              <br />
              Téléphone : {site.contact.phone} — Email : {site.contact.email}
            </p>
            <p>
              Association sportive régie par la loi du 1<sup>er</sup> juillet 1901.
              <br />
              [À confirmer : numéro RNA / SIREN, directeur de la publication]
            </p>

            <h2>Hébergement</h2>
            <p>
              Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
              <br />
              [À confirmer si l'hébergeur diffère]
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus (textes, logos, photographies) présents sur ce site est, sauf
              mention contraire, la propriété du {site.contact.clubName} ou de ses partenaires. Toute
              reproduction sans autorisation est interdite.
            </p>

            <h2>Crédits photos</h2>
            <p>
              [À confirmer : crédits photographiques]. Certaines images sont des visuels de remplacement
              en attendant les photographies officielles du club.
            </p>

            <h2>Contact</h2>
            <p>
              Pour toute question relative au site, écrivez à{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
