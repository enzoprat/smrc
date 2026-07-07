import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { JsonLd } from "@/components/JsonLd";
import { sportsOrganizationLd } from "@/lib/jsonld";
import { site } from "@/data/site";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Saint-Médard Rugby Club | Club de rugby à Saint-Médard-en-Jalles",
    template: "%s | SMRC",
  },
  description:
    "Suivez le Saint-Médard Rugby Club : équipe première, école de rugby, calendrier, résultats, actualités, partenaires et vie du club à Saint-Médard-en-Jalles.",
  keywords: [
    "Saint-Médard Rugby Club",
    "SMRC",
    "rugby Saint-Médard-en-Jalles",
    "école de rugby Gironde",
    "club rugby Bordeaux Métropole",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sans.variable} ${display.variable}`}>
      <body>
        <JsonLd data={sportsOrganizationLd()} />
        <Header />
        <main className="min-h-screen">{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
