import type { Metadata } from "next";
import { Suspense } from "react";
import { BoutonConfirmer } from "@/components/admin/bouton-confirmer";
import { exigerAdmin } from "@/lib/auth";
import { assurerSchema, sql } from "@/lib/db";
import { basculerDemande, supprimerDemande } from "../../actions";
import { Chargement, EnTetePage } from "../en-tete-page";

export const metadata: Metadata = { title: "Demandes reçues" };

const dateHeure = (d: unknown) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Africa/Bangui" }).format(new Date(d as string));

async function Liste() {
  await exigerAdmin();
  await assurerSchema();
  const demandes = await sql()`select * from demandes order by traitee, cree_le desc limit 500`;
  if (!demandes.length) return <p className="mt-8 text-gris">Aucune demande reçue pour le moment.</p>;

  return (
    <ul className="mt-8 border-t border-marine bg-white">
      {demandes.map((d) => (
        <li key={d.id} className={`grid gap-4 border-b border-filet p-5 md:grid-cols-[1fr_auto] ${d.traitee ? "opacity-60" : ""}`}>
          <div>
            <p className="text-sm text-gris">
              <span className={`mr-2 inline-block px-2 py-0.5 text-xs font-medium ${d.nature === "ouverture" ? "bg-rouge/10 text-rouge" : "bg-bleu/10 text-bleu"}`}>
                {d.nature === "ouverture" ? "Ouverture de compte" : "Contact"}
              </span>
              {dateHeure(d.cree_le)}
              {d.traitee && " · traitée"}
            </p>
            <p className="mt-2 font-semibold text-marine">
              {d.nom}
              {d.profil && <span className="font-normal text-gris"> · {d.profil}</span>}
            </p>
            <p className="mt-1 text-sm">
              <a href={`tel:${String(d.telephone).replace(/[^\d+]/g, "")}`} className="text-bleu hover:underline">{d.telephone}</a>
              {d.email && (
                <>
                  {" · "}
                  <a href={`mailto:${d.email}`} className="text-bleu hover:underline">{d.email}</a>
                </>
              )}
            </p>
            {(d.objet || d.compte) && <p className="mt-2 text-sm"><span className="text-gris">{d.compte ? "Compte souhaité : " : "Objet : "}</span>{d.compte || d.objet}</p>}
            {d.message && <p className="mt-2 whitespace-pre-line">{d.message}</p>}
          </div>
          <div className="flex flex-wrap items-start gap-2 md:justify-end">
            <form action={basculerDemande.bind(null, d.id)}>
              <button type="submit" className={`bouton !px-3 !py-1.5 text-sm ${d.traitee ? "bouton-secondaire" : "bg-vert text-white hover:opacity-90"}`}>
                {d.traitee ? "Rouvrir" : "Marquer traitée"}
              </button>
            </form>
            <BoutonConfirmer action={supprimerDemande.bind(null, d.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function PageDemandes() {
  return (
    <>
      <EnTetePage titre="Demandes reçues" description="Demandes de contact et d'ouverture de compte envoyées depuis le site." />
      <Suspense fallback={<Chargement />}>
        <Liste />
      </Suspense>
    </>
  );
}
