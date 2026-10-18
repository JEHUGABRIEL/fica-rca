import type { Metadata } from "next";
import { AppelAction, BandeauPage } from "@/components/blocs";
import { CarteActualite } from "@/components/carte-actualite";
import { actualites } from "@/lib/institution";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Communiqués, activités et prestations sociales : toute l'actualité de la Financière de Centrafrique.",
  alternates: { canonical: "/actualites" },
};

export default function PageActualites() {
  const triees = [...actualites].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <BandeauPage
        titre="Actualités"
        introduction="Communiqués, activités et temps forts de la Financière de Centrafrique."
        miettes={[{ libelle: "Actualités" }]}
      />
      <div className="conteneur grid gap-6 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-3">
        {triees.map((a) => (
          <CarteActualite key={a.slug} actualite={a} />
        ))}
      </div>
      <AppelAction />
    </>
  );
}
