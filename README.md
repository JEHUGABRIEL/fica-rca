# FICA S.A. : site institutionnel

Refonte du site de la Financière de Centrafrique ([fica-rca.com](https://fica-rca.com)). Le site remplace l'ancien WordPress.

- **Stack** : Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, lucide-react.
- **Rendu** : les 76 pages sont prérendues de façon statique au build.
- **Contenus** : aucun CMS. Tout le texte vit dans des fichiers typés :
  - `src/lib/site.ts` : coordonnées, réseaux sociaux, navigation institutionnelle ;
  - `src/lib/services.ts` : catalogue des 6 univers et de leurs 44 produits. Les pages, le méga-menu et le sitemap en sont générés ;
  - `src/lib/institution.ts` : mot du DG, valeurs, gouvernance, partenaires, galerie, actualités.
- **Redirections** : `src/lib/redirections.ts` redirige en 301 les anciennes adresses WordPress vers les nouvelles.
- **Contenus à valider** : voir [`CONTENU-A-VALIDER.md`](CONTENU-A-VALIDER.md).

## Démarrer

```bash
npm install
npm run dev
```

## Formulaires (contact et ouverture de compte)

Les demandes sont envoyées par e-mail via l'API [Resend](https://resend.com). Variables d'environnement :

| Variable | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Clé API Resend. **Obligatoire** : sans elle, le formulaire invite à appeler le service clientèle. |
| `CONTACT_EMAIL` | Destinataire (par défaut `fica-sa@fica-rca.com`). |
| `CONTACT_FROM` | Expéditeur vérifié dans Resend (par défaut `Site FICA <site@fica-rca.com>`). |

## Avis clients et back-office

- Les visiteurs déposent un avis sur `/avis` : il est enregistré « en attente » dans Neon (table `avis`, créée au premier usage).
- La FICA le publie, le refuse ou le supprime depuis `/admin` (mot de passe `ADMIN_PASSWORD`, session signée avec `ADMIN_SESSION_SECRET`, 32 caractères minimum).
- Les avis publiés sont intégrés aux pages statiques (`use cache`, tag `avis`). Le cache est vidé à chaque modération, et la page se régénère au plus toutes les heures.
- Limite de 3 avis par jour et par visiteur, via une empreinte salée de l'IP. L'IP elle-même n'est pas conservée.

| Variable | Rôle |
| --- | --- |
| `DATABASE_URL` | Base Neon `fica-rca-db`, injectée par l'intégration Vercel. |
| `ADMIN_PASSWORD` | Mot de passe du back-office. |
| `ADMIN_SESSION_SECRET` | Clé de signature des sessions. |

La même base sert au développement local et à la production : supprimez vos avis de test.

## Ajouter une actualité

1. Déposer l'image dans `public/images/actualites/`.
2. Ajouter une entrée en tête du tableau `actualites` dans `src/lib/institution.ts`.
3. Rebuilder.
