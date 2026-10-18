import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Session du back-office, sans état : « <expiration>.<hmac> » signé avec
 * ADMIN_SESSION_SECRET.
 */
export const COOKIE_SESSION = "fica_bo";
export const DUREE_SESSION = 60 * 60 * 8;

function secret() {
  const valeur = process.env.ADMIN_SESSION_SECRET;
  if (!valeur || valeur.length < 32) throw new Error("ADMIN_SESSION_SECRET doit faire au moins 32 caractères");
  return valeur;
}

function signer(charge: string) {
  return createHmac("sha256", secret()).update(charge).digest("base64url");
}

export function egaliteSure(a: string, b: string) {
  const ta = Buffer.from(a);
  const tb = Buffer.from(b);
  return ta.length === tb.length && timingSafeEqual(ta, tb);
}

export function creerJeton() {
  const expiration = String(Math.floor(Date.now() / 1000) + DUREE_SESSION);
  return `${expiration}.${signer(expiration)}`;
}

export function jetonValide(jeton: string | undefined) {
  if (!jeton) return false;
  const [expiration, signature] = jeton.split(".");
  if (!expiration || !signature) return false;
  try {
    if (!egaliteSure(signature, signer(expiration))) return false;
  } catch {
    return false;
  }
  return Number(expiration) > Date.now() / 1000;
}
