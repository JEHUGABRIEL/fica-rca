import type { Metadata } from "next";
import { PageProfil } from "@/components/page-profil";
import { trouverProfil } from "@/lib/profils";

const profil = trouverProfil("institutions")!;

export const metadata: Metadata = {
  title: profil.titre,
  description: profil.introduction,
  alternates: { canonical: "/institutions" },
};

export default function Page() {
  return <PageProfil profil={profil} />;
}
