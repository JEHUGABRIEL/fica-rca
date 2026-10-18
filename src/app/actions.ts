"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { assurerSchema, baseDisponible, sql } from "@/lib/db";
import { site } from "@/lib/site";

export type EtatFormulaire = {
  statut: "inactif" | "succes" | "erreur";
  message?: string;
  erreurs?: Partial<Record<"nom" | "telephone" | "email" | "message", string>>;
};

const champ = (donnees: FormData, nom: string) => String(donnees.get(nom) ?? "").trim();

/* Transmet une demande (contact ou ouverture de compte) au service
   clientèle par e-mail, via l'API Resend. Variables d'environnement :
   RESEND_API_KEY (obligatoire), CONTACT_EMAIL (destinataire, par défaut
   l'adresse publique de la FICA) et CONTACT_FROM (expéditeur vérifié). */
export async function envoyerDemande(_etat: EtatFormulaire, donnees: FormData): Promise<EtatFormulaire> {
  // Champ piège invisible : seuls les robots le remplissent.
  if (champ(donnees, "site_web")) return { statut: "succes" };

  const nature = champ(donnees, "nature") === "ouverture" ? "Demande d'ouverture de compte" : "Demande de contact";
  const nom = champ(donnees, "nom");
  const telephone = champ(donnees, "telephone");
  const email = champ(donnees, "email");
  const objet = champ(donnees, "objet");
  const compte = champ(donnees, "compte");
  const profil = champ(donnees, "profil");
  const message = champ(donnees, "message");

  const erreurs: EtatFormulaire["erreurs"] = {};
  if (nom.length < 2) erreurs.nom = "Indiquez votre nom ou la raison sociale.";
  if (!/^\+?[\d\s.-]{8,}$/.test(telephone)) erreurs.telephone = "Indiquez un numéro de téléphone valide.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) erreurs.email = "Cette adresse e-mail n'est pas valide.";
  if (nature === "Demande de contact" && message.length < 10) erreurs.message = "Précisez votre demande en quelques mots.";
  if (message.length > 4000) erreurs.message = "Votre message est trop long.";
  if (Object.keys(erreurs).length) return { statut: "erreur", erreurs, message: "Merci de corriger les champs signalés." };

  const cle = process.env.RESEND_API_KEY;
  if (!cle) {
    console.error("envoyerDemande : RESEND_API_KEY absente, la demande n'a pas pu être transmise.");
    return {
      statut: "erreur",
      message: `L'envoi en ligne est momentanément indisponible. Appelez-nous au ${site.telephone} ou écrivez-nous sur WhatsApp.`,
    };
  }

  const lignes = [
    `${nature}${objet ? ` — ${objet}` : ""}`,
    "",
    `Nom : ${nom}`,
    `Téléphone : ${telephone}`,
    email && `E-mail : ${email}`,
    profil && `Profil : ${profil}`,
    compte && `Compte souhaité : ${compte}`,
    message && `\nMessage :\n${message}`,
  ].filter(Boolean);

  const reponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cle}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Site FICA <site@fica-rca.com>",
      to: [process.env.CONTACT_EMAIL ?? site.email],
      reply_to: email || undefined,
      subject: `[Site] ${nature} — ${nom}`,
      text: lignes.join("\n"),
    }),
  });

  if (!reponse.ok) {
    console.error("envoyerDemande : échec Resend", reponse.status, await reponse.text());
    return {
      statut: "erreur",
      message: `Votre demande n'a pas pu être envoyée. Réessayez ou appelez-nous au ${site.telephone}.`,
    };
  }

  return { statut: "succes" };
}

export type EtatAvis = {
  statut: "inactif" | "succes" | "erreur";
  message?: string;
  erreurs?: Partial<Record<"nom" | "texte" | "accord", string>>;
};

const AVIS_PAR_JOUR = 3;

/* Dépôt d'un avis client : enregistré « en attente », publié seulement après
   validation dans le back-office. L'adresse IP n'est pas conservée, seule
   une empreinte salée sert à limiter les envois répétés. */
export async function deposerAvis(_etat: EtatAvis, donnees: FormData): Promise<EtatAvis> {
  if (champ(donnees, "site_web")) return { statut: "succes" };

  const nom = champ(donnees, "nom").slice(0, 80);
  const profil = champ(donnees, "profil").slice(0, 120);
  const produit = champ(donnees, "produit").slice(0, 80);
  const texte = champ(donnees, "texte");
  const accord = donnees.get("accord") === "on";

  const erreurs: EtatAvis["erreurs"] = {};
  if (nom.length < 2) erreurs.nom = "Indiquez le nom à afficher avec votre avis.";
  if (texte.length < 20) erreurs.texte = "Votre avis doit compter au moins 20 caractères.";
  if (texte.length > 1500) erreurs.texte = "Votre avis ne doit pas dépasser 1 500 caractères.";
  if (!accord) erreurs.accord = "Votre accord est nécessaire pour publier votre avis.";
  if (Object.keys(erreurs).length) return { statut: "erreur", erreurs, message: "Merci de corriger les champs signalés." };

  if (!baseDisponible()) {
    return { statut: "erreur", message: "Le dépôt d'avis est momentanément indisponible. Merci de réessayer plus tard." };
  }

  const ip = ((await headers()).get("x-forwarded-for") ?? "").split(",")[0].trim();
  const empreinte = createHash("sha256")
    .update(`${process.env.ADMIN_SESSION_SECRET ?? ""}:${ip}`)
    .digest("hex")
    .slice(0, 32);

  try {
    await assurerSchema();
    const [{ n }] = await sql()`select count(*)::int as n from avis
                                 where empreinte = ${empreinte} and cree_le > now() - interval '1 day'`;
    if (ip && Number(n) >= AVIS_PAR_JOUR) {
      return { statut: "erreur", message: "Vous avez déjà déposé plusieurs avis aujourd'hui. Merci de réessayer demain." };
    }
    await sql()`insert into avis (nom, profil, produit, texte, empreinte)
                values (${nom}, ${profil}, ${produit}, ${texte}, ${empreinte})`;
    return { statut: "succes" };
  } catch (erreur) {
    console.error("[avis] enregistrement impossible :", erreur);
    return { statut: "erreur", message: "Votre avis n'a pas pu être enregistré. Merci de réessayer." };
  }
}
