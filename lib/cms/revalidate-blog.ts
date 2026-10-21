import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

function statusOf(doc: unknown): string | null {
  if (!doc || typeof doc !== "object") return null;
  const status = (doc as { _status?: unknown })._status;
  return typeof status === "string" ? status : null;
}

function slugsOf(doc: unknown): string[] {
  if (!doc || typeof doc !== "object") return [];
  const record = doc as { slug?: unknown; path?: unknown };
  const slugs: string[] = [];
  if (typeof record.slug === "string" && /^[a-z0-9-]+$/i.test(record.slug.trim())) {
    slugs.push(record.slug.trim());
  }
  if (typeof record.path === "string") {
    const match = record.path.match(/\/blog\/([a-z0-9-]+)\/?$/i);
    if (match?.[1] && !slugs.includes(match[1])) slugs.push(match[1]);
  }
  return slugs;
}

/**
 * Bust the blog index, post pages, and sitemap after a Posts write.
 * Dynamic import so seed scripts that load the Payload config do not pull
 * the Next cache into a context where it cannot run.
 */
export async function revalidateBlogPosts(slugs: readonly string[]): Promise<void> {
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/blog");
    revalidatePath("/blog/");
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/blog/page/[page]", "page");
    revalidatePath("/sitemap.xml");
    revalidatePath("/sitemap");
    revalidatePath("/sitemap/");
    for (const slug of slugs) {
      revalidatePath(`/blog/${slug}`);
      revalidatePath(`/blog/${slug}/`);
    }
  } catch (error) {
    console.error("[cms] blog revalidate failed", error);
  }
}

export const revalidateBlogAfterPostChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
}) => {
  const publishedNow = statusOf(doc) === "published";
  const publishedBefore = statusOf(previousDoc) === "published";
  if (!publishedNow && !publishedBefore) return;
  const slugs = [...new Set([...slugsOf(doc), ...slugsOf(previousDoc)])];
  await revalidateBlogPosts(slugs);
};

export const revalidateBlogAfterPostDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await revalidateBlogPosts(slugsOf(doc));
};
