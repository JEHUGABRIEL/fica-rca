import "server-only";
import { setDefaultAutoSelectFamilyAttemptTimeout } from "node:net";
import { neon, neonConfig, type NeonQueryFunction } from "@neondatabase/serverless";

/*
 * Node n'accorde par défaut que 250 ms à chaque adresse IP pour ouvrir une
 * connexion TCP ; depuis un réseau lent, la base échouait en ETIMEDOUT.
 */
setDefaultAutoSelectFamilyAttemptTimeout(3000);

/* Une coupure réseau passagère est retentée deux fois ; les erreurs SQL,
   renvoyées dans une réponse HTTP, ne sont pas concernées. */
neonConfig.fetchFunction = async (...args: Parameters<typeof fetch>) => {
  let derniere: unknown;
  for (let essai = 0; essai < 3; essai++) {
    try {
      return await fetch(...args);
    } catch (erreur) {
      derniere = erreur;
      await new Promise((resoudre) => setTimeout(resoudre, 300 * (essai + 1)));
    }
  }
  throw derniere;
};

let client: NeonQueryFunction<false, false> | null = null;

export function baseDisponible() {
  return Boolean(process.env.DATABASE_URL);
}

export function sql() {
  if (!client) {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL n'est pas défini");
    client = neon(process.env.DATABASE_URL);
  }
  return client;
}

let pret: Promise<void> | null = null;

/** Crée la table au premier usage ; mémorisé par instance de serveur. */
export function assurerSchema() {
  pret ??= sql()`create table if not exists avis (
      id serial primary key,
      nom text not null,
      profil text not null default '',
      produit text not null default '',
      texte text not null,
      statut text not null default 'en_attente' check (statut in ('en_attente', 'publie', 'refuse')),
      empreinte text not null default '',
      cree_le timestamptz not null default now(),
      publie_le timestamptz
    )`
    .then(() => undefined)
    .catch((erreur) => {
      pret = null;
      throw erreur;
    });
  return pret;
}
