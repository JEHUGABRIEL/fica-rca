"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export type Diapositive = {
  image: string;
  alt: string;
  /** Cadrage de la photo (object-position). */
  cadrage?: string;
  rubrique: string;
  titre: string;
  texte: string;
  action: { libelle: string; href: string };
};

const DUREE = 7000;

const REQUETE_MOUVEMENT = "(prefers-reduced-motion: reduce)";
const sAbonnerMouvement = (rappel: () => void) => {
  const requete = window.matchMedia(REQUETE_MOUVEMENT);
  requete.addEventListener("change", rappel);
  return () => requete.removeEventListener("change", rappel);
};

/* Carrousel du visuel principal : photos en fondu, texte propre à chaque
   diapositive. Défilement automatique suspendu au survol, au focus, quand
   l'onglet est masqué, et désactivé si l'utilisateur limite les animations. */
export function CarrouselHero({ diapositives }: { diapositives: Diapositive[] }) {
  const [active, setActive] = useState(0);
  const [enLecture, setEnLecture] = useState(true);
  const [survole, setSurvole] = useState(false);
  const mouvementReduit = useSyncExternalStore(
    sAbonnerMouvement,
    () => window.matchMedia(REQUETE_MOUVEMENT).matches,
    () => false,
  );
  const total = diapositives.length;

  const aller = useCallback((i: number) => setActive((i + total) % total), [total]);

  const defile = enLecture && !survole && !mouvementReduit && total > 1;

  useEffect(() => {
    if (!defile) return;
    const minuteur = window.setTimeout(() => {
      if (document.visibilityState === "visible") aller(active + 1);
    }, DUREE);
    return () => window.clearTimeout(minuteur);
  }, [defile, active, aller]);

  return (
    <section
      aria-roledescription="carrousel"
      aria-label="À la une"
      className="relative isolate overflow-hidden bg-marine"
      onMouseEnter={() => setSurvole(true)}
      onMouseLeave={() => setSurvole(false)}
      onFocus={() => setSurvole(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setSurvole(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") aller(active + 1);
        if (e.key === "ArrowLeft") aller(active - 1);
      }}
    >
      {/* Photos */}
      {diapositives.map((d, i) => (
        <Image
          key={d.image}
          src={d.image}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`-z-20 object-cover transition-opacity duration-1000 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: d.cadrage ?? "center" }}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-marine via-marine/85 to-marine/10" />

      <div className="conteneur grid min-h-[32rem] md:min-h-[36rem] lg:min-h-[40rem]">
        {diapositives.map((d, i) => (
          <div
            key={d.titre}
            role="group"
            aria-roledescription="diapositive"
            aria-label={`${i + 1} sur ${total} : ${d.titre}`}
            aria-hidden={i !== active}
            inert={i !== active}
            className={`col-start-1 row-start-1 flex flex-col justify-center pb-28 pt-16 lg:pb-40 transition-all duration-700 ease-out ${
              i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-white/70">{d.rubrique}</p>
            <p className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl">{d.titre}</p>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">{d.texte}</p>
            <div className="mt-8">
              <Link href={d.action.href} className="bouton bouton-principal">
                {d.action.libelle}
              </Link>
            </div>
            <span className="sr-only">Photo : {d.alt}</span>
          </div>
        ))}
      </div>

      {/* Commandes */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="conteneur flex items-center gap-4 pb-8 lg:pb-24">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => aller(active - 1)}
              aria-label="Diapositive précédente"
              className="grid size-10 place-items-center border border-white/30 text-white hover:bg-white hover:text-marine"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => aller(active + 1)}
              aria-label="Diapositive suivante"
              className="grid size-10 place-items-center border border-white/30 text-white hover:bg-white hover:text-marine"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setEnLecture((l) => !l)}
              aria-label={enLecture ? "Mettre le défilement en pause" : "Reprendre le défilement"}
              className="grid size-10 place-items-center border border-white/30 text-white hover:bg-white hover:text-marine"
            >
              {enLecture ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
            </button>
          </div>

          <ol className="flex flex-1 gap-2" aria-label="Choisir une diapositive">
            {diapositives.map((d, i) => (
              <li key={d.titre} className="flex-1 sm:max-w-28">
                <button
                  type="button"
                  onClick={() => aller(i)}
                  aria-label={`Diapositive ${i + 1} : ${d.rubrique}`}
                  aria-current={i === active}
                  className="group block w-full py-3"
                >
                  <span className="block h-[3px] overflow-hidden bg-white/25">
                    <span
                      key={`${i}-${active}-${defile}`}
                      className={`block h-full bg-white ${i < active ? "w-full" : i === active ? "" : "w-0"}`}
                      style={
                        i === active
                          ? defile
                            ? { animation: `progression-carrousel ${DUREE}ms linear forwards` }
                            : { width: "100%" }
                          : undefined
                      }
                    />
                  </span>
                  <span className="mt-2 hidden truncate text-left text-xs text-white/60 group-hover:text-white sm:block">
                    {d.rubrique}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <p className="hidden text-sm tabular-nums text-white/70 md:block" aria-live={defile ? "off" : "polite"}>
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
