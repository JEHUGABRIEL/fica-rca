"use client";

import { signatureTeleversement } from "@/app/admin/actions";

export type ImageTeleversee = { url: string; largeur: number; hauteur: number };

const TAILLE_MAX = 10 * 1024 * 1024;

/** Envoie une image du navigateur vers Cloudinary avec une signature du serveur. */
export async function televerser(fichier: File, sousDossier: "carrousel" | "actualites" | "galerie"): Promise<ImageTeleversee> {
  if (!fichier.type.startsWith("image/")) throw new Error(`« ${fichier.name} » n'est pas une image.`);
  if (fichier.size > TAILLE_MAX) throw new Error(`« ${fichier.name} » dépasse 10 Mo.`);

  const s = await signatureTeleversement(sousDossier);
  const corps = new FormData();
  corps.append("file", fichier);
  corps.append("api_key", s.apiKey);
  corps.append("timestamp", String(s.timestamp));
  corps.append("folder", s.folder);
  corps.append("signature", s.signature);

  const reponse = await fetch(`https://api.cloudinary.com/v1_1/${s.cloudName}/image/upload`, { method: "POST", body: corps });
  const resultat = await reponse.json();
  if (!reponse.ok) throw new Error(resultat?.error?.message ?? "Échec du téléversement.");
  return { url: resultat.secure_url, largeur: resultat.width, hauteur: resultat.height };
}
