import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Produit } from "@/lib/services";

/* Liste d'offres en tableau : nom, accroche, point clé. */
export function ListeOffres({ offres }: { offres: { produit: Produit; href: string }[] }) {
  return (
    <ul className="border-t border-marine">
      {offres.map(({ produit, href }) => (
        <li key={href} className="border-b border-filet">
          <Link href={href} className="group grid gap-1 py-5 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
            <span>
              <span className="block text-lg font-semibold text-marine group-hover:text-bleu group-hover:underline">{produit.nom}</span>
              <span className="mt-1 block text-gris">{produit.accroche}</span>
            </span>
            <span className="flex items-center gap-6">
              {produit.pointsCles?.[0] && (
                <span className="text-sm md:text-right">
                  <span className="block text-gris">{produit.pointsCles[0].libelle}</span>
                  <span className="font-semibold text-marine">{produit.pointsCles[0].valeur}</span>
                </span>
              )}
              <ArrowRight className="hidden size-5 text-bleu transition-transform group-hover:translate-x-1 md:block" aria-hidden />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
