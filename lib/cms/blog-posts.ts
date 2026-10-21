import { cache } from "react";
import { draftMode } from "next/headers";

import type { BlogPost } from "@/app/lib/blog-content";
import type { BlogPostContent } from "@/app/lib/blog-post-content";

import { cmsPostToCard, isSlug, payloadPostToBlogContent, siteOrigin } from "./map-blog-post";
import { getCMS } from "./queries";
import { withCMS } from "./safe";
import { fromPublicPath } from "./urls";

function hasCmsEnv(): boolean {
  return Boolean(
    (process.env.DATABASE_URL || process.env.POSTGRES_URL) && process.env.PAYLOAD_SECRET,
  );
}

const loadPublishedCmsPosts = cache(async (): Promise<BlogPostContent[]> => {
  if (!hasCmsEnv()) return [];
  return withCMS(async () => {
    const payload = await getCMS();
    const posts: BlogPostContent[] = [];
    const seen = new Set<string>();
    let page = 1;
    while (page <= 50) {
      const result = await payload.find({
        collection: "posts",
        where: { _status: { equals: "published" } },
        depth: 1,
        draft: false,
        overrideAccess: false,
        limit: 100,
        page,
      });
      for (const doc of result.docs) {
        const post = payloadPostToBlogContent(doc as unknown as Record<string, unknown>);
        if (!post || seen.has(post.slug)) continue;
        seen.add(post.slug);
        posts.push(post);
      }
      if (!result.hasNextPage) break;
      page += 1;
    }
    return posts;
  }, []);
});

export async function listPublishedCmsPosts(): Promise<BlogPostContent[]> {
  return loadPublishedCmsPosts();
}

export async function listPublishedCmsSlugs(): Promise<string[]> {
  const posts = await loadPublishedCmsPosts();
  return posts.map((post) => post.slug);
}

export async function listPublishedCmsCards(): Promise<BlogPost[]> {
  const posts = await loadPublishedCmsPosts();
  return posts.map(cmsPostToCard);
}

/** Published post for this URL, including drafts while preview mode is on. */
export async function getCmsBlogPost(slug: string): Promise<BlogPostContent | null> {
  if (!hasCmsEnv() || !isSlug(slug)) return null;
  return withCMS(async () => {
    const payload = await getCMS();
    let draftEnabled = false;
    try {
      draftEnabled = (await draftMode()).isEnabled;
    } catch {
      draftEnabled = false;
    }
    const findOpts = {
      limit: 1,
      depth: 1,
      draft: draftEnabled,
      overrideAccess: draftEnabled,
    } as const;
    const path = fromPublicPath(`/blog/${slug}`);
    const byPath = await payload.find({
      collection: "posts",
      where: { path: { equals: path } },
      ...findOpts,
    });
    const pathDoc = byPath.docs[0];
    if (pathDoc) {
      return payloadPostToBlogContent(pathDoc as unknown as Record<string, unknown>);
    }
    const bySlug = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      ...findOpts,
    });
    const slugDoc = bySlug.docs[0];
    if (!slugDoc) return null;
    const post = payloadPostToBlogContent(slugDoc as unknown as Record<string, unknown>);
    if (!post) return null;
    if (post.slug === slug) return post;
    return {
      ...post,
      slug,
      meta: {
        ...post.meta,
        canonical: `${siteOrigin()}/blog/${post.slug}/`,
      },
    };
  }, null);
}
