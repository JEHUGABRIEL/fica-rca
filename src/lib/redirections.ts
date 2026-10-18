/* Redirections permanentes des anciennes adresses WordPress vers la
   nouvelle arborescence, pour conserver le référencement et les liens
   déjà partagés. */

// Imports relatifs : ce module est chargé par next.config.ts, hors alias `@/`.
import { lienProduit, univers } from "./services";

type Redirection = { source: string; destination: string; permanent: true };

const fixes: Record<string, string> = {
  "mot-du-directeur-general-2": "/la-fica#mot-du-directeur",
  "notre-histoire": "/la-fica#histoire",
  "notre-vision": "/la-fica",
  "nos-valeurs": "/la-fica#valeurs",
  "ethique-et-deontologie": "/la-fica#engagements",
  responsabilite: "/la-fica#engagements",
  "category/fica": "/la-fica",
  "category/la-culture-de-lentreprise": "/la-fica",
  "category/nos-engagements": "/la-fica#engagements",
  "category/la-gouvernance": "/la-fica/gouvernance",
  "assemblee-generale": "/la-fica/gouvernance#assemblee-generale",
  "conseil-dadministration": "/la-fica/gouvernance#conseil-administration",
  "direction-generale": "/la-fica/gouvernance#direction-generale",
  "category/notre-performance": "/la-fica",
  "rapports-annuels": "/la-fica",
  "category/mediatheque": "/mediatheque",
  "nos-photos": "/mediatheque",
  "nos-video": "/mediatheque",
  "category/actualites": "/actualites",
  "category/communiques-de-presse": "/actualites",
  "category/nos-activites-recentes": "/actualites",
  "category/autres-actualites": "/actualites",
  "defile-du-1er-mai-2026": "/actualites/defile-du-1er-mai-2026",
  "lancement-de-la-solution-sans-connexion-internet-fica-mobile": "/actualites/lancement-de-fica-mobile",
  "prestations-sociales-cnss": "/actualites/allocations-familiales-1er-trimestre-2026",
  "demande-douverture-de-compte": "/ouverture-de-compte#particuliers",
  "demande-douverture-de-compte-personne-morale-2": "/ouverture-de-compte#entreprises",
  contacts: "/contact",
};

export function redirectionsWordPress(): Redirection[] {
  const table = new Map(Object.entries(fixes));
  for (const u of univers) {
    for (const ancien of u.anciensSlugs) if (!table.has(ancien)) table.set(ancien, `/services/${u.slug}`);
    for (const p of u.produits) for (const ancien of p.anciensSlugs) if (!table.has(ancien)) table.set(ancien, lienProduit(u, p));
  }
  return [...table.entries()].map(([ancien, destination]) => ({
    source: `/${ancien}`,
    destination,
    permanent: true,
  }));
}
