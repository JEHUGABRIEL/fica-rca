import "server-only";
import { createHash } from "node:crypto";

/* Téléversement direct du navigateur vers Cloudinary, signé côté serveur :
   le secret API ne quitte jamais le serveur et les fichiers ne transitent
   pas par Vercel (pas de limite de taille de requête). */

export const DOSSIER_CLOUDINARY = "fica-rca";

export function cloudinaryConfigure() {
  return Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
}

export type SignatureTeleversement = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
};

/** Signature valable une heure pour un envoi dans `fica-rca/<sousDossier>`. */
export function signerTeleversement(sousDossier: string): SignatureTeleversement {
  if (!cloudinaryConfigure()) throw new Error("Cloudinary n'est pas configuré (CLOUDINARY_*).");
  const folder = `${DOSSIER_CLOUDINARY}/${sousDossier.replace(/[^a-z0-9-]/gi, "")}`;
  const timestamp = Math.floor(Date.now() / 1000);
  // Paramètres triés par ordre alphabétique, puis le secret (spécification Cloudinary).
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
    .digest("hex");
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    timestamp,
    folder,
    signature,
  };
}
