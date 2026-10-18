import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AppelAction, BandeauPage } from "@/components/blocs";
import { IconeUnivers } from "@/components/icone-univers";
import { lienProduit, univers } from "@/lib/services";

export const metadata: Metadata = {
  title: "Nos services",
  description: "Comptes, crédits, engagements par signature, paiements, attestations et services au quotidien de la FICA.",
  alternates: { canonical: "/services" },
};

export default function PageServices() {
  return (
    <>
      <BandeauPage
        titre="Nos services"
        introduction="Toute l'offre de la Financière de Centrafrique, pour les particuliers, les entreprises et les institutions."
        miettes={[{ libelle: "Nos services" }]}
      />
      <div className="conteneur grid gap-6 py-16 md:py-24 lg:grid-cols-2">
        {univers.map((u) => (
          <section key={u.slug} className="carte flex flex-col p-7 md:p-9">
            <div className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-xl bg-ciel text-bleu">
                <IconeUnivers cle={u.icone} className="size-6" />
              </span>
              <h2 className="text-2xl font-bold">{u.nom}</h2>
            </div>
            <p className="mt-4 text-gris">{u.accroche}</p>
            <ul className="mt-6 flex-1 divide-y divide-bordure border-y border-bordure">
              {u.produits.map((p) => (
                <li key={p.slug}>
                  <Link href={lienProduit(u, p)} className="group flex items-center justify-between gap-4 py-3 text-[0.95rem] font-medium text-marine hover:text-bleu">
                    {p.nom}
                    <ArrowRight className="size-4 shrink-0 text-gris transition-transform group-hover:translate-x-1 group-hover:text-bleu" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/services/${u.slug}`} className="mt-6 inline-flex items-center gap-1.5 font-semibold text-bleu">
              Voir l&apos;univers {u.nomCourt.toLowerCase()}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </section>
        ))}
      </div>
      <AppelAction />
    </>
  );
}
