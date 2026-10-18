import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { BoutonConfirmer } from "@/components/admin/bouton-confirmer";
import { TeleversementGalerie } from "@/components/admin/televersement-galerie";
import { exigerAdmin } from "@/lib/auth";
import { assurerSchema, sql } from "@/lib/db";
import { basculerPhoto, descendrePhoto, modifierLegende, monterPhoto, supprimerPhoto } from "../../actions";
import { Chargement, EnTetePage, PastilleStatut } from "../en-tete-page";

export const metadata: Metadata = { title: "Médiathèque" };

async function Grille() {
  await exigerAdmin();
  await assurerSchema();
  const photos = await sql()`select id, publiee, image_url, legende from galerie order by position, id`;

  return (
    <div className="mt-8 space-y-8">
      <TeleversementGalerie />
      {photos.length === 0 ? (
        <p className="text-gris">Aucune photo.</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {photos.map((p, i) => (
            <li key={p.id} className="border border-filet bg-white">
              <div className="relative aspect-[4/3] bg-gris-clair">
                <Image src={p.image_url} alt={p.legende} fill sizes="(min-width: 1280px) 25vw, 50vw" className={`object-cover ${p.publiee ? "" : "opacity-40"}`} />
                <span className="absolute left-2 top-2">
                  <PastilleStatut actif={p.publiee} oui="Visible" non="Masquée" />
                </span>
              </div>
              <div className="space-y-3 p-4">
                <form action={modifierLegende.bind(null, p.id)} className="flex gap-2">
                  <label className="sr-only" htmlFor={`legende-${p.id}`}>Légende</label>
                  <input id={`legende-${p.id}`} name="legende" defaultValue={p.legende} maxLength={200} placeholder="Légende de la photo" className="champ !py-1.5 text-sm" />
                  <button type="submit" className="bouton bouton-secondaire !px-3 !py-1.5 text-sm">OK</button>
                </form>
                <div className="flex flex-wrap items-center gap-2">
                  <form action={monterPhoto.bind(null, p.id)}>
                    <button type="submit" disabled={i === 0} aria-label="Déplacer avant" className="grid size-8 place-items-center border border-filet disabled:opacity-30">
                      <ArrowLeft className="size-4" aria-hidden />
                    </button>
                  </form>
                  <form action={descendrePhoto.bind(null, p.id)}>
                    <button type="submit" disabled={i === photos.length - 1} aria-label="Déplacer après" className="grid size-8 place-items-center border border-filet disabled:opacity-30">
                      <ArrowRight className="size-4" aria-hidden />
                    </button>
                  </form>
                  <form action={basculerPhoto.bind(null, p.id)}>
                    <button type="submit" className="bouton bouton-secondaire !px-3 !py-1.5 text-sm">
                      {p.publiee ? "Masquer" : "Afficher"}
                    </button>
                  </form>
                  <BoutonConfirmer action={supprimerPhoto.bind(null, p.id)} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PageMediathequeAdmin() {
  return (
    <>
      <EnTetePage titre="Médiathèque" description="Les photos visibles apparaissent sur la page Médiathèque, dans cet ordre." />
      <Suspense fallback={<Chargement />}>
        <Grille />
      </Suspense>
    </>
  );
}
