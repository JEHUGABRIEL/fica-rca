import type { Metadata } from "next";
import { Suspense } from "react";
import { BandeauPage } from "@/components/blocs";
import { FormulaireDemande } from "@/components/formulaire-demande";
import { adresseComplete, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact et accès",
  description: `Contactez la FICA : ${site.telephone}, WhatsApp, e-mail ou à notre agence de Bangui, rue Martin Luther King.`,
  alternates: { canonical: "/contact" },
};

const coordonnees = [
  { libelle: "Service clientèle", valeur: site.telephone, href: site.telephoneLien },
  { libelle: "WhatsApp", valeur: site.whatsapp, href: site.whatsappLien, externe: true },
  { libelle: "E-mail", valeur: site.email, href: `mailto:${site.email}` },
];

export default function PageContact() {
  return (
    <>
      <BandeauPage
        titre="Contact et accès"
        introduction="Nos conseillers vous répondent par téléphone, sur WhatsApp, par e-mail ou à l'agence de Bangui."
        miettes={[{ libelle: "Contact" }]}
      />

      <div className="conteneur grid gap-14 py-14 md:py-16 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-10">
          <section>
            <h2 className="text-xl">Nous joindre</h2>
            <dl className="mt-4 border-t border-marine">
              {coordonnees.map((c) => (
                <div key={c.libelle} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-filet py-3.5">
                  <dt className="text-gris">{c.libelle}</dt>
                  <dd>
                    <a
                      href={c.href}
                      {...(c.externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="font-semibold text-marine hover:text-bleu hover:underline"
                    >
                      {c.valeur}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
          <section>
            <h2 className="text-xl">Siège et agence</h2>
            <address className="mt-4 border-t border-marine pt-4 not-italic leading-relaxed">
              <span className="font-semibold text-marine">{site.nom} S.A.</span>
              <br />
              {site.adresse.rue}
              <br />
              {site.adresse.quartier}, {site.adresse.boitePostale} {site.adresse.ville}
              <br />
              {site.adresse.pays}
            </address>
          </section>
        </div>

        <section aria-labelledby="titre-formulaire" className="border-t-4 border-marine bg-gris-clair p-6 md:p-8">
          <h2 id="titre-formulaire" className="text-xl">
            Écrire à un conseiller
          </h2>
          <p className="mb-6 mt-2 text-gris">Réponse par téléphone ou par e-mail.</p>
          <Suspense fallback={<div className="min-h-96" />}>
            <FormulaireDemande nature="contact" />
          </Suspense>
        </section>
      </div>

      <div className="border-t border-filet">
        <iframe
          title={`Plan d'accès : ${adresseComplete}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent("Rue Martin Luther King, Bangui, République centrafricaine")}&output=embed`}
          className="block h-[24rem] w-full grayscale-[30%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}
