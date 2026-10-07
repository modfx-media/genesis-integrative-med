import { getPublicOrigin, normalizeCmsPath, toPublicPath } from "./urls";

/**
 * Live preview / admin preview URL. Returns null when path or slug is missing
 * so Payload never opens `/blog/null`.
 */
export function previewFromPath(
  path: unknown,
  slug?: unknown,
): string | null {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return null;

  const fromPath = normalizeCmsPath(typeof path === "string" ? path : null);
  let fromSlug: string | null = null;
  if (typeof slug === "string" && slug.trim()) {
    if (slug === "home") {
      fromSlug = "/";
    } else {
      fromSlug = normalizeCmsPath(`/${slug.replace(/^\/+|\/+$/g, "")}`);
    }
  }
  const resolved = fromPath ?? fromSlug;
  if (!resolved) return null;

  const publicPath = toPublicPath(resolved);
  const origin = getPublicOrigin();
  const params = new URLSearchParams({
    path: publicPath,
    previewSecret: secret,
  });
  return `${origin}/next/preview?${params.toString()}`;
}
