import { ArrowRight, Scale, HeartHandshake, MapPinned, CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppelAction, BandeauPage, TitreSection } from "@/components/blocs";
import { chiffresCles, datesCles, engagements, jalons, motDuDirecteur, valeurs } from "@/lib/institution";

export const metadata: Metadata = {
  title: "Qui sommes-nous",
  description:
    "La Financière de Centrafrique (FICA S.A.) : mot du Directeur général, vision, valeurs et engagements d'un établissement de microfinance agréé par la COBAC.",
  alternates: { canonical: "/la-fica" },
};

const iconesEngagements = [Scale, HeartHandshake, MapPinned];

export default function PageLaFica() {
  return (
    <>
      <BandeauPage
        titre="Un levier de développement pour la Centrafrique"
        surtitre="Qui sommes-nous"
        introduction="La Financière de Centrafrique offre à chaque citoyen, où qu'il soit, l'accès à des services financiers modernes, sûrs et adaptés à ses besoins."
        miettes={[{ libelle: "La FICA" }]}
      />

      {/* --- Chiffres --- */}
      <section className="border-b border-bordure">
        <dl className="conteneur grid grid-cols-2 gap-y-8 py-12 lg:grid-cols-4">
          {chiffresCles.map((c) => (
            <div key={c.libelle} className="flex flex-col">
              <dt className="text-sm text-gris">{c.libelle}</dt>
              <dd className="order-first font-titre text-3xl font-extrabold text-marine md:text-4xl">{c.valeur}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* --- Mot du DG --- */}
      <section id="mot-du-directeur" className="conteneur grid gap-12 py-20 md:py-24 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <p className="surtitre">Mot du Directeur général</p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Bienvenue à la Financière de Centrafrique</h2>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/images/galerie/equipe-hall.jpg" alt="L'équipe de la FICA dans le hall de l'agence" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="prose-fica">
          <p className="font-semibold text-marine">{motDuDirecteur.salutation}</p>
          {motDuDirecteur.paragraphes.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="!mt-10 border-l-4 border-rouge pl-5">
            <span className="block font-titre text-lg font-bold text-marine">{motDuDirecteur.auteur}</span>
            <span className="text-gris">{motDuDirecteur.fonction}</span>
          </p>
        </div>
      </section>

      {/* --- Histoire --- */}
      <section id="histoire" className="bg-gris-clair">
        <div className="conteneur py-20 md:py-24">
          <TitreSection surtitre="Notre histoire" titre="Les grandes étapes" />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {jalons.map((j) => (
              <li key={j.titre} className="relative rounded-2xl bg-white p-7 ring-1 ring-bordure">
                <span className="font-titre text-4xl font-extrabold text-bleu">{j.annee}</span>
                <h3 className="mt-3 text-lg font-bold">{j.titre}</h3>
                <p className="mt-2 text-gris">{j.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- Valeurs --- */}
      <section id="valeurs" className="conteneur py-20 md:py-24">
        <TitreSection
          surtitre="Nos valeurs"
          titre="Les valeurs qui nous rassemblent"
          introduction="Ces principes ne sont pas de simples mots, mais des repères qui orientent nos décisions et guident l'action quotidienne de nos équipes."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-bordure bg-bordure sm:grid-cols-2 lg:grid-cols-3">
          {valeurs.map((v, i) => (
            <li key={v.titre} className="bg-white p-7">
              <span className="font-titre text-sm font-bold text-rouge">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-xl font-bold">{v.titre}</h3>
              <p className="mt-2 text-gris">{v.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* --- Engagements --- */}
      <section id="engagements" className="bg-marine text-white">
        <div className="conteneur py-20 md:py-24">
          <p className="surtitre !text-[#8fb0ff]">Nos engagements</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-white md:text-4xl">
            Une finance inclusive, éthique et responsable
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {engagements.map((e, i) => {
              const Icone = iconesEngagements[i];
              return (
                <div key={e.titre} className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
                  <Icone className="size-7 text-[#8fb0ff]" aria-hidden />
                  <h3 className="mt-5 text-xl font-bold text-white">{e.titre}</h3>
                  <p className="mt-2 text-white/70">{e.texte}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Dates clés --- */}
      <section id="dates-cles" className="conteneur grid gap-12 py-20 md:py-24 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <TitreSection
            surtitre="Calendrier"
            titre="Les dates clés de l'année"
            introduction="Fêtes nationales, commémorations et temps forts de la vie de la FICA."
          />
          <Link href="/la-fica/gouvernance" className="bouton bouton-contour mt-8">
            Découvrir notre gouvernance
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="divide-y divide-bordure rounded-2xl border border-bordure">
          {datesCles.map((d) => (
            <li key={d.date} className={`flex items-center gap-5 px-6 py-4 ${d.fica ? "bg-ciel" : ""}`}>
              <CalendarDays className={`size-5 shrink-0 ${d.fica ? "text-rouge" : "text-bleu"}`} aria-hidden />
              <span className="w-28 shrink-0 font-titre font-bold text-marine">{d.date}</span>
              <span className={d.fica ? "font-semibold text-marine" : "text-gris"}>{d.libelle}</span>
            </li>
          ))}
        </ul>
      </section>

      <AppelAction />
    </>
  );
}
