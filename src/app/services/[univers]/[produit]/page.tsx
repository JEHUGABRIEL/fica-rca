import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BandeauContact, BandeauPage } from "@/components/blocs";
import { lienProduit, trouverProduit, univers } from "@/lib/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return univers.flatMap((u) =>
    u.produits.filter((p) => !p.pageDediee).map((p) => ({ univers: u.slug, produit: p.slug })),
  );
}

export async function generateMetadata({ params }: PageProps<"/services/[univers]/[produit]">): Promise<Metadata> {
  const { univers: slugUnivers, produit: slugProduit } = await params;
  const trouve = trouverProduit(slugUnivers, slugProduit);
  if (!trouve) return {};
  return {
    title: trouve.produit.nom,
    description: trouve.produit.accroche,
    alternates: { canonical: `/services/${slugUnivers}/${slugProduit}` },
  };
}

const actions = {
  ouverture: { libelle: "Ouvrir ce compte", texte: "Déposez votre demande en ligne ; un conseiller vous recontacte pour finaliser l'ouverture en agence." },
  demande: { libelle: "Faire une demande", texte: "Décrivez votre besoin ; un conseiller étudie votre demande et vous recontacte." },
  information: { libelle: "Contacter un conseiller", texte: "Notre service clientèle répond à vos questions sur ce service." },
};

export default async function PageProduit({ params }: PageProps<"/services/[univers]/[produit]">) {
  const { univers: slugUnivers, produit: slugProduit } = await params;
  const trouve = trouverProduit(slugUnivers, slugProduit);
  if (!trouve || trouve.produit.pageDediee) notFound();
  const { univers: u, produit: p } = trouve;

  const action = actions[p.action];
  const lienAction =
    p.action === "ouverture" ? `/ouverture-de-compte?compte=${p.slug}#demande` : `/contact?objet=${encodeURIComponent(p.nom)}`;
  const voisins = u.produits.filter((autre) => autre.slug !== p.slug);

  return (
    <>
      <BandeauPage
        rubrique={u.nom}
        titre={p.nom}
        introduction={p.accroche}
        miettes={[
          { libelle: "Toutes nos offres", href: "/services" },
          { libelle: u.nomCourt, href: `/services/${u.slug}` },
          { libelle: p.nom },
        ]}
      >
        <Link href={lienAction} className="bouton bouton-principal mt-8">
          {action.libelle}
        </Link>
      </BandeauPage>

      <div className="conteneur grid gap-14 py-14 md:py-16 lg:grid-cols-[1fr_18rem]">
        <article className="min-w-0 max-w-3xl">
          <div className="texte-courant">
            {p.description.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          {p.pointsCles && (
            <section className="mt-12">
              <h2 className="text-xl">Caractéristiques</h2>
              <table className="mt-4 w-full border-t border-marine text-left">
                <tbody>
                  {p.pointsCles.map((pc) => (
                    <tr key={pc.libelle} className="border-b border-filet">
                      <th scope="row" className="w-1/2 py-3 pr-4 font-normal text-gris">
                        {pc.libelle}
                      </th>
                      <td className="py-3 font-semibold text-marine">{pc.valeur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {p.conditions && (
            <section className="mt-12">
              <h2 className="text-xl">Conditions d&apos;accès</h2>
              <ul className="mt-4 border-t border-marine">
                {p.conditions.map((c) => (
                  <li key={c} className="flex gap-3 border-b border-filet py-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-vert" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {p.documents && (
            <section className="mt-12">
              <h2 className="text-xl">Pièces à fournir</h2>
              <ol className="mt-4 border-t border-marine">
                {p.documents.map((d, i) => (
                  <li key={d} className="grid grid-cols-[2rem_1fr] border-b border-filet py-3">
                    <span className="text-gris tabular-nums">{i + 1}.</span>
                    {d}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </article>

        <aside className="space-y-10 lg:sticky lg:top-36 lg:self-start">
          <div className="border-t-4 border-rouge bg-gris-clair p-6">
            <h2 className="text-lg">{action.libelle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gris">{action.texte}</p>
            <Link href={lienAction} className="bouton bouton-principal mt-5 w-full">
              {action.libelle}
            </Link>
            <p className="mt-5 border-t border-filet pt-4 text-sm text-gris">
              Ou appelez le{" "}
              <a href={site.telephoneLien} className="font-semibold text-marine hover:underline">
                {site.telephone}
              </a>
            </p>
          </div>

          {voisins.length > 0 && (
            <nav aria-label={`Autres offres : ${u.nomCourt}`}>
              <p className="border-b border-marine pb-3 text-sm font-semibold text-marine">Dans la même famille</p>
              <ul>
                {voisins.map((v) => (
                  <li key={v.slug}>
                    <Link href={lienProduit(u, v)} className="block border-b border-filet py-2.5 text-[0.95rem] text-encre/85 hover:text-bleu">
                      {v.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>

      <BandeauContact />
    </>
  );
}
