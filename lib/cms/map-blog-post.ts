import type { BlogPost } from "@/app/lib/blog-content";
import type { BlogPostContent, PostBlock, PostSection } from "@/app/lib/blog-post-content";
import { SITE_ORIGIN } from "@/app/lib/site-config";

const DEFAULT_COVER = "/images/blog/default-cover.jpg";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value === "string") {
    try {
      return asRecord(JSON.parse(value) as unknown);
    } catch {
      return null;
    }
  }
  return isRecord(value) ? value : null;
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function siteOrigin(): string {
  return SITE_ORIGIN.replace(/\/$/, "");
}

/** Public slug for /blog/[slug], taken from the document path, never the inner content slug. */
export function cmsPostPublicSlug(doc: Record<string, unknown>): string | null {
  const path = text(doc.path);
  const fromPath = path?.match(/^\/blog\/([^/]+)\/?$/)?.[1];
  if (fromPath && isSlug(fromPath)) return fromPath;
  const slug = text(doc.slug);
  if (slug && isSlug(slug)) return slug;
  return null;
}

export function isSlug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(value);
}

function calendarDate(value: unknown): string | null {
  const raw = text(value);
  if (!raw) return null;
  const match = raw.match(/^(\d{4}-\d{2}-\d{2})/);
  if (match) return match[1];
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

function categoryFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("prp")) return "PRP";
  if (t.includes("shockwave")) return "Shockwave Therapy";
  if (t.includes("cold laser") || t.includes("laser")) return "Cold Laser";
  if (t.includes("neuropath")) return "Neuropathy";
  if (t.includes("sciatica")) return "Sciatica";
  if (t.includes("chiropractic") || t.includes("spine")) return "Chiropractic";
  if (t.includes("weight") || t.includes("peptide") || t.includes("lipo")) return "Weight Loss";
  if (t.includes("knee")) return "Knee Pain";
  if (t.includes("shoulder")) return "Shoulder Pain";
  if (t.includes("heel") || t.includes("plantar") || t.includes("foot")) return "Foot Pain";
  if (t.includes("arthritis")) return "Arthritis";
  if (t.includes("joint")) return "Joint Pain";
  if (t.includes("back")) return "Back Pain";
  if (t.includes("neck")) return "Neck Pain";
  if (t.includes("regenerative") || t.includes("stem cell")) return "Regenerative Medicine";
  return "Wellness";
}

function paragraphBlocks(value: unknown): Extract<PostBlock, { kind: "paragraph" }>[] {
  const raw = text(value);
  if (!raw) return [];
  return raw
    .split(/\n{2,}/)
    .map((part) => part.replace(/[ \t]+\n/g, "\n").replace(/\n+/g, " ").trim())
    .filter((part) => part.length > 0)
    .map((part) => ({ kind: "paragraph" as const, text: part }));
}

function listBlock(value: unknown): PostBlock | null {
  if (!Array.isArray(value)) return null;
  const items = value
    .map((item) => (typeof item === "string" ? item.trim() : null))
    .filter((item): item is string => Boolean(item));
  if (!items.length) return null;
  return { kind: "list", items };
}

function blocksFromEditorSection(section: Record<string, unknown>): PostBlock[] {
  const blocks: PostBlock[] = [
    ...paragraphBlocks(section.content),
  ];
  const list = listBlock(section.list);
  if (list) blocks.push(list);
  const second = listBlock(section.secondList);
  if (second) blocks.push(second);
  blocks.push(...paragraphBlocks(section.additionalContent));
  blocks.push(...paragraphBlocks(section.footerContent));
  return blocks;
}

function clip(value: string, max = 220): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const last = cut.lastIndexOf(" ");
  return `${(last > 140 ? cut.slice(0, last) : cut).trim()}…`;
}

function mediaUrl(image: unknown): { src: string; alt: string | null; og: string | null } | null {
  const record = asRecord(image);
  if (!record) return null;
  const src = text(record.url)?.replace(/\/+$/, "") ?? null;
  if (!src) return null;
  const sizes = asRecord(record.sizes);
  const og = sizes ? text(asRecord(sizes.og)?.url)?.replace(/\/+$/, "") ?? null : null;
  return { src, alt: text(record.alt), og };
}

function readTimeLabel(value: unknown, words: number): string {
  const raw = text(value);
  if (raw && /min/i.test(raw)) return raw;
  if (raw && /^\d+$/.test(raw)) return `${raw} min read`;
  const minutes = Math.max(1, Math.round((words || 200) / 200));
  return `${minutes} min read`;
}

function countWords(sections: readonly PostSection[]): number {
  let words = 0;
  for (const section of sections) {
    for (const block of section.blocks) {
      const source = block.kind === "list" ? block.items.join(" ") : block.text;
      words += source.split(/\s+/).filter(Boolean).length;
    }
  }
  return words;
}

