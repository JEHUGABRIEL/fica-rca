"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const liens = [
  { libelle: "Tableau de bord", href: "/admin" },
  { libelle: "Carrousel d'accueil", href: "/admin/carrousel" },
  { libelle: "Actualités", href: "/admin/actualites" },
  { libelle: "Médiathèque", href: "/admin/mediatheque" },
  { libelle: "Avis clients", href: "/admin/avis" },
  { libelle: "Demandes reçues", href: "/admin/demandes" },
];

/* Lit l'adresse courante pour surligner le lien actif. */
export function NavAdminActive() {
  return <NavAdmin pathname={usePathname()} />;
}

export function NavAdmin({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Back-office">
      <ul className="flex gap-1 overflow-x-auto lg:flex-col">
        {liens.map((l) => {
          const actif = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={actif ? "page" : undefined}
                className={`block whitespace-nowrap border-l-2 px-4 py-2.5 text-[0.95rem] ${
                  actif ? "border-rouge bg-white/10 font-medium text-white" : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {l.libelle}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
