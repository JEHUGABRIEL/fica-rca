"use server";

import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { exigerAdmin, fermerSession, motDePasseValide, ouvrirSession } from "@/lib/auth";
import { TAG_AVIS } from "@/lib/avis";
import { signerTeleversement } from "@/lib/cloudinary";
import { TAGS } from "@/lib/contenu";
import { assurerSchema, sql } from "@/lib/db";

export type EtatFormulaireAdmin = { erreur?: string };

const champ = (donnees: FormData, nom: string, max = 2000) => String(donnees.get(nom) ?? "").trim().slice(0, max);
const identifiant = (donnees: FormData) => {
  const id = Number(donnees.get("id"));
  return Number.isInteger(id) && id > 0 ? id : null;
};
/* Image : envoyée sur le compte Cloudinary de la FICA, ou image d'origine du site (/images/…). */
const imageValide = (url: string) =>
  !url.includes("..") &&
  (url.startsWith(`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`) ||
    /^\/images\/[\w./-]+$/.test(url));

async function pret() {
  await exigerAdmin();
  await assurerSchema();
  return sql();
}

/* ------------------------------------------------------------------ */
/* Session                                                             */
/* ------------------------------------------------------------------ */

export type EtatConnexion = { erreur?: string };

export async function seConnecter(_etat: EtatConnexion, donnees: FormData): Promise<EtatConnexion> {
  const motDePasse = String(donnees.get("mot_de_passe") ?? "");
  if (!motDePasseValide(motDePasse)) {
    // Ralentit les essais successifs de mots de passe.
    await new Promise((r) => setTimeout(r, 1200));
    return { erreur: "Mot de passe incorrect." };
  }
  await ouvrirSession();
  redirect("/admin");
}

export async function seDeconnecter() {
  await fermerSession();
  redirect("/admin/connexion");
}

/* ------------------------------------------------------------------ */
/* Téléversement Cloudinary                                            */
/* ------------------------------------------------------------------ */

export async function signatureTeleversement(sousDossier: "carrousel" | "actualites" | "galerie") {
  await exigerAdmin();
  return signerTeleversement(sousDossier);
}

/* ------------------------------------------------------------------ */
/* Avis clients                                                        */
/* ------------------------------------------------------------------ */

async function changerStatutAvis(id: number, statut: "publie" | "refuse" | "en_attente") {
  const db = await pret();
  await db`update avis
           set statut = ${statut},
               publie_le = case when ${statut} = 'publie' then coalesce(publie_le, now()) else null end
           where id = ${id}`;
  updateTag(TAG_AVIS);
}

export async function publierAvis(id: number) {
  await changerStatutAvis(id, "publie");
}

export async function refuserAvis(id: number) {
  await changerStatutAvis(id, "refuse");
}

export async function remettreEnAttente(id: number) {
  await changerStatutAvis(id, "en_attente");
}

export async function supprimerAvis(id: number) {
  const db = await pret();
  await db`delete from avis where id = ${id}`;
  updateTag(TAG_AVIS);
}

/* ------------------------------------------------------------------ */
/* Carrousel                                                           */
/* ------------------------------------------------------------------ */

