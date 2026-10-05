import { normalizeCmsPath, toPublicPath } from "./urls";

export function previewFromPath(
  path: unknown,
  slug?: unknown,
): string | null {
  const fromPath = normalizeCmsPath(typeof path === "string" ? path : null);
  const fromSlug =
    typeof slug === "string" && slug.trim()
      ? normalizeCmsPath(`/${slug.replace(/^\/+|\/+$/g, "")}`)
      : null;
  const resolved = fromPath ?? fromSlug;
  if (!resolved) return null;
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return null;
  const publicPath = toPublicPath(resolved);
  const params = new URLSearchParams({
    path: publicPath,
    previewSecret: secret,
  });
  return `/next/preview?${params.toString()}`;
}
