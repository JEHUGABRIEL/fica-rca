import Link from "next/link";

export default function PageIntrouvable() {
  return (
    <section className="conteneur max-w-3xl py-24">
      <p className="text-sm text-gris">Erreur 404</p>
      <h1 className="mt-2 text-3xl">Page introuvable</h1>
      <p className="mt-4 text-lg text-gris">
        La page demandée n&apos;existe pas ou a été déplacée lors de la refonte du site.
      </p>
      <ul className="mt-8 border-t border-marine">
        {[
          { libelle: "Accueil", href: "/" },
          { libelle: "Toutes nos offres", href: "/services" },
          { libelle: "Ouvrir un compte", href: "/ouverture-de-compte" },
          { libelle: "Contact", href: "/contact" },
        ].map((l) => (
          <li key={l.href} className="border-b border-filet">
            <Link href={l.href} className="block py-3 font-medium text-marine hover:text-bleu hover:underline">
              {l.libelle}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
