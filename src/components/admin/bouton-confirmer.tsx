"use client";

import { useState } from "react";

/* Bouton de suppression en deux temps (sans boîte de dialogue du navigateur). */
export function BoutonConfirmer({ action, libelle = "Supprimer" }: { action: () => Promise<void>; libelle?: string }) {
  const [confirmation, setConfirmation] = useState(false);
  if (!confirmation) {
    return (
      <button type="button" onClick={() => setConfirmation(true)} className="bouton !px-3 !py-1.5 text-sm text-rouge hover:underline">
        {libelle}
      </button>
    );
  }
  return (
    <form action={action} className="flex items-center gap-2">
      <button type="submit" className="bouton !px-3 !py-1.5 bg-rouge text-sm text-white hover:bg-rouge-fonce">
        Confirmer
      </button>
      <button type="button" onClick={() => setConfirmation(false)} className="text-sm text-gris hover:underline">
        Annuler
      </button>
    </form>
  );
}
