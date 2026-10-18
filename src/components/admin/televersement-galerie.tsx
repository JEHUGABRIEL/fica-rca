"use client";

import { ImagePlus, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { ajouterPhotos } from "@/app/admin/actions";
import { televerser, type ImageTeleversee } from "./televerser";

/* Ajout de plusieurs photos à la médiathèque en une fois. */
export function TeleversementGalerie() {
  const id = useId();
  const router = useRouter();
  const [progression, setProgression] = useState<{ fait: number; total: number } | null>(null);
  const [erreurs, setErreurs] = useState<string[]>([]);

  async function envoyer(fichiers: FileList | null) {
    if (!fichiers?.length) return;
    const liste = [...fichiers];
    setErreurs([]);
    setProgression({ fait: 0, total: liste.length });
    const reussies: (ImageTeleversee & { legende: string })[] = [];
    for (const fichier of liste) {
      try {
        const image = await televerser(fichier, "galerie");
        reussies.push({ ...image, legende: "" });
      } catch (e) {
        setErreurs((x) => [...x, e instanceof Error ? e.message : `Échec : ${fichier.name}`]);
      }
      setProgression((p) => p && { ...p, fait: p.fait + 1 });
    }
    if (reussies.length) await ajouterPhotos(reussies);
    setProgression(null);
    router.refresh();
  }

  return (
    <div className="border border-dashed border-gris/50 bg-white p-6 text-center">
      <label htmlFor={id} className="bouton bouton-principal cursor-pointer">
        {progression ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <ImagePlus className="size-4" aria-hidden />}
        {progression ? `Envoi ${progression.fait} / ${progression.total}…` : "Ajouter des photos"}
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        disabled={!!progression}
        onChange={(e) => {
          envoyer(e.target.files);
          e.target.value = "";
        }}
      />
      <p className="mt-3 text-sm text-gris">Sélectionnez une ou plusieurs images (10 Mo maximum chacune). Ajoutez ensuite une légende à chaque photo.</p>
      {erreurs.length > 0 && (
        <ul role="alert" className="mt-3 text-sm text-rouge">
          {erreurs.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
