import { ArrowRight, Download, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BandeauPage, TitreSection } from "@/components/blocs";
import { FormulaireDemande, type OptionCompte } from "@/components/formulaire-demande";
import { trouverUnivers } from "@/lib/services";

export const metadata: Metadata = {
  title: "Ouvrir un compte",
  description:
    "Ouvrez un compte courant ou épargne à la FICA : pièces à fournir, fiches d'ouverture à télécharger et demande en ligne.",
  alternates: { canonical: "/ouverture-de-compte" },
};

const etapes = [
  { titre: "Choisissez votre compte", texte: "Comparez nos offres et identifiez le compte adapté à votre situation." },
  { titre: "Préparez vos pièces", texte: "Rassemblez les documents demandés et, si vous le souhaitez, remplissez la fiche d'ouverture." },
  { titre: "Déposez votre demande", texte: "En ligne ou en agence : un conseiller vous recontacte et finalise l'ouverture avec vous." },
];

export default function PageOuverture() {
  const comptes = trouverUnivers("comptes")!.produits;
  const particuliers = comptes.filter((p) => p.groupe !== "Entreprises et associations");
  const entreprises = comptes.filter((p) => p.groupe === "Entreprises et associations");
  const options: OptionCompte[] = comptes.map((p) => ({ valeur: p.slug, libelle: p.nom, groupe: p.groupe ?? "Comptes" }));

  const profils = [
    {
      id: "particuliers",
      titre: "Particuliers",
      comptes: particuliers,
      fiche: "/documents/fiche-ouverture-personne-physique.pdf",
      libelleFiche: "Fiche d'ouverture — personne physique",
    },
    {
      id: "entreprises",
      titre: "Entreprises et associations",
      comptes: entreprises,
      fiche: "/documents/fiche-ouverture-personne-morale.pdf",
      libelleFiche: "Fiche d'ouverture — personne morale",
    },
  ];

  return (
    <>
      <BandeauPage
        titre="Ouvrir un compte à la FICA"
        introduction="Particulier, entrepreneur, entreprise ou association : ouvrez votre compte simplement, accompagné par un conseiller."
        miettes={[{ libelle: "Ouvrir un compte" }]}
      />

      <section className="conteneur py-16 md:py-20">
        <ol className="grid gap-5 md:grid-cols-3">
          {etapes.map((e, i) => (
            <li key={e.titre} className="relative rounded-2xl border border-bordure p-7">
              <span className="font-titre text-5xl font-extrabold text-bleu/20">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-2 text-lg font-bold">{e.titre}</h2>
              <p className="mt-2 text-gris">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {profils.map((profil, i) => (
        <section key={profil.id} id={profil.id} className={i === 0 ? "bg-gris-clair" : ""}>
          <div className="conteneur py-16 md:py-20">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <TitreSection surtitre="Comptes" titre={profil.titre} />
              <a href={profil.fiche} download className="bouton bouton-contour self-start md:self-auto">
                <Download className="size-4" aria-hidden />
                {profil.libelleFiche} (PDF)
              </a>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {profil.comptes.map((c) => (
                <div key={c.slug} className="carte flex flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-bleu">{c.groupe}</p>
                  <h3 className="mt-2 text-lg font-bold">{c.nom}</h3>
                  <p className="mt-2 text-sm text-gris">{c.accroche}</p>
                  {c.pointsCles && (
                    <dl className="mt-4 space-y-1 text-sm">
                      {c.pointsCles.map((pc) => (
                        <div key={pc.libelle} className="flex justify-between gap-3">
                          <dt className="text-gris">{pc.libelle}</dt>
                          <dd className="text-right font-semibold text-marine">{pc.valeur}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <details className="group mt-4 flex-1 border-t border-bordure pt-4">
                    <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-marine">
                      <FileText className="size-4 text-bleu" aria-hidden />
                      Pièces à fournir ({c.documents?.length ?? 0})
                    </summary>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-gris">
                      {c.documents?.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </details>
                  <div className="mt-5 flex gap-4 text-sm font-semibold">
                    <Link href={`/ouverture-de-compte?compte=${c.slug}#demande`} className="inline-flex items-center gap-1 text-rouge">
                      Choisir ce compte
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                    <Link href={`/services/comptes/${c.slug}`} className="text-gris hover:text-bleu">
                      Détails
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="demande" className="bg-marine">
        <div className="conteneur grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1.4fr]">
          <div className="text-white">
            <p className="surtitre !text-[#8fb0ff]">Demande en ligne</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">Déposez votre demande d&apos;ouverture</h2>
            <p className="mt-4 text-lg text-white/75">
              Laissez-nous vos coordonnées : un conseiller vous rappelle pour vérifier vos pièces et convenir d&apos;un
              rendez-vous en agence pour la signature.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 md:p-9">
            <Suspense fallback={<div className="min-h-96" />}>
              <FormulaireDemande nature="ouverture" comptes={options} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
