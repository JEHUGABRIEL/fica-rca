import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { exigerAdmin } from "@/lib/auth";
import { assurerSchema, baseDisponible, sql } from "@/lib/db";
import { formaterDate } from "@/lib/institution";
import { publierAvis, refuserAvis, remettreEnAttente, seDeconnecter, supprimerAvis } from "./actions";

export const metadata: Metadata = { title: "Avis clients" };

type Ligne = {
  id: number;
  nom: string;
  profil: string;
  produit: string;
  texte: string;
  statut: "en_attente" | "publie" | "refuse";
  cree_le: string;
};

const sections = [
  { statut: "en_attente", titre: "En attente de validation" },
  { statut: "publie", titre: "Publiés" },
  { statut: "refuse", titre: "Refusés" },
] as const;

function BoutonAction({ action, libelle, style }: { action: () => Promise<void>; libelle: string; style: string }) {
  return (
    <form action={action}>
      <button type="submit" className={`bouton !px-3 !py-1.5 text-sm ${style}`}>
        {libelle}
      </button>
    </form>
  );
}

async function ListeModeration() {
  await exigerAdmin();

  if (!baseDisponible()) {
    return <p className="mt-8 border-l-4 border-rouge bg-white p-5">DATABASE_URL n&apos;est pas configurée.</p>;
  }
  await assurerSchema();
  const lignes = (await sql()`select id, nom, profil, produit, texte, statut, cree_le
                              from avis order by cree_le desc limit 500`) as Ligne[];

  return (
    <div className="mt-8 space-y-12">
      {sections.map(({ statut, titre }) => {
        const avis = lignes.filter((l) => l.statut === statut);
        return (
          <section key={statut}>
            <h2 className="text-lg">
              {titre} <span className="font-normal text-gris">({avis.length})</span>
            </h2>
            {avis.length === 0 ? (
              <p className="mt-3 text-sm text-gris">Aucun avis.</p>
            ) : (
              <ul className="mt-3 border-t border-marine bg-white">
                {avis.map((a) => (
                  <li key={a.id} className="grid gap-4 border-b border-filet p-5 md:grid-cols-[1fr_auto]">
                    <div>
                      <p className="text-sm text-gris">
                        <span className="font-semibold text-marine">{a.nom}</span>
                        {a.profil && ` · ${a.profil}`}
                        {a.produit && ` · ${a.produit}`} · {formaterDate(new Date(a.cree_le).toISOString())}
                      </p>
                      <p className="mt-2 whitespace-pre-line">{a.texte}</p>
                    </div>
                    <div className="flex flex-wrap items-start gap-2 md:justify-end">
                      {statut !== "publie" && (
                        <BoutonAction action={publierAvis.bind(null, a.id)} libelle="Publier" style="bg-vert text-white hover:opacity-90" />
                      )}
                      {statut !== "refuse" && (
                        <BoutonAction action={refuserAvis.bind(null, a.id)} libelle={statut === "publie" ? "Retirer" : "Refuser"} style="bouton-secondaire" />
                      )}
                      {statut === "refuse" && (
                        <BoutonAction action={remettreEnAttente.bind(null, a.id)} libelle="Remettre en attente" style="bouton-secondaire" />
                      )}
                      <BoutonAction action={supprimerAvis.bind(null, a.id)} libelle="Supprimer" style="text-rouge hover:underline" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}

export default function PageAdmin() {
  return (
    <div className="conteneur max-w-5xl py-10">
      <header className="flex items-center justify-between gap-4 border-b border-filet pb-5">
        <div>
          <p className="text-sm text-gris">Back-office FICA</p>
          <h1 className="text-2xl">Modération des avis clients</h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/avis" className="lien-fleche" target="_blank">
            Voir la page publique
          </Link>
          <form action={seDeconnecter}>
            <button type="submit" className="bouton bouton-secondaire !py-1.5 text-sm">
              Se déconnecter
            </button>
          </form>
        </div>
      </header>
      <Suspense fallback={<p className="mt-8 text-gris">Chargement…</p>}>
        <ListeModeration />
      </Suspense>
    </div>
  );
}
