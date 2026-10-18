/* Contenus institutionnels : mot du Directeur général, valeurs,
   gouvernance, partenaires, galerie et actualités. */

export const motDuDirecteur = {
  auteur: "Emmanuel KOKO-MICA",
  fonction: "Directeur général",
  salutation: "Chers clients, chers partenaires, chers visiteurs,",
  paragraphes: [
    "C'est avec un profond sentiment de fierté et de responsabilité que je vous souhaite la bienvenue sur le site officiel de la Financière de Centrafrique, FICA S.A.",
    "Depuis sa création, la FICA S.A. s'est donné pour mission d'être bien plus qu'un établissement de microfinance : nous voulons être un véritable levier de développement économique et social pour la République centrafricaine. Notre ambition est claire : offrir à chaque citoyen, où qu'il soit, la possibilité d'accéder à des services financiers modernes, sûrs et adaptés à ses besoins.",
    "Fondée sur des valeurs d'intégrité, d'honnêteté, d'excellence, d'engagement mutuel, de diversité culturelle, de passion d'entreprendre et d'indépendance, la FICA S.A. avance avec conviction sur le chemin d'une finance inclusive, éthique et responsable. Ces principes ne sont pas de simples mots, mais des repères qui orientent nos décisions et guident l'action quotidienne de nos équipes.",
    "Grâce à la confiance de nos actionnaires, à l'engagement de nos collaborateurs et à la fidélité de nos clients, la FICA S.A. a su construire une réputation solide fondée sur la transparence, la rigueur et la proximité. Notre agrément officiel, obtenu le 20 juillet 2020 après avis conforme de la COBAC, marque une étape importante de ce parcours, mais aussi le point de départ d'une nouvelle ère d'innovation.",
    "Aujourd'hui, nous mettons la technologie au service de l'inclusion financière. Nous croyons que chacun, quelle que soit sa condition ou sa localisation, doit pouvoir gérer, épargner ou transférer son argent en toute simplicité et en toute sécurité, sans dépendre d'internet.",
    "La FICA S.A. se veut un partenaire de confiance, proche des réalités de la population et acteur du progrès économique national. Nous sommes convaincus que la stabilité et la prospérité de notre pays passent par une finance accessible, équitable et centrée sur l'humain.",
    "Ensemble, continuons à bâtir une FICA S.A. forte, prospère et tournée vers l'avenir.",
  ],
};

export const valeurs = [
  "Intégrité",
  "Excellence dans le service au client",
  "Engagement mutuel",
  "Force issue de la diversité culturelle",
  "Passion d'entreprendre",
  "Indépendance",
];

/* Jalons vérifiés sur le site d'origine (agrément, communiqués). */
export const jalons = [
  { annee: "2020", titre: "Agrément COBAC", texte: "Le 20 juillet 2020, la FICA obtient son agrément officiel après avis conforme de la Commission bancaire de l'Afrique centrale." },
  { annee: "2026", titre: "Lancement de FICA MOBILE", texte: "Première solution bancaire 100 % sans internet en Centrafrique, accessible au #808# depuis n'importe quel téléphone." },
  { annee: "2026", titre: "Six ans au service des Centrafricains", texte: "La FICA célèbre six années d'engagement pour la sécurité et la disponibilité des dépôts de ses clients." },
];

export const engagements = [
  {
    titre: "Éthique et déontologie",
    texte:
      "Transparence, rigueur et proximité fondent notre relation avec nos clients. Nos activités respectent la réglementation de la COBAC et de la BEAC, notamment en matière de lutte contre le blanchiment des capitaux et le financement du terrorisme.",
  },
  {
    titre: "Responsabilité",
    texte:
      "Nous mettons la technologie au service de l'inclusion financière, pour que chaque Centrafricain, quelle que soit sa condition ou sa localisation, puisse gérer, épargner et transférer son argent en toute sécurité.",
  },
  {
    titre: "Proximité",
    texte:
      "Paiement des pensions et des allocations familiales, guichets sur site, collecte de dépôts : nous allons au-devant des populations et des entreprises.",
  },
];

export const actionnaires = [
  { nom: "KOKO-MICA Emmanuel", actions: 184.6, part: 37 },
  { nom: "KOKO-MICA Irène", actions: 64.4, part: 13 },
  { nom: "KASSE Amadou", actions: 60, part: 12 },
  { nom: "TAGO Vianey Marius", actions: 50, part: 10 },
  { nom: "NZAPASSALA Maïmouna", actions: 50, part: 10 },
  { nom: "NGUEREKATA YAKONGBO Liliane", actions: 50, part: 10 },
  { nom: "YANGA BILI NAWILI Marie", actions: 41, part: 8 },
];

