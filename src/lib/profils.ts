/* Lecture de l'offre par profil de clientèle (Particuliers, Professionnels,
   Institutions). Les fiches restent définies une seule fois dans
   `services.ts` ; ce fichier ne fait que les regrouper par besoin. */

import { lienProduit, univers, type Produit, type Univers } from "./services";

export type Profil = {
  slug: "particuliers" | "professionnels" | "institutions";
  nom: string;
  titre: string;
  introduction: string;
  image: { src: string; alt: string };
  rubriques: { titre: string; produits: string[] }[];
};

export const profils: Profil[] = [
  {
    slug: "particuliers",
    nom: "Particuliers",
    titre: "Particuliers",
    introduction:
      "Comptes courants, épargne, crédits et services au quotidien pour les salariés, les travailleurs indépendants et leurs familles.",
    image: { src: "/images/galerie/fica-16.jpg", alt: "Un client reçu au guichet de l'agence de Bangui" },
    rubriques: [
      { titre: "Comptes courants", produits: ["compte-courant-bronze", "compte-courant-or", "compte-courant-diamant", "compte-non-salarie"] },
      { titre: "Épargne", produits: ["compte-epargne-ordinaire", "compte-epargne-junior"] },
      { titre: "Crédits", produits: ["decouvert-ponctuel", "credit-salaries", "credit-non-salaries", "credit-scolaire", "credit-evenementiel"] },
      { titre: "Au quotidien", produits: ["fica-mobile", "sms-banking", "transfert-d-argent", "operations-de-change", "remise-de-cheques", "banque-assurance"] },
      {
        titre: "Attestations",
        produits: [
          "releve-d-identite-bancaire",
          "attestation-de-solde",
          "attestation-de-solvabilite",
          "attestation-de-virement-irrevocable",
          "attestation-de-cloture-de-compte",
        ],
      },
    ],
  },
  {
    slug: "professionnels",
    nom: "Professionnels",
    titre: "Professionnels et entreprises",
    introduction:
      "Comptes, financements, cautions et attestations pour les sociétés, les entreprises individuelles, les associations et les ONG.",
    image: { src: "/images/galerie/fica-12.jpg", alt: "Les équipes de la FICA aux guichets de l'agence" },
    rubriques: [
      { titre: "Comptes", produits: ["compte-courant-societe", "compte-entreprise-individuelle", "compte-association-ong"] },
      {
        titre: "Financements",
        produits: ["decouvert-permanent", "credit-personne-morale", "credit-aux-pme", "financement-de-marches", "ligne-de-financement"],
      },
      { titre: "Engagements par signature", produits: ["cautions-et-avals", "escompte-de-cheques", "escompte-de-traites"] },
      { titre: "Services aux entreprises", produits: ["virement-bancaire", "paiement-sur-site", "collecte-de-depots"] },
      {
        titre: "Marchés publics",
        produits: [
          "attestation-de-capacite-financiere",
          "attestation-de-non-engagement",
          "attestation-administration-fiscale",
          "attestation-de-non-faillite",
          "attestation-de-domiciliation-bancaire",
        ],
      },
    ],
  },
  {
    slug: "institutions",
    nom: "Institutions",
    titre: "Institutions et organismes",
    introduction:
      "Paiement des prestations sociales et des salaires, collecte de fonds et solutions de financement pour les institutions publiques, organismes sociaux et organisations internationales.",
    image: { src: "/images/actualites/allocations-2026-1.jpg", alt: "Paiement des allocations familiales dans le hall de l'agence" },
    rubriques: [
      { titre: "Paiement de prestations", produits: ["pension-des-retraites", "allocations-familiales", "autres-paiements"] },
      { titre: "Paiement des salaires", produits: ["virement-bancaire", "paiement-sur-site"] },
      { titre: "Gestion des fonds", produits: ["collecte-de-depots", "compte-association-ong", "ligne-de-financement"] },
    ],
  },
];

const index = new Map<string, { univers: Univers; produit: Produit }>(
  univers.flatMap((u) => u.produits.map((p) => [p.slug, { univers: u, produit: p }] as const)),
);

/** Résout les fiches d'une rubrique ; échoue au build si un slug est inconnu. */
export function produitsDeRubrique(slugs: string[]) {
  return slugs.map((slug) => {
    const trouve = index.get(slug);
    if (!trouve) throw new Error(`Produit inconnu dans profils.ts : ${slug}`);
    return { ...trouve, href: lienProduit(trouve.univers, trouve.produit) };
  });
}

export function trouverProfil(slug: string) {
  return profils.find((p) => p.slug === slug);
}
