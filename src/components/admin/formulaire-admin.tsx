"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import type { EtatFormulaireAdmin } from "@/app/admin/actions";

/* Formulaire d'édition du back-office : affiche l'erreur renvoyée par
   l'action serveur ; en cas de succès, l'action redirige vers la liste. */
export function FormulaireAdmin({
  action,
  retour,
  children,
}: {
  action: (etat: EtatFormulaireAdmin, donnees: FormData) => Promise<EtatFormulaireAdmin>;
  retour: string;
  children: React.ReactNode;
}) {
  const [etat, envoyer, enCours] = useActionState(action, {});
  return (
    <form action={envoyer} className="space-y-6 border-t-4 border-marine bg-white p-6 md:p-8">
      {children}
      {etat.erreur && (
        <p role="alert" className="border-l-4 border-rouge bg-rouge/5 px-4 py-3 text-sm text-rouge">
          {etat.erreur}
        </p>
      )}
      <div className="flex items-center gap-4 border-t border-filet pt-6">
        <button type="submit" disabled={enCours} className="bouton bouton-principal disabled:opacity-60">
          {enCours && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
          Enregistrer
        </button>
        <Link href={retour} className="text-sm text-gris hover:text-marine hover:underline">
          Annuler
        </Link>
      </div>
    </form>
  );
}
