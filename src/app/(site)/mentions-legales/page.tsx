import type { Metadata } from "next";
import { BandeauPage } from "@/components/blocs";
import { adresseComplete, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

export default function PageMentionsLegales() {
  return (
    <>
      <BandeauPage titre="Mentions légales" miettes={[{ libelle: "Mentions légales" }]} />
      <div className="conteneur texte-courant max-w-3xl py-16 md:py-20">
        <h2>Éditeur du site</h2>
        <p>
          {site.nom} ({site.nomCourt}), société anonyme au capital de {site.capitalSocial}.
          <br />
          Siège social : {adresseComplete}.
          <br />
          Téléphone : {site.telephone} · E-mail : {site.email}
        </p>
        <h2>Agrément</h2>
        <p>
          Établissement de microfinance agréé le {site.agrement} après avis conforme de la Commission bancaire de
          l&apos;Afrique centrale (COBAC).
        </p>
        <h2>Directeur de la publication</h2>
        <p>Emmanuel KOKO-MICA, Directeur général.</p>
        <h2>Données personnelles</h2>
        <p>
          Les informations transmises via les formulaires de ce site sont utilisées uniquement pour traiter votre
          demande. Elles ne sont ni cédées ni transmises à des tiers. Vous pouvez demander leur consultation, leur
          rectification ou leur suppression en écrivant à {site.email}.
        </p>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les contenus, logos et photographies de ce site sont la propriété de la {site.nom} ou de leurs titulaires
          respectifs. Toute reproduction sans autorisation est interdite.
        </p>
      </div>
    </>
  );
}
