import Image from "next/image";
import Link from "next/link";

export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="FICA, retour à l'accueil">
      <span className="grid size-12 place-items-center rounded-lg bg-white p-1 ring-1 ring-bordure">
        <Image src="/images/logo.png" alt="" width={124} height={125} className="size-10 object-contain" priority />
      </span>
      <span className="leading-tight">
        <span className={`block font-titre text-lg font-extrabold tracking-tight ${clair ? "text-white" : "text-marine"}`}>
          FICA S.A.
        </span>
        <span className={`block text-[0.7rem] font-medium ${clair ? "text-white/70" : "text-gris"}`}>
          Financière de Centrafrique
        </span>
      </span>
    </Link>
  );
}
