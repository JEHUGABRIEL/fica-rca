import { BoutonsFlottants } from "@/components/boutons-flottants";
import { EnTete } from "@/components/en-tete";
import { PiedDePage } from "@/components/pied-de-page";

/* Habillage du site public. Le back-office (/admin) a le sien. */
export default function LayoutSite({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EnTete />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <PiedDePage />
      <BoutonsFlottants />
    </>
  );
}
