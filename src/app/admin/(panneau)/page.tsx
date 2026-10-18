import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { exigerAdmin } from "@/lib/auth";
import { cloudinaryConfigure } from "@/lib/cloudinary";
import { assurerSchema, baseDisponible, sql } from "@/lib/db";
import { formaterDate } from "@/lib/institution";
import { Chargement, EnTetePage } from "./en-tete-page";

export const metadata: Metadata = { title: "Tableau de bord" };

async function Tableau() {
  await exigerAdmin();
  if (!baseDisponible()) {
    return <p className="mt-8 border-l-4 border-rouge bg-white p-5">DATABASE_URL n&apos;est pas configurée.</p>;
  }
  await assurerSchema();
  const db = sql();
  const [[compteurs], demandes] = await Promise.all([
    db`select
         (select count(*) from avis where statut = 'en_attente')::int as avis_attente,
         (select count(*) from demandes where not traitee)::int as demandes_ouvertes,
         (select count(*) from actualites where publiee)::int as actualites,
         (select count(*) from diapositives where publiee)::int as diapositives,
         (select count(*) from galerie where publiee)::int as photos`,
    db`select id, nature, nom, objet, compte, cree_le from demandes where not traitee order by cree_le desc limit 5`,
  ]);

  const tuiles = [
    { valeur: compteurs.avis_attente, libelle: "Avis à valider", href: "/admin/avis", alerte: compteurs.avis_attente > 0 },
    { valeur: compteurs.demandes_ouvertes, libelle: "Demandes à traiter", href: "/admin/demandes", alerte: compteurs.demandes_ouvertes > 0 },
    { valeur: compteurs.actualites, libelle: "Actualités publiées", href: "/admin/actualites" },
    { valeur: compteurs.diapositives, libelle: "Diapositives du carrousel", href: "/admin/carrousel" },
    { valeur: compteurs.photos, libelle: "Photos en médiathèque", href: "/admin/mediatheque" },
  ];

  return (
    <div className="mt-8 space-y-10">
      {!cloudinaryConfigure() && (
        <p className="border-l-4 border-rouge bg-white p-5 text-sm">
          Cloudinary n&apos;est pas configuré (CLOUDINARY_*) : l&apos;envoi d&apos;images est impossible.
        </p>
      )}
      <ul className="grid gap-px border border-filet bg-filet sm:grid-cols-2 xl:grid-cols-5">
        {tuiles.map((t) => (
          <li key={t.href} className="bg-white">
            <Link href={t.href} className="block p-5 hover:bg-gris-clair">
              <span className={`block text-3xl font-semibold ${t.alerte ? "text-rouge" : "text-marine"}`}>{t.valeur}</span>
              <span className="text-sm text-gris">{t.libelle}</span>
            </Link>
          </li>
        ))}
      </ul>

      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-lg">Dernières demandes à traiter</h2>
          <Link href="/admin/demandes" className="lien-fleche text-sm">
            Toutes les demandes
          </Link>
        </div>
        {demandes.length === 0 ? (
          <p className="mt-3 text-sm text-gris">Aucune demande en attente.</p>
        ) : (
          <ul className="mt-3 border-t border-marine bg-white">
            {demandes.map((d) => (
              <li key={d.id} className="grid gap-1 border-b border-filet px-5 py-3 sm:grid-cols-[1fr_auto]">
                <span>
                  <span className="font-semibold text-marine">{d.nom}</span>
                  <span className="text-gris">
                    {" "}
                    · {d.nature === "ouverture" ? `Ouverture de compte${d.compte ? ` (${d.compte})` : ""}` : d.objet || "Contact"}
                  </span>
                </span>
                <span className="text-sm text-gris">{formaterDate(new Date(d.cree_le).toISOString())}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default function PageTableauDeBord() {
  return (
    <>
      <EnTetePage titre="Tableau de bord" description="Gérez les contenus du site et les demandes des visiteurs." />
      <Suspense fallback={<Chargement />}>
        <Tableau />
      </Suspense>
    </>
  );
}
