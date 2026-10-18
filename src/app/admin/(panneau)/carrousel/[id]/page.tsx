import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChampImage } from "@/components/admin/champ-image";
import { FormulaireAdmin } from "@/components/admin/formulaire-admin";
import { exigerAdmin } from "@/lib/auth";
import { assurerSchema, sql } from "@/lib/db";
import { enregistrerDiapositive } from "../../../actions";
import { Chargement, EnTetePage } from "../../en-tete-page";

export const metadata: Metadata = { title: "Diapositive" };

const libelle = "mb-1.5 block text-sm font-medium text-marine";

async function Formulaire({ params }: { params: Promise<{ id: string }> }) {
  await exigerAdmin();
  const { id } = await params;
  let d: Record<string, unknown> = { publiee: true, cadrage: "center" };
  if (id !== "nouveau") {
    await assurerSchema();
    const [ligne] = await sql()`select * from diapositives where id = ${Number(id) || 0}`;
    if (!ligne) notFound();
    d = ligne;
  }
  const v = (cle: string) => String(d[cle] ?? "");

  return (
    <div className="mt-8 max-w-3xl">
      <FormulaireAdmin action={enregistrerDiapositive} retour="/admin/carrousel">
        {d.id ? <input type="hidden" name="id" value={String(d.id)} /> : null}
        <ChampImage nom="image_url" libelle="Photo (format paysage, 1 600 px de large conseillés)" valeurInitiale={v("image_url")} sousDossier="carrousel" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="rubrique" className={libelle}>Rubrique *</label>
            <input id="rubrique" name="rubrique" defaultValue={v("rubrique")} maxLength={40} placeholder="Ex. : Particuliers" className="champ" />
          </div>
          <div>
            <label htmlFor="cadrage" className={libelle}>Cadrage de la photo</label>
            <input id="cadrage" name="cadrage" defaultValue={v("cadrage")} maxLength={40} placeholder="center ou 60% 40%" className="champ" />
            <p className="mt-1 text-xs text-gris">Position horizontale puis verticale du point à garder visible.</p>
          </div>
        </div>
        <div>
          <label htmlFor="titre" className={libelle}>Titre *</label>
          <input id="titre" name="titre" defaultValue={v("titre")} maxLength={120} className="champ" />
        </div>
        <div>
          <label htmlFor="texte" className={libelle}>Texte</label>
          <textarea id="texte" name="texte" defaultValue={v("texte")} maxLength={300} rows={3} className="champ" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="action_libelle" className={libelle}>Texte du bouton *</label>
            <input id="action_libelle" name="action_libelle" defaultValue={v("action_libelle")} maxLength={40} placeholder="Ex. : Ouvrir un compte" className="champ" />
          </div>
          <div>
            <label htmlFor="action_href" className={libelle}>Lien du bouton *</label>
            <input id="action_href" name="action_href" defaultValue={v("action_href")} maxLength={200} placeholder="/ouverture-de-compte" className="champ" />
          </div>
        </div>
        <div>
          <label htmlFor="alt" className={libelle}>Description de la photo (accessibilité)</label>
          <input id="alt" name="alt" defaultValue={v("alt")} maxLength={200} className="champ" />
        </div>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" name="publiee" defaultChecked={d.publiee !== false} className="size-4 accent-bleu" />
          Afficher cette diapositive sur l&apos;accueil
        </label>
      </FormulaireAdmin>
    </div>
  );
}

export default function PageDiapositive({ params }: PageProps<"/admin/carrousel/[id]">) {
  return (
    <>
      <EnTetePage titre="Diapositive du carrousel" />
      <Suspense fallback={<Chargement />}>
        <Formulaire params={params} />
      </Suspense>
    </>
  );
}
