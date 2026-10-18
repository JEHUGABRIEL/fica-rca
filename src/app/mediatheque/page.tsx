import type { Metadata } from "next";
import { AppelAction, BandeauPage } from "@/components/blocs";
import { GaleriePhotos } from "@/components/galerie-photos";
import { galerie } from "@/lib/institution";

export const metadata: Metadata = {
  title: "Médiathèque",
  description: "Les équipes de la Financière de Centrafrique et les temps forts de la FICA en images.",
  alternates: { canonical: "/mediatheque" },
};

export default function PageMediatheque() {
  return (
    <>
      <BandeauPage
        titre="Médiathèque"
        introduction="Nos équipes, notre agence et les temps forts de la FICA en images."
        miettes={[{ libelle: "Médiathèque" }]}
      />
      <div className="conteneur py-16 md:py-20">
        <GaleriePhotos photos={galerie} />
      </div>
      <AppelAction />
    </>
  );
}
