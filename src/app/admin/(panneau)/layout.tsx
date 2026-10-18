import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { NavAdmin, NavAdminActive } from "@/components/admin/nav-admin";
import { seDeconnecter } from "../actions";

/* Habillage du back-office. Chaque page vérifie elle-même la session
   (exigerAdmin) dans sa partie dynamique. */
export default function LayoutPanneau({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="bg-marine text-white lg:sticky lg:top-0 lg:h-dvh">
        <div className="flex items-center justify-between gap-3 px-4 py-5 lg:block">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="" width={124} height={125} className="size-9 bg-white p-0.5" />
            <span className="leading-tight">
              <span className="block font-semibold">FICA S.A.</span>
              <span className="text-xs text-white/60">Back-office</span>
            </span>
          </Link>
        </div>
        <Suspense fallback={<NavAdmin pathname="" />}>
          <NavAdminActive />
        </Suspense>
        <div className="flex gap-4 px-4 py-5 text-sm lg:absolute lg:bottom-0 lg:flex-col lg:gap-2">
          <Link href="/" target="_blank" className="text-white/70 hover:text-white hover:underline">
            Voir le site
          </Link>
          <form action={seDeconnecter}>
            <button type="submit" className="text-white/70 hover:text-white hover:underline">
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>
      <main className="px-5 py-8 md:px-10 md:py-10">{children}</main>
    </div>
  );
}
