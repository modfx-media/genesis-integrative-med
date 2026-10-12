import type { Metadata } from "next";

import { queryRoutedContentByPath } from "./queries";

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function metaGroup(doc: Record<string, unknown>) {
  const meta = doc.meta;
  if (meta && typeof meta === "object") return meta as Record<string, unknown>;
  return {};
}

export async function cmsMetadata(
  path: string,
  fallback: Metadata,
): Promise<Metadata> {
  const routed = await queryRoutedContentByPath(path);
  if (!routed) return fallback;
  const doc = routed.doc;
  const meta = metaGroup(doc);
  const title = str(meta.title) ?? str(doc.title);
  const description = str(meta.description) ?? str(doc.excerpt);
  const canonical = str(doc.canonicalUrl) ?? fallback.alternates?.canonical;
  const noIndex = Boolean(doc.noIndex);
  const noFollow = Boolean(doc.noFollow);
  const ogImage = meta.image;

  const next: Metadata = {
    ...fallback,
    ...(title ? { title } : {}),
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
