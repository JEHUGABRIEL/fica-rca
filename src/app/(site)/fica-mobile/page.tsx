import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BandeauContact, BandeauPage } from "@/components/blocs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FICA MOBILE, la banque sans internet au #808#",
  description:
    "FICA MOBILE : consultez votre solde, vos dernières opérations, transférez de compte à compte et vers Orange Money depuis n'importe quel téléphone, sans internet. Composez #808#.",
  alternates: { canonical: "/fica-mobile" },
};

const fonctions = [
  { titre: "Consulter votre solde", texte: "En temps réel, à tout moment." },
  { titre: "Suivre vos opérations", texte: "Affichage des 5 dernières opérations du compte." },
  { titre: "Transférer de compte à compte", texte: "Vers un autre compte FICA, instantanément." },
  { titre: "Envoyer vers Orange Money", texte: "Virement de votre compte vers un portefeuille Orange Money." },
];

const etapes = [
  "Disposer d'un compte courant ou d'épargne à la FICA.",
  "Souscrire au service en agence ou auprès du service clientèle.",
  `Composer le ${site.codeUssd} depuis votre téléphone et suivre les instructions.`,
];

export default function PageFicaMobile() {
  return (
    <>
      <BandeauPage
        rubrique="Services au quotidien"
        titre="FICA MOBILE"
        introduction="Votre compte accessible depuis n'importe quel téléphone, sans connexion internet."
        miettes={[{ libelle: "FICA MOBILE" }]}
      >
        <Link href="/contact?objet=Souscription%20FICA%20MOBILE" className="bouton bouton-principal mt-8">
          Souscrire au service
        </Link>
      </BandeauPage>

      <div className="conteneur grid gap-14 py-14 md:py-16 lg:grid-cols-[1fr_22rem]">
        <article className="min-w-0 max-w-3xl">
          <div className="relative aspect-[2/1] overflow-hidden bg-gris-clair">
            <Image
              src="/images/actualites/fica-mobile-lancement.jpg"
              alt="Campagne de lancement de FICA MOBILE : composez #808#"
              fill
              priority
              sizes="(min-width: 1024px) 48rem, 100vw"
              className="object-cover"
            />
          </div>

          <div className="texte-courant mt-10">
            <p>
              Lancé en 2026, FICA MOBILE est la première solution bancaire entièrement accessible sans internet en
              Centrafrique. Le service fonctionne par code USSD : il suffit d&apos;un téléphone, même simple, et du
              réseau mobile.
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-xl">Fonctionnalités</h2>
            <table className="mt-4 w-full border-t border-marine text-left">
              <tbody>
                {fonctions.map((f) => (
                  <tr key={f.titre} className="border-b border-filet">
                    <th scope="row" className="w-1/2 py-3.5 pr-4 font-semibold text-marine">
                      {f.titre}
                    </th>
                    <td className="py-3.5 text-gris">{f.texte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mt-12">
            <h2 className="text-xl">Comment souscrire</h2>
            <ol className="mt-4 border-t border-marine">
              {etapes.map((e, i) => (
                <li key={e} className="grid grid-cols-[2rem_1fr] border-b border-filet py-3.5">
                  <span className="font-semibold text-bleu tabular-nums">{i + 1}.</span>
                  {e}
                </li>
              ))}
            </ol>
          </section>

          <div className="relative mt-12 aspect-[16/9] overflow-hidden bg-gris-clair">
            <Image
              src="/images/galerie/fica-13.jpg"
              alt="L'équipe FICA lors du lancement de FICA MOBILE"
              fill
              sizes="(min-width: 1024px) 48rem, 100vw"
              className="object-cover"
            />
          </div>
        </article>

        <aside className="space-y-8 lg:sticky lg:top-36 lg:self-start">
          <div className="border-t-4 border-rouge bg-gris-clair p-6">
            <p className="text-sm text-gris">Code d&apos;accès</p>
            <p className="mt-1 text-4xl font-semibold tracking-wide text-marine">{site.codeUssd}</p>
            <p className="mt-3 text-sm leading-relaxed text-gris">
              Tous opérateurs, tous téléphones. Réservé aux clients ayant souscrit au service.
            </p>
            <Link href="/contact?objet=Souscription%20FICA%20MOBILE" className="bouton bouton-principal mt-5 w-full">
              Souscrire au service
            </Link>
          </div>
          <div>
            <p className="border-b border-marine pb-3 text-sm font-semibold text-marine">Pas encore client ?</p>
            <p className="mt-3 text-[0.95rem] text-gris">FICA MOBILE est accessible avec tous nos comptes courants et d&apos;épargne.</p>
            <Link href="/ouverture-de-compte" className="lien-fleche mt-3 text-sm">
              Ouvrir un compte
            </Link>
          </div>
        </aside>
      </div>

      <BandeauContact />
    </>
  );
}
