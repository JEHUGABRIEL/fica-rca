import type { Metadata } from "next";
import { CarteAvis } from "@/components/avis-clients";
import { BandeauPage } from "@/components/blocs";
import { FormulaireAvis } from "@/components/formulaire-avis";
import { avisPublies } from "@/lib/avis";

export const metadata: Metadata = {
  title: "Avis clients",
  description: "Les avis des clients de la Financière de Centrafrique (FICA S.A.) et le formulaire pour donner le vôtre.",
  alternates: { canonical: "/avis" },
};

export default async function PageAvis() {
  const avis = await avisPublies();

  return (
    <>
      <BandeauPage
        titre="Avis clients"
        introduction="Les témoignages des clients de la FICA. Chaque avis est relu par nos équipes avant publication."
        miettes={[{ libelle: "Avis clients" }]}
      />

      <div className="conteneur grid gap-14 py-14 md:py-16 lg:grid-cols-[1fr_26rem]">
        <section aria-labelledby="titre-liste-avis">
          <h2 id="titre-liste-avis" className="text-2xl">
            {avis.length > 0 ? `${avis.length} avis publié${avis.length > 1 ? "s" : ""}` : "Aucun avis publié pour le moment"}
          </h2>
          {avis.length > 0 ? (
            <ul className="mt-6 border-t border-marine">
              {avis.map((a) => (
                <li key={a.id} className="border-b border-filet py-7">
                  <CarteAvis avis={a} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-lg text-gris">Soyez le premier à partager votre expérience avec la FICA.</p>
          )}
        </section>

        <section id="donner-mon-avis" aria-labelledby="titre-donner-avis" className="self-start border-t-4 border-marine bg-gris-clair p-6 md:p-8 lg:sticky lg:top-36">
          <h2 id="titre-donner-avis" className="text-xl">
            Donner mon avis
          </h2>
          <p className="mb-6 mt-2 text-sm text-gris">Votre avis sera visible ici après vérification.</p>
          <FormulaireAvis />
        </section>
      </div>
    </>
  );
}
