import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BandeauContact, BandeauPage } from "@/components/blocs";
import { datesCles, engagements, jalons, motDuDirecteur, valeurs } from "@/lib/institution";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Qui sommes-nous",
  description:
    "La Financière de Centrafrique (FICA S.A.) : mot du Directeur général, histoire, valeurs et engagements d'un établissement de microfinance agréé par la COBAC.",
  alternates: { canonical: "/la-fica" },
};

const sommaire = [
  { id: "mot-du-directeur", libelle: "Mot du Directeur général" },
  { id: "histoire", libelle: "Histoire" },
  { id: "valeurs", libelle: "Valeurs" },
  { id: "engagements", libelle: "Engagements" },
  { id: "dates-cles", libelle: "Dates clés" },
];

export default function PageLaFica() {
  return (
    <>
      <BandeauPage
        titre="Qui sommes-nous"
        introduction={`La Financière de Centrafrique est un établissement de microfinance agréé par la COBAC le ${site.agrement}. Son siège est à Bangui.`}
        miettes={[{ libelle: "La FICA" }]}
      />

      <div className="conteneur grid gap-12 py-14 md:py-16 lg:grid-cols-[13rem_1fr]">
        <nav aria-label="Sur cette page" className="hidden lg:block">
          <ul className="sticky top-36 space-y-1 border-l border-filet">
            {sommaire.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[0.95rem] text-gris hover:border-bleu hover:text-bleu">
                  {s.libelle}
                </a>
              </li>
            ))}
            <li>
              <Link href="/la-fica/gouvernance" className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[0.95rem] text-gris hover:border-bleu hover:text-bleu">
                Gouvernance
              </Link>
            </li>
          </ul>
        </nav>

        <div className="max-w-3xl space-y-16">
          <section id="mot-du-directeur">
            <h2 className="text-2xl md:text-3xl">Mot du Directeur général</h2>
            <div className="relative mt-6 aspect-[16/8] overflow-hidden">
              <Image src="/images/galerie/equipe-hall.jpg" alt="Les équipes de la FICA dans le hall de l'agence" fill sizes="(min-width: 1024px) 48rem, 100vw" className="object-cover" />
            </div>
            <div className="texte-courant mt-8">
              <p className="font-medium text-marine">{motDuDirecteur.salutation}</p>
              {motDuDirecteur.paragraphes.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-8 border-t border-filet pt-4">
              <span className="font-semibold text-marine">{motDuDirecteur.auteur}</span>
              <span className="text-gris">, {motDuDirecteur.fonction}</span>
            </p>
          </section>

          <section id="histoire">
            <h2 className="text-2xl md:text-3xl">Histoire</h2>
            <table className="mt-6 w-full border-t border-marine text-left">
              <tbody>
                {jalons.map((j) => (
                  <tr key={j.titre} className="border-b border-filet align-top">
                    <th scope="row" className="w-24 py-4 pr-4 text-lg font-semibold text-bleu">
                      {j.annee}
                    </th>
                    <td className="py-4">
                      <p className="font-semibold text-marine">{j.titre}</p>
                      <p className="mt-1 text-gris">{j.texte}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="valeurs">
            <h2 className="text-2xl md:text-3xl">Valeurs</h2>
            <p className="mt-3 text-lg text-gris">
              Six valeurs orientent les décisions et l&apos;action quotidienne de nos équipes.
            </p>
            <ol className="mt-6 grid border-t border-marine sm:grid-cols-2 sm:gap-x-10">
              {valeurs.map((v, i) => (
                <li key={v} className="grid grid-cols-[2rem_1fr] border-b border-filet py-4">
                  <span className="font-semibold text-bleu tabular-nums">{i + 1}.</span>
                  <span className="font-semibold text-marine">{v}</span>
                </li>
              ))}
            </ol>
          </section>

          <section id="engagements">
            <h2 className="text-2xl md:text-3xl">Engagements</h2>
            <div className="mt-6 space-y-8">
              {engagements.map((e) => (
                <div key={e.titre} className="border-l-2 border-bleu pl-5">
                  <h3 className="text-lg">{e.titre}</h3>
                  <p className="mt-2 text-gris">{e.texte}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="dates-cles">
            <h2 className="text-2xl md:text-3xl">Dates clés de l&apos;année</h2>
            <table className="mt-6 w-full border-t border-marine text-left">
              <tbody>
                {datesCles.map((d) => (
                  <tr key={d.date} className="border-b border-filet">
                    <th scope="row" className="w-36 py-3 pr-4 font-semibold text-marine">
                      {d.date}
                    </th>
                    <td className={`py-3 ${d.fica ? "font-semibold text-bleu" : "text-gris"}`}>{d.libelle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>

      <BandeauContact />
    </>
  );
}
