import Image from "next/image";
import { partenaires } from "@/lib/institution";

export function GrillePartenaires() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {partenaires.map((p) => (
        <li
          key={p.logo}
          className="group grid h-24 place-items-center rounded-xl border border-bordure bg-white p-4 transition-colors hover:border-bleu/30"
          title={p.nom}
        >
          <Image
            src={`/images/partenaires/${p.logo}`}
            alt={p.nom}
            width={160}
            height={80}
            className="max-h-14 w-auto object-contain opacity-80 mix-blend-multiply grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );
}
