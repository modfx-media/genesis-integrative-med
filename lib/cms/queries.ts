import { cache } from "react";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

import { withCMS } from "./safe";
import { fromPublicPath } from "./urls";

export const getCMS = cache(async () => {
  return getPayload({ config });
});

export type RoutedDoc = {
  collection: "pages" | "posts";
  doc: Record<string, unknown>;
};

export async function queryRoutedContentByPath(
  publicOrCmsPath: string,
): Promise<RoutedDoc | null> {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) return null;
  if (!process.env.PAYLOAD_SECRET) return null;
  return withCMS(async () => {
    const payload = await getCMS();
    const draftEnabled = (await draftMode()).isEnabled;
    const path = fromPublicPath(publicOrCmsPath);
    const findOpts = {
      limit: 1,
      depth: 1,
      draft: draftEnabled,
      overrideAccess: draftEnabled,
    } as const;

    const pages = await payload.find({
      collection: "pages",
      where: { path: { equals: path } },
      ...findOpts,
    });
    const page = pages.docs[0];
    if (page) return { collection: "pages", doc: page as unknown as Record<string, unknown> };

    const posts = await payload.find({
      collection: "posts",
      where: { path: { equals: path } },
      ...findOpts,
    });
    const post = posts.docs[0];
    if (post) return { collection: "posts", doc: post as unknown as Record<string, unknown> };

    return null;
  }, null);
}

export async function queryPublishedPagesForSitemap() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) return [] as Record<string, unknown>[];
  if (!process.env.PAYLOAD_SECRET) return [] as Record<string, unknown>[];
  return withCMS(async () => {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "pages",
      where: {
        and: [
          { _status: { equals: "published" } },
          { noIndex: { not_equals: true } },
          { excludeFromSitemap: { not_equals: true } },
        ],
      },
      limit: 5000,
      depth: 0,
      draft: false,
      overrideAccess: false,
    });
    return result.docs as unknown as Record<string, unknown>[];
  }, [] as Record<string, unknown>[]);
}

export async function queryPublishedPostsForSitemap() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) return [] as Record<string, unknown>[];
  if (!process.env.PAYLOAD_SECRET) return [] as Record<string, unknown>[];
  return withCMS(async () => {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "posts",
      where: { _status: { equals: "published" } },
      limit: 5000,
      depth: 0,
      draft: false,
      overrideAccess: false,
      pagination: false,
    });
    return result.docs as unknown as Record<string, unknown>[];
  }, [] as Record<string, unknown>[]);
}

export async function getHeaderGlobal() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) return null;
  if (!process.env.PAYLOAD_SECRET) return null;
  return withCMS(async () => {
    const payload = await getCMS();
    return payload.findGlobal({ slug: "header", draft: false });
  }, null);
}

export async function getFooterGlobal() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) return null;
  if (!process.env.PAYLOAD_SECRET) return null;
  return withCMS(async () => {
    const payload = await getCMS();
    return payload.findGlobal({ slug: "footer", draft: false });
  }, null);
}

export async function getSiteSettingsGlobal() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) return null;
  if (!process.env.PAYLOAD_SECRET) return null;
  return withCMS(async () => {
    const payload = await getCMS();
    return payload.findGlobal({ slug: "site-settings", draft: false });
  }, null);
}
