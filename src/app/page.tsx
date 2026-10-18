import { ArrowRight, Building2, Check, Quote, ShieldCheck, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AppelAction, MotifArbre, TitreSection } from "@/components/blocs";
import { CarteActualite } from "@/components/carte-actualite";
import { IconeUnivers } from "@/components/icone-univers";
import { GrillePartenaires } from "@/components/partenaires";
import { TelephoneUssd } from "@/components/telephone-ussd";
import { actualites, chiffresCles, motDuDirecteur } from "@/lib/institution";
import { univers } from "@/lib/services";
import { site } from "@/lib/site";

const fonctionsMobile = [
  "Consulter votre solde en temps réel",
  "Retracer vos 5 dernières opérations",
  "Transférer de compte à compte, instantanément",
  "Envoyer vers Orange Money",
];

export default function Accueil() {
  return (
    <>
      {/* --- Héros --- */}
      <section className="relative overflow-hidden bg-marine text-white">
        <MotifArbre className="pointer-events-none absolute -left-40 bottom-0 h-[115%] text-white/[0.03]" />
        <div className="conteneur relative grid items-center gap-12 pb-28 pt-14 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pb-36">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm text-white/85 ring-1 ring-white/15">
              <ShieldCheck className="size-4 text-emerald-300" aria-hidden />
              Établissement agréé par la COBAC depuis 2020
            </p>
            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[3.6rem]">
              Sécurité et disponibilité <span className="text-[#8fb0ff]">de vos dépôts.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Comptes, crédits, paiements et banque sans internet : la Financière de Centrafrique accompagne
              particuliers, entrepreneurs et institutions avec des services sûrs, modernes et proches de vous.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/ouverture-de-compte" className="bouton bouton-principal">
                Ouvrir un compte
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/services/comptes" className="bouton bouton-clair">
                Découvrir nos offres
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-white/10">
              <Image
                src="/images/galerie/fica-09.jpg"
                alt="Les conseillères de la FICA à l'agence de Bangui"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-marine/40 to-transparent" />
            </div>
            <Link
              href="/fica-mobile"
              className="group absolute -bottom-8 left-4 flex items-center gap-4 rounded-2xl bg-white p-4 pr-6 text-marine shadow-2xl sm:left-[-1.5rem]"
            >
              <span className="grid h-12 place-items-center rounded-xl bg-rouge px-3 font-titre text-sm font-extrabold text-white">
                {site.codeUssd}
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gris">Nouveau</span>
                <span className="flex items-center gap-1 font-titre font-bold group-hover:text-bleu">
                  FICA MOBILE, sans internet
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Chiffres clés --- */}
      <section className="conteneur relative z-10 -mt-14">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-bordure bg-white shadow-[var(--shadow-carte)] lg:grid-cols-4">
          {chiffresCles.map((c, i) => (
            <div
              key={c.libelle}
              className={`flex flex-col p-6 md:p-8 ${i % 2 === 1 ? "border-l border-bordure" : ""} ${i >= 2 ? "border-t border-bordure lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="text-sm text-gris">{c.libelle}</dt>
              <dd className="order-first font-titre text-3xl font-extrabold text-marine md:text-4xl">{c.valeur}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* --- Services --- */}
      <section className="conteneur py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <TitreSection
            surtitre="Nos services"
            titre="Des solutions pour chaque étape de votre vie financière"
            introduction="Que vous soyez salarié, entrepreneur, association ou institution, la FICA vous propose des services pensés pour la réalité centrafricaine."
          />
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {univers.map((u) => (
            <Link key={u.slug} href={`/services/${u.slug}`} className="carte group flex flex-col p-7">
              <span className="grid size-12 place-items-center rounded-xl bg-ciel text-bleu transition-colors group-hover:bg-bleu group-hover:text-white">
                <IconeUnivers cle={u.icone} className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold">{u.nom}</h3>
              <p className="mt-2 flex-1 text-gris">{u.accroche}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-bleu">
                {u.produits.length} offres
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* --- FICA MOBILE --- */}
      <section className="bg-gris-clair">
        <div className="conteneur grid items-center gap-14 py-20 md:py-28 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <TelephoneUssd code={site.codeUssd} />
          </div>
          <div className="order-1 lg:order-2">
            <p className="surtitre">Une première en Centrafrique</p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              FICA MOBILE : votre compte dans votre poche, même sans internet
            </h2>
            <p className="mt-4 text-lg text-gris">
              Depuis n&apos;importe quel téléphone, composez le <strong className="text-marine">{site.codeUssd}</strong> et
              gérez votre argent où que vous soyez en RCA.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {fonctionsMobile.map((f) => (
                <li key={f} className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-bordure">
                  <Check className="mt-0.5 size-5 shrink-0 text-vert" aria-hidden />
                  <span className="text-[0.95rem] font-medium text-marine">{f}</span>
                </li>
              ))}
            </ul>
            <Link href="/fica-mobile" className="bouton bouton-bleu mt-8">
              Découvrir FICA MOBILE
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* --- Ouverture de compte --- */}
      <section className="conteneur py-20 md:py-28">
        <TitreSection
          centre
          surtitre="Devenir client"
          titre="Ouvrez votre compte en trois étapes"
          introduction="Préparez vos pièces, déposez votre demande en ligne ou en agence, un conseiller finalise l'ouverture avec vous."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[
            {
              icone: UserRound,
              titre: "Particuliers",
              texte: "Salariés, travailleurs indépendants, épargne pour vous ou vos enfants.",
              offres: ["Comptes Bronze, Or et Diamant", "Compte non salarié", "Épargne ordinaire et Junior"],
              href: "/ouverture-de-compte#particuliers",
            },
            {
              icone: Building2,
              titre: "Entreprises et associations",
              texte: "Sociétés, entreprises individuelles, associations, GIC et ONG.",
              offres: ["Compte courant Société", "Compte Entreprise individuelle", "Compte Association, GIC et ONG"],
              href: "/ouverture-de-compte#entreprises",
            },
          ].map((b) => (
            <Link key={b.titre} href={b.href} className="carte group flex flex-col p-8">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-rouge/10 text-rouge">
                  <b.icone className="size-6" aria-hidden />
                </span>
                <h3 className="text-xl font-bold">{b.titre}</h3>
              </div>
              <p className="mt-4 text-gris">{b.texte}</p>
              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {b.offres.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-marine">
                    <Check className="size-4 text-vert" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
              <span className="mt-7 inline-flex items-center gap-1.5 font-semibold text-rouge">
                Commencer ma demande
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* --- Mot du Directeur général --- */}
      <section className="bg-marine text-white">
        <div className="conteneur grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="surtitre !text-[#8fb0ff]">Le mot du Directeur général</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
              « Une finance accessible, équitable et centrée sur l&apos;humain. »
            </h2>
            <div className="mt-8 flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-full bg-white/10 font-titre text-lg font-bold">EK</span>
              <span>
                <span className="block font-semibold">{motDuDirecteur.auteur}</span>
                <span className="text-sm text-white/60">{motDuDirecteur.fonction}</span>
              </span>
            </div>
          </div>
          <div>
            <Quote className="size-10 text-[#8fb0ff]/40" aria-hidden />
            <div className="mt-4 space-y-5 text-lg leading-relaxed text-white/80">
              <p>{motDuDirecteur.paragraphes[1]}</p>
              <p>{motDuDirecteur.paragraphes[4]}</p>
            </div>
            <Link href="/la-fica#mot-du-directeur" className="bouton bouton-clair mt-8">
              Lire le message complet
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* --- Actualités --- */}
      <section className="conteneur py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <TitreSection surtitre="Actualités" titre="La vie de la FICA" />
          <Link href="/actualites" className="bouton bouton-contour self-start md:self-auto">
            Toutes les actualités
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {actualites.slice(0, 3).map((a) => (
            <CarteActualite key={a.slug} actualite={a} />
          ))}
        </div>
      </section>

      {/* --- Partenaires --- */}
      <section className="bg-gris-clair">
        <div className="conteneur py-20 md:py-24">
          <TitreSection
            centre
            surtitre="Ils nous font confiance"
            titre="Nos partenaires"
            introduction="Institutions publiques, banques, assureurs, opérateurs et organisations internationales."
          />
          <div className="mt-12">
            <GrillePartenaires />
          </div>
        </div>
      </section>

      <AppelAction />
    </>
  );
}