export const conseilAdministration = [
  { nom: "Irène MOUSSA-KEMBE née BELLA", fonction: "Présidente", statut: "Indépendante" },
  { nom: "Emmanuel KOKO-MICA", fonction: "Administrateur", statut: "Exécutif" },
  { nom: "Irène KOKO-MICA née GREMBE", fonction: "Administratrice", statut: "Exécutive" },
  { nom: "Jean Steve BATA II", fonction: "Administrateur", statut: "Indépendant" },
  { nom: "Vianey Marius TAGO", fonction: "Administrateur", statut: "Non exécutif" },
];

export const direction = [
  { nom: "Emmanuel KOKO-MICA", fonction: "Directeur général" },
  { nom: "Irène KOKO-MICA", fonction: "Directrice financière" },
];

export const datesCles = [
  { date: "1er janvier", libelle: "Nouvel an" },
  { date: "29 mars", libelle: "Commémoration de la mort du Président fondateur Barthélemy Boganda" },
  { date: "1er mai", libelle: "Fête du Travail" },
  { date: "20 juillet", libelle: "Anniversaire de la Financière de Centrafrique", fica: true },
  { date: "13 août", libelle: "Fête de l'Indépendance" },
  { date: "1er décembre", libelle: "Fête nationale" },
  { date: "25 décembre", libelle: "Noël" },
];

export type Partenaire = { nom: string; logo: string; categorie: string };

export const partenaires: Partenaire[] = [
  { nom: "Caisse nationale de sécurité sociale", logo: "cnss.jpeg", categorie: "Institutions" },
  { nom: "ENERCA", logo: "enerca.png", categorie: "Institutions" },
  { nom: "Office national du matériel", logo: "onm.png", categorie: "Institutions" },
  { nom: "C.A.E", logo: "c-a-e.png", categorie: "Institutions" },
  { nom: "Ecobank", logo: "ecobank.jpeg", categorie: "Banques" },
  { nom: "BGFIBank", logo: "bgfi.jpeg", categorie: "Banques" },
  { nom: "BSIC", logo: "bsic.png", categorie: "Banques" },
  { nom: "Banque Populaire Maroco-Centrafricaine", logo: "banque-morroco-centrafricaine.png", categorie: "Banques" },
  { nom: "BADICA", logo: "badica.png", categorie: "Entreprises" },
  { nom: "Orange", logo: "orange.jpeg", categorie: "Télécoms" },
  { nom: "Telecel", logo: "telecel.jpeg", categorie: "Télécoms" },
  { nom: "Western Union", logo: "western-union.png", categorie: "Transfert d'argent" },
  { nom: "MoneyGram", logo: "money-gram.png", categorie: "Transfert d'argent" },
  { nom: "SUNU Assurances", logo: "sunu-assurance.png", categorie: "Assurances" },
  { nom: "ACAM Vie", logo: "acam-vie.jpg", categorie: "Assurances" },
  { nom: "AGC Assurances", logo: "agc-assurance.png", categorie: "Assurances" },
  { nom: "OIM", logo: "oim.png", categorie: "Organisations internationales" },
  { nom: "Médecins sans frontières", logo: "msf.png", categorie: "Organisations internationales" },
  { nom: "CIFOM", logo: "cifom.png", categorie: "Entreprises" },
  { nom: "CAGECFI", logo: "cagecfi.jpeg", categorie: "Entreprises" },
  { nom: "IGA Immo", logo: "iga.png", categorie: "Entreprises" },
  { nom: "Dauphin Royal", logo: "dauphin-royal.jpeg", categorie: "Entreprises" },
];

export type Photo = { src: string; alt: string; largeur: number; hauteur: number };

/* Photos de départ de la médiathèque (copiées dans la base au premier lancement). */
export const galerieInitiale: Photo[] = [
  { src: "/images/galerie/fica-13.jpg", alt: "L'équipe FICA lors du lancement de FICA MOBILE", largeur: 1080, hauteur: 877 },
  { src: "/images/galerie/fica-09.jpg", alt: "Les conseillères de la FICA en tenue officielle", largeur: 1080, hauteur: 810 },
  { src: "/images/galerie/fica-16.jpg", alt: "Un client reçu au guichet de l'agence de Bangui", largeur: 1280, hauteur: 720 },
  { src: "/images/galerie/fica-04.jpg", alt: "L'équipe FICA en pagne lors d'une célébration", largeur: 1080, hauteur: 810 },
  { src: "/images/galerie/fica-06.jpg", alt: "Les agents de guichet de la FICA", largeur: 1080, hauteur: 810 },
  { src: "/images/galerie/equipe-hall.jpg", alt: "L'équipe FICA dans le hall de l'agence", largeur: 1024, hauteur: 591 },
  { src: "/images/galerie/fica-14.jpg", alt: "Une conseillère accompagne un client dans ses démarches", largeur: 1600, hauteur: 901 },
  { src: "/images/galerie/fica-08.jpg", alt: "Des clients accueillis à l'agence", largeur: 1080, hauteur: 810 },
  { src: "/images/galerie/fica-11.jpg", alt: "Les collaboratrices de la FICA réunies en pagne", largeur: 1280, hauteur: 960 },
  { src: "/images/galerie/fica-15.jpg", alt: "Conseillères FICA MOBILE à leur poste", largeur: 1600, hauteur: 901 },
  { src: "/images/galerie/fica-01.jpg", alt: "Les conseillères de la FICA", largeur: 1080, hauteur: 810 },
  { src: "/images/galerie/fica-07.jpg", alt: "Les agents de guichet en uniforme", largeur: 1080, hauteur: 810 },
  { src: "/images/galerie/fica-12.jpg", alt: "L'équipe FICA MOBILE aux guichets de l'agence", largeur: 869, hauteur: 722 },
  { src: "/images/galerie/fica-10.jpg", alt: "L'équipe FICA en tenue violette", largeur: 1170, hauteur: 675 },
  { src: "/images/galerie/fica-03.jpg", alt: "Collaboratrices de la FICA lors d'une célébration", largeur: 810, hauteur: 1080 },
  { src: "/images/galerie/fica-02.jpg", alt: "Collaboratrices de la FICA en pagne", largeur: 810, hauteur: 1080 },
  { src: "/images/galerie/fica-05.jpg", alt: "Collaboratrices de la FICA aux guichets", largeur: 810, hauteur: 1080 },
];

