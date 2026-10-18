"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { exigerAdmin, fermerSession, motDePasseValide, ouvrirSession } from "@/lib/auth";
import { TAG_AVIS } from "@/lib/avis";
import { assurerSchema, sql } from "@/lib/db";

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

async function changerStatut(id: number, statut: "publie" | "refuse" | "en_attente") {
  await exigerAdmin();
  await assurerSchema();
  await sql()`update avis
              set statut = ${statut},
                  publie_le = case when ${statut} = 'publie' then coalesce(publie_le, now()) else null end
              where id = ${id}`;
  updateTag(TAG_AVIS);
}

export async function publierAvis(id: number) {
  await changerStatut(id, "publie");
}

export async function refuserAvis(id: number) {
  await changerStatut(id, "refuse");
}

export async function remettreEnAttente(id: number) {
  await changerStatut(id, "en_attente");
}

export async function supprimerAvis(id: number) {
  await exigerAdmin();
  await assurerSchema();
  await sql()`delete from avis where id = ${id}`;
  updateTag(TAG_AVIS);
}
