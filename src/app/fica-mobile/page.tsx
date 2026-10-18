import { ArrowLeftRight, History, ShieldCheck, Smartphone, Wallet, WifiOff } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppelAction, BandeauPage, TitreSection } from "@/components/blocs";
import { TelephoneUssd } from "@/components/telephone-ussd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FICA MOBILE — la banque sans internet au #808#",
  description:
    "FICA MOBILE : consultez votre solde, vos dernières opérations, transférez de compte à compte et vers Orange Money depuis n'importe quel téléphone, sans internet. Composez #808#.",
  alternates: { canonical: "/fica-mobile" },
};

const fonctions = [
  { icone: Wallet, titre: "Consulter votre solde", texte: "En temps réel, à tout moment, depuis n'importe quel téléphone." },
  { icone: History, titre: "Suivre vos opérations", texte: "Retracez vos 5 dernières opérations pour un meilleur suivi de votre compte." },
  { icone: ArrowLeftRight, titre: "Transférer de compte à compte", texte: "Envoyez de l'argent vers un autre compte FICA, instantanément." },
  { icone: Smartphone, titre: "Envoyer vers Orange Money", texte: "Faites des virements de votre compte vers Orange Money en toute simplicité." },
];

const avantages = [
  { icone: WifiOff, titre: "Sans internet", texte: "Le service USSD fonctionne sur tous les téléphones, même les plus simples, sans données mobiles." },
  { icone: ShieldCheck, titre: "Sécurisé", texte: "Vos opérations sont protégées et réservées aux titulaires de compte souscrits au service." },
  { icone: Smartphone, titre: "Partout en RCA", texte: "La banque disponible pour tous, sans contrainte de connexion, où que vous soyez." },
];

export default function PageFicaMobile() {
  return (
    <>
      <BandeauPage
        surtitre="Une première en Centrafrique"
        titre="FICA MOBILE, la banque accessible à tous, même sans internet"
        introduction={`Souscrivez au service, puis composez le ${site.codeUssd} depuis n'importe quel téléphone pour gérer votre compte où que vous soyez.`}
        miettes={[{ libelle: "FICA MOBILE" }]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact?objet=Souscription%20FICA%20MOBILE" className="bouton bouton-principal">
            Souscrire à FICA MOBILE
          </Link>
          <Link href="/ouverture-de-compte" className="bouton bouton-clair">
            Pas encore client ? Ouvrir un compte
          </Link>
        </div>
      </BandeauPage>

      <section className="conteneur grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1fr_1.3fr]">
        <TelephoneUssd code={site.codeUssd} />
        <div>
          <TitreSection surtitre="Fonctionnalités" titre="Tout votre compte, en quelques touches" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {fonctions.map((f) => (
              <li key={f.titre} className="carte p-6">
                <f.icone className="size-6 text-bleu" aria-hidden />
                <h3 className="mt-4 font-bold">{f.titre}</h3>
                <p className="mt-1.5 text-sm text-gris">{f.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-gris-clair">
        <div className="conteneur py-20 md:py-24">
          <TitreSection centre surtitre="Comment ça marche" titre="Trois étapes pour commencer" />
          <ol className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {[
              { titre: "Ayez un compte FICA", texte: "Compte courant ou épargne, pour particuliers comme pour entreprises." },
              { titre: "Souscrivez au service", texte: "En agence ou auprès de notre service clientèle." },
              { titre: `Composez le ${site.codeUssd}`, texte: "Depuis votre téléphone, et laissez-vous guider." },
            ].map((e, i) => (
              <li key={e.titre} className="rounded-2xl bg-white p-7 ring-1 ring-bordure">
                <span className="grid size-10 place-items-center rounded-full bg-rouge font-titre font-bold text-white">{i + 1}</span>
                <h3 className="mt-5 text-lg font-bold">{e.titre}</h3>
                <p className="mt-1.5 text-gris">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="conteneur py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/images/galerie/fica-13.jpg"
              alt="L'équipe FICA lors du lancement de FICA MOBILE"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <TitreSection
              surtitre="Notre engagement"
              titre="Rendre la banque accessible, rapide et disponible pour tous"
              introduction="Avec ce service USSD, la FICA met la technologie au service de l'inclusion financière, partout en Centrafrique."
            />
            <ul className="mt-8 space-y-5">
              {avantages.map((a) => (
                <li key={a.titre} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-vert-clair text-vert">
                    <a.icone className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-bold text-marine">{a.titre}</span>
                    <span className="text-gris">{a.texte}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AppelAction titre="Besoin d'aide pour souscrire ?" />
    </>
  );
}
