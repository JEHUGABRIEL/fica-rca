import Link from "next/link";
import { avisExemples, avisPublies, type AvisPublie } from "@/lib/avis";
import { formaterDate } from "@/lib/institution";

/* Note affichée au-dessus des avis d'exemple. */
export function NoteExemples() {
  return (
    <p className="border-l-4 border-bleu bg-gris-clair px-4 py-3 text-sm text-gris">
      Avis d&apos;exemple, présentés en attendant les premiers témoignages de nos clients.{" "}
      <Link href="/avis#donner-mon-avis" className="font-medium text-bleu underline underline-offset-4">
        Donnez le vôtre
      </Link>
      .
    </p>
  );
}

export function CarteAvis({ avis }: { avis: AvisPublie }) {
  return (
    <figure className="flex h-full flex-col">
      <blockquote className="flex-1 text-[1.05rem] leading-relaxed text-encre">« {avis.texte} »</blockquote>
      <figcaption className="mt-5 text-sm">
        {avis.exemple && (
          <span className="mb-2 inline-block bg-gris-clair px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-gris">
            Exemple
          </span>
        )}
        <span className="block font-semibold text-marine">{avis.nom}</span>
        <span className="text-gris">
          {[avis.profil, avis.produit].filter(Boolean).join(" · ")}
          {avis.date && (
            <>
              {(avis.profil || avis.produit) && " · "}
              <time dateTime={avis.date}>{formaterDate(avis.date)}</time>
            </>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

/* Section de l'accueil : les trois derniers avis publiés. */
export async function AvisClients() {
  const avis = await avisPublies();
  const exemples = avis.length === 0;
  const derniers = exemples ? avisExemples : avis.slice(0, 3);

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

        {exemples && (
          <div className="mt-8">
            <NoteExemples />
          </div>
        )}
        <ul className={`${exemples ? "mt-6" : "mt-8"} grid gap-x-10 border-t border-marine md:grid-cols-3`}>
          {derniers.map((a) => (
            <li key={a.id} className="border-b border-filet py-8">
              <CarteAvis avis={a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