export async function enregistrerDiapositive(_etat: EtatFormulaireAdmin, donnees: FormData): Promise<EtatFormulaireAdmin> {
  const db = await pret();
  const id = identifiant(donnees);
  const d = {
    image: champ(donnees, "image_url", 500),
    cadrage: champ(donnees, "cadrage", 40) || "center",
    alt: champ(donnees, "alt", 200),
    rubrique: champ(donnees, "rubrique", 40),
    titre: champ(donnees, "titre", 120),
    texte: champ(donnees, "texte", 300),
    actionLibelle: champ(donnees, "action_libelle", 40),
    actionHref: champ(donnees, "action_href", 200),
    publiee: donnees.get("publiee") === "on",
  };
  if (!imageValide(d.image)) return { erreur: "Ajoutez une photo." };
  if (d.titre.length < 3) return { erreur: "Le titre est obligatoire." };
  if (!d.rubrique) return { erreur: "La rubrique est obligatoire (ex. : Particuliers)." };
  if (!d.actionLibelle || !/^\/[\w\-/#?=&%.]*$/.test(d.actionHref)) {
    return { erreur: "Le bouton doit avoir un libellé et un lien interne commençant par « / »." };
  }
  if (!/^(\d{1,3}% \d{1,3}%|center|top|bottom|left|right)$/.test(d.cadrage)) {
    return { erreur: "Cadrage invalide (ex. : « 60% 40% » ou « center »)." };
  }

  if (id) {
    await db`update diapositives set image_url = ${d.image}, cadrage = ${d.cadrage}, alt = ${d.alt}, rubrique = ${d.rubrique},
             titre = ${d.titre}, texte = ${d.texte}, action_libelle = ${d.actionLibelle}, action_href = ${d.actionHref},
             publiee = ${d.publiee}, modifie_le = now() where id = ${id}`;
  } else {
    await db`insert into diapositives (position, publiee, image_url, cadrage, alt, rubrique, titre, texte, action_libelle, action_href)
             values ((select coalesce(max(position), -1) + 1 from diapositives), ${d.publiee}, ${d.image}, ${d.cadrage}, ${d.alt},
                     ${d.rubrique}, ${d.titre}, ${d.texte}, ${d.actionLibelle}, ${d.actionHref})`;
  }
  updateTag(TAGS.diapositives);
  redirect("/admin/carrousel");
}

/** Échange la position d'un élément avec son voisin (sens -1 : monter). */
async function deplacer(table: "diapositives" | "galerie", id: number, sens: -1 | 1) {
  const db = await pret();
  const lignes = (table === "diapositives"
    ? await db`select id, position from diapositives order by position, id`
    : await db`select id, position from galerie order by position, id`) as { id: number; position: number }[];
  const i = lignes.findIndex((l) => l.id === id);
  const j = i + sens;
  if (i < 0 || j < 0 || j >= lignes.length) return;
  // Renumérote proprement, puis échange les deux voisins.
  const ordre = lignes.map((l) => l.id);
  [ordre[i], ordre[j]] = [ordre[j], ordre[i]];
  await db.transaction(
    ordre.map((idLigne, position) =>
      table === "diapositives"
        ? db`update diapositives set position = ${position} where id = ${idLigne}`
        : db`update galerie set position = ${position} where id = ${idLigne}`,
    ),
  );
  updateTag(table === "diapositives" ? TAGS.diapositives : TAGS.galerie);
}

export async function monterDiapositive(id: number) {
  await deplacer("diapositives", id, -1);
}

export async function descendreDiapositive(id: number) {
  await deplacer("diapositives", id, 1);
}

export async function basculerDiapositive(id: number) {
  const db = await pret();
  await db`update diapositives set publiee = not publiee where id = ${id}`;
  updateTag(TAGS.diapositives);
}

export async function supprimerDiapositive(id: number) {
  const db = await pret();
  await db`delete from diapositives where id = ${id}`;
  updateTag(TAGS.diapositives);
}

/* ------------------------------------------------------------------ */
/* Actualités                                                          */
/* ------------------------------------------------------------------ */

const versSlug = (texte: string) =>
  texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);

