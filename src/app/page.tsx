import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AvisClients } from "@/components/avis-clients";
import { BandeauContact } from "@/components/blocs";
import { CarrouselHero } from "@/components/carrousel-hero";
import { GrillePartenaires } from "@/components/partenaires";
import { actualitesPubliees, diapositivesPubliees } from "@/lib/contenu";
import { formaterDate, motDuDirecteur } from "@/lib/institution";
import { produitsDeRubrique, profils } from "@/lib/profils";
import { site } from "@/lib/site";

const accesRapides = [
  { titre: "Ouvrir un compte", texte: "Pièces à fournir et demande en ligne", href: "/ouverture-de-compte" },
  { titre: "Demander un crédit", texte: "Découverts, crédits amortissables, PME", href: "/services/credits" },
  { titre: "Obtenir une attestation", texte: "Solde, solvabilité, marchés publics, visa", href: "/services/attestations" },
  { titre: "Nous contacter", texte: `${site.telephone} · WhatsApp`, href: "/contact" },
];

const enBref = [
  { libelle: "Statut", valeur: "Établissement de microfinance, société anonyme" },
  { libelle: "Agrément", valeur: `COBAC, ${site.agrement}` },
  { libelle: "Capital social", valeur: site.capitalSocial },
  { libelle: "Siège", valeur: `${site.adresse.quartier}, ${site.adresse.ville}` },
  { libelle: "Partenaires", valeur: "Plus de 50 institutions et entreprises" },
];

