import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChampImage } from "@/components/admin/champ-image";
import { ChampPhotos } from "@/components/admin/champ-photos";
import { FormulaireAdmin } from "@/components/admin/formulaire-admin";
import { exigerAdmin } from "@/lib/auth";
import { assurerSchema, sql } from "@/lib/db";
import { enregistrerActualite } from "../../../actions";
import { Chargement, EnTetePage } from "../../en-tete-page";

export const metadata: Metadata = { title: "Actualité" };

const libelle = "mb-1.5 block text-sm font-medium text-marine";
const categories = ["Communiqué", "Activité", "Prestations sociales", "Produit", "Événement"];

async function Formulaire({ params }: { params: Promise<{ id: string }> }) {
  await exigerAdmin();
  const { id } = await params;
  let a: Record<string, unknown> = { publiee: true, categorie: "Communiqué", photos: [] };
  if (id !== "nouveau") {
    await assurerSchema();
    const [ligne] = await sql()`select * from actualites where id = ${Number(id) || 0}`;
    if (!ligne) notFound();
    a = { ...ligne, date: new Date(ligne.date).toISOString().slice(0, 10) };
  }
  const v = (cle: string) => String(a[cle] ?? "");

  return (
    <div className="mt-8 max-w-3xl">
      <FormulaireAdmin action={enregistrerActualite} retour="/admin/actualites">
        {a.id ? <input type="hidden" name="id" value={String(a.id)} /> : null}
        <div>
          <label htmlFor="titre" className={libelle}>Titre *</label>
          <input id="titre" name="titre" defaultValue={v("titre")} maxLength={200} className="champ" />
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="date" className={libelle}>Date *</label>
            <input id="date" name="date" type="date" defaultValue={v("date")} className="champ" />
          </div>
          <div>
            <label htmlFor="categorie" className={libelle}>Catégorie</label>
            <input id="categorie" name="categorie" list="categories" defaultValue={v("categorie")} maxLength={60} className="champ" />
            <datalist id="categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="slug" className={libelle}>Adresse de la page</label>
            <input id="slug" name="slug" defaultValue={v("slug")} maxLength={100} placeholder="générée depuis le titre" className="champ" />
          </div>
        </div>
        <div>
          <label htmlFor="resume" className={libelle}>Résumé * (affiché dans les listes)</label>
          <textarea id="resume" name="resume" defaultValue={v("resume")} maxLength={400} rows={2} className="champ" />
        </div>
        <ChampImage nom="image_url" libelle="Image principale *" valeurInitiale={v("image_url")} sousDossier="actualites" />
        <div>
          <label htmlFor="corps" className={libelle}>Texte de l&apos;article</label>
          <textarea id="corps" name="corps" defaultValue={v("corps")} rows={12} className="champ font-mono text-sm" />
          <p className="mt-1 text-xs text-gris">
            Séparez les paragraphes par une ligne vide. Pour une liste, commencez chaque ligne par « - ».
          </p>
        </div>
        <ChampPhotos nom="photos" valeursInitiales={(a.photos as string[]) ?? []} />
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" name="publiee" defaultChecked={a.publiee !== false} className="size-4 accent-bleu" />
          Publier cette actualité sur le site
        </label>
      </FormulaireAdmin>
    </div>
  );
}

export default function PageActualiteAdmin({ params }: PageProps<"/admin/actualites/[id]">) {
  return (
    <>
      <EnTetePage titre="Actualité" />
      <Suspense fallback={<Chargement />}>
        <Formulaire params={params} />
      </Suspense>
    </>
  );
}
