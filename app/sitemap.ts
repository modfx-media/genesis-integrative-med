import type { MetadataRoute } from "next";

import { CONDITIONS_SUBNAV, SERVICES_SUBNAV } from "@/app/lib/site-config";
import { AREA_CITIES, AREA_TOPICS, areaCityUrlPath, areaComboUrlPath } from "@/app/lib/areas-we-serve-content";
import { pageHref, postHref, POSTS_PER_PAGE } from "@/app/lib/blog-content";
import { getPublishedBlogSlugs } from "@/app/lib/ranked/posts";
import { queryPublishedPagesForSitemap, queryPublishedPostsForSitemap } from "@/lib/cms/queries";
import { toPublicPath } from "@/lib/cms/urls";


export const revalidate = 300;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://genesisintegrativemed.com";

type Entry = MetadataRoute.Sitemap[number];

function url(
  path: string,
  changeFrequency: Entry["changeFrequency"],
  priority: number,
  lastModified?: Date,
): Entry {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: lastModified ?? new Date(),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cmsPages, cmsPosts] = await Promise.all([
    queryPublishedPagesForSitemap(),
    queryPublishedPostsForSitemap(),
  ]);

  const skip = new Set<string>();
  const lastMod = new Map<string, Date>();
  for (const doc of [...cmsPages, ...cmsPosts]) {
    const cmsPath = typeof doc.path === "string" ? doc.path : null;
    if (!cmsPath) continue;
    const publicPath = toPublicPath(cmsPath);
    if (doc.noIndex || doc.excludeFromSitemap) {
      skip.add(publicPath);
      continue;
    }
    const stamp =
      (typeof doc.sourceUpdatedAt === "string" && doc.sourceUpdatedAt) ||
      (typeof doc.updatedAt === "string" && doc.updatedAt) ||
      null;
    if (stamp) lastMod.set(publicPath, new Date(stamp));
  }

  const staticPages: Entry[] = [
    url("/", "weekly", 1.0, lastMod.get("/")),
    url("/about-practice/", "monthly", 0.8, lastMod.get("/about-practice/")),
    url("/about-practice/meet-the-staff/", "monthly", 0.6, lastMod.get("/about-practice/meet-the-staff/")),
    url("/our-providers/", "monthly", 0.7, lastMod.get("/our-providers/")),
    url("/services/", "monthly", 0.9, lastMod.get("/services/")),
    url("/conditions-treated/", "monthly", 0.9, lastMod.get("/conditions-treated/")),
    url("/areas-we-serve/", "monthly", 0.8, lastMod.get("/areas-we-serve/")),
    url("/blog/", "weekly", 0.7, lastMod.get("/blog/")),
    url("/book-now/", "monthly", 0.8, lastMod.get("/book-now/")),
    url("/contact/", "monthly", 0.7, lastMod.get("/contact/")),
    url("/forms/", "monthly", 0.5, lastMod.get("/forms/")),
    url("/testimonials/", "monthly", 0.6, lastMod.get("/testimonials/")),
    url("/lipo-peptides-weight/", "monthly", 0.7, lastMod.get("/lipo-peptides-weight/")),
    url("/our-terms/", "yearly", 0.2, lastMod.get("/our-terms/")),
    url("/your-privacy/", "yearly", 0.2, lastMod.get("/your-privacy/")),
    url("/accessibility-statement/", "yearly", 0.2, lastMod.get("/accessibility-statement/")),
  ];

  const servicePages = SERVICES_SUBNAV.map((i) => url(i.href, "monthly", 0.85, lastMod.get(i.href)));
  const conditionPages = CONDITIONS_SUBNAV.map((i) => url(i.href, "monthly", 0.85, lastMod.get(i.href)));

  const areaCityPages = AREA_CITIES.map((city) => {
    const p = areaCityUrlPath(city.slug);
    return url(p, "monthly", 0.6, lastMod.get(p));
  });
  const areaComboPages = AREA_CITIES.flatMap((city) =>
    AREA_TOPICS.map((topic) => {
      const p = areaComboUrlPath(city.slug, topic.slug);
      return url(p, "monthly", 0.5, lastMod.get(p));
    }),
  );

  const rankedSlugs = await getPublishedBlogSlugs().catch(() => []);
  const cmsSlugs = cmsPosts
    .map((d) => (typeof d.slug === "string" ? d.slug : ""))
    .filter(Boolean);
  const slugs = [...new Set([...rankedSlugs, ...cmsSlugs])];
  const blogPostPages = slugs.map((slug) => {
    const p = postHref(slug);
    return url(p, "monthly", 0.6, lastMod.get(p));
  });
  const total = Math.max(1, Math.ceil(slugs.length / POSTS_PER_PAGE));
  const blogPaginationPages: Entry[] = [];
  for (let page = 2; page <= total; page += 1) {
    blogPaginationPages.push(url(pageHref(page), "weekly", 0.4));
  }

  const combined = [
    ...staticPages,
    ...servicePages,
    ...conditionPages,
    ...areaCityPages,
    ...areaComboPages,
    ...blogPostPages,
    ...blogPaginationPages,
  ].filter((entry) => {
    const path = entry.url.replace(SITE_URL, "") || "/";
    return !skip.has(path);
  });

  return combined;
}
