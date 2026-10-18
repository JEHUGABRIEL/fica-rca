# FICA S.A. : site institutionnel

Refonte du site de la Financière de Centrafrique ([fica-rca.com](https://fica-rca.com)). Le site remplace l'ancien WordPress.

- **Stack** : Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, lucide-react.
- **Rendu** : les pages publiques sont prérendues de façon statique et régénérées quand le back-office modifie leur contenu.
- **Contenus** : les textes institutionnels et le catalogue vivent dans des fichiers typés :
  - `src/lib/site.ts` : coordonnées, réseaux sociaux, navigation institutionnelle ;
  - `src/lib/services.ts` : catalogue des 6 univers et de leurs 44 produits. Les pages, le méga-menu et le sitemap en sont générés ;
  - `src/lib/institution.ts` : mot du DG, valeurs, gouvernance, partenaires, et contenu de départ des actualités et de la galerie.
  - Carrousel, actualités, médiathèque et avis se gèrent dans le back-office (voir plus bas).
- **Redirections** : `src/lib/redirections.ts` redirige en 301 les anciennes adresses WordPress vers les nouvelles.
- **Contenus à valider** : voir [`CONTENU-A-VALIDER.md`](CONTENU-A-VALIDER.md).

## Démarrer

```bash
npm install
npm run dev
```

## Formulaires (contact et ouverture de compte)

Chaque demande est enregistrée dans le back-office (rubrique Demandes). Si Resend est configuré, une copie est aussi envoyée par e-mail via l'API [Resend](https://resend.com). Variables d'environnement :

| Variable | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Clé API Resend, facultative (copie par e-mail). |
| `CONTACT_EMAIL` | Destinataire (par défaut `fica-sa@fica-rca.com`). |
| `CONTACT_FROM` | Expéditeur vérifié dans Resend (par défaut `Site FICA <site@fica-rca.com>`). |

## Back-office (`/admin`)

Accès par mot de passe (`ADMIN_PASSWORD`). Session signée avec `ADMIN_SESSION_SECRET` (32 caractères minimum), valable 8 h.

| Rubrique | Contenu |
| --- | --- |
| Carrousel d'accueil | Diapositives : photo, rubrique, titre, texte, bouton, cadrage ; ordre et publication. |
| Actualités | Titre, date, catégorie, résumé, image, texte, photos d'article. Dans le texte, les paragraphes sont séparés par une ligne vide et les éléments de liste commencent par « - ». |
| Médiathèque | Envoi de plusieurs photos, légendes, ordre, affichage. |
| Avis clients | Modération des avis déposés sur `/avis` (en attente, publié, refusé). |
| Demandes reçues | Formulaires de contact et d'ouverture de compte. |

- **Données** : Neon (`DATABASE_URL`). Les tables sont créées au premier usage. Le contenu de départ (5 diapositives, 3 actualités, 17 photos) est copié une seule fois.
- **Images** : téléversées directement du navigateur vers Cloudinary (dossier `fica-rca/`), avec une signature délivrée par le serveur. Le secret API ne quitte jamais le serveur.
- **Cache** : les pages publiques restent statiques. Chaque modification vide le tag concerné (`diapositives`, `actualites`, `galerie`, `avis`), et les pages se régénèrent au plus toutes les heures.
- **Avis** : limite de 3 par jour et par visiteur, via une empreinte salée de l'IP. L'IP elle-même n'est pas conservée.
- **Images orphelines** : supprimer un élément ne supprime pas son image sur Cloudinary.

| Variable | Rôle |
| --- | --- |
| `DATABASE_URL` | Base Neon de la FICA (serveur uniquement). |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Compte Cloudinary (serveur uniquement). |
| `ADMIN_PASSWORD` | Mot de passe du back-office. |
| `ADMIN_SESSION_SECRET` | Clé de signature des sessions. |

La même base sert au développement local et à la production : supprimez vos données de test.
