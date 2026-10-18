import { Mail, Phone, Smartphone } from "lucide-react";
import { Logo } from "@/components/logo";
import { Navigation, type MenuServices } from "@/components/navigation";
import { lienProduit, univers } from "@/lib/services";
import { navigationInstitution, site } from "@/lib/site";

export function EnTete() {
  const menuServices: MenuServices = univers.map((u) => ({
    slug: u.slug,
    nom: u.nomCourt,
    icone: u.icone,
    accroche: u.accroche,
    produits: u.produits.slice(0, 4).map((p) => ({ nom: p.nom, href: lienProduit(u, p) })),
    total: u.produits.length,
  }));

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-marine text-[0.8rem] text-white/80 md:block">
        <div className="conteneur flex h-10 items-center justify-between gap-6">
          <p className="flex items-center gap-2">
            <Smartphone className="size-3.5 text-white/60" aria-hidden />
            FICA MOBILE : votre compte sans internet, composez{" "}
            <strong className="font-semibold text-white">{site.codeUssd}</strong>
          </p>
          <div className="flex items-center gap-6">
            <a href={site.telephoneLien} className="flex items-center gap-2 hover:text-white">
              <Phone className="size-3.5" aria-hidden />
              {site.telephone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="size-3.5" aria-hidden />
              {site.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-b border-bordure bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="conteneur flex h-[4.75rem] items-center justify-between gap-6">
          <Logo />
          <Navigation menuServices={menuServices} menuInstitution={navigationInstitution} />
        </div>
      </div>
    </header>
  );
}
