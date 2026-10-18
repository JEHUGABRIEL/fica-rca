import type { Metadata } from "next";
import { AppelAction, BandeauPage, TitreSection } from "@/components/blocs";
import { actionnaires, conseilAdministration, direction } from "@/lib/institution";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gouvernance",
  description:
    "Assemblée générale des actionnaires, Conseil d'administration et Direction générale de la Financière de Centrafrique (FICA S.A.).",
  alternates: { canonical: "/la-fica/gouvernance" },
};

const valeurNominale = 1_000_000;
const fcfa = (n: number) => `${new Intl.NumberFormat("fr-FR").format(n)} FCFA`;
const initiales = (nom: string) =>
  nom
    .split(/\s+/)
    .filter((m) => /^[A-ZÀ-Ý]/.test(m))
    .slice(0, 2)
    .map((m) => m[0])
    .join("");

export default function PageGouvernance() {
  const totalActions = actionnaires.reduce((s, a) => s + a.actions, 0);

  return (
    <>
      <BandeauPage
        titre="Gouvernance"
        introduction="Une gouvernance structurée et transparente, garante de la sécurité des dépôts de nos clients."
        miettes={[{ libelle: "La FICA", href: "/la-fica" }, { libelle: "Gouvernance" }]}
      />

      <nav aria-label="Sections de la page" className="sticky top-[4.75rem] z-30 border-b border-bordure bg-white/95 backdrop-blur md:top-[7.25rem]">
        <ul className="conteneur flex gap-6 overflow-x-auto text-sm font-semibold">
          {[
            { href: "#direction-generale", libelle: "Direction générale" },
            { href: "#conseil-administration", libelle: "Conseil d'administration" },
            { href: "#assemblee-generale", libelle: "Assemblée générale" },
          ].map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block whitespace-nowrap border-b-2 border-transparent py-4 text-gris hover:border-bleu hover:text-bleu">
                {l.libelle}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="direction-generale" className="conteneur py-16 md:py-20">
        <TitreSection surtitre="Direction générale" titre="L'équipe dirigeante" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
          {direction.map((d) => (
            <div key={d.nom} className="carte flex items-center gap-5 p-6">
              <span className="grid size-16 shrink-0 place-items-center rounded-full bg-bleu font-titre text-xl font-bold text-white">
                {initiales(d.nom)}
              </span>
              <span>
                <span className="block font-titre text-lg font-bold text-marine">{d.nom}</span>
                <span className="text-gris">{d.fonction}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="conseil-administration" className="bg-gris-clair">
        <div className="conteneur py-16 md:py-20">
          <TitreSection
            surtitre="Conseil d'administration"
            titre="Un conseil de cinq membres"
            introduction="La FICA est administrée par un Conseil d'administration composé de cinq membres au plus, nommés par l'Assemblée générale pour six ans renouvelables. Il réunit des administrateurs indépendants et des administrateurs actionnaires."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {conseilAdministration.map((m) => (
              <li key={m.nom} className="rounded-2xl bg-white p-6 ring-1 ring-bordure">
                <p className={`text-xs font-bold uppercase tracking-wider ${m.fonction === "Présidente" ? "text-rouge" : "text-bleu"}`}>
                  {m.fonction}
                </p>
                <p className="mt-2 font-titre text-lg font-bold text-marine">{m.nom}</p>
                <p className="mt-3 inline-block rounded-full bg-gris-clair px-3 py-1 text-xs font-semibold text-gris">
                  {m.statut}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="assemblee-generale" className="conteneur py-16 md:py-20">
        <TitreSection
          surtitre="Assemblée générale"
          titre="Actionnariat"
          introduction="L'Assemblée générale réunit l'ensemble des actionnaires de la FICA. Instance de décision et de concertation, elle est présidée par le Président du Conseil d'administration."
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-bordure">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <caption className="sr-only">Répartition du capital social de la FICA</caption>
            <thead className="bg-gris-clair text-xs uppercase tracking-wider text-gris">
              <tr>
                <th scope="col" className="px-5 py-4 font-semibold">Actionnaire</th>
                <th scope="col" className="px-5 py-4 text-right font-semibold">Actions</th>
                <th scope="col" className="px-5 py-4 text-right font-semibold">Valeur totale</th>
                <th scope="col" className="w-1/3 px-5 py-4 font-semibold">Part du capital</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bordure">
              {actionnaires.map((a) => (
                <tr key={a.nom}>
                  <th scope="row" className="px-5 py-4 font-semibold text-marine">{a.nom}</th>
                  <td className="px-5 py-4 text-right tabular-nums">{new Intl.NumberFormat("fr-FR").format(a.actions)}</td>
                  <td className="px-5 py-4 text-right tabular-nums">{fcfa(a.actions * valeurNominale)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gris-clair">
                        <div className="h-full rounded-full bg-bleu" style={{ width: `${a.part}%` }} />
                      </div>
                      <span className="w-10 text-right font-semibold tabular-nums text-marine">{a.part} %</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-ciel font-semibold text-marine">
              <tr>
                <th scope="row" className="px-5 py-4">Total</th>
                <td className="px-5 py-4 text-right tabular-nums">{new Intl.NumberFormat("fr-FR").format(totalActions)}</td>
                <td className="px-5 py-4 text-right tabular-nums">{site.capitalSocial}</td>
                <td className="px-5 py-4">100 %</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-3 text-sm text-gris">Valeur nominale de l&apos;action : {fcfa(valeurNominale)}.</p>
      </section>

      <AppelAction />
    </>
  );
}
