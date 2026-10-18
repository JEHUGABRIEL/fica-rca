"use client";

import { useActionState } from "react";
import { seConnecter, type EtatConnexion } from "../actions";

export function FormulaireConnexion() {
  const [etat, envoyer, enCours] = useActionState<EtatConnexion, FormData>(seConnecter, {});
  return (
    <form action={envoyer} className="mt-5 space-y-4">
      <div>
        <label htmlFor="mot_de_passe" className="mb-1.5 block text-sm font-medium text-marine">
          Mot de passe
        </label>
        <input id="mot_de_passe" name="mot_de_passe" type="password" required autoComplete="current-password" className="champ" />
      </div>
      {etat.erreur && (
        <p role="alert" className="text-sm text-rouge">
          {etat.erreur}
        </p>
      )}
      <button type="submit" disabled={enCours} className="bouton bouton-principal w-full disabled:opacity-60">
        Se connecter
      </button>
    </form>
  );
}
