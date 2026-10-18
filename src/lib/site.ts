/* Coordonnées et identité de la FICA, reprises du site d'origine. */

export const site = {
  nom: "Financière de Centrafrique",
  nomCourt: "FICA S.A.",
  slogan: "Sécurité et disponibilité de vos dépôts",
  url: "https://fica-rca.com",
  description:
    "Financière de Centrafrique (FICA S.A.), établissement de microfinance agréé par la COBAC depuis 2020 : comptes, crédits, paiements et FICA MOBILE, la banque sans internet au #808#.",
  telephone: "+236 70 01 04 04",
  telephoneLien: "tel:+23670010404",
  whatsapp: "+236 74 23 97 24",
  whatsappLien: "https://wa.me/23674239724",
  email: "fica-sa@fica-rca.com",
  adresse: {
    rue: "Rue Martin Luther King, ex-immeuble MINAIR",
    quartier: "Centre-ville",
    boitePostale: "BP 858",
    ville: "Bangui",
    pays: "République centrafricaine",
  },
  codeUssd: "#808#",
  agrement: "20 juillet 2020",
  capitalSocial: "500 000 000 FCFA",
  reseaux: {
    facebook: "https://www.facebook.com/share/14yhqABhkh/",
    linkedin: "https://www.linkedin.com/company/financiere-de-centrafrique-s-a/",
  },
} as const;

export const adresseComplete = `${site.adresse.rue}, ${site.adresse.quartier}, ${site.adresse.boitePostale} ${site.adresse.ville}, ${site.adresse.pays}`;

export type LienNav = { libelle: string; href: string; description?: string };

/* Navigation principale. Les services sont construits à partir du catalogue
   (voir `services.ts`) pour rester synchronisés avec les pages produits. */
export const navigationInstitution: LienNav[] = [
  { libelle: "Qui sommes-nous", href: "/la-fica", description: "Mot du Directeur général, vision et valeurs" },
  { libelle: "Gouvernance", href: "/la-fica/gouvernance", description: "Assemblée générale, Conseil d'administration, Direction" },
  { libelle: "Nos engagements", href: "/la-fica#engagements", description: "Éthique, déontologie et responsabilité" },
  { libelle: "Médiathèque", href: "/mediatheque", description: "Nos équipes et nos événements en images" },
];