/* Contenu de départ des actualités, copié une seule fois dans la base au
   premier lancement ; ensuite, les actualités se gèrent dans le back-office.
   Corps : paragraphes séparés par une ligne vide, lignes « - » pour les listes. */
export type Actualite = {
  slug: string;
  titre: string;
  date: string;
  categorie: string;
  resume: string;
  image: string;
  corps: string;
  photos: string[];
};

export const actualitesInitiales: Actualite[] = [
  {
    slug: "lancement-de-fica-mobile",
    titre: "FICA MOBILE : la banque accessible à tous, même sans internet",
    date: "2026-07-04",
    categorie: "Communiqué",
    resume:
      "La Financière de Centrafrique lance FICA MOBILE, la première solution bancaire 100 % sans internet en Centrafrique. Composez #808# depuis n'importe quel téléphone.",
    image: "/images/actualites/equipe-fica-mobile.jpg",
    corps: [
      "La Financière de Centrafrique innove et rapproche ses services de sa clientèle avec le lancement officiel de FICA MOBILE.",
      "Pour la première fois en Centrafrique, une banque met à disposition une solution 100 % sans internet. Il suffit de souscrire puis de composer le #808# depuis n'importe quel téléphone.",
      "- Consulter votre solde en temps réel\n- Retracer vos 5 dernières opérations pour un meilleur suivi\n- Effectuer des transferts de compte à compte, instantanément\n- Faire des virements vers Orange Money en toute simplicité",
      "Avec ce service USSD, la FICA réaffirme son engagement : rendre la banque accessible, rapide et disponible pour tous, partout en RCA, sans contrainte de connexion.",
      "Pour en profiter, souscrivez et composez dès maintenant le #808#.",
    ].join("\n\n"),
    photos: ["/images/actualites/fica-mobile-lancement.jpg", "/images/actualites/guichet-fica-mobile.jpg"],
  },
  {
    slug: "defile-du-1er-mai-2026",
    titre: "La FICA au défilé du 1er mai 2026",
    date: "2026-05-03",
    categorie: "Activité",
    resume: "Les collaborateurs de la Financière de Centrafrique ont pris part au défilé de la Fête du Travail à Bangui.",
    image: "/images/actualites/defile-2026-1.jpg",
    corps: "Le passage de la FICA lors du défilé du 1er mai 2026, Fête du Travail, à Bangui.",
    photos: ["/images/actualites/defile-2026-1.jpg", "/images/actualites/defile-2026-2.jpg"],
  },
  {
    slug: "allocations-familiales-1er-trimestre-2026",
    titre: "Paiement des allocations familiales du 1er trimestre 2026",
    date: "2026-04-01",
    categorie: "Prestations sociales",
    resume: "En partenariat avec la CNSS, la FICA assure le paiement des allocations familiales du premier trimestre 2026.",
    image: "/images/actualites/allocations-2026-1.jpg",
    corps:
      "En partenariat avec la Caisse nationale de sécurité sociale, la FICA assure le paiement des allocations familiales du premier trimestre 2026, selon le calendrier communiqué aux bénéficiaires.",
    photos: ["/images/actualites/allocations-2026-1.jpg", "/images/actualites/allocations-2026-2.jpg"],
  },
];

/** Découpe le corps d'une actualité en paragraphes et listes. */
export function blocsDuCorps(corps: string) {
  return corps
    .split(/\n\s*\n/)
    .map((bloc) => bloc.trim())
    .filter(Boolean)
    .map((bloc) => {
      const lignes = bloc.split("\n").map((l) => l.trim());
      return lignes.every((l) => l.startsWith("- "))
        ? { type: "liste" as const, elements: lignes.map((l) => l.slice(2)) }
        : { type: "paragraphe" as const, texte: lignes.join(" ") };
    });
}

export function formaterDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );
}
