import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FilAriane } from "@/components/blocs";
import { actualiteParSlug, actualitesPubliees } from "@/lib/contenu";
import { blocsDuCorps, formaterDate } from "@/lib/institution";

export async function generateStaticParams() {
  const actualites = await actualitesPubliees();
  // Cache Components exige au moins un paramètre ; un slug inconnu mène à notFound().
  return actualites.length ? actualites.map((a) => ({ slug: a.slug })) : [{ slug: "aucune" }];
}

export async function generateMetadata({ params }: PageProps<"/actualites/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = await actualiteParSlug(slug);
  if (!a) return {};
  return {
    title: a.titre,
    description: a.resume,
    alternates: { canonical: `/actualites/${a.slug}` },
    openGraph: { type: "article", publishedTime: a.date, images: [a.image] },
  };
}

export default async function PageActualite({ params }: PageProps<"/actualites/[slug]">) {
  const { slug } = await params;
  const actualites = await actualitesPubliees();
  const a = actualites.find((x) => x.slug === slug);
  if (!a) notFound();
  const autres = actualites.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <article className="conteneur max-w-3xl py-10 md:py-14">
        <FilAriane miettes={[{ libelle: "Actualités", href: "/actualites" }, { libelle: a.titre }]} />
        <p className="mt-10 text-sm text-gris">
          {a.categorie} · <time dateTime={a.date}>{formaterDate(a.date)}</time>
        </p>
        <h1 className="mt-3 text-3xl md:text-[2.4rem]">{a.titre}</h1>
        <p className="mt-5 text-xl leading-relaxed text-gris">{a.resume}</p>

        {a.image && (
        <div className="relative mt-10 aspect-[2/1] overflow-hidden bg-gris-clair">
          <Image src={a.image} alt="" fill priority sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" />
        </div>
        )}

        <div className="texte-courant mt-10">
          {blocsDuCorps(a.corps).map((bloc, i) =>
            bloc.type === "liste" ? (
              <ul key={i} className="list-disc space-y-1.5 pl-6 marker:text-bleu">
                {bloc.elements.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{bloc.texte}</p>
            ),
          )}
        </div>

        {a.photos.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {a.photos.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden bg-gris-clair">
                <Image src={src} alt={a.titre} fill sizes="(min-width: 640px) 24rem, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </article>

      {autres.length > 0 && (
        <section className="border-t border-filet">
          <div className="conteneur max-w-3xl py-12">
            <h2 className="text-xl">Autres actualités</h2>
            <ul className="mt-4 border-t border-marine">
              {autres.map((x) => (
                <li key={x.slug} className="border-b border-filet">
                  <Link href={`/actualites/${x.slug}`} className="group block py-4">
                    <span className="text-sm text-gris">{formaterDate(x.date)}</span>
                    <span className="block font-semibold text-marine group-hover:text-bleu group-hover:underline">{x.titre}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
