"use client";

import { ImagePlus, LoaderCircle, X } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { televerser } from "./televerser";

/* Photos complémentaires d'une actualité (galerie en bas d'article). */
export function ChampPhotos({ nom, valeursInitiales = [] }: { nom: string; valeursInitiales?: string[] }) {
  const id = useId();
  const [photos, setPhotos] = useState(valeursInitiales);
  const [enCours, setEnCours] = useState(0);
  const [erreur, setErreur] = useState("");

  async function ajouter(fichiers: FileList | null) {
    if (!fichiers?.length) return;
    setErreur("");
    const liste = [...fichiers].slice(0, 12 - photos.length);
    setEnCours(liste.length);
    for (const fichier of liste) {
      try {
        const { url } = await televerser(fichier, "actualites");
        setPhotos((p) => [...p, url]);
      } catch (e) {
        setErreur(e instanceof Error ? e.message : "Échec du téléversement.");
      } finally {
        setEnCours((n) => n - 1);
      }
    }
  }

  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-marine">Photos en bas d&apos;article (facultatif, 12 maximum)</p>
      {photos.map((p) => (
        <input key={p} type="hidden" name={nom} value={p} />
      ))}
      <ul className="flex flex-wrap gap-3">
        {photos.map((p) => (
          <li key={p} className="relative size-28 overflow-hidden border border-filet bg-gris-clair">
            <Image src={p} alt="" fill sizes="112px" className="object-cover" />
            <button
              type="button"
              onClick={() => setPhotos((liste) => liste.filter((x) => x !== p))}
              aria-label="Retirer cette photo"
              className="absolute right-1 top-1 grid size-7 place-items-center bg-white/90 text-rouge hover:bg-white"
            >
              <X className="size-4" aria-hidden />
            </button>
          </li>
        ))}
        {Array.from({ length: enCours }, (_, i) => (
          <li key={`chargement-${i}`} className="grid size-28 place-items-center border border-filet bg-gris-clair">
            <LoaderCircle className="size-5 animate-spin text-bleu" aria-hidden />
          </li>
        ))}
        {photos.length < 12 && (
          <li>
            <label
              htmlFor={id}
              className="grid size-28 cursor-pointer place-items-center border border-dashed border-gris/50 text-gris hover:border-bleu hover:text-bleu"
            >
              <span className="flex flex-col items-center gap-1 text-xs">
                <ImagePlus className="size-5" aria-hidden />
                Ajouter
              </span>
            </label>
            <input
              id={id}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => {
                ajouter(e.target.files);
                e.target.value = "";
              }}
            />
          </li>
        )}
      </ul>
      {erreur && (
        <p role="alert" className="mt-2 text-sm text-rouge">
          {erreur}
        </p>
      )}
    </div>
  );
}
