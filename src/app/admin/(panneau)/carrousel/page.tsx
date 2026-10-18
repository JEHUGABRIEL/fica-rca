import { ArrowDown, ArrowUp } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { BoutonConfirmer } from "@/components/admin/bouton-confirmer";
import { exigerAdmin } from "@/lib/auth";
import { assurerSchema, sql } from "@/lib/db";
import { basculerDiapositive, descendreDiapositive, monterDiapositive, supprimerDiapositive } from "../../actions";
import { Chargement, EnTetePage, PastilleStatut } from "../en-tete-page";

export const metadata: Metadata = { title: "Carrousel d'accueil" };

async function Liste() {
  await exigerAdmin();
  await assurerSchema();
  const lignes = await sql()`select id, position, publiee, image_url, cadrage, rubrique, titre, texte from diapositives order by position, id`;

  if (!lignes.length) return <p className="mt-8 text-gris">Aucune diapositive. L&apos;accueil affichera le carrousel de départ.</p>;

  return (
    <ol className="mt-8 border-t border-marine bg-white">
      {lignes.map((d, i) => (
        <li key={d.id} className="grid gap-5 border-b border-filet p-5 md:grid-cols-[12rem_1fr_auto] md:items-center">
          <div className="relative aspect-[16/9] overflow-hidden bg-gris-clair">
            <Image src={d.image_url} alt="" fill sizes="192px" className="object-cover" style={{ objectPosition: d.cadrage }} />
          </div>
          <div>
            <p className="text-sm text-gris">
              {i + 1}. {d.rubrique} · <PastilleStatut actif={d.publiee} />
            </p>
            <p className="mt-1 font-semibold text-marine">{d.titre}</p>
            <p className="mt-1 line-clamp-2 text-sm text-gris">{d.texte}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <form action={monterDiapositive.bind(null, d.id)}>
              <button type="submit" disabled={i === 0} aria-label="Monter" className="grid size-8 place-items-center border border-filet disabled:opacity-30">
                <ArrowUp className="size-4" aria-hidden />
              </button>
            </form>
            <form action={descendreDiapositive.bind(null, d.id)}>
              <button type="submit" disabled={i === lignes.length - 1} aria-label="Descendre" className="grid size-8 place-items-center border border-filet disabled:opacity-30">
                <ArrowDown className="size-4" aria-hidden />
              </button>
            </form>
            <Link href={`/admin/carrousel/${d.id}`} className="bouton bouton-secondaire !px-3 !py-1.5 text-sm">
              Modifier
            </Link>
            <form action={basculerDiapositive.bind(null, d.id)}>
              <button type="submit" className="bouton bouton-secondaire !px-3 !py-1.5 text-sm">
                {d.publiee ? "Masquer" : "Publier"}
              </button>
            </form>
            <BoutonConfirmer action={supprimerDiapositive.bind(null, d.id)} />
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function PageCarrousel() {
  return (
    <>
      <EnTetePage
        titre="Carrousel d'accueil"
        description="Les diapositives publiées défilent en haut de la page d'accueil, dans l'ordre ci-dessous."
        action={{ libelle: "Nouvelle diapositive", href: "/admin/carrousel/nouveau" }}
      />
      <Suspense fallback={<Chargement />}>
        <Liste />
      </Suspense>
    </>
  );
}
