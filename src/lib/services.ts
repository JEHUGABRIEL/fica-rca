/* Catalogue des produits et services de la FICA.

   Les textes reprennent le site d'origine, corrigés et harmonisés. Sur
   l'ancien site, plusieurs fiches ne contenaient qu'un texte d'attente
   (« espace réservé description ») : elles ont reçu une description
   générique marquée `aValider`, à faire relire par la FICA avant mise en
   ligne (liste dans CONTENU-A-VALIDER.md). Aucun taux ni montant n'y a été
   ajouté. */

export type CleIcone =
  | "portefeuille"
  | "credit"
  | "signature"
  | "paiement"
  | "attestation"
  | "services";

export type Produit = {
  slug: string;
  nom: string;
  accroche: string;
  description: string[];
  /** Sous-groupe d'affichage dans l'univers (ex. « Particuliers »). */
  groupe?: string;
  pointsCles?: { libelle: string; valeur: string }[];
  conditions?: string[];
  documents?: string[];
  /** Appel à l'action principal de la fiche. */
  action: "ouverture" | "demande" | "information";
  /** Lien vers une page dédiée qui remplace la fiche (ex. FICA MOBILE). */
  pageDediee?: string;
  aValider?: boolean;
  /** Anciennes adresses WordPress redirigées vers cette fiche. */
  anciensSlugs: string[];
};

export type Univers = {
  slug: string;
  nom: string;
  nomCourt: string;
  icone: CleIcone;
  accroche: string;
  introduction: string;
  produits: Produit[];
  anciensSlugs: string[];
};

const piecesParticulier = [
  "Deux photos d'identité couleur 4×4 par signataire",
  "Copie de la pièce d'identité en cours de validité (CNI, passeport ou titre de séjour)",
  "Justificatif de revenu (bulletin de paie, badge professionnel, attestation d'emploi, preuve de propriété de l'entreprise…)",
  "Justificatif de domicile (plan de localisation ou facture récente d'eau, d'électricité ou de téléphone)",
  "Numéro d'identifiant unique (NIU)",
  "Copie du titre de séjour pour les ressortissants étrangers",
];

const piecesSalarie = [
  "Copie de la pièce d'identité (CNI, passeport ou titre de séjour)",
  "Deux photos d'identité couleur 4×4",
  "Copie du contrat de travail ou du dernier bulletin de paie",
];

