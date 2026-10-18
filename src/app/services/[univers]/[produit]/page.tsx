import { ArrowRight, CircleCheck, FileText, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppelAction, BandeauPage } from "@/components/blocs";
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

const libellesAction = {
  ouverture: { titre: "Ouvrir ce compte", texte: "Déposez votre demande en ligne, un conseiller vous recontacte pour finaliser l'ouverture." },
  demande: { titre: "Faire une demande", texte: "Décrivez votre besoin, un conseiller étudie votre demande et vous recontacte rapidement." },
  information: { titre: "Être conseillé", texte: "Notre service clientèle répond à toutes vos questions sur ce service." },
};

export default async function PageProduit({ params }: PageProps<"/services/[univers]/[produit]">) {
  const { univers: slugUnivers, produit: slugProduit } = await params;
  const trouve = trouverProduit(slugUnivers, slugProduit);
  if (!trouve || trouve.produit.pageDediee) notFound();
  const { univers: u, produit: p } = trouve;

  const action = libellesAction[p.action];
  const lienAction =
    p.action === "ouverture"
      ? `/ouverture-de-compte?compte=${p.slug}`
      : `/contact?objet=${encodeURIComponent(p.nom)}`;
  const voisins = u.produits.filter((autre) => autre.slug !== p.slug).slice(0, 5);

  return (
    <>
      <BandeauPage
        surtitre={u.nom}
        titre={p.nom}
        introduction={p.accroche}
        miettes={[
          { libelle: "Nos services", href: "/services" },
          { libelle: u.nomCourt, href: `/services/${u.slug}` },
          { libelle: p.nom },
        ]}
      />

      <div className="conteneur grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_22rem]">
        <article className="min-w-0">
          <div className="prose-fica max-w-3xl">
            {p.description.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          {p.pointsCles && (
            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {p.pointsCles.map((pc) => (
                <div key={pc.libelle} className="rounded-xl border border-bordure bg-gris-clair p-5">
                  <dt className="text-sm text-gris">{pc.libelle}</dt>
                  <dd className="mt-1 font-titre text-xl font-bold text-marine">{pc.valeur}</dd>
                </div>
              ))}
            </dl>
          )}

          {p.conditions && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold">Conditions d&apos;accès</h2>
              <ul className="mt-5 space-y-3">
                {p.conditions.map((c) => (
                  <li key={c} className="flex gap-3">
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-vert" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {p.documents && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold">Pièces à fournir</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {p.documents.map((d) => (
                  <li key={d} className="flex gap-3 rounded-xl border border-bordure p-4 text-[0.95rem]">
                    <FileText className="mt-0.5 size-5 shrink-0 text-bleu" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <aside className="space-y-6 lg:sticky lg:top-36 lg:self-start">
          <div className="rounded-2xl bg-marine p-7 text-white">
            <h2 className="text-xl font-bold text-white">{action.titre}</h2>
            <p className="mt-2 text-sm text-white/70">{action.texte}</p>
            <Link href={lienAction} className="bouton bouton-principal mt-6 w-full">
              {action.titre}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
              <a href={site.telephoneLien} className="flex items-center gap-3 text-white/80 hover:text-white">
                <Phone className="size-4" aria-hidden />
                {site.telephone}
              </a>
              <a href={site.whatsappLien} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white">
                <MessageCircle className="size-4" aria-hidden />
                WhatsApp {site.whatsapp}
              </a>
            </div>
          </div>

          {voisins.length > 0 && (
            <nav aria-label={`Autres offres : ${u.nomCourt}`} className="rounded-2xl border border-bordure p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gris">Dans la même catégorie</h2>
              <ul className="mt-4 space-y-1">
                {voisins.map((v) => (
                  <li key={v.slug}>
                    <Link href={lienProduit(u, v)} className="group flex items-center justify-between gap-3 rounded-lg py-2 text-[0.95rem] font-medium text-marine hover:text-bleu">
                      {v.nom}
                      <ArrowRight className="size-4 shrink-0 text-gris group-hover:text-bleu" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>

      <AppelAction />
    </>
  );
}
