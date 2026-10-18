import type { Metadata } from "next";
import Image from "next/image";
import { FormulaireConnexion } from "./formulaire-connexion";

export const metadata: Metadata = { title: "Connexion" };

export default function PageConnexion() {
  return (
    <div className="grid min-h-dvh place-items-center px-5">
      <div className="w-full max-w-sm border-t-4 border-marine bg-white p-8">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="" width={124} height={125} className="size-10" />
          <div>
            <p className="font-semibold text-marine">FICA S.A.</p>
            <p className="text-sm text-gris">Back-office</p>
          </div>
        </div>
        <h1 className="mt-8 text-xl">Connexion</h1>
        <FormulaireConnexion />
      </div>
    </div>
  );
}
