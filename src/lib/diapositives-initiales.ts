/* Diapositives de départ du carrousel d'accueil, copiées une seule fois
   dans la base au premier lancement ; ensuite, elles se gèrent dans le
   back-office. */

import type { Diapositive } from "@/components/carrousel-hero";
import { site } from "./site";

export const diapositivesInitiales: Diapositive[] = [
  {
    image: "/images/galerie/fica-09.jpg",
    alt: "Les conseillères de la FICA à l'agence de Bangui",
    cadrage: "70% 30%",
    rubrique: "La FICA",
    titre: "Sécurité et disponibilité de vos dépôts",
    texte: "Établissement de microfinance agréé par la COBAC, au service des particuliers, des entreprises et des institutions centrafricaines depuis 2020.",
    action: { libelle: "Ouvrir un compte", href: "/ouverture-de-compte" },
  },
  {
    image: "/images/galerie/fica-13.jpg",
    alt: "L'équipe FICA lors du lancement de FICA MOBILE",
    cadrage: "60% 35%",
    rubrique: "FICA MOBILE",
    titre: "Votre compte, sans connexion internet",
    texte: `Solde, dernières opérations, transferts et virements vers Orange Money depuis n'importe quel téléphone : composez le ${site.codeUssd}.`,
    action: { libelle: "Découvrir FICA MOBILE", href: "/fica-mobile" },
  },
  {
    image: "/images/galerie/fica-16.jpg",
    alt: "Un client reçu au guichet de l'agence de Bangui",
    cadrage: "65% 40%",
    rubrique: "Particuliers",
    titre: "Financer la rentrée, un projet ou un imprévu",
    texte: "Découvert ponctuel, crédit scolaire, crédits amortissables pour les salariés et les travailleurs indépendants.",
    action: { libelle: "Voir les crédits", href: "/services/credits" },
  },
  {
    image: "/images/galerie/fica-08.jpg",
    alt: "Des clients accueillis à l'agence de la FICA",
    cadrage: "60% 40%",
    rubrique: "Professionnels",
    titre: "Un partenaire financier pour les entreprises",
    texte: "Comptes courants, financement de marchés, cautions et attestations exigées pour les marchés publics.",
    action: { libelle: "Offre professionnels", href: "/professionnels" },
  },
  {
    image: "/images/actualites/allocations-2026-1.jpg",
    alt: "Paiement des allocations familiales dans le hall de l'agence",
    cadrage: "60% 40%",
    rubrique: "Institutions",
    titre: "Paiement des pensions et des allocations familiales",
    texte: "En partenariat avec la CNSS, la FICA assure le paiement des prestations sociales selon un calendrier communiqué à l'avance.",
    action: { libelle: "Offre institutions", href: "/institutions" },
  },
];
