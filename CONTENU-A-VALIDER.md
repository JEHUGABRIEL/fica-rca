# Contenus à faire valider par la FICA

La refonte reprend tous les textes de l'ancien site (fica-rca.com), corrigés et harmonisés.
Sur l'ancien site, plusieurs pages n'avaient qu'un texte d'attente (« espace réservé description »,
« DESCRIPTION »). Elles ont reçu une description courte et générique. **Aucun taux, montant ni
délai n'a été inventé.** Les éléments ci-dessous doivent être relus et validés par la FICA avant
la mise en ligne.

## 1. Fiches produits rédigées pendant la refonte (`aValider: true` dans `src/lib/services.ts`)

| Fiche | Ce qu'il faut confirmer ou compléter |
| --- | --- |
| Crédit amortissable salariés | Description, conditions, durée, taux et quotité cessible |
| Crédit amortissable non salariés | Description, conditions, garanties |
| Crédit amortissable personne morale | Description, conditions, garanties |
| Crédit événementiel (Arbre de Noël, Tabaski) | Montants, périodes de souscription |
| Financement de marchés | Description, conditions |
| Ligne de financement | Description, conditions |
| Crédit aux PME | Description, conditions |
| Escompte de chèques | Description, conditions |
| Escompte de traites | Description, conditions |
| Autres paiements de prestations | Liste des prestations payées |
| Attestation de clôture de compte | Description, délai de délivrance |
| Banque-assurance (SUNU, ACAM Vie) | Produits proposés |

## 2. Textes institutionnels rédigés pendant la refonte (`src/lib/institution.ts`)

- **Nos engagements** (éthique, responsabilité, proximité). Ces textes s'appuient sur le mot du DG
  et sur la page Opérations de change. Les pages Éthique et Responsabilité de l'ancien site étaient vides.
- **Notre histoire.** Trois jalons ont été vérifiés : l'agrément COBAC du 20/07/2020, le lancement de FICA
  MOBILE en 2026 et les 6 ans de la FICA. La page Histoire de l'ancien site était vide, donc d'autres étapes
  peuvent être ajoutées.
- **Notre vision.** L'ancienne page était vide. La vision reprend désormais le mot du DG.

## 3. Informations à confirmer

- **Chiffre « 50+ partenaires ».** Il vient de la page Rapports annuels. Le nombre de clients (1 226) n'est
  pas affiché, car il est probablement daté.
- **WhatsApp +236 74 23 97 24.** Ce numéro a été relevé dans le widget de chat de l'ancien site.
- **Actions de l'actionnariat.** L'ancien site donne des nombres décimaux (184,6 et 64,4) pour un total de
  500 actions. Ils sont repris tels quels.
- **Liens Instagram, YouTube et X.** Ils étaient vides sur l'ancien site et ne sont pas affichés. Fournir les
  URL pour les ajouter dans `src/lib/site.ts`.
- **Photos des dirigeants.** Les fiches de la Direction et du Conseil affichent des initiales. Fournir
  des portraits si possible.
- **Horaires d'ouverture de l'agence.** Ils sont absents de l'ancien site. À fournir pour la page Contact.
- **Rapports annuels et vidéos.** Les pages correspondantes étaient vides. Elles sont redirigées vers
  « La FICA » et la Médiathèque en attendant du contenu.