function isRenderableBlogPost(value: unknown): value is BlogPostContent {
  const content = asRecord(value);
  if (!content) return false;
  if (typeof content.title !== "string" || typeof content.date !== "string") return false;
  if (typeof content.category !== "string" || typeof content.readTime !== "string") return false;
  const image = asRecord(content.image);
  if (!image || !text(image.src)) return false;
  const meta = asRecord(content.meta);
  if (!meta || typeof meta.title !== "string" || typeof meta.description !== "string") return false;
  if (!Array.isArray(content.sections) || content.sections.length === 0) return false;
  return content.sections.every((section) => {
    const row = asRecord(section);
    return Boolean(row && typeof row.heading === "string" && Array.isArray(row.blocks) && row.blocks.length > 0);
  });
}

function canonicalFor(slug: string, doc: Record<string, unknown>): string {
  const expected = `${siteOrigin()}/blog/${slug}/`;
  const custom = text(doc.canonicalUrl);
  if (!custom) return expected;
  try {
    const url = new URL(custom);
    if (url.pathname.replace(/\/+$/, "") === `/blog/${slug}`) {
      return custom.endsWith("/") ? custom : `${custom}/`;
    }
  } catch {
    /* ignore a canonical that does not point at this post */
  }
  return expected;
}

/**
 * Turn a Payload post into the template shape.
 * The public URL is the document slug/path. Nested content.slug is ignored
 * because editors often store a different slug inside the body JSON.
 */
export function payloadPostToBlogContent(doc: Record<string, unknown>): BlogPostContent | null {
  const slug = cmsPostPublicSlug(doc);
  const content = asRecord(doc.content);
  if (!slug) return null;

  if (isRenderableBlogPost(doc.content)) {
    return {
      ...doc.content,
      slug,
      meta: {
        ...doc.content.meta,
        canonical: canonicalFor(slug, doc),
      },
    };
  }

  const title = text(doc.title) || text(content?.title);
  if (!title) return null;

  const seo = asRecord(doc.meta);
  const metaTitle = text(seo?.title) || text(content?.metaTitle) || title;
  const metaDescription =
    text(seo?.description) || text(content?.metaDescription) || text(doc.dek) || title;
  const image = mediaUrl(seo?.image);
  const imageSrc = (text(doc.imageSrc) || image?.src || DEFAULT_COVER).replace(/\/+$/, "");
  const date =
    calendarDate(doc.postDate) ||
    calendarDate(doc.publishedAt) ||
    calendarDate(doc.updatedAt) ||
    new Date().toISOString().slice(0, 10);

  const rawSections = Array.isArray(doc.content)
    ? doc.content
    : Array.isArray(content?.sections)
      ? content.sections
      : [];

  let cta: BlogPostContent["cta"];
  const sections: PostSection[] = [];
  const usedHeadings = new Set<string>();

  rawSections.forEach((entry, index) => {
    const section = asRecord(entry);
    if (!section) return;
    if (text(section.type) === "call_to_action") {
      const body = paragraphBlocks(section.content)
        .map((block) => block.text)
        .join(" ");
      const heading = text(section.heading) || "Talk with our Geneva team";
      if (body) {
        cta = {
          kicker: "Ready when you are",
          heading,
          body,
          primary: { label: "Contact us", href: "/contact/" },
        };
      }
      return;
    }
    const blocks = blocksFromEditorSection(section);
    if (!blocks.length) return;
    let heading =
      text(section.heading) ||
      (text(section.type) === "introduction" ? "Introduction" : `Section ${index + 1}`);
    const base = heading;
    let n = 2;
    while (usedHeadings.has(heading)) {
      heading = `${base} (${n})`;
      n += 1;
    }
    usedHeadings.add(heading);
    sections.push({ heading, blocks });
  });

  if (!sections.length) {
    sections.push({
      heading: title,
      blocks: [{ kind: "paragraph", text: metaDescription }],
    });
  }

  const words = countWords(sections);
  const category = text(doc.category) || categoryFromTitle(title);
  const canonical = canonicalFor(slug, doc);
  const ogImage = image?.og || (imageSrc.startsWith("http") ? imageSrc : undefined);

  return {
    slug,
    title,
    dek: text(doc.dek) || clip(metaDescription),
    date,
    modifiedDate: calendarDate(doc.sourceUpdatedAt) || calendarDate(doc.updatedAt) || undefined,
    category,
    readTime: readTimeLabel(doc.readTime, words),
    image: {
      src: imageSrc,
      alt: text(doc.imageAlt) || image?.alt || title,
    },
    sections,
    ...(cta ? { cta } : {}),
    meta: {
      title: metaTitle,
      description: metaDescription,
      canonical,
      ...(ogImage ? { ogImage } : {}),
    },
  };
}

export function cmsPostToCard(post: BlogPostContent): BlogPost {
  const image = text(post.image.src);
  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: clip(post.dek || post.meta.description),
    ...(image ? { image } : {}),
    category: post.category,
  };
}

