import Link from "next/link";

export function EnTetePage({ titre, description, action }: { titre: string; description?: string; action?: { libelle: string; href: string } }) {
  return (
    <header className="flex flex-col justify-between gap-4 border-b border-filet pb-5 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl">{titre}</h1>
        {description && <p className="mt-1 max-w-2xl text-gris">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="bouton bouton-principal shrink-0">
          {action.libelle}
        </Link>
      )}
    </header>
  );
}

export function Chargement() {
  return <p className="mt-8 text-gris">Chargement…</p>;
}

export function PastilleStatut({ actif, oui = "Publiée", non = "Masquée" }: { actif: boolean; oui?: string; non?: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium ${actif ? "bg-vert/10 text-vert" : "bg-gris/15 text-gris"}`}>
      {actif ? oui : non}
    </span>
  );
}
