"use client";

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconeUnivers } from "@/components/icone-univers";
import type { CleIcone } from "@/lib/services";
import type { LienNav } from "@/lib/site";

export type MenuServices = {
  slug: string;
  nom: string;
  icone: CleIcone;
  accroche: string;
  produits: { nom: string; href: string }[];
  total: number;
}[];

type Panneau = "services" | "institution" | null;

export function Navigation({
  menuServices,
  menuInstitution,
}: {
  menuServices: MenuServices;
  menuInstitution: LienNav[];
}) {
  const [panneau, setPanneau] = useState<Panneau>(null);
  const [mobileOuvert, setMobileOuvert] = useState(false);
  const pathname = usePathname();
  const racine = useRef<HTMLDivElement>(null);

  // Referme tout menu ouvert après une navigation.
  const [cheminPrecedent, setCheminPrecedent] = useState(pathname);
  if (pathname !== cheminPrecedent) {
    setCheminPrecedent(pathname);
    setPanneau(null);
    setMobileOuvert(false);
  }

  useEffect(() => {
    function fermerSurEchap(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPanneau(null);
        setMobileOuvert(false);
      }
    }
    function fermerSurClicExterieur(e: MouseEvent) {
      if (racine.current && !racine.current.contains(e.target as Node)) setPanneau(null);
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

  const actif = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const basculer = (p: Exclude<Panneau, null>) => setPanneau((courant) => (courant === p ? null : p));

  const classeLien = (estActif: boolean) =>
    `relative flex items-center gap-1 rounded-md px-3 py-2 text-[0.92rem] font-semibold transition-colors ${
      estActif ? "text-bleu" : "text-marine hover:text-bleu"
    }`;

  return (
    <div ref={racine} className="flex items-center gap-2">
      <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
        <button
          type="button"
          className={classeLien(actif("/la-fica") || panneau === "institution")}
          aria-expanded={panneau === "institution"}
          aria-controls="panneau-institution"
          onClick={() => basculer("institution")}
        >
          La FICA
          <ChevronDown className={`size-4 transition-transform ${panneau === "institution" ? "rotate-180" : ""}`} aria-hidden />
        </button>
        <button
          type="button"
          className={classeLien(actif("/services") || panneau === "services")}
          aria-expanded={panneau === "services"}
          aria-controls="panneau-services"
          onClick={() => basculer("services")}
        >
          Nos services
          <ChevronDown className={`size-4 transition-transform ${panneau === "services" ? "rotate-180" : ""}`} aria-hidden />
        </button>
        <Link href="/fica-mobile" className={classeLien(actif("/fica-mobile"))}>
          FICA MOBILE
        </Link>
        <Link href="/actualites" className={classeLien(actif("/actualites"))}>
          Actualités
        </Link>
        <Link href="/contact" className={classeLien(actif("/contact"))}>
          Contact
        </Link>
      </nav>

      <Link href="/ouverture-de-compte" className="bouton bouton-principal hidden !py-2.5 sm:inline-flex">
        Ouvrir un compte
      </Link>

      <button
        type="button"
        className="grid size-11 place-items-center rounded-lg text-marine ring-1 ring-bordure lg:hidden"
        aria-label={mobileOuvert ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={mobileOuvert}
        aria-controls="menu-mobile"
        onClick={() => setMobileOuvert((o) => !o)}
      >
        {mobileOuvert ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* --- Méga-menu « Nos services » (bureau) --- */}
      <div
        id="panneau-services"
        hidden={panneau !== "services"}
        className="absolute inset-x-0 top-full hidden border-b border-bordure bg-white shadow-[0_24px_48px_-24px_rgb(10_27_63/0.3)] lg:block"
      >
        <div className="conteneur grid grid-cols-3 gap-x-8 gap-y-6 py-8">
          {menuServices.map((u) => (
            <div key={u.slug} className="group">
              <Link href={`/services/${u.slug}`} className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-ciel text-bleu transition-colors group-hover:bg-bleu group-hover:text-white">
                  <IconeUnivers cle={u.icone} className="size-5" />
                </span>
                <span>
                  <span className="block font-titre font-bold text-marine group-hover:text-bleu">{u.nom}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-gris">{u.accroche}</span>
                </span>
              </Link>
              <ul className="mt-3 space-y-1.5 pl-[3.25rem] text-sm">
                {u.produits.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="text-encre/80 hover:text-bleu">
                      {p.nom}
                    </Link>
                  </li>
                ))}
                {u.total > u.produits.length && (
                  <li>
                    <Link href={`/services/${u.slug}`} className="inline-flex items-center gap-1 font-semibold text-bleu">
                      Voir les {u.total} offres <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* --- Menu « La FICA » (bureau) --- */}
      <div
        id="panneau-institution"
        hidden={panneau !== "institution"}
        className="absolute inset-x-0 top-full hidden border-b border-bordure bg-white shadow-[0_24px_48px_-24px_rgb(10_27_63/0.3)] lg:block"
      >
        <div className="conteneur grid grid-cols-4 gap-6 py-8">
          {menuInstitution.map((l) => (
            <Link key={l.href} href={l.href} className="group rounded-xl p-4 transition-colors hover:bg-ciel">
              <span className="flex items-center gap-1.5 font-titre font-bold text-marine group-hover:text-bleu">
                {l.libelle}
                <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
              </span>
              <span className="mt-1 block text-sm text-gris">{l.description}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* --- Menu mobile --- */}
      <div
        id="menu-mobile"
        hidden={!mobileOuvert}
        className="fixed inset-x-0 bottom-0 top-[4.75rem] overflow-y-auto md:top-[7.25rem] border-t border-bordure bg-white lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="conteneur space-y-8 py-6 pb-16">
          <div>
            <p className="surtitre">Nos services</p>
            <ul className="mt-3 grid gap-1">
              {menuServices.map((u) => (
                <li key={u.slug}>
                  <Link href={`/services/${u.slug}`} className="flex items-center gap-3 rounded-lg px-2 py-2.5 font-semibold text-marine hover:bg-ciel">
                    <IconeUnivers cle={u.icone} className="size-5 text-bleu" />
                    {u.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="surtitre">La FICA</p>
            <ul className="mt-3 grid gap-1">
              {menuInstitution.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block rounded-lg px-2 py-2.5 font-semibold text-marine hover:bg-ciel">
                    {l.libelle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-1 border-t border-bordure pt-6">
            {[
              { libelle: "FICA MOBILE", href: "/fica-mobile" },
              { libelle: "Actualités", href: "/actualites" },
              { libelle: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-lg px-2 py-2.5 font-semibold text-marine hover:bg-ciel">
                  {l.libelle}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/ouverture-de-compte" className="bouton bouton-principal w-full">
            Ouvrir un compte
          </Link>
        </nav>
      </div>
    </div>
  );
}
