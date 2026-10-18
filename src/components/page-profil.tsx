import Image from "next/image";
import Link from "next/link";
import { BandeauContact, FilAriane } from "@/components/blocs";
import { ListeOffres } from "@/components/liste-offres";
import { produitsDeRubrique, type Profil } from "@/lib/profils";

const ancre = (titre: string) =>
  titre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function PageProfil({ profil }: { profil: Profil }) {
  return (
    <>
      <section className="border-b border-filet bg-gris-clair">
        <div className="conteneur grid items-center gap-10 py-10 md:py-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <FilAriane miettes={[{ libelle: profil.nom }]} />
            <h1 className="mt-8 text-3xl md:text-[2.6rem]">{profil.titre}</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-gris">{profil.introduction}</p>
            <Link href="/ouverture-de-compte" className="bouton bouton-principal mt-8">
              Ouvrir un compte
            </Link>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image src={profil.image.src} alt={profil.image.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <div className="conteneur grid gap-12 py-14 md:py-16 lg:grid-cols-[13rem_1fr]">
        <nav aria-label="Sur cette page" className="hidden lg:block">
          <ul className="sticky top-36 space-y-1 border-l border-filet">
            {profil.rubriques.map((r) => (
              <li key={r.titre}>
                <a href={`#${ancre(r.titre)}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[0.95rem] text-gris hover:border-bleu hover:text-bleu">
                  {r.titre}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14">
          {profil.rubriques.map((r) => (
            <section key={r.titre} id={ancre(r.titre)} aria-labelledby={`titre-${ancre(r.titre)}`}>
              <h2 id={`titre-${ancre(r.titre)}`} className="text-2xl">
                {r.titre}
              </h2>
              <div className="mt-5">
                <ListeOffres offres={produitsDeRubrique(r.produits)} />
              </div>
            </section>
          ))}
        </div>
      </div>

      <BandeauContact />
    </>
  );
}
