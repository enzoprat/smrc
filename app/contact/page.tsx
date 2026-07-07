import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "@/components/Icons";
import { site } from "@/data/site";
import { localBusinessLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact | Saint-Médard Rugby Club",
  description:
    "Contactez le Saint-Médard Rugby Club : inscription, partenariat, presse, bénévolat ou renseignement. Stade Robert Monseau, Saint-Médard-en-Jalles.",
  path: "/contact",
});

const mapsQuery = encodeURIComponent(
  `${site.contact.venue}, ${site.contact.street}, ${site.contact.postalCode} ${site.contact.city}`,
);

export default function ContactPage() {
  const { contact, social } = site;
  return (
    <>
      <JsonLd data={localBusinessLd()} />

      <PageHero
        eyebrow="Contact"
        title="Contactez le club"
        description="Inscription, partenariat, presse, bénévolat ou simple renseignement : nous sommes à votre écoute."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="bg-bone py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Coordonnées */}
          <div>
            <SectionTitle eyebrow="Coordonnées" title="Saint-Médard Rugby Club" />
            <ul className="mt-8 space-y-5">
              <ContactRow icon={<MapPin width={20} height={20} />} title="Adresse">
                {contact.venue}
                <br />
                {contact.street}
                <br />
                {contact.postalCode} {contact.city}
              </ContactRow>
              <ContactRow icon={<Phone width={20} height={20} />} title="Téléphone">
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-gold-700">
                  {contact.phone}
                </a>
              </ContactRow>
              <ContactRow icon={<Mail width={20} height={20} />} title="Email">
                <a href={`mailto:${contact.email}`} className="hover:text-gold-700">
                  {contact.email}
                </a>
              </ContactRow>
            </ul>

            <div className="mt-8">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-700">
                Suivez-nous
              </h3>
              <div className="mt-3 flex gap-3">
                {[
                  { href: social.facebook, label: "Facebook", Icon: Facebook },
                  { href: social.instagram, label: "Instagram", Icon: Instagram },
                  { href: social.youtube, label: "YouTube", Icon: Youtube },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-ink-900 text-gold transition-colors hover:bg-gold hover:text-ink-900"
                  >
                    <Icon width={20} height={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg shadow-card ring-1 ring-black/5">
              <iframe
                title="Carte du stade Robert Monseau"
                src={`https://maps.google.com/maps?q=${mapsQuery}&output=embed`}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Formulaire */}
          <div className="rounded-lg bg-white p-6 shadow-card ring-1 ring-black/5 sm:p-8">
            <SectionTitle eyebrow="Écrivez-nous" title="Votre message" />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-sm bg-ink-900 text-gold">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-500">{title}</h3>
        <p className="mt-0.5 text-ink-900">{children}</p>
      </div>
    </li>
  );
}
