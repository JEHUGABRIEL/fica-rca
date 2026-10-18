import Image from "next/image";
import Link from "next/link";
import { formaterDate, type Actualite } from "@/lib/institution";

export function CarteActualite({ actualite }: { actualite: Actualite }) {
  return (
    <Link href={`/actualites/${actualite.slug}`} className="carte group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-gris-clair">
        <Image
          src={actualite.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <span className="text-bleu">{actualite.categorie}</span>
          <span className="text-bordure">•</span>
          <time dateTime={actualite.date} className="text-gris">
            {formaterDate(actualite.date)}
          </time>
        </p>
        <h3 className="mt-3 text-lg font-bold group-hover:text-bleu">{actualite.titre}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-gris">{actualite.resume}</p>
      </div>
    </Link>
  );
}
