import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { AnneeCourante } from "@/components/annee-courante";
import { Logo } from "@/components/logo";
import { univers } from "@/lib/services";
import { site } from "@/lib/site";

function IconeFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  );
}

function IconeLinkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.9 8.5H3.6V20h3.3V8.5ZM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 13.4c0-3.1-1.7-5.1-4.4-5.1-1.5 0-2.5.8-2.9 1.6V8.5H9.9V20h3.3v-6c0-1.6.7-2.6 2-2.6s1.9 1 1.9 2.6v6h3.3v-6.6Z" />
    </svg>
  );
}

export function PiedDePage() {
  return (
    <footer className="bg-marine text-white/75">
      <div className="conteneur grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo clair />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Établissement de microfinance agréé par la COBAC depuis le {site.agrement}.{" "}
            <span className="text-white">{site.slogan}.</span>
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={site.reseaux.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FICA sur Facebook"
              className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-marine"
            >
              <IconeFacebook className="size-5" />
            </a>
            <a
              href={site.reseaux.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FICA sur LinkedIn"
              className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-marine"
            >
              <IconeLinkedin className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Nos services</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {univers.map((u) => (
              <li key={u.slug}>
                <Link href={`/services/${u.slug}`} className="hover:text-white">
                  {u.nom}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">La FICA</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {[
              { libelle: "Qui sommes-nous", href: "/la-fica" },
              { libelle: "Gouvernance", href: "/la-fica/gouvernance" },
              { libelle: "FICA MOBILE", href: "/fica-mobile" },
              { libelle: "Ouvrir un compte", href: "/ouverture-de-compte" },
              { libelle: "Actualités", href: "/actualites" },
              { libelle: "Médiathèque", href: "/mediatheque" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Nous contacter</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden />
              <span>
                {site.adresse.rue}
                <br />
                {site.adresse.quartier}, {site.adresse.boitePostale} {site.adresse.ville}
              </span>
            </li>
            <li>
              <a href={site.telephoneLien} className="flex gap-3 hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden />
                {site.telephone}
              </a>
            </li>
            <li>
              <a href={site.whatsappLien} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden />
                WhatsApp {site.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="conteneur flex flex-col gap-3 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© <AnneeCourante />Financière de Centrafrique S.A. Tous droits réservés.</p>
          <Link href="/mentions-legales" className="hover:text-white">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
