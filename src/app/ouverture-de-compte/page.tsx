import { Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BandeauPage } from "@/components/blocs";
import { FormulaireDemande, type OptionCompte } from "@/components/formulaire-demande";
import { trouverUnivers, type Produit } from "@/lib/services";

export const metadata: Metadata = {
  title: "Ouvrir un compte",
  description:
    "Ouvrez un compte courant ou d'épargne à la FICA : comparatif des comptes, pièces à fournir, fiches d'ouverture à télécharger et demande en ligne.",
  alternates: { canonical: "/ouverture-de-compte" },
};

const etapes = [
  "Choisissez le compte adapté à votre situation à l'aide du comparatif ci-dessous.",
  "Rassemblez les pièces demandées et, si vous le souhaitez, remplissez la fiche d'ouverture.",
  "Déposez votre demande en ligne ou en agence ; un conseiller finalise l'ouverture avec vous.",
];

const documents = [
  { libelle: "Fiche d'ouverture de compte, personne physique", href: "/documents/fiche-ouverture-personne-physique.pdf", poids: "PDF, 10 pages" },
  { libelle: "Fiche d'ouverture de compte, personne morale", href: "/documents/fiche-ouverture-personne-morale.pdf", poids: "PDF, 7 pages" },
];

const valeur = (p: Produit, libelle: string) => p.pointsCles?.find((pc) => pc.libelle === libelle)?.valeur ?? "—";

function TableauComptes({ comptes, colonnes, legende }: { comptes: Produit[]; colonnes: string[]; legende: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-t border-marine text-left">
        <caption className="sr-only">{legende}</caption>
        <thead className="text-sm text-gris">
          <tr className="border-b border-filet">
            <th scope="col" className="py-3 pr-4 font-medium">Compte</th>
            {colonnes.map((c) => (
              <th key={c} scope="col" className="py-3 pr-4 font-medium">
                {c}
              </th>
            ))}
            <th scope="col" className="py-3 font-medium">Pièces</th>
            <th scope="col" className="py-3">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {comptes.map((c) => (
            <tr key={c.slug} className="border-b border-filet align-top">
              <th scope="row" className="py-4 pr-4">
                <Link href={`/services/comptes/${c.slug}`} className="font-semibold text-marine hover:text-bleu hover:underline">
                  {c.nom}
                </Link>
                <span className="mt-1 block max-w-xs text-sm font-normal text-gris">{c.accroche}</span>
              </th>
              {colonnes.map((col) => (
                <td key={col} className="py-4 pr-4 font-medium text-marine">
                  {valeur(c, col)}
                </td>
              ))}
              <td className="py-4 pr-4 text-gris">{c.documents?.length ?? 0} pièces</td>
              <td className="py-4 text-right">
                <Link href={`/ouverture-de-compte?compte=${c.slug}#demande`} className="lien-fleche whitespace-nowrap text-sm">
                  Choisir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PageOuverture() {
  const comptes = trouverUnivers("comptes")!.produits;
  const parGroupe = (g: string) => comptes.filter((p) => p.groupe === g);
  const options: OptionCompte[] = comptes.map((p) => ({ valeur: p.slug, libelle: p.nom, groupe: p.groupe ?? "Comptes" }));

  return (
    <>
      <BandeauPage
        titre="Ouvrir un compte"
        introduction="Particuliers, entrepreneurs, entreprises et associations : comparez nos comptes, préparez vos pièces et déposez votre demande."
        miettes={[{ libelle: "Ouvrir un compte" }]}
      />

      <div className="conteneur space-y-16 py-14 md:py-16">
        <section>
          <h2 className="text-2xl md:text-3xl">Comment ouvrir un compte</h2>
          <ol className="mt-6 grid border-t border-marine md:grid-cols-3 md:divide-x md:divide-filet">
            {etapes.map((e, i) => (
              <li key={e} className="border-b border-filet py-5 md:px-6 md:first:pl-0">
                <span className="text-sm font-semibold text-bleu">Étape {i + 1}</span>
                <p className="mt-1 text-marine">{e}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="particuliers">
          <h2 className="text-2xl md:text-3xl">Comptes courants des particuliers</h2>
          <div className="mt-6">
            <TableauComptes
              comptes={parGroupe("Particuliers")}
              colonnes={["Revenu mensuel", "Versement à l'ouverture"]}
              legende="Comparatif des comptes courants des particuliers"
            />
          </div>
        </section>

        <section id="epargne">
          <h2 className="text-2xl md:text-3xl">Comptes d&apos;épargne</h2>
          <div className="mt-6">
            <TableauComptes
              comptes={parGroupe("Épargne")}
              colonnes={["Intérêts créditeurs", "Versement à l'ouverture"]}
              legende="Comparatif des comptes d'épargne"
            />
          </div>
        </section>

        <section id="entreprises">
          <h2 className="text-2xl md:text-3xl">Comptes des entreprises et associations</h2>
          <div className="mt-6">
            <TableauComptes
              comptes={parGroupe("Entreprises et associations")}
              colonnes={[]}
              legende="Comptes des entreprises et associations"
            />
          </div>
        </section>

        <section id="documents">
          <h2 className="text-2xl md:text-3xl">Documents à télécharger</h2>
          <ul className="mt-6 border-t border-marine">
            {documents.map((d) => (
              <li key={d.href} className="border-b border-filet">
                <a href={d.href} download className="group flex items-center justify-between gap-4 py-4">
                  <span>
                    <span className="block font-semibold text-marine group-hover:text-bleu group-hover:underline">{d.libelle}</span>
                    <span className="text-sm text-gris">{d.poids}</span>
                  </span>
                  <Download className="size-5 text-bleu" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section id="demande" className="border-t border-filet bg-gris-clair">
        <div className="conteneur grid gap-12 py-14 md:py-16 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-2xl md:text-3xl">Demande d&apos;ouverture en ligne</h2>
            <p className="mt-4 text-lg leading-relaxed text-gris">
              Laissez vos coordonnées. Un conseiller vous rappelle pour vérifier vos pièces et convenir d&apos;un
              rendez-vous en agence pour la signature.
            </p>
          </div>
          <div className="border-t-4 border-marine bg-white p-6 md:p-8">
            <Suspense fallback={<div className="min-h-96" />}>
              <FormulaireDemande nature="ouverture" comptes={options} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
