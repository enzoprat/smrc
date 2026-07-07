import Link from "next/link";
import { footerNav } from "@/data/nav";
import { site } from "@/data/site";
import { Logo } from "./Logo";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "./Icons";

/** Footer global complet. */
export function Footer() {
  const year = new Date().getFullYear();
  const { contact, social } = site;

  return (
    <footer className="bg-ink-900 text-white">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Bloc identité + contact */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {site.tagline}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin width={18} height={18} className="mt-0.5 flex-shrink-0 text-gold" />
                <span>
                  {contact.venue}
                  <br />
                  {contact.street}
                  <br />
                  {contact.postalCode} {contact.city}
                </span>
              </li>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-gold">
                  <Phone width={18} height={18} className="text-gold" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-gold">
                  <Mail width={18} height={18} className="text-gold" />
                  {contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-white/5 text-white/70 transition-colors hover:bg-gold hover:text-ink-900"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Colonnes de liens */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <FooterCol title="Le Club" links={footerNav.club} />
            <FooterCol title="Équipes" links={footerNav.teams} />
            <FooterCol title="Soutenir" links={footerNav.support} />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {site.name}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center gap-4">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin" className="hover:text-gold">
                Espace club
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-gold">
        {title}
      </h3>
      <ul className="space-y-2.5 text-sm text-white/60">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-gold">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
