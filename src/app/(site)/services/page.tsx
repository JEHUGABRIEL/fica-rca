import type { Metadata } from "next";
import Link from "next/link";
import { BandeauContact, BandeauPage } from "@/components/blocs";
import { lienProduit, univers } from "@/lib/services";

export const metadata: Metadata = {
  title: "Toutes nos offres",
  description: "Comptes, crédits, engagements par signature, paiements, attestations et services au quotidien de la FICA.",
  alternates: { canonical: "/services" },
};

export default function PageServices() {
  return (
    <>
      <BandeauPage
        titre="Toutes nos offres"
        introduction="L'ensemble des produits et services de la Financière de Centrafrique, classés par famille."
        miettes={[{ libelle: "Toutes nos offres" }]}
      />
      <div className="conteneur grid gap-x-12 gap-y-14 py-14 md:grid-cols-2 md:py-16 lg:grid-cols-3">
        {univers.map((u) => (
          <section key={u.slug}>
            <h2 className="border-b border-marine pb-3 text-xl">
              <Link href={`/services/${u.slug}`} className="hover:text-bleu hover:underline">
                {u.nom}
              </Link>
            </h2>
            <ul className="mt-3 space-y-2">
              {u.produits.map((p) => (
                <li key={p.slug}>
                  <Link href={lienProduit(u, p)} className="text-encre/85 hover:text-bleu hover:underline">
                    {p.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <BandeauContact />
    </>
  );
}
