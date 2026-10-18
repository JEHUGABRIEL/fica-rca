import Image from "next/image";
import Link from "next/link";
import { formaterDate, type Actualite } from "@/lib/institution";

export function CarteActualite({ actualite }: { actualite: Actualite }) {
  return (
    <article>
      <Link href={`/actualites/${actualite.slug}`} className="group block">
        <div className="relative aspect-[3/2] overflow-hidden bg-gris-clair">
          <Image
            src={actualite.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <p className="mt-4 text-sm text-gris">
          {actualite.categorie} · <time dateTime={actualite.date}>{formaterDate(actualite.date)}</time>
        </p>
        <h3 className="mt-1.5 text-lg leading-snug group-hover:text-bleu group-hover:underline">{actualite.titre}</h3>
        <p className="mt-2 line-clamp-3 text-[0.95rem] text-gris">{actualite.resume}</p>
      </Link>
    </article>
  );
}
