import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppelAction, BandeauPage } from "@/components/blocs";
import { IconeUnivers } from "@/components/icone-univers";
import { lienProduit, produitsParGroupe, trouverUnivers, univers } from "@/lib/services";

export function generateStaticParams() {
  return univers.map((u) => ({ univers: u.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[univers]">): Promise<Metadata> {
  const u = trouverUnivers((await params).univers);
  if (!u) return {};
  return { title: u.nom, description: u.accroche, alternates: { canonical: `/services/${u.slug}` } };
}

export default async function PageUnivers({ params }: PageProps<"/services/[univers]">) {
  const u = trouverUnivers((await params).univers);
  if (!u) notFound();

  const autres = univers.filter((autre) => autre.slug !== u.slug);

  return (
    <>
      <BandeauPage
        titre={u.nom}
        introduction={u.introduction}
        miettes={[{ libelle: "Nos services", href: "/services" }, { libelle: u.nomCourt }]}
      />

      <div className="conteneur space-y-16 py-16 md:py-24">
        {produitsParGroupe(u).map(({ groupe, produits }) => (
          <section key={groupe || "offres"} aria-labelledby={groupe ? `groupe-${groupe}` : undefined}>
            {groupe && (
              <h2 id={`groupe-${groupe}`} className="mb-6 flex items-center gap-3 text-2xl font-bold">
                {groupe}
                <span className="rounded-full bg-ciel px-2.5 py-0.5 text-sm font-semibold text-bleu">{produits.length}</span>
              </h2>
            )}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {produits.map((p) => (
                <Link key={p.slug} href={lienProduit(u, p)} className="carte group flex flex-col p-6">
                  <h3 className="text-lg font-bold group-hover:text-bleu">{p.nom}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] text-gris">{p.accroche}</p>
                  {p.pointsCles && (
                    <dl className="mt-5 grid gap-1.5 border-t border-bordure pt-4 text-sm">
                      {p.pointsCles.slice(0, 2).map((pc) => (
                        <div key={pc.libelle} className="flex justify-between gap-4">
                          <dt className="text-gris">{pc.libelle}</dt>
                          <dd className="text-right font-semibold text-marine">{pc.valeur}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-bleu">
                    En savoir plus
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="bg-gris-clair">
        <div className="conteneur py-16">
          <h2 className="text-xl font-bold">Nos autres services</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {autres.map((a) => (
              <Link key={a.slug} href={`/services/${a.slug}`} className="carte flex items-center gap-3 p-4 font-semibold text-marine">
                <IconeUnivers cle={a.icone} className="size-5 text-bleu" />
                {a.nomCourt}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AppelAction />
    </>
  );
}
