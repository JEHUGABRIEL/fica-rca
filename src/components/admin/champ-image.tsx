"use client";

import { ImagePlus, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { televerser } from "./televerser";

/* Champ image d'un formulaire du back-office : l'image est envoyée sur
   Cloudinary dès sa sélection, et son URL part avec le formulaire. */
export function ChampImage({
  nom,
  libelle,
  valeurInitiale = "",
  sousDossier,
}: {
  nom: string;
  libelle: string;
  valeurInitiale?: string;
  sousDossier: "carrousel" | "actualites" | "galerie";
}) {
  const id = useId();
  const [url, setUrl] = useState(valeurInitiale);
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState("");

  async function choisir(fichier: File | undefined) {
    if (!fichier) return;
    setErreur("");
    setEnCours(true);
    try {
      setUrl((await televerser(fichier, sousDossier)).url);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Échec du téléversement.");
    } finally {
      setEnCours(false);
    }
  }

  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-marine">{libelle}</p>
      <input type="hidden" name={nom} value={url} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative aspect-[16/9] w-full max-w-xs shrink-0 overflow-hidden border border-filet bg-gris-clair">
          {url ? (
            <Image src={url} alt="" fill sizes="320px" className="object-cover" />
          ) : (
            <span className="grid h-full place-items-center text-sm text-gris">Aucune image</span>
          )}
          {enCours && (
            <span className="absolute inset-0 grid place-items-center bg-white/70">
              <LoaderCircle className="size-6 animate-spin text-bleu" aria-hidden />
            </span>
          )}
        </div>
        <div className="space-y-2 text-sm">
          <label htmlFor={id} className="bouton bouton-secondaire cursor-pointer !py-2">
            <ImagePlus className="size-4" aria-hidden />
            {url ? "Remplacer l'image" : "Choisir une image"}
          </label>
          <input
            id={id}
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={enCours}
            onChange={(e) => {
              choisir(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <p className="text-gris">JPG, PNG ou WebP, 10 Mo maximum.</p>
          {erreur && (
            <p role="alert" className="text-rouge">
              {erreur}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
