/* Avis clients affichés sur l'accueil.

   N'ajouter ici que des témoignages réels, recueillis par la FICA avec
   l'accord écrit du client (nom tel qu'il souhaite le voir publié).
   Tant que la liste est vide, la section invite les clients à donner
   leur avis au lieu d'afficher des témoignages. */

export type Avis = {
  nom: string;
  /** Ex. « Commerçante, cliente depuis 2021 ». */
  profil: string;
  texte: string;
  /** Produit concerné, facultatif (ex. « FICA MOBILE »). */
  produit?: string;
};

export const avis: Avis[] = [];
