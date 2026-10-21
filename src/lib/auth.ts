/**
 * Minimal signed-cookie session for the single admin user.
 * Uses Web Crypto so it runs in both middleware (edge) and server actions.
 */
export const SESSION_COOKIE = "km_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function secret() {
  const value = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!value) throw new Error("Set ADMIN_PASSWORD (and ideally ADMIN_SECRET) in .env.local to use /admin.");
  return value;
}

const encoder = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer) {
  let binary = "";
  for (const b of new Uint8Array(bytes)) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toBase64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
}

/** Constant-time string comparison. */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `admin.${expires}`;
  return { token: `${payload}.${await sign(payload)}`, maxAge: SESSION_TTL_SECONDS };
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, exp, sig] = parts;
  if (role !== "admin" || Number(exp) < Date.now() / 1000) return false;
  try {
    return safeEqual(sig, await sign(`${role}.${exp}`));
  } catch {
    return false;
  }
}

export async function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare HMACs so timing doesn't depend on where the strings differ.
  return safeEqual(await sign(`pw:${input}`), await sign(`pw:${expected}`));
}
