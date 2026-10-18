import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { BoutonsFlottants } from "@/components/boutons-flottants";
import { EnTete } from "@/components/en-tete";
import { HorsAdmin } from "@/components/hors-admin";
import { PiedDePage } from "@/components/pied-de-page";
import { site } from "@/lib/site";
import "./globals.css";

const plex = IBM_Plex_Sans({ variable: "--font-plex", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nomCourt} — ${site.nom} | Microfinance en Centrafrique`,
    template: `%s | ${site.nomCourt}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: `${site.nomCourt} — ${site.nom}`,
    images: [{ url: "/images/actualites/fica-mobile-lancement.jpg", width: 1417, height: 710 }],
  },
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#0b2149",
};

const donneesStructurees = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: `${site.nom} (${site.nomCourt})`,
  alternateName: "FICA",
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  telephone: site.telephone,
  email: site.email,
  slogan: site.slogan,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.adresse.rue,
    postOfficeBoxNumber: site.adresse.boitePostale,
    addressLocality: site.adresse.ville,
    addressCountry: "CF",
  },
  sameAs: Object.values(site.reseaux),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={plex.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
        >
          Aller au contenu
        </a>
        <HorsAdmin>
          <EnTete />
        </HorsAdmin>
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <HorsAdmin>
          <PiedDePage />
          <BoutonsFlottants />
        </HorsAdmin>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesStructurees) }}
        />
      </body>
    </html>
  );
}
