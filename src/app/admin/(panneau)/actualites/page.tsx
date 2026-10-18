import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { BoutonConfirmer } from "@/components/admin/bouton-confirmer";
import { exigerAdmin } from "@/lib/auth";
import { assurerSchema, sql } from "@/lib/db";
import { formaterDate } from "@/lib/institution";
import { basculerActualite, supprimerActualite } from "../../actions";
import { Chargement, EnTetePage, PastilleStatut } from "../en-tete-page";

export const metadata: Metadata = { title: "Actualités" };

async function Liste() {
  await exigerAdmin();
  await assurerSchema();
  const lignes = await sql()`select id, slug, titre, date, categorie, image_url, publiee from actualites order by date desc, id desc`;
  if (!lignes.length) return <p className="mt-8 text-gris">Aucune actualité.</p>;

  return (
    <ul className="mt-8 border-t border-marine bg-white">
      {lignes.map((a) => (
        <li key={a.id} className="grid gap-5 border-b border-filet p-5 md:grid-cols-[8rem_1fr_auto] md:items-center">
          <div className="relative aspect-[3/2] overflow-hidden bg-gris-clair">
            {a.image_url && <Image src={a.image_url} alt="" fill sizes="128px" className="object-cover" />}
          </div>
          <div>
            <p className="text-sm text-gris">
              {a.categorie} · {formaterDate(new Date(a.date).toISOString())} · <PastilleStatut actif={a.publiee} />
            </p>
            <p className="mt-1 font-semibold text-marine">{a.titre}</p>
            <p className="text-sm text-gris">/actualites/{a.slug}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            {a.publiee && (
              <Link href={`/actualites/${a.slug}`} target="_blank" className="text-sm text-bleu hover:underline">
                Voir
              </Link>
            )}
            <Link href={`/admin/actualites/${a.id}`} className="bouton bouton-secondaire !px-3 !py-1.5 text-sm">
              Modifier
            </Link>
            <form action={basculerActualite.bind(null, a.id)}>
              <button type="submit" className="bouton bouton-secondaire !px-3 !py-1.5 text-sm">
                {a.publiee ? "Masquer" : "Publier"}
              </button>
            </form>
            <BoutonConfirmer action={supprimerActualite.bind(null, a.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function PageActualitesAdmin() {
  return (
    <>
      <EnTetePage
        titre="Actualités"
        description="Les actualités publiées apparaissent sur l'accueil et la page Actualités, de la plus récente à la plus ancienne."
        action={{ libelle: "Nouvelle actualité", href: "/admin/actualites/nouveau" }}
      />
      <Suspense fallback={<Chargement />}>
        <Liste />
      </Suspense>
    </>
  );
}
