import type { Metadata } from "next";
import { BandeauContact, BandeauPage } from "@/components/blocs";
import { actionnaires, conseilAdministration, direction } from "@/lib/institution";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gouvernance",
  description:
    "Direction générale, Conseil d'administration et actionnariat de la Financière de Centrafrique (FICA S.A.).",
  alternates: { canonical: "/la-fica/gouvernance" },
};

const valeurNominale = 1_000_000;
const nombre = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

export default function PageGouvernance() {
  const totalActions = actionnaires.reduce((s, a) => s + a.actions, 0);

  return (
    <>
      <BandeauPage
        titre="Gouvernance"
        introduction="La FICA est une société anonyme dotée d'un Conseil d'administration. Sa gestion est assurée par la Direction générale."
        miettes={[{ libelle: "La FICA", href: "/la-fica" }, { libelle: "Gouvernance" }]}
      />

      <div className="conteneur max-w-5xl space-y-16 py-14 md:py-16">
        <section id="direction-generale">
          <h2 className="text-2xl md:text-3xl">Direction générale</h2>
          <table className="mt-6 w-full border-t border-marine text-left">
            <tbody>
              {direction.map((d) => (
                <tr key={d.nom} className="border-b border-filet">
                  <th scope="row" className="py-4 pr-4 font-semibold text-marine">
                    {d.nom}
                  </th>
                  <td className="py-4 text-gris">{d.fonction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="conseil-administration">
          <h2 className="text-2xl md:text-3xl">Conseil d&apos;administration</h2>
          <p className="mt-3 max-w-3xl text-lg text-gris">
            Le Conseil compte au plus cinq membres, nommés par l&apos;Assemblée générale pour six ans renouvelables. Il
            réunit des administrateurs indépendants et des administrateurs actionnaires.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[32rem] border-t border-marine text-left">
              <thead className="text-sm text-gris">
                <tr className="border-b border-filet">
                  <th scope="col" className="py-3 pr-4 font-medium">Membre</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Fonction</th>
                  <th scope="col" className="py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {conseilAdministration.map((m) => (
                  <tr key={m.nom} className="border-b border-filet">
                    <th scope="row" className="py-4 pr-4 font-semibold text-marine">
                      {m.nom}
                    </th>
                    <td className="py-4 pr-4">{m.fonction}</td>
                    <td className="py-4 text-gris">{m.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="assemblee-generale">
          <h2 className="text-2xl md:text-3xl">Assemblée générale et actionnariat</h2>
          <p className="mt-3 max-w-3xl text-lg text-gris">
            L&apos;Assemblée générale réunit l&apos;ensemble des actionnaires. Elle est présidée par le Président du
            Conseil d&apos;administration. Capital social : {site.capitalSocial}, valeur nominale de l&apos;action :{" "}
            {nombre(valeurNominale)} FCFA.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-t border-marine text-left">
              <caption className="sr-only">Répartition du capital social de la FICA</caption>
              <thead className="text-sm text-gris">
                <tr className="border-b border-filet">
                  <th scope="col" className="py-3 pr-4 font-medium">Actionnaire</th>
                  <th scope="col" className="py-3 pr-4 text-right font-medium">Actions</th>
                  <th scope="col" className="py-3 pr-4 text-right font-medium">Montant (FCFA)</th>
                  <th scope="col" className="py-3 text-right font-medium">Part</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {actionnaires.map((a) => (
                  <tr key={a.nom} className="border-b border-filet">
                    <th scope="row" className="py-3.5 pr-4 font-semibold text-marine">
                      {a.nom}
                    </th>
                    <td className="py-3.5 pr-4 text-right">{nombre(a.actions)}</td>
                    <td className="py-3.5 pr-4 text-right">{nombre(a.actions * valeurNominale)}</td>
                    <td className="py-3.5 text-right">{a.part} %</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="tabular-nums">
                <tr className="border-b-2 border-marine font-semibold text-marine">
                  <th scope="row" className="py-3.5 pr-4">Total</th>
                  <td className="py-3.5 pr-4 text-right">{nombre(totalActions)}</td>
                  <td className="py-3.5 pr-4 text-right">{nombre(totalActions * valeurNominale)}</td>
                  <td className="py-3.5 text-right">100 %</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>

      <BandeauContact />
    </>
  );
}
