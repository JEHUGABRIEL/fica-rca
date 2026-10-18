import Link from "next/link";
import { Logo } from "@/components/logo";
import { Navigation, type Menu } from "@/components/navigation";
import { produitsDeRubrique, profils } from "@/lib/profils";
import { site } from "@/lib/site";

const menus: Menu[] = [
  ...profils.map((p) => ({
    cle: p.slug,
    libelle: p.nom,
    href: `/${p.slug}`,
    introduction: p.introduction,
    colonnes: p.rubriques.map((r) => ({
      titre: r.titre,
      liens: produitsDeRubrique(r.produits).map(({ produit, href }) => ({ libelle: produit.nom, href })),
    })),
  })),
  {
    cle: "la-fica",
    libelle: "La FICA",
    href: "/la-fica",
    introduction: "Établissement de microfinance agréé par la COBAC depuis le 20 juillet 2020.",
    colonnes: [
      {
        titre: "Qui sommes-nous",
        liens: [
          { libelle: "Mot du Directeur général", href: "/la-fica#mot-du-directeur" },
          { libelle: "Histoire", href: "/la-fica#histoire" },
          { libelle: "Valeurs et engagements", href: "/la-fica#valeurs" },
        ],
      },
      {
        titre: "Gouvernance",
        liens: [
          { libelle: "Direction générale", href: "/la-fica/gouvernance#direction-generale" },
          { libelle: "Conseil d'administration", href: "/la-fica/gouvernance#conseil-administration" },
          { libelle: "Actionnariat", href: "/la-fica/gouvernance#assemblee-generale" },
        ],
      },
      {
        titre: "Informations",
        liens: [
          { libelle: "Actualités", href: "/actualites" },
          { libelle: "Médiathèque", href: "/mediatheque" },
          { libelle: "Contact et accès", href: "/contact" },
        ],
      },
    ],
  },
];

export function EnTete() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="hidden bg-marine text-[0.8rem] text-white/75 md:block">
        <div className="conteneur flex h-9 items-center justify-between">
          <p>Établissement de microfinance agréé par la COBAC</p>
          <ul className="flex items-center divide-x divide-white/20">
            {[
              { libelle: "Actualités", href: "/actualites" },
              { libelle: "Médiathèque", href: "/mediatheque" },
              { libelle: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.href} className="px-4">
                <Link href={l.href} className="hover:text-white">
                  {l.libelle}
                </Link>
              </li>
            ))}
            <li className="pl-4">
              <a href={site.telephoneLien} className="font-medium text-white">
                {site.telephone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-b border-filet">
        <div className="conteneur flex h-[4.5rem] items-center justify-between gap-6">
          <Logo />
          <Navigation menus={menus} />
        </div>
      </div>
    </header>
  );
}
