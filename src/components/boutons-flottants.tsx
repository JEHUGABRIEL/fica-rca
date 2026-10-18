"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { IconeWhatsapp } from "@/components/icones-sociales";
import { site } from "@/lib/site";

/* Bouton WhatsApp permanent et retour en haut de page, en bas à droite. */
export function BoutonsFlottants() {
  const [defile, setDefile] = useState(false);

  useEffect(() => {
    const surDefilement = () => setDefile(window.scrollY > 600);
    surDefilement();
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => window.removeEventListener("scroll", surDefilement);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 print:hidden">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
        aria-label="Revenir en haut de la page"
        tabIndex={defile ? 0 : -1}
        aria-hidden={!defile}
        className={`grid size-11 place-items-center bg-marine text-white shadow-md transition-all duration-200 hover:bg-bleu ${
          defile ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ArrowUp className="size-5" aria-hidden />
      </button>
      <a
        href={site.whatsappLien}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Écrire à la FICA sur WhatsApp (${site.whatsapp})`}
        className="group flex items-center gap-2 rounded-full bg-[#25d366] p-3.5 text-white shadow-lg transition-colors hover:bg-[#1ebe5b]"
      >
        <IconeWhatsapp className="size-6" />
        <span className="hidden pr-1 text-sm font-medium md:group-hover:inline">Une question ?</span>
      </a>
    </div>
  );
}
