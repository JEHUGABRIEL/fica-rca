import { ChevronRight, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";

export type Miette = { libelle: string; href?: string };

/* Bandeau de titre des pages intérieures, avec fil d'Ariane. */
export function BandeauPage({
  titre,
  introduction,
  miettes,
  surtitre,
  children,
}: {
  titre: string;
  introduction?: string;
  miettes: Miette[];
  surtitre?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-marine text-white">
      <MotifArbre className="pointer-events-none absolute -right-24 -top-10 h-[130%] text-white/[0.04]" />
      <div className="conteneur relative py-14 md:py-20">
        <nav aria-label="Fil d'Ariane">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            {[{ libelle: "Accueil", href: "/" }, ...miettes].map((m, i, liste) => (
              <li key={m.libelle} className="flex items-center gap-1.5">
                {m.href && i < liste.length - 1 ? (
                  <Link href={m.href} className="hover:text-white">
                    {m.libelle}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/90">
                    {m.libelle}
                  </span>
                )}
                {i < liste.length - 1 && <ChevronRight className="size-3.5" aria-hidden />}
              </li>
            ))}
          </ol>
        </nav>
        {surtitre && <p className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-white/60">{surtitre}</p>}
        <h1 className={`${surtitre ? "mt-2" : "mt-8"} max-w-3xl text-4xl font-extrabold !text-white md:text-5xl`}>{titre}</h1>
        {introduction && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{introduction}</p>}
        {children}
      </div>
    </section>
  );
}

export function TitreSection({
  surtitre,
  titre,
  introduction,
  centre = false,
  id,
}: {
  surtitre?: string;
  titre: string;
  introduction?: string;
  centre?: boolean;
  id?: string;
}) {
  return (
    <div className={centre ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {surtitre && <p className="surtitre">{surtitre}</p>}
      <h2 id={id} className="mt-3 text-3xl font-extrabold md:text-4xl">
        {titre}
      </h2>
      {introduction && <p className="mt-4 text-lg leading-relaxed text-gris">{introduction}</p>}
    </div>
  );
}

/* Bandeau d'appel à l'action placé en bas des pages. */
export function AppelAction({
  titre = "Un conseiller vous répond",
  texte = "Une question sur un compte, un crédit ou une attestation ? Notre service clientèle vous accompagne par téléphone, sur WhatsApp ou en agence.",
}: {
  titre?: string;
  texte?: string;
}) {
  return (
    <section className="conteneur py-16 md:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-bleu px-6 py-12 text-white md:px-14 md:py-16">
        <MotifArbre className="pointer-events-none absolute -bottom-20 -right-16 h-[150%] text-white/[0.06]" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl font-extrabold !text-white md:text-4xl">{titre}</h2>
            <p className="mt-4 max-w-xl text-lg text-white/80">{texte}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <a href={site.telephoneLien} className="bouton bg-white text-marine hover:bg-ciel">
              <Phone className="size-4" aria-hidden />
              {site.telephone}
            </a>
            <a href={site.whatsappLien} target="_blank" rel="noopener noreferrer" className="bouton bouton-clair">
              <MessageCircle className="size-4" aria-hidden />
              Écrire sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Silhouette stylisée de l'arbre du logo, utilisée en filigrane. */
export function MotifArbre({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 220" fill="currentColor" aria-hidden className={className}>
      <path d="M100 8c-20 0-34 12-38 26-18-2-34 10-36 28-14 6-22 20-20 36 2 20 18 34 38 34 8 0 15-2 21-6 6 8 16 12 26 12V220h18v-82c10 0 20-4 26-12 6 4 13 6 21 6 20 0 36-14 38-34 2-16-6-30-20-36-2-18-18-30-36-28-4-14-18-26-38-26Z" />
    </svg>
  );
}
