"use server";

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
