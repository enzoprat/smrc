import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité | Saint-Médard Rugby Club",
  description: "Politique de confidentialité et gestion des données personnelles du Saint-Médard Rugby Club.",
  path: "/politique-confidentialite",
});

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="Informations"
        title="Politique de confidentialité"
        description="Comment le club collecte et protège vos données personnelles."
        crumbs={[{ name: "Politique de confidentialité", path: "/politique-confidentialite" }]}
      />

      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x">
          <div className="prose-smrc mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-12">
            <h2>Données collectées</h2>
            <p>
              Le {site.contact.clubName} collecte uniquement les données que vous transmettez
              volontairement via les formulaires du site (contact, demande de partenariat) :
              nom, prénom, email, téléphone et message.
            </p>

            <h2>Utilisation des données</h2>
            <p>
              Ces données servent exclusivement à répondre à votre demande et à assurer le suivi
              de la vie associative. Elles ne sont ni vendues, ni cédées à des tiers à des fins
              commerciales.
            </p>

            <h2>Durée de conservation</h2>
            <p>
              Les données sont conservées le temps nécessaire au traitement de votre demande, puis
              archivées ou supprimées conformément à la réglementation.
            </p>

            <h2>Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de
              suppression de vos données. Pour l'exercer, contactez-nous à{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>

            <h2>Cookies</h2>
            <p>
              Ce site n'utilise pas de cookies publicitaires. Seuls des cookies techniques
              strictement nécessaires (session de l'espace d'administration) peuvent être déposés.
              [À confirmer : outils de mesure d'audience éventuels]
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
