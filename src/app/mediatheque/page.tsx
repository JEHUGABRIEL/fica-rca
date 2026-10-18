import type { Metadata } from "next";
import { BandeauPage } from "@/components/blocs";
import { GaleriePhotos } from "@/components/galerie-photos";
import { photosGalerie } from "@/lib/contenu";

export const metadata: Metadata = {
  title: "Médiathèque",
  description: "Les équipes de la Financière de Centrafrique et les temps forts de la FICA en images.",
  alternates: { canonical: "/mediatheque" },
};

export default async function PageMediatheque() {
  const galerie = await photosGalerie();
  return (
    <>
      <BandeauPage
        titre="Médiathèque"
        introduction="Les équipes et l'agence de la FICA, et les temps forts de l'année."
        miettes={[{ libelle: "Médiathèque" }]}
      />
      <div className="conteneur py-16 md:py-20">
        <GaleriePhotos photos={galerie} />
      </div>
    </>
  );
}
