import { CONDITIONS_SUBNAV, SERVICES_SUBNAV } from "../app/lib/site-config";
import {
  AREA_CITIES,
  AREA_TOPICS,
  areaCityUrlPath,
  areaComboUrlPath,
} from "../app/lib/areas-we-serve-content";
import { BLOG_POST_SLUGS } from "../app/lib/blog-post-bodies";
import { BLOG_POST_CONTENT } from "../app/lib/blog-post-content";
import { BLOG_POSTS, postHref } from "../app/lib/blog-content";
import { fromPublicPath } from "../lib/cms/urls";

const STATIC_PUBLIC = [
  "/",
  "/about-practice/",
  "/about-practice/meet-the-staff/",
  "/our-providers/",
  "/services/",
  "/conditions-treated/",
  "/areas-we-serve/",
  "/blog/",
  "/book-now/",
  "/contact/",
  "/forms/",
  "/testimonials/",
  "/lipo-peptides-weight/",
  "/our-terms/",
  "/your-privacy/",
  "/accessibility-statement/",
  "/sitemap/",
];

export function editorialPublicPaths(): string[] {
  const posts = new Set<string>([
    ...BLOG_POST_SLUGS.map((slug) => postHref(slug)),
    ...Object.keys(BLOG_POST_CONTENT).map((slug) => postHref(slug)),
    ...BLOG_POSTS.map((p) => postHref(p.slug)),
  ]);
  return [
    ...STATIC_PUBLIC,
    ...SERVICES_SUBNAV.map((i) => i.href),
    ...CONDITIONS_SUBNAV.map((i) => i.href),
    ...AREA_CITIES.map((city) => areaCityUrlPath(city.slug)),
    ...AREA_CITIES.flatMap((city) =>
      AREA_TOPICS.map((topic) => areaComboUrlPath(city.slug, topic.slug)),
    ),
    ...posts,
  ];
}

export function editorialCmsPaths(): string[] {
  return [...new Set(editorialPublicPaths().map((p) => fromPublicPath(p)))];
}
