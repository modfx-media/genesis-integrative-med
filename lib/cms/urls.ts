export const PRODUCTION_ORIGIN = "https://genesisintegrativemed.com";

export function getPublicOrigin(): string {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  if (server && !isLocalhost(server)) return stripSlash(server);
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site && !isLocalhost(site)) return stripSlash(site);
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NODE_ENV === "production") return PRODUCTION_ORIGIN;
  return "http://localhost:3000";
}

export function corsOrigins(): string[] {
  const origins = new Set<string>();
  for (const raw of [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_SERVER_URL,
    PRODUCTION_ORIGIN,
    "https://www.genesisintegrativemed.com",
  ]) {
    if (!raw || isLocalhost(raw)) continue;
    try {
      const u = new URL(raw);
      origins.add(u.origin);
      if (u.hostname.startsWith("www.")) {
        origins.add(`${u.protocol}//${u.hostname.slice(4)}`);
      } else {
        origins.add(`${u.protocol}//www.${u.hostname}`);
      }
    } catch {
      /* ignore invalid */
    }
  }
  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }
  origins.add("http://localhost:3000");
  return [...origins];
}

export function isLocalhost(url: string): boolean {
  return /localhost|127\.0\.0\.1/.test(url);
}

export function stripSlash(url: string): string {
  return url.replace(/\/$/, "");
}

/** CMS path: leading slash, no trailing slash, `/` for home. */
export function normalizeCmsPath(input: string | null | undefined): string | null {
  if (input == null) return null;
  const trimmed = String(input).trim();
  if (!trimmed) return null;
  if (trimmed === "/") return "/";
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const noTrail = withSlash.replace(/\/+$/, "");
  if (!noTrail || noTrail.includes("undefined") || noTrail.includes("null")) return null;
  const segments = noTrail.split("/").filter(Boolean);
  if (segments.some((s) => s === "null" || s === "undefined" || s === "")) return null;
  return noTrail;
}

/** Public URL path with trailing slash (site `trailingSlash: true`). */
export function toPublicPath(cmsPath: string): string {
  if (cmsPath === "/") return "/";
  return `${cmsPath.replace(/\/+$/, "")}/`;
}

export function fromPublicPath(publicPath: string): string {
  return normalizeCmsPath(publicPath) ?? "/";
}
