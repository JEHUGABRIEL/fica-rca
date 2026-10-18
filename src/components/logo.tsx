import Image from "next/image";
import Link from "next/link";

export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="FICA, retour à l'accueil">
      <Image
        src="/images/logo.png"
        alt=""
        width={124}
        height={125}
        priority
        className={`size-11 object-contain ${clair ? "bg-white p-0.5" : ""}`}
      />
      <span className={`border-l pl-3 leading-tight ${clair ? "border-white/25" : "border-filet"}`}>
        <span className={`block text-[1.05rem] font-semibold tracking-wide ${clair ? "text-white" : "text-marine"}`}>FICA S.A.</span>
        <span className={`block text-xs ${clair ? "text-white/65" : "text-gris"}`}>Financière de Centrafrique</span>
      </span>
    </Link>
  );
}