export async function enregistrerActualite(_etat: EtatFormulaireAdmin, donnees: FormData): Promise<EtatFormulaireAdmin> {
  const db = await pret();
  const id = identifiant(donnees);
  const a = {
    titre: champ(donnees, "titre", 200),
    slug: versSlug(champ(donnees, "slug", 100) || champ(donnees, "titre", 200)),
    date: champ(donnees, "date", 10),
    categorie: champ(donnees, "categorie", 60) || "Communiqué",
    resume: champ(donnees, "resume", 400),
    image: champ(donnees, "image_url", 500),
    corps: champ(donnees, "corps", 20000),
    photos: donnees
      .getAll("photos")
      .map((p) => String(p).trim())
      .filter(imageValide)
      .slice(0, 12),
    publiee: donnees.get("publiee") === "on",
  };
  if (a.titre.length < 5) return { erreur: "Le titre est obligatoire." };
  if (!a.slug) return { erreur: "L'adresse de la page est invalide." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.date)) return { erreur: "Indiquez la date de publication." };
  if (a.resume.length < 20) return { erreur: "Le résumé doit compter au moins 20 caractères." };
  if (!imageValide(a.image)) return { erreur: "Ajoutez l'image principale." };

  const doublon = await db`select 1 from actualites where slug = ${a.slug} and id <> ${id ?? 0}`;
  if (doublon.length) return { erreur: `L'adresse « /actualites/${a.slug} » est déjà utilisée par une autre actualité.` };

  if (id) {
    await db`update actualites set titre = ${a.titre}, slug = ${a.slug}, date = ${a.date}, categorie = ${a.categorie},
             resume = ${a.resume}, image_url = ${a.image}, corps = ${a.corps}, photos = ${a.photos}, publiee = ${a.publiee},
             modifie_le = now() where id = ${id}`;
  } else {
    await db`insert into actualites (titre, slug, date, categorie, resume, image_url, corps, photos, publiee)
             values (${a.titre}, ${a.slug}, ${a.date}, ${a.categorie}, ${a.resume}, ${a.image}, ${a.corps}, ${a.photos}, ${a.publiee})`;
  }
  updateTag(TAGS.actualites);
  redirect("/admin/actualites");
}

export async function basculerActualite(id: number) {
  const db = await pret();
  await db`update actualites set publiee = not publiee where id = ${id}`;
  updateTag(TAGS.actualites);
}

export async function supprimerActualite(id: number) {
  const db = await pret();
  await db`delete from actualites where id = ${id}`;
  updateTag(TAGS.actualites);
}

/* ------------------------------------------------------------------ */
/* Médiathèque                                                         */
/* ------------------------------------------------------------------ */

export async function ajouterPhotos(photos: { url: string; largeur: number; hauteur: number; legende: string }[]) {
  const db = await pret();
  const valides = photos.filter((p) => imageValide(p.url)).slice(0, 50);
  if (!valides.length) return;
  await db.transaction(
    valides.map(
      (p) => db`insert into galerie (position, image_url, legende, largeur, hauteur)
                values ((select coalesce(max(position), -1) + 1 from galerie), ${p.url}, ${p.legende.slice(0, 200)},
                        ${Math.max(1, Math.round(p.largeur))}, ${Math.max(1, Math.round(p.hauteur))})`,
    ),
  );
  updateTag(TAGS.galerie);
}

export async function modifierLegende(id: number, donnees: FormData) {
  const db = await pret();
  await db`update galerie set legende = ${champ(donnees, "legende", 200)} where id = ${id}`;
  updateTag(TAGS.galerie);
}

export async function monterPhoto(id: number) {
  await deplacer("galerie", id, -1);
}

export async function descendrePhoto(id: number) {
  await deplacer("galerie", id, 1);
}

export async function basculerPhoto(id: number) {
  const db = await pret();
  await db`update galerie set publiee = not publiee where id = ${id}`;
  updateTag(TAGS.galerie);
}

export async function supprimerPhoto(id: number) {
  const db = await pret();
  await db`delete from galerie where id = ${id}`;
  updateTag(TAGS.galerie);
}

/* ------------------------------------------------------------------ */
/* Demandes reçues                                                     */
/* ------------------------------------------------------------------ */

// Les demandes ne sont lues que par le back-office (aucun cache public à vider) :
// on rafraîchit simplement la page courante.
export async function basculerDemande(id: number) {
  const db = await pret();
  await db`update demandes set traitee = not traitee where id = ${id}`;
  refresh();
}

export async function supprimerDemande(id: number) {
  const db = await pret();
  await db`delete from demandes where id = ${id}`;
  refresh();
}
