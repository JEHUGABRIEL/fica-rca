import type { Metadata } from "next";
import { PageProfil } from "@/components/page-profil";
import { trouverProfil } from "@/lib/profils";

const profil = trouverProfil("professionnels")!;

export const metadata: Metadata = {
  title: profil.titre,
  description: profil.introduction,
  alternates: { canonical: "/professionnels" },
};

export default function Page() {
  return <PageProfil profil={profil} />;
}
