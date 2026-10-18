"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/institution";

export function GaleriePhotos({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogue = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogue.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const deplacer = (pas: number) =>
    setIndex((i) => (i === null ? i : (i + pas + photos.length) % photos.length));

  const photo = index !== null ? photos[index] : null;

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <li key={p.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden bg-gris-clair"
              aria-label={`Agrandir : ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.largeur}
                height={p.hauteur}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-opacity group-hover:opacity-90"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogue}
        onClose={() => setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") deplacer(1);
          if (e.key === "ArrowLeft") deplacer(-1);
        }}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
        aria-label={photo?.alt}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/90"
      >
        {photo && (
          <figure className="relative flex flex-col items-center px-4">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.largeur}
              height={photo.hauteur}
              sizes="90vw"
              className="max-h-[80dvh] w-auto object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/80">
              {photo.alt} · {index! + 1} / {photos.length}
            </figcaption>
          </figure>
        )}
        <button type="button" onClick={() => setIndex(null)} aria-label="Fermer" className="fixed right-4 top-4 grid size-11 place-items-center bg-white/10 text-white hover:bg-white/20">
          <X className="size-5" />
        </button>
        <button type="button" onClick={() => deplacer(-1)} aria-label="Photo précédente" className="fixed left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center bg-white/10 text-white hover:bg-white/20">
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => deplacer(1)} aria-label="Photo suivante" className="fixed right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center bg-white/10 text-white hover:bg-white/20">
          <ChevronRight className="size-5" />
        </button>
      </dialog>
    </>
  );
}
