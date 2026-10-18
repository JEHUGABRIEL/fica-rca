import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Diapositive } from "@/components/carrousel-hero";
import { assurerSchema, baseDisponible, sql } from "./db";
import { diapositivesInitiales } from "./diapositives-initiales";
import { actualitesInitiales, galerieInitiale, type Actualite, type Photo } from "./institution";

/* Contenus gérés dans le back-office. Chaque lecture est intégrée aux pages
   statiques et rafraîchie quand le back-office vide son tag. Sans base (ou
   si elle est injoignable), le site affiche le contenu de départ. */

export const TAGS = { diapositives: "diapositives", actualites: "actualites", galerie: "galerie" } as const;

const enDate = (d: unknown) => new Date(d as string).toISOString().slice(0, 10);

export async function diapositivesPubliees(): Promise<Diapositive[]> {
  "use cache";
  cacheTag(TAGS.diapositives);
  cacheLife("hours");
  if (!baseDisponible()) return diapositivesInitiales;
  try {
    await assurerSchema();
    const lignes = await sql()`select * from diapositives where publiee order by position, id`;
    return lignes.map((l) => ({
      image: l.image_url,
      cadrage: l.cadrage,
      alt: l.alt,
      rubrique: l.rubrique,
      titre: l.titre,
      texte: l.texte,
      action: { libelle: l.action_libelle, href: l.action_href },
    }));
  } catch (erreur) {
    console.error("[contenu] diapositives :", erreur);
    return diapositivesInitiales;
  }
}

function versActualite(l: Record<string, unknown>): Actualite {
  return {
    slug: String(l.slug),
    titre: String(l.titre),
    date: enDate(l.date),
    categorie: String(l.categorie),
    resume: String(l.resume),
    image: String(l.image_url),
    corps: String(l.corps),
    photos: (l.photos as string[]) ?? [],
  };
}

/** Actualités publiées, de la plus récente à la plus ancienne. */
export async function actualitesPubliees(): Promise<Actualite[]> {
  "use cache";
  cacheTag(TAGS.actualites);
  cacheLife("hours");
  if (!baseDisponible()) return actualitesInitiales;
  try {
    await assurerSchema();
    const lignes = await sql()`select * from actualites where publiee order by date desc, id desc`;
    return lignes.map(versActualite);
  } catch (erreur) {
    console.error("[contenu] actualités :", erreur);
    return actualitesInitiales;
  }
}

export async function actualiteParSlug(slug: string) {
  return (await actualitesPubliees()).find((a) => a.slug === slug);
}

export async function photosGalerie(): Promise<Photo[]> {
  "use cache";
  cacheTag(TAGS.galerie);
  cacheLife("hours");
  if (!baseDisponible()) return galerieInitiale;
  try {
    await assurerSchema();
    const lignes = await sql()`select * from galerie where publiee order by position, id`;
    return lignes.map((l) => ({ src: l.image_url, alt: l.legende, largeur: l.largeur, hauteur: l.hauteur }));
  } catch (erreur) {
    console.error("[contenu] galerie :", erreur);
    return galerieInitiale;
  }
}
