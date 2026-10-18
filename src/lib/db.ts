import "server-only";
import { setDefaultAutoSelectFamilyAttemptTimeout } from "node:net";
import { neon, neonConfig, type NeonQueryFunction } from "@neondatabase/serverless";
import { diapositivesInitiales } from "./diapositives-initiales";
import { actualitesInitiales, galerieInitiale } from "./institution";

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

/**
 * Crée les tables au premier usage puis, une seule fois, y copie le contenu
 * de départ (carrousel, actualités, médiathèque). Mémorisé par instance.
 */
export function assurerSchema() {
  pret ??= installer().catch((erreur) => {
    pret = null;
    throw erreur;
  });
  return pret;
}

async function installer() {
  const db = sql();
  await db.transaction([
    db`create table if not exists avis (
      id serial primary key,
      nom text not null,
      profil text not null default '',
      produit text not null default '',
      texte text not null,
      statut text not null default 'en_attente' check (statut in ('en_attente', 'publie', 'refuse')),
      empreinte text not null default '',
      cree_le timestamptz not null default now(),
      publie_le timestamptz
    )`,
    db`create table if not exists diapositives (
      id serial primary key,
      position integer not null default 0,
      publiee boolean not null default true,
      image_url text not null,
      cadrage text not null default 'center',
      alt text not null default '',
      rubrique text not null default '',
      titre text not null,
      texte text not null default '',
      action_libelle text not null default '',
      action_href text not null default '',
      modifie_le timestamptz not null default now()
    )`,
    db`create table if not exists actualites (
      id serial primary key,
      slug text not null unique,
      titre text not null,
      date date not null default current_date,
      categorie text not null default 'Communiqué',
      resume text not null default '',
      image_url text not null default '',
      corps text not null default '',
      photos text[] not null default '{}',
      publiee boolean not null default true,
      modifie_le timestamptz not null default now()
    )`,
    db`create table if not exists galerie (
      id serial primary key,
      position integer not null default 0,
      publiee boolean not null default true,
      image_url text not null,
      legende text not null default '',
      largeur integer not null default 1200,
      hauteur integer not null default 900,
      cree_le timestamptz not null default now()
    )`,
    db`create table if not exists demandes (
      id serial primary key,
      nature text not null,
      nom text not null,
      telephone text not null default '',
      email text not null default '',
      objet text not null default '',
      profil text not null default '',
      compte text not null default '',
      message text not null default '',
      traitee boolean not null default false,
      cree_le timestamptz not null default now()
    )`,
    db`create table if not exists reglages (cle text primary key, valeur text not null)`,
  ]);

  /* Une seule fois, par l'instance qui pose le drapeau en premier (deux
     démarrages simultanés ne doivent pas dupliquer le contenu) ; vider une
     table ensuite ne la fait pas se re-remplir. */
  const gagne = await db`insert into reglages (cle, valeur) values ('contenu_initialise', 'en_cours')
                         on conflict (cle) do nothing returning cle`;
  if (gagne.length === 0) return;
  try {
    await db.transaction([
      ...diapositivesInitiales.map(
        (d, i) => db`insert into diapositives (position, image_url, cadrage, alt, rubrique, titre, texte, action_libelle, action_href)
                     values (${i}, ${d.image}, ${d.cadrage ?? "center"}, ${d.alt}, ${d.rubrique}, ${d.titre}, ${d.texte},
                             ${d.action.libelle}, ${d.action.href})`,
      ),
      ...actualitesInitiales.map(
        (a) => db`insert into actualites (slug, titre, date, categorie, resume, image_url, corps, photos)
                  values (${a.slug}, ${a.titre}, ${a.date}, ${a.categorie}, ${a.resume}, ${a.image}, ${a.corps}, ${a.photos})
                  on conflict (slug) do nothing`,
      ),
      ...galerieInitiale.map(
        (g, i) => db`insert into galerie (position, image_url, legende, largeur, hauteur)
                     values (${i}, ${g.src}, ${g.alt}, ${g.largeur}, ${g.hauteur})`,
      ),
      db`update reglages set valeur = 'oui' where cle = 'contenu_initialise'`,
    ]);
  } catch (erreur) {
    await db`delete from reglages where cle = 'contenu_initialise'`;
    throw erreur;
  }
}
