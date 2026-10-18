"use client";

import { ChevronDown, Menu as IconeMenu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type Menu = {
  cle: string;
  libelle: string;
  href: string;
  introduction: string;
  colonnes: { titre: string; liens: { libelle: string; href: string }[] }[];
};

export function Navigation({ menus }: { menus: Menu[] }) {
  const [ouvert, setOuvert] = useState<string | null>(null);
  const [mobileOuvert, setMobileOuvert] = useState(false);
  const pathname = usePathname();
  const racine = useRef<HTMLDivElement>(null);

  // Referme tout menu ouvert après une navigation.
  const [cheminPrecedent, setCheminPrecedent] = useState(pathname);
  if (pathname !== cheminPrecedent) {
    setCheminPrecedent(pathname);
    setOuvert(null);
    setMobileOuvert(false);
  }

  useEffect(() => {
    function fermerSurEchap(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOuvert(null);
        setMobileOuvert(false);
      }
    }
    function fermerSurClicExterieur(e: MouseEvent) {
      if (racine.current && !racine.current.contains(e.target as Node)) setOuvert(null);
    }
    document.addEventListener("keydown", fermerSurEchap);
    document.addEventListener("mousedown", fermerSurClicExterieur);
    return () => {
      document.removeEventListener("keydown", fermerSurEchap);
      document.removeEventListener("mousedown", fermerSurClicExterieur);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOuvert ? "hidden" : "";
  }, [mobileOuvert]);

  const actif = (href: string) => pathname.startsWith(href);
  const menuOuvert = menus.find((m) => m.cle === ouvert);

  return (
    <div ref={racine} className="flex items-center gap-4">
      <nav aria-label="Navigation principale" className="hidden h-[4.5rem] items-stretch lg:flex">
        {menus.map((m) => (
          <button
            key={m.cle}
            type="button"
            aria-expanded={ouvert === m.cle}
            aria-controls="mega-menu"
            onClick={() => setOuvert((o) => (o === m.cle ? null : m.cle))}
            className={`flex items-center gap-1 border-b-2 px-3.5 text-[0.95rem] font-medium transition-colors ${
              ouvert === m.cle || actif(m.href)
                ? "border-bleu text-bleu"
                : "border-transparent text-marine hover:text-bleu"
            }`}
          >
            {m.libelle}
            <ChevronDown className={`size-4 transition-transform ${ouvert === m.cle ? "rotate-180" : ""}`} aria-hidden />
          </button>
        ))}
        <Link
          href="/fica-mobile"
          className={`flex items-center border-b-2 px-3.5 text-[0.95rem] font-medium ${
            actif("/fica-mobile") ? "border-bleu text-bleu" : "border-transparent text-marine hover:text-bleu"
          }`}
        >
          FICA MOBILE
        </Link>
      </nav>

      <Link href="/ouverture-de-compte" className="bouton bouton-principal hidden !py-2.5 sm:inline-flex">
        Ouvrir un compte
      </Link>

      <button
        type="button"
        className="grid size-11 place-items-center text-marine lg:hidden"
        aria-label={mobileOuvert ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={mobileOuvert}
        aria-controls="menu-mobile"
        onClick={() => setMobileOuvert((o) => !o)}
      >
        {mobileOuvert ? <X className="size-6" /> : <IconeMenu className="size-6" />}
      </button>

      {/* --- Méga-menu (bureau) --- */}
      <div id="mega-menu" hidden={!menuOuvert} className="absolute inset-x-0 top-full hidden border-b border-filet bg-white lg:block">
        {menuOuvert && (
          <div className="conteneur grid grid-cols-[16rem_1fr] gap-12 py-10">
            <div className="border-r border-filet pr-10">
              <p className="text-xl font-semibold text-marine">{menuOuvert.libelle}</p>
              <p className="mt-3 text-sm leading-relaxed text-gris">{menuOuvert.introduction}</p>
              <Link href={menuOuvert.href} className="lien-fleche mt-5 text-sm">
                Voir toute l&apos;offre
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-x-10 gap-y-8">
              {menuOuvert.colonnes.map((c) => (
                <div key={c.titre}>
                  <p className="border-b border-filet pb-2 text-sm font-semibold text-marine">{c.titre}</p>
                  <ul className="mt-3 space-y-2">
                    {c.liens.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-[0.92rem] text-encre/80 hover:text-bleu hover:underline">
                          {l.libelle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- Menu mobile --- */}
      <div
        id="menu-mobile"
        hidden={!mobileOuvert}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto border-t border-filet bg-white md:top-[6.75rem] lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="conteneur pb-16">
          <ul className="divide-y divide-filet">
            {menus.map((m) => (
              <li key={m.cle}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-marine">
                    {m.libelle}
                    <ChevronDown className="size-5 transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <div className="space-y-5 pb-5">
                    <Link href={m.href} className="lien-fleche text-sm">
                      Voir toute l&apos;offre
                    </Link>
                    {m.colonnes.map((c) => (
                      <div key={c.titre}>
                        <p className="text-sm font-semibold text-gris">{c.titre}</p>
                        <ul className="mt-2 space-y-2">
                          {c.liens.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className="text-marine">
                                {l.libelle}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              </li>
            ))}
            <li>
              <Link href="/fica-mobile" className="block py-4 text-lg font-medium text-marine">
                FICA MOBILE
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-4 text-lg font-medium text-marine">
                Contact
              </Link>
            </li>
          </ul>
          <Link href="/ouverture-de-compte" className="bouton bouton-principal mt-6 w-full">
            Ouvrir un compte
          </Link>
        </nav>
      </div>
    </div>
  );
}
