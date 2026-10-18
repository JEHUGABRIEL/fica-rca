import { ArrowLeft, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BandeauPage } from "@/components/blocs";
import { CarteActualite } from "@/components/carte-actualite";
import { actualites, formaterDate } from "@/lib/institution";

export function generateStaticParams() {
  return actualites.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/actualites/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = actualites.find((x) => x.slug === slug);
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
  const a = actualites.find((x) => x.slug === slug);
  if (!a) notFound();
  const autres = actualites.filter((x) => x.slug !== a.slug).slice(0, 2);

  return (
    <>
      <BandeauPage
        surtitre={`${a.categorie} · ${formaterDate(a.date)}`}
        titre={a.titre}
        miettes={[{ libelle: "Actualités", href: "/actualites" }, { libelle: a.categorie }]}
      />
      <article className="conteneur max-w-4xl py-14 md:py-20">
        <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-gris-clair">
          <Image src={a.image} alt="" fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
        </div>
        <div className="prose-fica mx-auto mt-12 max-w-2xl">
          <p className="text-xl leading-relaxed text-marine">{a.resume}</p>
          {a.corps.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {a.liste && (
            <ul className="space-y-3 rounded-2xl bg-gris-clair p-6">
              {a.liste.map((l) => (
                <li key={l} className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-vert" aria-hidden />
                  {l}
                </li>
              ))}
            </ul>
          )}
          {a.conclusion?.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {a.photos && (
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {a.photos.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gris-clair">
                <Image src={src} alt={a.titre} fill sizes="(min-width: 640px) 448px, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        )}
        <Link href="/actualites" className="mt-12 inline-flex items-center gap-2 font-semibold text-bleu">
          <ArrowLeft className="size-4" aria-hidden />
          Toutes les actualités
        </Link>
      </article>
      {autres.length > 0 && (
        <section className="bg-gris-clair">
          <div className="conteneur py-16">
            <h2 className="text-2xl font-bold">À lire aussi</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:max-w-4xl">
              {autres.map((x) => (
                <CarteActualite key={x.slug} actualite={x} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
