import Link from "next/link";
import { avisPublies, type AvisPublie } from "@/lib/avis";
import { formaterDate } from "@/lib/institution";

export function CarteAvis({ avis }: { avis: AvisPublie }) {
  return (
    <figure className="flex h-full flex-col">
      <blockquote className="flex-1 text-[1.05rem] leading-relaxed text-encre">« {avis.texte} »</blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="block font-semibold text-marine">{avis.nom}</span>
        <span className="text-gris">
          {[avis.profil, avis.produit].filter(Boolean).join(" · ")}
          {(avis.profil || avis.produit) && " · "}
          <time dateTime={avis.date}>{formaterDate(avis.date)}</time>
        </span>
      </figcaption>
    </figure>
  );
}

/* Section de l'accueil : les trois derniers avis publiés. */
export async function AvisClients() {
  const avis = await avisPublies();
  const derniers = avis.slice(0, 3);

  return (
    <section aria-labelledby="titre-avis" className="border-t border-filet">
      <div className="conteneur py-16 md:py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 id="titre-avis" className="text-2xl md:text-3xl">
            Avis de nos clients
          </h2>
          <div className="flex gap-6 text-sm">
            {avis.length > 3 && (
              <Link href="/avis" className="lien-fleche">
                Lire les {avis.length} avis
              </Link>
            )}
            <Link href="/avis#donner-mon-avis" className="lien-fleche">
              Donner mon avis
            </Link>
          </div>
        </div>

        {derniers.length > 0 ? (
          <ul className="mt-8 grid gap-x-10 border-t border-marine md:grid-cols-3">
            {derniers.map((a) => (
              <li key={a.id} className="border-b border-filet py-8">
                <CarteAvis avis={a} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 grid gap-8 border-t border-marine pt-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <p className="max-w-2xl text-lg leading-relaxed text-gris">
              Vous êtes client de la FICA ? Racontez votre expérience à l&apos;agence, avec FICA MOBILE ou nos services
              de paiement. Les avis sont publiés sur cette page après vérification.
            </p>
            <div className="md:text-right">
              <Link href="/avis#donner-mon-avis" className="bouton bouton-secondaire">
                Donner mon avis
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
