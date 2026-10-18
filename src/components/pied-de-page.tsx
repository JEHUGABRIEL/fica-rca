import Link from "next/link";
import { AnneeCourante } from "@/components/annee-courante";
import { Logo } from "@/components/logo";
import { profils } from "@/lib/profils";
import { site } from "@/lib/site";

const colonnes = [
  {
    titre: "Nos offres",
    liens: [
      ...profils.map((p) => ({ libelle: p.titre, href: `/${p.slug}` })),
      { libelle: "FICA MOBILE", href: "/fica-mobile" },
      { libelle: "Ouvrir un compte", href: "/ouverture-de-compte" },
    ],
  },
  {
    titre: "La FICA",
    liens: [
      { libelle: "Qui sommes-nous", href: "/la-fica" },
      { libelle: "Gouvernance", href: "/la-fica/gouvernance" },
      { libelle: "Actualités", href: "/actualites" },
      { libelle: "Médiathèque", href: "/mediatheque" },
    ],
  },
];

export function PiedDePage() {
  return (
    <footer className="bg-marine text-[0.92rem] text-white/70">
      <div className="conteneur grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo clair />
          <p className="mt-5 max-w-xs leading-relaxed">{site.slogan}.</p>
        </div>
        {colonnes.map((c) => (
          <div key={c.titre}>
            <h2 className="text-sm font-semibold text-white">{c.titre}</h2>
            <ul className="mt-4 space-y-2">
              {c.liens.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white hover:underline">
                    {l.libelle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="text-sm font-semibold text-white">Siège et agence</h2>
          <address className="mt-4 not-italic leading-relaxed">
            {site.adresse.rue}
            <br />
            {site.adresse.quartier}, {site.adresse.boitePostale} {site.adresse.ville}
          </address>
          <p className="mt-4">
            <a href={site.telephoneLien} className="text-white hover:underline">
              {site.telephone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-white hover:underline">
              {site.email}
            </a>
          </p>
          <p className="mt-4 flex gap-4">
            <a href={site.reseaux.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
              Facebook
            </a>
            <a href={site.reseaux.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="conteneur flex flex-col gap-2 py-5 text-xs text-white/50 md:flex-row md:justify-between">
          <p>
            © <AnneeCourante />
            {site.nom} S.A. · Société anonyme au capital de {site.capitalSocial} · Établissement de microfinance agréé
            par la COBAC le {site.agrement}
          </p>
          <Link href="/mentions-legales" className="hover:text-white">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