const compteCourantSalarie = (
  slug: string,
  nom: string,
  tranche: string,
  ancien: string,
): Produit => ({
  slug,
  nom,
  groupe: "Particuliers",
  accroche: `Le compte courant des salariés dont le revenu mensuel est ${tranche}.`,
  description: [
    "Domiciliez votre salaire à la FICA et gérez votre argent au quotidien : dépôts, retraits, virements et accès aux crédits réservés aux salariés.",
    "Votre compte est consultable à tout moment depuis n'importe quel téléphone, sans connexion internet, grâce à FICA MOBILE (#808#).",
  ],
  pointsCles: [
    { libelle: "Revenu mensuel", valeur: tranche.replace(/^(de |d')/, "") },
    { libelle: "Versement à l'ouverture", valeur: "0 FCFA" },
  ],
  documents: piecesSalarie,
  action: "ouverture",
  anciensSlugs: [ancien],
});

const conseiller =
  "Faites votre demande en ligne ou rendez-vous en agence : un conseiller clientèle vous accompagne dans la constitution de votre dossier.";

export const univers: Univers[] = [
  {
    slug: "comptes",
    nom: "Comptes courants et épargne",
    nomCourt: "Comptes",
    icone: "portefeuille",
    accroche: "Un compte adapté à chaque profil : salariés, entrepreneurs, entreprises, associations et enfants.",
    introduction:
      "Nos comptes courants constituent une base solide pour gérer vos opérations du quotidien, épargner pour l'avenir ou solliciter un crédit pour vos projets. Ils sont particulièrement adaptés aux indépendants, aux petits commerçants et aux associations.",
    anciensSlugs: ["category/compte-fica", "comptes-courant-2", "compte-depargne", "demande-douverture-de-compte"],
    produits: [
      compteCourantSalarie("compte-courant-bronze", "Compte courant Bronze", "inférieur à 50 000 FCFA", "comptes-courant-bronze"),
      compteCourantSalarie("compte-courant-or", "Compte courant Or", "de 50 001 à 100 000 FCFA", "comptes-courant-or"),
      compteCourantSalarie("compte-courant-diamant", "Compte courant Diamant", "supérieur à 100 000 FCFA", "comptes-courant-diamant"),
      {
        slug: "compte-non-salarie",
        nom: "Compte non salarié",
        groupe: "Particuliers",
        accroche: "Pour les entrepreneurs, artisans, commerçants et éleveurs.",
        description: [
          "Le compte des travailleurs indépendants : encaissez vos recettes, sécurisez votre trésorerie et accédez aux crédits destinés aux non-salariés.",
          conseiller,
        ],
        pointsCles: [{ libelle: "Versement à l'ouverture", valeur: "20 000 FCFA" }],
        documents: piecesParticulier,
        action: "ouverture",
        anciensSlugs: ["compte-non-salarie"],
      },
      {
        slug: "compte-epargne-ordinaire",
        nom: "Compte épargne ordinaire",
        groupe: "Épargne",
        accroche: "Mettez de côté pour les imprévus et vos projets, et faites fructifier votre argent.",
        description: [
          "Le compte épargne vous permet de placer l'argent dont vous n'avez pas besoin immédiatement et de percevoir des intérêts. Il est recommandé aux travailleurs indépendants, aux étudiants et aux petites entreprises.",
        ],
        pointsCles: [
          { libelle: "Intérêts créditeurs", valeur: "jusqu'à 4 % par an" },
          { libelle: "Versement à l'ouverture", valeur: "15 000 FCFA" },
        ],
        documents: [
          "Deux photos d'identité couleur 4×4",
          "Copie de la pièce d'identité nationale en cours de validité",
          "Justificatif de revenu (bulletin de paie, badge professionnel, attestation d'emploi, preuve de propriété de l'entreprise…)",
        ],
        action: "ouverture",
        anciensSlugs: ["comptes-depargnes-ordinaire"],
      },
      {
        slug: "compte-epargne-junior",
        nom: "Compte épargne Junior",
        groupe: "Épargne",
        accroche: "Préparez dès aujourd'hui l'avenir de vos enfants de moins de 18 ans.",
        description: [
          "Le compte épargne Junior est ouvert au nom de l'enfant et géré par son parent. Une excellente manière de constituer progressivement une épargne pour ses études et ses projets.",
        ],
        pointsCles: [{ libelle: "Âge", valeur: "moins de 18 ans" }],
        documents: [
          "Copie de l'acte de naissance de l'enfant",
          "Deux photos d'identité couleur 4×4 de l'enfant",
          "Deux photos d'identité couleur 4×4 du parent",
          "Copie de la pièce d'identité du parent en cours de validité",
        ],
        action: "ouverture",
        anciensSlugs: ["comptes-depargnes-junior-2"],
      },
      {
        slug: "compte-courant-societe",
        nom: "Compte courant Société",
        groupe: "Entreprises et associations",
        accroche: "Le compte des SARL, SURL et sociétés anonymes.",
        description: [
          "Le compte courant Société porte les achats, retraits, dépôts et moyens de paiement de votre société au quotidien. C'est le seul compte de dépôt pouvant être alternativement créditeur et débiteur.",
          conseiller,
        ],
        documents: [
          "Statuts et procès-verbal de l'assemblée générale constitutive ou extraordinaire",
          "Attestation fiscale (NIF)",
          "Registre du commerce et du crédit mobilier (RCCM)",
          "Copie de la pièce d'identité valide de chaque signataire",
          "Deux photos d'identité par signataire",
          "Copie de l'attestation consulaire",
          "Copie de la patente de l'année en cours",
        ],
        action: "ouverture",
        anciensSlugs: ["comptes-courant-societe"],
      },
      {
        slug: "compte-entreprise-individuelle",
        nom: "Compte Entreprise individuelle",
        groupe: "Entreprises et associations",
        accroche: "Séparez vos finances professionnelles et personnelles.",
        description: [
          "Le compte courant Entreprise individuelle porte les achats, retraits, dépôts et moyens de paiement de votre activité. Il peut être alternativement créditeur et débiteur.",
          conseiller,
        ],
        documents: [
          "Deux photos d'identité par signataire",
          "Attestation fiscale (NIF)",
          "Registre du commerce et du crédit mobilier (RCCM)",
          "Attestation consulaire",
        ],
        action: "ouverture",
        anciensSlugs: ["comptes-entreprise-individuelle"],
      },
      {
        slug: "compte-association-ong",
        nom: "Compte Association, GIC et ONG",
        groupe: "Entreprises et associations",
        accroche: "Le compte des associations, groupements d'intérêt commun et ONG.",
        description: [
          "Ce compte courant accueille les opérations quotidiennes de votre structure : achats, retraits, dépôts et moyens de paiement.",
          conseiller,
        ],
        documents: [
          "Statuts et procès-verbal de l'assemblée générale constitutive ou extraordinaire",
          "Agrément ou attestation de dépôt de la demande d'agrément",
          "Règlement intérieur",
          "Deux photos d'identité couleur 4×4 par mandataire signataire",
          "Pièce d'identité en cours de validité de chaque signataire",
        ],
        action: "ouverture",
        anciensSlugs: ["comptes-courant-association-ong"],
      },
    ],
  },
  {
    slug: "credits",
    nom: "Crédits",
    nomCourt: "Crédits",
    icone: "credit",
    accroche: "Des financements pour vos besoins personnels, vos projets professionnels et la croissance de votre entreprise.",
    introduction:
      "Découvert ponctuel ou permanent, crédits amortissables, financement de marchés : la FICA étudie chaque demande au plus près de votre situation et vous propose un remboursement adapté à vos revenus.",
    anciensSlugs: ["category/credit-fica", "autres-credits-amortissables"],
    produits: [
      {
        slug: "decouvert-ponctuel",
        nom: "Découvert ponctuel",
        groupe: "Découverts",
        accroche: "Une facilité de caisse pour faire face à une dépense particulière.",
        description: [
          "Le découvert ponctuel est une facilité de caisse accordée de manière ponctuelle, qui vous permet de faire face à une dépense imprévue ou exceptionnelle.",
        ],
        conditions: ["Être une personne physique ou morale cliente de la FICA", "Détenir un compte courant à la FICA"],
        action: "demande",
        anciensSlugs: ["credit-decouvert-ponctuel"],
      },
      {
        slug: "decouvert-permanent",
        nom: "Découvert permanent",
        groupe: "Découverts",
        accroche: "Une réserve de trésorerie sur une durée plus longue pour dynamiser votre activité.",
        description: [
          "Le découvert permanent est mis à votre disposition pour une durée déterminée et plus longue. Il permet à nos clients de soutenir et redynamiser leurs activités.",
        ],
        conditions: ["Être une personne physique ou morale", "Détenir un compte courant à la FICA"],
        action: "demande",
        anciensSlugs: ["credit-decouvert-permanent"],
      },
      {
        slug: "credit-salaries",
        nom: "Crédit amortissable salariés",
        groupe: "Crédits amortissables",
        accroche: "Financez vos projets personnels avec des mensualités prélevées sur votre salaire.",
        description: [
          "Équipement, logement, santé, véhicule : le crédit amortissable salariés finance vos projets personnels. Le remboursement s'effectue par mensualités prélevées sur votre salaire domicilié à la FICA.",
        ],
        conditions: ["Être salarié", "Domicilier son salaire à la FICA"],
        action: "demande",
        aValider: true,
        anciensSlugs: ["credit-salaries"],
      },
      {
        slug: "credit-non-salaries",
        nom: "Crédit amortissable non salariés",
        groupe: "Crédits amortissables",
        accroche: "Pour les commerçants, artisans, éleveurs et entrepreneurs.",
        description: [
          "Ce crédit finance le développement de votre activité indépendante avec un échéancier adapté au rythme de vos revenus.",
        ],
        conditions: ["Détenir un compte courant à la FICA"],
        action: "demande",
        aValider: true,
        anciensSlugs: ["credit-non-salairies"],
      },
      {
        slug: "credit-personne-morale",
        nom: "Crédit amortissable personne morale",
        groupe: "Crédits amortissables",
        accroche: "Le financement des investissements et de l'exploitation des entreprises et associations.",
        description: [
          "Sociétés, entreprises individuelles et associations peuvent financer leurs besoins d'investissement ou d'exploitation, remboursés selon un échéancier convenu.",
        ],
        conditions: ["Détenir un compte courant personne morale à la FICA"],
        action: "demande",
        aValider: true,
        anciensSlugs: ["credit-personne-morale"],
      },
      {
        slug: "credit-scolaire",
        nom: "Crédit scolaire",
        groupe: "Crédits amortissables",
        accroche: "Abordez la rentrée sereinement : inscriptions, écolage, fournitures, uniformes.",
        description: [
          "Le crédit scolaire est un prêt qui vous aide à faire face aux dépenses de la rentrée : frais d'inscription et d'écolage, fournitures, uniformes. La FICA vous accompagne tout au long de cette période.",
        ],
        conditions: ["Être une personne physique", "Avoir un compte salaire domicilié à la FICA"],
        action: "demande",
        anciensSlugs: ["credit-scolaire"],
      },
      {
        slug: "credit-evenementiel",
        nom: "Crédit événementiel",
        groupe: "Crédits amortissables",
        accroche: "Crédit Arbre de Noël et crédit Tabaski : préparez les fêtes en toute tranquillité.",
        description: [
          "Pour les grands moments de l'année, la FICA propose deux formules : le crédit Arbre de Noël pour les fêtes de fin d'année et le crédit Tabaski.",
        ],
        action: "demande",
        aValider: true,
        anciensSlugs: ["credit-evenementiel"],
      },
      {
        slug: "financement-de-marches",
        nom: "Financement de marchés",
        groupe: "Entreprises",
        accroche: "Préfinancez l'exécution des marchés publics et privés remportés par votre entreprise.",
        description: [
          "Vous avez remporté un marché ? La FICA finance son exécution ; le remboursement est assuré par le paiement du marché domicilié dans nos livres.",
        ],
        action: "demande",
        aValider: true,
        anciensSlugs: ["financement-de-marche"],
      },
      {
        slug: "ligne-de-financement",
        nom: "Ligne de financement",
        groupe: "Entreprises",
        accroche: "Une enveloppe de crédit mobilisable selon vos besoins.",
        description: [
          "La ligne de financement met à la disposition d'une entreprise ou d'un partenaire institutionnel une enveloppe de crédit, mobilisable en fonction de ses besoins dans une limite et une durée convenues.",
        ],
        action: "demande",
        aValider: true,
        anciensSlugs: ["ligne-de-financement"],
      },
      {
        slug: "credit-aux-pme",
        nom: "Crédit aux PME",
        groupe: "Entreprises",
        accroche: "Fonds de roulement, équipement, développement : un partenaire pour les PME centrafricaines.",
        description: [
          "La FICA accompagne les petites et moyennes entreprises dans le financement de leur fonds de roulement, de leurs équipements et de leurs projets de développement.",
        ],
        action: "demande",
        aValider: true,
        anciensSlugs: ["credit-aux-pme"],
      },
    ],
  },
  {
    slug: "engagements-par-signature",
    nom: "Engagements par signature",
    nomCourt: "Engagements",
    icone: "signature",
    accroche: "Escomptes, cautions et avals : la signature de la FICA au service de vos affaires.",
    introduction:
      "Par un engagement par signature, la FICA garantit ou mobilise des créances pour le compte de ses clients. Ces solutions soutiennent votre trésorerie et votre crédibilité auprès de vos partenaires et des administrations.",
    anciensSlugs: [],
    produits: [
      {
        slug: "escompte-de-cheques",
        nom: "Escompte de chèques",
        accroche: "Disposez immédiatement de la valeur d'un chèque.",
        description: [
          "L'escompte de chèques vous permet d'obtenir la valeur d'un chèque avant son encaissement définitif, pour soulager votre trésorerie.",
        ],
        action: "demande",
        aValider: true,
        anciensSlugs: ["escompte-cheques"],
      },
      {
        slug: "escompte-de-traites",
        nom: "Escompte de traites",
        accroche: "Mobilisez vos effets de commerce avant leur échéance.",
        description: [
          "Lettres de change et billets à ordre : la FICA vous avance le montant de vos effets de commerce avant leur échéance.",
        ],
        action: "demande",
        aValider: true,
        anciensSlugs: ["escomptes-traites"],
      },
      {
        slug: "cautions-et-avals",
        nom: "Cautions et avals",
        accroche: "La FICA s'engage pour vous auprès de vos partenaires.",
        description: [
          "La caution bancaire est un engagement par signature que la FICA prend pour le compte de son client en faveur d'un tiers.",
        ],
        pointsCles: [
          { libelle: "Caution de soumission", valeur: "Marchés publics et privés" },
          { libelle: "Caution d'avance de démarrage", valeur: "Exécution de marchés" },
          { libelle: "Caution de bonne fin", valeur: "Garantie d'exécution" },
          { libelle: "Caution en douane", valeur: "Opérations d'import" },
        ],
        action: "demande",
        anciensSlugs: ["cautions-et-avals", "caution-bancaire"],
      },
    ],
  },
  {
    slug: "paiements",
    nom: "Paiements",
    nomCourt: "Paiements",
    icone: "paiement",
    accroche: "Pensions, allocations familiales et paiement des salaires sur site, selon un calendrier connu à l'avance.",
    introduction:
      "En partenariat avec les institutions publiques et la Caisse nationale de sécurité sociale (CNSS), la FICA assure le paiement de prestations sociales et de salaires selon un calendrier établi et communiqué à l'avance aux bénéficiaires.",
    anciensSlugs: ["category/paiement-fifia"],
    produits: [
      {
        slug: "pension-des-retraites",
        nom: "Pension des retraités",
        accroche: "Percevez votre pension en toute sécurité.",
        description: [
          "La FICA assure le paiement des pensions de retraite selon un calendrier établi et communiqué à l'avance aux bénéficiaires.",
          "Renseignez-vous en ligne ou en agence : un conseiller vous accompagne dans vos démarches.",
        ],
        action: "information",
        anciensSlugs: ["paiement-pension"],
      },
      {
        slug: "allocations-familiales",
        nom: "Allocations familiales",
        accroche: "Le paiement des allocations familiales de la CNSS.",
        description: [
          "En partenariat avec la Caisse nationale de sécurité sociale, la FICA assure le paiement des allocations familiales selon un calendrier établi et communiqué à l'avance aux bénéficiaires.",
        ],
        action: "information",
        anciensSlugs: ["paiement-allocation-familiale"],
      },
      {
        slug: "paiement-sur-site",
        nom: "Paiement sur site",
        accroche: "Nous installons un guichet chez vous pour payer vos employés.",
        description: [
          "Pour les entreprises, la FICA installe un guichet mobile sur les sites convenus afin d'effectuer directement le paiement des employés.",
        ],
        action: "demande",
        anciensSlugs: ["paiement-sur-site"],
      },
      {
        slug: "autres-paiements",
        nom: "Autres paiements de prestations",
        accroche: "Le paiement de prestations pour le compte de nos partenaires.",
        description: [
          "La FICA assure le paiement de prestations pour le compte d'institutions publiques et privées partenaires.",
        ],
        action: "information",
        aValider: true,
        anciensSlugs: ["autres-paiements-de-prestations"],
      },
    ],
  },
  {
    slug: "attestations",
    nom: "Attestations et documents bancaires",
    nomCourt: "Attestations",
    icone: "attestation",
    accroche: "Marchés publics, visa, fiscalité : obtenez rapidement les documents dont vous avez besoin.",
    introduction:
      "La FICA vous délivre les attestations bancaires exigées pour vos démarches administratives, vos candidatures aux marchés publics ou vos demandes de visa. Faites votre demande en ligne ou en agence.",
    anciensSlugs: ["category/attestation"],
    produits: [
      {
        slug: "attestation-de-domiciliation-bancaire",
        nom: "Attestation de domiciliation bancaire",
        accroche: "Justifiez de l'adresse de domiciliation de votre entreprise.",
        description: [
          "L'attestation de domiciliation désigne le siège social d'une entreprise et a valeur probatoire : elle prouve que l'entreprise dispose d'une adresse de domiciliation et du droit de l'utiliser.",
        ],
        pointsCles: [{ libelle: "Délai de délivrance", valeur: "moins de 24 h ouvrables" }],
        action: "demande",
        anciensSlugs: ["attestation-de-domiciliation-bancaire"],
      },
      {
        slug: "attestation-de-solde",
        nom: "Attestation de solde",
        accroche: "Prouvez le remboursement intégral de votre crédit.",
        description: [
          "Vous avez remboursé l'intégralité de votre crédit ? Demandez une attestation de solde pour justifier de ce remboursement.",
        ],
        pointsCles: [{ libelle: "Délai de délivrance", valeur: "moins de 24 h ouvrables" }],
        action: "demande",
        anciensSlugs: ["attestation-de-solde"],
      },
      {
        slug: "attestation-administration-fiscale",
        nom: "Attestation d'administration fiscale",
        accroche: "Prouvez que votre entreprise est à jour de ses obligations fiscales.",
        description: [
          "Pour candidater à un marché public, une entreprise doit prouver qu'elle est à jour de ses obligations fiscales. La FICA vous accompagne dans l'obtention de ce document.",
        ],
        action: "demande",
        anciensSlugs: ["attestation-dadministration-fiscale"],
      },
      {
        slug: "attestation-de-non-engagement",
        nom: "Attestation de non-engagement",
        accroche: "Une pièce obligatoire pour concourir aux marchés publics.",
        description: [
          "L'attestation de non-engagement établit la situation d'une personne physique ou morale vis-à-vis du Trésor public. Elle est essentielle et obligatoire pour participer aux marchés publics.",
        ],
        action: "demande",
        anciensSlugs: ["attestation-de-non-engagement"],
      },
      {
        slug: "attestation-de-cloture-de-compte",
        nom: "Attestation de clôture de compte",
        accroche: "La confirmation officielle de la clôture de votre compte.",
        description: [
          "Ce document confirme la clôture définitive de votre compte dans les livres de la FICA.",
        ],
        action: "demande",
        aValider: true,
        anciensSlugs: ["attestation-de-cloture-de-compte"],
      },
      {
        slug: "attestation-de-virement-irrevocable",
        nom: "Attestation de virement irrévocable (visa)",
        accroche: "Justifiez de vos moyens d'existence auprès des ambassades.",
        description: [
          "L'attestation de virement irrévocable (AVI) émise par la FICA permet de justifier de vos moyens d'existence auprès des ambassades dans le cadre d'une demande de visa.",
        ],
        action: "demande",
        anciensSlugs: ["attestation-virement-irrevocable-visa"],
      },
      {
        slug: "attestation-de-solvabilite",
        nom: "Attestation de solvabilité",
        accroche: "Les informations de base sur votre situation financière.",
        description: [
          "Établie à votre demande, l'attestation de solvabilité prouve qu'un compte est ouvert à votre nom à la FICA et renseigne sur votre situation financière.",
        ],
        action: "demande",
        anciensSlugs: ["attestation-de-solvabilite"],
      },
      {
        slug: "attestation-de-non-faillite",
        nom: "Attestation de non-faillite",
        accroche: "Pour vos procédures d'adjudication et démarches administratives.",
        description: [
          "L'attestation de non-faillite est exigée dans la plupart des procédures d'adjudication et pour diverses démarches administratives. La FICA vous accompagne dans son obtention.",
        ],
        action: "demande",
        anciensSlugs: ["attestation-de-non-faillite"],
      },
      {
        slug: "attestation-de-capacite-financiere",
        nom: "Attestation de capacité financière",
        accroche: "La FICA confirme votre crédibilité financière auprès des tiers.",
        description: [
          "L'attestation de capacité financière atteste auprès d'un tiers qu'une personne physique ou morale dispose de ressources financières suffisantes. Elle est déterminante pour les entreprises qui candidatent aux marchés publics et privés.",
        ],
        action: "demande",
        anciensSlugs: ["attestation-de-capacite-financiere"],
      },
      {
        slug: "releve-d-identite-bancaire",
        nom: "Relevé d'identité bancaire (RIB)",
        accroche: "Toutes les coordonnées pour envoyer ou recevoir de l'argent.",
        description: [
          "Le RIB réunit les informations nécessaires à vos transactions : numéro de compte, code banque, code guichet et clé RIB. Il vous est remis à l'ouverture de votre compte.",
        ],
        action: "demande",
        anciensSlugs: ["releve-didentite-bancaire"],
      },
    ],
  },
  {
    slug: "services-au-quotidien",
    nom: "Services au quotidien",
    nomCourt: "Services",
    icone: "services",
    accroche: "FICA MOBILE, transferts, change, virements, SMS Banking et assurance.",
    introduction:
      "Au-delà du compte, la FICA met à votre disposition des services pratiques pour suivre, envoyer et recevoir votre argent, en Centrafrique comme à l'international.",
    anciensSlugs: ["category/autres-prestations-fica", "category/services"],
    produits: [
      {
        slug: "fica-mobile",
        nom: "FICA MOBILE",
        accroche: "Votre compte depuis n'importe quel téléphone, sans internet : composez #808#.",
        description: [
          "Consultez votre solde, retracez vos dernières opérations, transférez de compte à compte et envoyez vers Orange Money, sans connexion internet.",
        ],
        action: "information",
        pageDediee: "/fica-mobile",
        anciensSlugs: ["lancement-de-la-solution-sans-connexion-internet-fica-mobile"],
      },
      {
        slug: "sms-banking",
        nom: "SMS Banking",
        accroche: "Soyez informé de chaque opération, quel que soit votre opérateur.",
        description: [
          "Le SMS Banking vous informe de vos opérations bancaires où que vous soyez, quel que soit votre opérateur de téléphonie mobile, et réduit le risque de fraude.",
        ],
        action: "demande",
        anciensSlugs: ["sms-banking-2"],
      },
      {
        slug: "transfert-d-argent",
        nom: "Transfert d'argent",
        accroche: "Envoyez et recevez de l'argent dans le monde entier avec Western Union et MoneyGram.",
        description: [
          "Agent agréé Western Union et MoneyGram, la FICA vous permet d'envoyer et de recevoir de l'argent depuis et vers plus de 200 pays et territoires, directement à son agence de Bangui.",
        ],
        action: "information",
        anciensSlugs: ["transfert-dargent"],
      },
      {
        slug: "operations-de-change",
        nom: "Opérations de change",
        accroche: "Achat et vente de dollars, d'euros et de francs CFA d'Afrique de l'Ouest (XOF).",
        description: [
          "La FICA achète et vend des devises contre le franc CFA, exclusivement pour les besoins liés aux voyages hors de la zone CEMAC, conformément à l'instruction n° 011/GR/2019 du 10 juin 2019 relative au change manuel dans la CEMAC.",
          "Cette activité respecte la réglementation relative à la lutte contre le blanchiment des capitaux et le financement du terrorisme et de la prolifération.",
        ],
        pointsCles: [
          { libelle: "Devises", valeur: "USD · EUR · XOF" },
          { libelle: "Usage", valeur: "Voyages hors CEMAC" },
        ],
        action: "information",
        anciensSlugs: ["change-manuel"],
      },
      {
        slug: "virement-bancaire",
        nom: "Virement et domiciliation des salaires",
        accroche: "Domiciliez le paiement des salaires de votre personnel à la FICA.",
        description: [
          "Les partenaires institutionnels peuvent domicilier le paiement des salaires de leur personnel à la FICA. Les agents ouvrent leur compte et obtiennent leur chéquier pour effectuer leurs opérations à nos guichets.",
          "L'employeur peut ouvrir son propre compte à la FICA ou couvrir les salaires depuis le compte de la FICA dans les banques de la place.",
        ],
        action: "demande",
        anciensSlugs: ["virement"],
      },
      {
        slug: "remise-de-cheques",
        nom: "Remise de chèques à l'encaissement",
        accroche: "Encaissez sur votre compte FICA les chèques tirés sur les banques de la place.",
        description: [
          "Vous êtes payé par chèque tiré sur une banque commerciale de la place ? Remettez-le sur votre compte FICA : nous nous chargeons de son encaissement.",
        ],
        action: "information",
        anciensSlugs: ["remise-cheque-a-lencaissement"],
      },
      {
        slug: "collecte-de-depots",
        nom: "Collecte de dépôts",
        accroche: "Nous venons chercher vos fonds, votre compte est crédité aussitôt.",
        description: [
          "Nos équipes se rendent chez vous pour collecter vos valeurs (espèces ou chèques) contre décharge. Votre compte est aussitôt crédité dans nos livres. Cette prestation s'effectue dans le cadre d'un contrat.",
        ],
        action: "demande",
        anciensSlugs: ["collecte-de-depot"],
      },
      {
        slug: "banque-assurance",
        nom: "Banque-assurance",
        accroche: "Des solutions d'assurance avec SUNU Assurances et ACAM Vie.",
        description: [
          "En partenariat avec SUNU Assurances et ACAM Vie, la FICA vous donne accès à des produits d'assurance depuis son agence.",
        ],
        action: "information",
        aValider: true,
        anciensSlugs: ["produits-banque-assurance"],
      },
    ],
  },
];

export function trouverUnivers(slug: string) {
  return univers.find((u) => u.slug === slug);
}

export function trouverProduit(slugUnivers: string, slugProduit: string) {
  const u = trouverUnivers(slugUnivers);
  const produit = u?.produits.find((p) => p.slug === slugProduit);
  return u && produit ? { univers: u, produit } : undefined;
}

export function lienProduit(u: Univers, p: Produit) {
  return p.pageDediee ?? `/services/${u.slug}/${p.slug}`;
}

/** Regroupe les produits d'un univers par `groupe`, dans l'ordre d'apparition. */
export function produitsParGroupe(u: Univers) {
  const groupes = new Map<string, Produit[]>();
  for (const p of u.produits) {
    const cle = p.groupe ?? "";
    groupes.set(cle, [...(groupes.get(cle) ?? []), p]);
  }
  return [...groupes.entries()].map(([groupe, produits]) => ({ groupe, produits }));
}
