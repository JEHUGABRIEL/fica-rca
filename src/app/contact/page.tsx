import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { BandeauPage } from "@/components/blocs";
import { FormulaireDemande } from "@/components/formulaire-demande";
import { adresseComplete, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez la FICA : ${site.telephone}, WhatsApp, e-mail ou à notre agence de Bangui, rue Martin Luther King.`,
  alternates: { canonical: "/contact" },
};

const canaux = [
  { icone: Phone, titre: "Service clientèle", valeur: site.telephone, href: site.telephoneLien },
  { icone: MessageCircle, titre: "WhatsApp", valeur: site.whatsapp, href: site.whatsappLien, externe: true },
  { icone: Mail, titre: "E-mail", valeur: site.email, href: `mailto:${site.email}` },
];

export default function PageContact() {
  return (
    <>
      <BandeauPage
        titre="Contactez-nous"
        introduction="Une question, un projet, une demande d'attestation ? Nos conseillers vous répondent."
        miettes={[{ libelle: "Contact" }]}
      />

      <div className="conteneur grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-4">
          {canaux.map((c) => (
            <a
              key={c.titre}
              href={c.href}
              {...(c.externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="carte flex items-center gap-4 p-5"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ciel text-bleu">
                <c.icone className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-gris">{c.titre}</span>
                <span className="font-titre text-lg font-bold text-marine">{c.valeur}</span>
              </span>
            </a>
          ))}
          <div className="carte flex gap-4 p-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ciel text-bleu">
              <MapPin className="size-5" aria-hidden />
            </span>
            <address className="not-italic">
              <span className="block text-sm text-gris">Siège et agence</span>
              <span className="block font-semibold text-marine">{site.adresse.rue}</span>
              <span className="block text-gris">
                {site.adresse.quartier}, {site.adresse.boitePostale} {site.adresse.ville}
                <br />
                {site.adresse.pays}
              </span>
            </address>
          </div>
        </div>

        <section aria-labelledby="titre-formulaire" className="rounded-2xl border border-bordure p-6 md:p-9">
          <h2 id="titre-formulaire" className="text-2xl font-bold">
            Écrivez-nous
          </h2>
          <p className="mb-8 mt-2 text-gris">Nous vous répondons par téléphone ou par e-mail dans les meilleurs délais.</p>
          <Suspense fallback={<div className="min-h-96" />}>
            <FormulaireDemande nature="contact" />
          </Suspense>
        </section>
      </div>

      <div className="conteneur pb-20">
        <iframe
          title={`Plan d'accès : ${adresseComplete}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent("Rue Martin Luther King, Bangui, République centrafricaine")}&output=embed`}
          className="h-[24rem] w-full rounded-2xl border border-bordure"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}
