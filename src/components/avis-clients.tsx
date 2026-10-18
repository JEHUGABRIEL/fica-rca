import Link from "next/link";
import { avis } from "@/lib/avis";
import { site } from "@/lib/site";

const lienAvis = `/contact?objet=${encodeURIComponent("Avis client")}`;

export function AvisClients() {
  return (
    <section aria-labelledby="titre-avis" className="border-t border-filet">
      <div className="conteneur py-16 md:py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 id="titre-avis" className="text-2xl md:text-3xl">
            Avis de nos clients
          </h2>
          <Link href={lienAvis} className="lien-fleche text-sm">
            Donner mon avis
          </Link>
        </div>

        {avis.length > 0 ? (
          <ul className="mt-10 grid gap-x-10 border-t border-marine md:grid-cols-3">
            {avis.map((a) => (
              <li key={a.nom} className="border-b border-filet py-8">
                <figure>
                  <blockquote className="text-[1.05rem] leading-relaxed text-encre">« {a.texte} »</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="block font-semibold text-marine">{a.nom}</span>
                    <span className="text-gris">
                      {a.profil}
                      {a.produit && ` · ${a.produit}`}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 grid gap-8 border-t border-marine pt-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <p className="max-w-2xl text-lg leading-relaxed text-gris">
              Vous êtes client de la FICA ? Racontez-nous votre expérience à l&apos;agence, avec FICA MOBILE ou nos
              services de paiement. Avec votre accord, votre témoignage pourra être publié sur cette page.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link href={lienAvis} className="bouton bouton-secondaire">
                Donner mon avis
              </Link>
              <a href={site.reseaux.facebook} target="_blank" rel="noopener noreferrer" className="bouton bouton-secondaire">
                Nous suivre sur Facebook
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
