import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { COOKIE_SESSION, creerJeton, DUREE_SESSION, egaliteSure, jetonValide } from "./session";

export function motDePasseValide(motDePasse: string) {
  const attendu = process.env.ADMIN_PASSWORD;
  if (!attendu) return false;
  return egaliteSure(motDePasse, attendu);
}

export async function ouvrirSession() {
  (await cookies()).set(COOKIE_SESSION, creerJeton(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: DUREE_SESSION,
  });
}

export async function fermerSession() {
  (await cookies()).delete({ name: COOKIE_SESSION, path: "/admin" });
}

export async function estAdmin() {
  // L'expiration est comparée à l'heure courante : jamais pendant un prérendu.
  await connection();
  return jetonValide((await cookies()).get(COOKIE_SESSION)?.value);
}

/** À appeler en tête de chaque page et de chaque Server Action du back-office. */
export async function exigerAdmin() {
  if (!(await estAdmin())) redirect("/admin/connexion");
}
