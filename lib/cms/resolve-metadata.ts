import type { Metadata } from "next";

import { titleForLayout } from "./document-title";

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function metaGroup(doc: Record<string, unknown>) {
  const meta = doc.meta;
  if (meta && typeof meta === "object") return meta as Record<string, unknown>;
  return {};
}

/**
 * Resolve page metadata from a published Payload document.
 *
 * A non-empty SEO `meta.title` is returned as `title.absolute` so the site
 * layout `title.template` (`%s | Brand`) does not rewrite it. That includes
 * the homepage: the published home title is the full document title, and the
 * template must not append the brand again. The same string is used for Open
 * Graph and Twitter titles. `meta.description` is copied through unchanged.
 *
 * When those SEO fields are empty, titles stay on the layout-safe path
 * (`titleForLayout`: absolute only when the string already names the brand)
 * and descriptions fall back to the document excerpt, then the caller metadata.
 */
export function resolveCmsMetadata(
  routed: { doc: Record<string, unknown> } | null,
  fallback: Metadata,
): Metadata {
  if (!routed) return fallback;
  const doc = routed.doc;
  const meta = metaGroup(doc);
  const cmsTitle = str(meta.title);
  const title = cmsTitle ?? str(doc.title);
  const description = str(meta.description) ?? str(doc.excerpt);
  const canonical = str(doc.canonicalUrl) ?? fallback.alternates?.canonical;
  const noIndex = Boolean(doc.noIndex);
  const noFollow = Boolean(doc.noFollow);
  const ogImage = meta.image;

  const next: Metadata = {
    ...fallback,
    ...(cmsTitle
      ? { title: { absolute: cmsTitle } }
      : title
        ? { title: titleForLayout(title) }
        : {}),
    ...(description ? { description } : {}),
    alternates: {
      ...fallback.alternates,
      ...(canonical ? { canonical } : {}),
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
  };

  if (title || description) {
    next.openGraph = {
      ...fallback.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(typeof canonical === "string" ? { url: canonical } : {}),
    };
    next.twitter = {
      ...fallback.twitter,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
    };
  }

  if (ogImage && typeof ogImage === "object" && "url" in ogImage) {
    const url = (ogImage as { url?: string }).url;
    if (url) {
      next.openGraph = { ...next.openGraph, images: [{ url }] };
    }
  }

  return next;
}
