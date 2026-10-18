"use client";

import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { envoyerDemande, type EtatFormulaire } from "@/app/actions";

export type OptionCompte = { valeur: string; libelle: string; groupe: string };

const etatInitial: EtatFormulaire = { statut: "inactif" };

export function FormulaireDemande({
  nature,
  comptes = [],
}: {
  nature: "contact" | "ouverture";
  comptes?: OptionCompte[];
}) {
  const [etat, envoyer, enCours] = useActionState(envoyerDemande, etatInitial);
  const parametres = useSearchParams();
  const objetInitial = parametres.get("objet") ?? "";
  const compteChoisi = comptes.find((c) => c.valeur === parametres.get("compte"));
  const profilInitial = compteChoisi?.groupe === "Entreprises et associations" ? "Entreprise, association ou ONG" : "Particulier";

  if (etat.statut === "succes") {
    return (
      <div role="status" className="border-l-4 border-vert bg-white p-6">
        <CircleCheck className="size-8 text-vert" aria-hidden />
        <h3 className="mt-3 text-lg">Demande bien reçue</h3>
        <p className="mt-2 text-gris">Merci. Un conseiller de la FICA vous recontacte dans les meilleurs délais.</p>
      </div>
    );
  }

  const groupes = [...new Set(comptes.map((c) => c.groupe))];
  const erreur = (nom: keyof NonNullable<EtatFormulaire["erreurs"]>) =>
    etat.erreurs?.[nom] && (
      <p id={`erreur-${nom}`} className="mt-1.5 text-sm text-rouge">
        {etat.erreurs[nom]}
      </p>
    );

  return (
    <form action={envoyer} noValidate className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="nature" value={nature} />
      <div className="hidden" aria-hidden>
        <label>
          Site web
          <input type="text" name="site_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {nature === "ouverture" && (
        <>
          <div>
            <label htmlFor="profil" className="mb-1.5 block text-sm font-medium text-marine">
              Vous êtes
            </label>
            <select id="profil" name="profil" className="champ" defaultValue={profilInitial}>
              <option>Particulier</option>
              <option>Entreprise, association ou ONG</option>
            </select>
          </div>
          <div>
            <label htmlFor="compte" className="mb-1.5 block text-sm font-medium text-marine">
              Compte souhaité
            </label>
            <select id="compte" name="compte" className="champ" defaultValue={compteChoisi?.libelle ?? ""}>
              <option value="">Je souhaite être conseillé</option>
              {groupes.map((g) => (
                <optgroup key={g} label={g}>
                  {comptes
                    .filter((c) => c.groupe === g)
                    .map((c) => (
                      <option key={c.valeur} value={c.libelle}>
                        {c.libelle}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>
        </>
      )}

      <div className="sm:col-span-2">
        <label htmlFor="nom" className="mb-1.5 block text-sm font-medium text-marine">
          Nom complet ou raison sociale <span className="text-rouge">*</span>
        </label>
        <input
          id="nom"
          name="nom"
          required
          autoComplete="name"
          className="champ"
          aria-invalid={!!etat.erreurs?.nom}
          aria-describedby={etat.erreurs?.nom ? "erreur-nom" : undefined}
        />
        {erreur("nom")}
      </div>
      <div>
        <label htmlFor="telephone" className="mb-1.5 block text-sm font-medium text-marine">
          Téléphone <span className="text-rouge">*</span>
        </label>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+236 …"
          className="champ"
          aria-invalid={!!etat.erreurs?.telephone}
          aria-describedby={etat.erreurs?.telephone ? "erreur-telephone" : undefined}
        />
        {erreur("telephone")}
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-marine">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="champ"
          aria-invalid={!!etat.erreurs?.email}
          aria-describedby={etat.erreurs?.email ? "erreur-email" : undefined}
        />
        {erreur("email")}
      </div>
      {nature === "contact" && (
        <div className="sm:col-span-2">
          <label htmlFor="objet" className="mb-1.5 block text-sm font-medium text-marine">
            Objet
          </label>
          <input id="objet" name="objet" defaultValue={objetInitial} className="champ" />
        </div>
      )}
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-marine">
          {nature === "contact" ? (
            <>
              Votre message <span className="text-rouge">*</span>
            </>
          ) : (
            "Précisions (facultatif)"
          )}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="champ resize-y"
          aria-invalid={!!etat.erreurs?.message}
          aria-describedby={etat.erreurs?.message ? "erreur-message" : undefined}
        />
        {erreur("message")}
      </div>

      {etat.statut === "erreur" && etat.message && (
        <p role="alert" className="border-l-4 border-rouge bg-rouge/5 px-4 py-3 text-sm text-rouge sm:col-span-2">
          {etat.message}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gris">
          Vos informations servent uniquement à traiter votre demande et ne sont jamais transmises à des tiers.
        </p>
        <button type="submit" disabled={enCours} className="bouton bouton-principal shrink-0 disabled:opacity-60">
          {enCours ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
          {nature === "contact" ? "Envoyer" : "Envoyer ma demande"}
        </button>
      </div>
    </form>
  );
}
