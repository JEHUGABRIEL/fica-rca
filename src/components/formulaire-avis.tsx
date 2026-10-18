"use client";

import { CircleCheck, LoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { deposerAvis, type EtatAvis } from "@/app/actions";

const produits = [
  "Compte courant",
  "Compte d'épargne",
  "Crédit",
  "FICA MOBILE",
  "Paiement de pension ou d'allocations",
  "Attestation",
  "Transfert d'argent",
  "Accueil en agence",
];

const etatInitial: EtatAvis = { statut: "inactif" };

export function FormulaireAvis() {
  const [etat, envoyer, enCours] = useActionState(deposerAvis, etatInitial);

  if (etat.statut === "succes") {
    return (
      <div role="status" className="border-l-4 border-vert bg-white p-6">
        <CircleCheck className="size-8 text-vert" aria-hidden />
        <h3 className="mt-3 text-lg">Merci pour votre avis</h3>
        <p className="mt-2 text-gris">Il sera publié sur cette page après vérification par nos équipes.</p>
      </div>
    );
  }

  const erreur = (nom: keyof NonNullable<EtatAvis["erreurs"]>) =>
    etat.erreurs?.[nom] && (
      <p id={`erreur-avis-${nom}`} className="mt-1.5 text-sm text-rouge">
        {etat.erreurs[nom]}
      </p>
    );

  return (
    <form action={envoyer} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="hidden" aria-hidden>
        <label>
          Site web
          <input type="text" name="site_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <label htmlFor="avis-nom" className="mb-1.5 block text-sm font-medium text-marine">
          Nom affiché <span className="text-rouge">*</span>
        </label>
        <input
          id="avis-nom"
          name="nom"
          required
          maxLength={80}
          placeholder="Ex. : Marie K."
          className="champ"
          aria-invalid={!!etat.erreurs?.nom}
          aria-describedby={etat.erreurs?.nom ? "erreur-avis-nom" : undefined}
        />
        {erreur("nom")}
      </div>
      <div>
        <label htmlFor="avis-profil" className="mb-1.5 block text-sm font-medium text-marine">
          Vous êtes
        </label>
        <input id="avis-profil" name="profil" maxLength={120} placeholder="Ex. : commerçante, cliente depuis 2021" className="champ" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="avis-produit" className="mb-1.5 block text-sm font-medium text-marine">
          Service concerné
        </label>
        <select id="avis-produit" name="produit" className="champ" defaultValue="">
          <option value="">Non précisé</option>
          {produits.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="avis-texte" className="mb-1.5 block text-sm font-medium text-marine">
          Votre avis <span className="text-rouge">*</span>
        </label>
        <textarea
          id="avis-texte"
          name="texte"
          rows={5}
          maxLength={1500}
          required
          className="champ resize-y"
          aria-invalid={!!etat.erreurs?.texte}
          aria-describedby={etat.erreurs?.texte ? "erreur-avis-texte" : undefined}
        />
        {erreur("texte")}
      </div>
      <div className="sm:col-span-2">
        <label className="flex gap-3 text-sm text-encre">
          <input
            type="checkbox"
            name="accord"
            className="mt-0.5 size-4 shrink-0 accent-bleu"
            aria-invalid={!!etat.erreurs?.accord}
            aria-describedby={etat.erreurs?.accord ? "erreur-avis-accord" : undefined}
          />
          J&apos;accepte que mon avis soit publié sur le site de la FICA avec le nom indiqué, après vérification par
          ses équipes.
        </label>
        {erreur("accord")}
      </div>

      {etat.statut === "erreur" && etat.message && (
        <p role="alert" className="border-l-4 border-rouge bg-rouge/5 px-4 py-3 text-sm text-rouge sm:col-span-2">
          {etat.message}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gris">Les avis sont relus avant publication. Ne communiquez aucune donnée bancaire.</p>
        <button type="submit" disabled={enCours} className="bouton bouton-principal shrink-0 disabled:opacity-60">
          {enCours && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
          Publier mon avis
        </button>
      </div>
    </form>
  );
}
