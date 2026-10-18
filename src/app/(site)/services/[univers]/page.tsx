import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BandeauContact, BandeauPage } from "@/components/blocs";
import { ListeOffres } from "@/components/liste-offres";
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

  return (
    <>
      <BandeauPage
        titre={u.nom}
        introduction={u.introduction}
        miettes={[{ libelle: "Toutes nos offres", href: "/services" }, { libelle: u.nomCourt }]}
      />

      <div className="conteneur grid gap-12 py-14 md:py-16 lg:grid-cols-[1fr_15rem]">
        <div className="space-y-14">
          {produitsParGroupe(u).map(({ groupe, produits }) => (
            <section key={groupe || "offres"}>
              {groupe && <h2 className="mb-5 text-2xl">{groupe}</h2>}
              <ListeOffres offres={produits.map((p) => ({ produit: p, href: lienProduit(u, p) }))} />
            </section>
          ))}
        </div>
        <nav aria-label="Autres familles d'offres" className="lg:pt-1">
          <p className="border-b border-marine pb-3 text-sm font-semibold text-marine">Autres familles</p>
          <ul className="mt-2">
            {univers
              .filter((a) => a.slug !== u.slug)
              .map((a) => (
                <li key={a.slug}>
                  <Link href={`/services/${a.slug}`} className="block border-b border-filet py-2.5 text-[0.95rem] text-encre/85 hover:text-bleu">
                    {a.nom}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      <BandeauContact />
    </>
  );
}
