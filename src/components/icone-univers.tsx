import { Banknote, FileCheck2, HandCoins, PenLine, Smartphone, WalletCards, type LucideProps } from "lucide-react";
import type { CleIcone } from "@/lib/services";

const icones = {
  portefeuille: WalletCards,
  credit: HandCoins,
  signature: PenLine,
  paiement: Banknote,
  attestation: FileCheck2,
  services: Smartphone,
} satisfies Record<CleIcone, unknown>;

export function IconeUnivers({ cle, ...props }: { cle: CleIcone } & LucideProps) {
  const Icone = icones[cle];
  return <Icone aria-hidden strokeWidth={1.75} {...props} />;
}
