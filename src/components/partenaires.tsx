import Image from "next/image";
import { partenaires } from "@/lib/institution";

export function GrillePartenaires() {
  return (
    <ul className="grid grid-cols-3 border-l border-t border-filet sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
      {partenaires.map((p) => (
        <li key={p.logo} className="grid h-20 place-items-center border-b border-r border-filet p-3" title={p.nom}>
          <Image
            src={`/images/partenaires/${p.logo}`}
            alt={p.nom}
            width={120}
            height={60}
            className="max-h-10 w-auto object-contain opacity-75 mix-blend-multiply grayscale transition hover:opacity-100 hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );
}