export default async function Accueil() {
  const [diapositives, actualites] = await Promise.all([diapositivesPubliees(), actualitesPubliees()]);
  const [aLaUne, ...autresActualites] = actualites.slice(0, 4);

  return (
    <>
      <h1 className="sr-only">Financière de Centrafrique (FICA S.A.) : sécurité et disponibilité de vos dépôts</h1>
      <CarrouselHero diapositives={diapositives} />

      {/* --- Accès rapides --- */}
      <nav aria-label="Accès rapides" className="border-b border-filet">
        <ul className="conteneur grid sm:grid-cols-2 lg:grid-cols-4">
          {accesRapides.map((a, i) => (
            <li key={a.href} className={`border-filet ${i > 0 ? "border-t sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
              <Link href={a.href} className="group flex items-center justify-between gap-4 py-6 sm:px-6 lg:first:pl-0">
                <span>
                  <span className="block font-semibold text-marine group-hover:text-bleu">{a.titre}</span>
                  <span className="mt-0.5 block text-sm text-gris">{a.texte}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-bleu transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* --- Offres par profil --- */}
      <section className="conteneur py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl">Nos offres</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {profils.map((p) => {
            const liens = p.rubriques.flatMap((r) => produitsDeRubrique(r.produits)).slice(0, 4);
            return (
              <article key={p.slug} className="flex flex-col">
                <Link href={`/${p.slug}`} className="relative block aspect-[3/2] overflow-hidden bg-gris-clair">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </Link>
                <h3 className="mt-6 text-xl">
                  <Link href={`/${p.slug}`} className="hover:text-bleu">
                    {p.titre}
                  </Link>
                </h3>
                <p className="mt-2 text-gris">{p.introduction}</p>
                <ul className="mt-5 flex-1 border-t border-filet">
                  {liens.map(({ produit, href }) => (
                    <li key={href} className="border-b border-filet">
                      <Link href={href} className="flex items-center justify-between py-2.5 text-[0.95rem] text-marine hover:text-bleu">
                        {produit.nom}
                        <ArrowRight className="size-4 text-gris" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/${p.slug}`} className="lien-fleche mt-5">
                  Toute l&apos;offre {p.nom.toLowerCase()}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* --- FICA MOBILE --- */}
      <section className="bg-gris-clair">
        <div className="conteneur grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2">
          <div className="relative aspect-[2/1] overflow-hidden bg-white">
            <Image
              src="/images/actualites/fica-mobile-banniere.jpg"
              alt="Campagne FICA MOBILE : une solution sans connexion internet, composez #808#"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl">FICA MOBILE, votre compte sans connexion internet</h2>
            <p className="mt-4 text-lg leading-relaxed text-gris">
              Depuis n&apos;importe quel téléphone, composez le <strong className="font-semibold text-marine">{site.codeUssd}</strong>{" "}
              pour accéder à votre compte, où que vous soyez en Centrafrique.
            </p>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {[
                "Solde en temps réel",
                "5 dernières opérations",
                "Transfert de compte à compte",
                "Virement vers Orange Money",
              ].map((f) => (
                <li key={f} className="border-b border-filet py-2.5 text-marine">
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/fica-mobile" className="bouton bouton-secondaire mt-8">
              Découvrir FICA MOBILE
            </Link>
          </div>
        </div>
      </section>

      {/* --- La FICA en bref --- */}
      <section className="conteneur grid gap-12 py-16 md:py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl md:text-3xl">La FICA en bref</h2>
          <dl className="mt-8 border-t border-filet">
            {enBref.map((e) => (
              <div key={e.libelle} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-filet py-3.5">
                <dt className="text-gris">{e.libelle}</dt>
                <dd className="font-medium text-marine">{e.valeur}</dd>
              </div>
            ))}
          </dl>
          <Link href="/la-fica/gouvernance" className="lien-fleche mt-6">
            Gouvernance et actionnariat
          </Link>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl">Le mot du Directeur général</h2>
          <div className="mt-8 space-y-4 text-[1.05rem] leading-relaxed text-encre">
            <p>{motDuDirecteur.paragraphes[1]}</p>
            <p>{motDuDirecteur.paragraphes[4]}</p>
          </div>
          <p className="mt-6 text-sm">
            <span className="font-semibold text-marine">{motDuDirecteur.auteur}</span>
            <span className="text-gris">, {motDuDirecteur.fonction}</span>
          </p>
          <Link href="/la-fica#mot-du-directeur" className="lien-fleche mt-6">
            Lire le message complet
          </Link>
        </div>
      </section>

      {/* --- Actualités --- */}
      {aLaUne && (
      <section className="border-t border-filet">
        <div className="conteneur py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-2xl md:text-3xl">Actualités</h2>
            <Link href="/actualites" className="lien-fleche text-sm">
              Toutes les actualités
            </Link>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <article>
              <Link href={`/actualites/${aLaUne.slug}`} className="group block">
                <div className="relative aspect-[2/1] overflow-hidden bg-gris-clair">
                  <Image src={aLaUne.image} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                </div>
                <p className="mt-5 text-sm text-gris">
                  {aLaUne.categorie} · <time dateTime={aLaUne.date}>{formaterDate(aLaUne.date)}</time>
                </p>
                <h3 className="mt-2 text-xl group-hover:text-bleu group-hover:underline">{aLaUne.titre}</h3>
                <p className="mt-2 text-gris">{aLaUne.resume}</p>
              </Link>
            </article>
            <ul className="border-t border-filet">
              {autresActualites.map((a) => (
                <li key={a.slug} className="border-b border-filet">
                  <Link href={`/actualites/${a.slug}`} className="group grid grid-cols-[7rem_1fr] gap-5 py-5">
                    <div className="relative aspect-square overflow-hidden bg-gris-clair">
                      <Image src={a.image} alt="" fill sizes="112px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm text-gris">
                        {a.categorie} · <time dateTime={a.date}>{formaterDate(a.date)}</time>
                      </p>
                      <h3 className="mt-1 text-lg leading-snug group-hover:text-bleu group-hover:underline">{a.titre}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      )}

      <AvisClients />

      {/* --- Partenaires --- */}
      <section className="border-t border-filet">
        <div className="conteneur py-14">
          <h2 className="text-xl">Nos partenaires</h2>
          <div className="mt-8">
            <GrillePartenaires />
          </div>
        </div>
      </section>

      <BandeauContact />
    </>
  );
}
