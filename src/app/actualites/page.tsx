import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BandeauPage } from "@/components/blocs";
import { actualites, formaterDate } from "@/lib/institution";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Communiqués, activités et prestations sociales : l'actualité de la Financière de Centrafrique.",
  alternates: { canonical: "/actualites" },
};

export default function PageActualites() {
  const triees = [...actualites].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <BandeauPage titre="Actualités" introduction="Communiqués et activités de la Financière de Centrafrique." miettes={[{ libelle: "Actualités" }]} />
      <div className="conteneur max-w-5xl py-14 md:py-16">
        <ul className="border-t border-marine">
          {triees.map((a) => (
            <li key={a.slug} className="border-b border-filet">
              <Link href={`/actualites/${a.slug}`} className="group grid gap-6 py-8 sm:grid-cols-[16rem_1fr]">
                <div className="relative aspect-[3/2] overflow-hidden bg-gris-clair">
                  <Image src={a.image} alt="" fill sizes="(min-width: 640px) 256px, 100vw" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm text-gris">
                    {a.categorie} · <time dateTime={a.date}>{formaterDate(a.date)}</time>
                  </p>
                  <h2 className="mt-2 text-xl group-hover:text-bleu group-hover:underline">{a.titre}</h2>
                  <p className="mt-2 text-gris">{a.resume}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
