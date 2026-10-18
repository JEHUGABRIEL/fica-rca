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
  /** Avis d'exemple, affiché tant qu'aucun vrai avis n'est publié. */
  exemple?: boolean;
};

/* Avis d'EXEMPLE, signalés comme tels sur le site. Ils n'apparaissent que
   tant qu'aucun avis réel n'est publié, et disparaissent dès la première
   publication dans le back-office. Profils génériques (pas de noms de
   personnes) et aucun chiffre ni engagement que la FICA n'aurait pas pris. */
export const avisExemples: AvisPublie[] = [
  {
    id: -1,
    nom: "Cliente particulière",
    profil: "Commerçante, Bangui",
    produit: "FICA MOBILE",
    texte:
      "Je consulte mon solde et j'envoie de l'argent vers Orange Money depuis mon téléphone, même sans connexion internet. C'est pratique quand je suis au marché.",
    date: "",
    exemple: true,
  },
  {
    id: -2,
    nom: "Client professionnel",
    profil: "Gérant d'une PME",
    produit: "Attestation",
    texte:
      "Pour un appel d'offres, j'avais besoin d'une attestation de capacité financière. Le conseiller m'a aidé à constituer le dossier et le document était prêt dans les temps.",
    date: "",
    exemple: true,
  },
  {
    id: -3,
    nom: "Client retraité",
    profil: "Retraité",
    produit: "Paiement de pension",
    texte:
      "Le calendrier de paiement est communiqué à l'avance et l'accueil à l'agence est attentionné. Je sais quand venir et je suis bien reçu.",
    date: "",
    exemple: true,
  },
];

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
