import Link from "next/link";

export default function PageIntrouvable() {
  return (
    <section className="conteneur flex flex-col items-center py-28 text-center">
      <p className="font-titre text-7xl font-extrabold text-ciel">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">Page introuvable</h1>
      <p className="mt-3 max-w-md text-gris">
        La page que vous cherchez n&apos;existe pas ou a été déplacée lors de la refonte du site.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="bouton bouton-bleu">
          Retour à l&apos;accueil
        </Link>
        <Link href="/services" className="bouton bouton-contour">
          Voir nos services
        </Link>
      </div>
    </section>
  );
}
