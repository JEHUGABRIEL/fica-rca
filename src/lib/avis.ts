import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { assurerSchema, baseDisponible, sql } from "./db";

/* Avis clients. Un avis déposé sur le site reste « en attente » jusqu'à sa
   validation dans le back-office (/admin) ; seuls les avis publiés sont
   visibles des visiteurs. */

export const TAG_AVIS = "avis";

export type AvisPublie = {
  id: number;
  nom: string;
  profil: string;
  produit: string;
  texte: string;
  date: string;
};

/** Avis publiés, du plus récent au plus ancien. Mis en cache dans la page
    statique ; le cache est vidé à chaque modération (tag `avis`). */
export async function avisPublies(): Promise<AvisPublie[]> {
  "use cache";
  cacheTag(TAG_AVIS);
  cacheLife("hours");

  if (!baseDisponible()) return [];
  try {
    await assurerSchema();
    const lignes = await sql()`
      select id, nom, profil, produit, texte, coalesce(publie_le, cree_le) as date
      from avis where statut = 'publie'
      order by coalesce(publie_le, cree_le) desc
      limit 200`;
    return lignes.map((l) => ({
      id: Number(l.id),
      nom: String(l.nom),
      profil: String(l.profil),
      produit: String(l.produit),
      texte: String(l.texte),
      date: new Date(l.date as string).toISOString(),
    }));
  } catch (erreur) {
    console.error("[avis] lecture impossible :", erreur);
    return [];
  }
}
