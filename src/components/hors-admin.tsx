"use client";

import { usePathname } from "next/navigation";

/* Masque l'habillage public du site (en-tête, pied de page, boutons
   flottants) dans le back-office. */
export function HorsAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname.startsWith("/admin") ? null : <>{children}</>;
}
