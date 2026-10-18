import Link from "next/link";
import { site } from "@/lib/site";

export type Miette = { libelle: string; href?: string };

export function FilAriane({ miettes }: { miettes: Miette[] }) {
  const liste = [{ libelle: "Accueil", href: "/" }, ...miettes];
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-x-2 text-sm text-gris">
        {liste.map((m, i) => (
          <li key={m.libelle} className="flex items-center gap-2">
            {m.href && i < liste.length - 1 ? (
              <Link href={m.href} className="hover:text-bleu hover:underline">
                {m.libelle}
              </Link>
            ) : (
              <span aria-current="page" className="text-encre">
                {m.libelle}
              </span>
            )}
            {i < liste.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* En-tête des pages intérieures : fond gris clair, fil d'Ariane, titre. */
export function BandeauPage({
  titre,
  introduction,
  miettes,
  rubrique,
  children,
}: {
  titre: string;
  introduction?: string;
  miettes: Miette[];
  rubrique?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-filet bg-gris-clair">
      <div className="conteneur py-10 md:py-14">
        <FilAriane miettes={miettes} />
        {rubrique && <p className="mt-8 text-sm font-medium text-bleu">{rubrique}</p>}
        <h1 className={`${rubrique ? "mt-2" : "mt-8"} max-w-3xl text-3xl md:text-[2.6rem]`}>{titre}</h1>
        {introduction && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gris">{introduction}</p>}
        {children}
      </div>
    </section>
  );
}

/* Coordonnées du service clientèle, en bas des pages d'offre. */
export function BandeauContact() {
  const canaux = [
    { titre: "Par téléphone", valeur: site.telephone, href: site.telephoneLien, detail: "Service clientèle" },
    { titre: "Sur WhatsApp", valeur: site.whatsapp, href: site.whatsappLien, detail: "Réponse par un conseiller", externe: true },
    { titre: "En agence", valeur: "Rue Martin Luther King", href: "/contact", detail: "Centre-ville, Bangui" },
  ];
  return (
    <section className="border-t border-filet">
      <div className="conteneur grid gap-8 py-12 md:grid-cols-[1fr_3fr] md:items-center">
        <h2 className="text-xl">Besoin d&apos;un conseil ?</h2>
        <ul className="grid gap-6 sm:grid-cols-3 sm:divide-x sm:divide-filet">
          {canaux.map((c) => (
            <li key={c.titre} className="sm:px-6 sm:first:pl-0">
              <p className="text-sm text-gris">{c.titre}</p>
              <a
                href={c.href}
                {...(c.externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-1 block text-lg font-semibold text-marine hover:text-bleu"
              >
                {c.valeur}
              </a>
              <p className="text-sm text-gris">{c.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
