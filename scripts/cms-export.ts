import { mkdirSync, writeFileSync } from "fs";
import path from "path";

import { HOME_META } from "../app/lib/home-content";
import {
  CONDITION_PAGES,
  CONDITIONS_INDEX_META,
} from "../app/lib/conditions-content";
import {
  SERVICE_PAGES,
  SERVICES_INDEX_META,
  STEM_CELL_THERAPY_CONTENT,
} from "../app/lib/services-content";
import {
  ACCESSIBILITY_PAGE,
  PRIVACY_PAGE,
  TERMS_PAGE,
} from "../app/lib/legal-content";
import {
  AREA_CITIES,
  AREA_TOPICS,
  AREAS_INDEX_META,
  buildAreaComboContent,
} from "../app/lib/areas-we-serve-content";
import { BLOG_INDEX_META, BLOG_POSTS } from "../app/lib/blog-content";
import { BLOG_POST_BODIES } from "../app/lib/blog-post-bodies";
import { BLOG_POST_CONTENT } from "../app/lib/blog-post-content";
import {
  ABOUT_SUBNAV,
  CONTACT,
  FOOTER_LINKS,
  PRIMARY_NAV,
  BRAND,
} from "../app/lib/site-config";
import { fromPublicPath, toPublicPath } from "../lib/cms/urls";
import { editorialCmsPaths } from "./cms-url-manifest";

const ORIGIN = "https://genesisintegrativemed.com";

type RecordOut = {
  collection: "pages" | "posts";
  legacyId: string;
  sourceUrl: string;
  data: Record<string, unknown>;
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function pageRec(
  cmsPath: string,
  title: string,
  template: string,
  description: string,
  content?: unknown,
): RecordOut {
  const sourceUrl = `${ORIGIN}${toPublicPath(cmsPath)}`;
  const slug = cmsPath === "/" ? "home" : cmsPath.replace(/^\//, "").replace(/\//g, "--");
  return {
    collection: "pages",
    legacyId: `page:${cmsPath}`,
    sourceUrl,
    data: {
      title,
      slug,
      path: cmsPath,
      legacyId: `page:${cmsPath}`,
      sourceUrl,
      template,
      excerpt: description,
      content: content ? clone(content) : null,
      canonicalUrl: sourceUrl,
      _status: "draft",
    },
  };
}

export function buildContentExport() {
  const records: RecordOut[] = [];

  records.push(
    pageRec("/", HOME_META.title, "home", HOME_META.description, { meta: HOME_META }),
  );
  records.push(
    pageRec(
      "/about-practice",
      "Our Approach to Holistic Healing & Medicine in Geneva, IL",
      "about",
      "Discover how Genesis Integrative Medicine changes lives every day in Geneva, IL.",
    ),
  );
  records.push(
    pageRec(
      "/about-practice/meet-the-staff",
      "Meet the Staff | Genesis Integrative Medicine",
      "staff",
      "Meet the Genesis Integrative Medicine team in Geneva, IL.",
    ),
  );
  records.push(
    pageRec(
      "/our-providers",
      "Learn About Our Integrative Health Team in Geneva, IL",
      "providers",
      "Meet the team at Genesis Integrative Medicine for health solutions in Geneva, IL.",
    ),
  );
  records.push(
    pageRec(
      "/services",
      SERVICES_INDEX_META.title,
      "servicesIndex",
      SERVICES_INDEX_META.description,
      { meta: SERVICES_INDEX_META },
    ),
  );
  records.push(
    pageRec(
      "/conditions-treated",
      CONDITIONS_INDEX_META.title,
      "conditionsIndex",
      CONDITIONS_INDEX_META.description,
      { meta: CONDITIONS_INDEX_META },
    ),
  );
  records.push(
    pageRec(
      "/areas-we-serve",
      AREAS_INDEX_META.title,
      "areasIndex",
      AREAS_INDEX_META.description,
      { meta: AREAS_INDEX_META },
    ),
  );
  records.push(
    pageRec("/blog", BLOG_INDEX_META.title, "blogIndex", BLOG_INDEX_META.description, {
      meta: BLOG_INDEX_META,
    }),
  );
  records.push(
    pageRec(
      "/book-now",
      "Book Now | Genesis Integrative Medicine",
      "bookNow",
      "Schedule your visit with Genesis Integrative Medicine in Geneva, IL.",
    ),
  );
  records.push(
    pageRec(
      "/contact",
      "Contact | Genesis Integrative Medicine",
      "contact",
      "Contact Genesis Integrative Medicine in Geneva, IL.",
    ),
  );
  records.push(
    pageRec(
      "/forms",
      "Patient Forms and Paperwork",
      "forms",
      "Prepare for your appointment at Genesis Integrative Medicine by filling out forms.",
    ),
  );
  records.push(
    pageRec(
      "/testimonials",
      "Testimonials | Genesis Integrative Medicine",
      "testimonials",
      "Read 5-star Google reviews from patients of Genesis Integrative Medicine in Geneva, IL.",
    ),
  );
  records.push(
    pageRec("/sitemap", "Sitemap | Genesis Integrative Medicine", "htmlSitemap", "HTML sitemap."),
  );

  const services = {
    ...SERVICE_PAGES,
    "stem-cell-therapy": STEM_CELL_THERAPY_CONTENT,
  };
  for (const content of Object.values(services)) {
    records.push(
      pageRec(
        fromPublicPath(content.urlPath),
        content.meta.title,
        "service",
        content.meta.description,
        content,
      ),
    );
  }

  records.push(
    pageRec(
      "/lipo-peptides-weight",
      "Lipo Peptides for Weight Loss in Geneva | Genesis Integrative Medicine",
      "lipo",
      "Discover lipo peptides for weight loss in Geneva at Genesis Integrative Medicine.",
    ),
  );

  for (const content of Object.values(CONDITION_PAGES)) {
    records.push(
      pageRec(
        fromPublicPath(content.urlPath),
        content.meta.title,
        "condition",
        content.meta.description,
        content,
      ),
    );
  }

  for (const city of AREA_CITIES) {
    records.push(
      pageRec(
        `/areas-we-serve/${city.slug}`,
        `${city.name}, IL Chiropractic & Integrative Medicine`,
        "areaCity",
        `Genesis Integrative Medicine serves ${city.name}, ${city.county} County, IL patients.`,
        city,
      ),
    );
    for (const topic of AREA_TOPICS) {
      const content = buildAreaComboContent(city, topic);
      records.push(
        pageRec(
          `/areas-we-serve/${city.slug}/${topic.slug}`,
          content.meta.title,
          "areaCombo",
          content.meta.description,
          content,
        ),
      );
    }
  }

  records.push(pageRec("/our-terms", TERMS_PAGE.meta.title, "legal", TERMS_PAGE.meta.description, TERMS_PAGE));
  records.push(pageRec("/your-privacy", PRIVACY_PAGE.meta.title, "legal", PRIVACY_PAGE.meta.description, PRIVACY_PAGE));
  records.push(
    pageRec(
      "/accessibility-statement",
      ACCESSIBILITY_PAGE.meta.title,
      "legal",
      ACCESSIBILITY_PAGE.meta.description,
      ACCESSIBILITY_PAGE,
    ),
  );

  const postsBySlug = new Map<string, Record<string, unknown>>();
  for (const post of Object.values({ ...BLOG_POST_BODIES, ...BLOG_POST_CONTENT })) {
    postsBySlug.set(post.slug, clone(post) as unknown as Record<string, unknown>);
  }
  for (const listing of BLOG_POSTS) {
    if (!postsBySlug.has(listing.slug)) {
      postsBySlug.set(listing.slug, {
        slug: listing.slug,
        title: listing.title,
        date: listing.date,
        dek: listing.excerpt,
        category: listing.category,
        image: listing.image ? { src: listing.image, alt: listing.title } : undefined,
        sections: [],
        meta: {
          title: listing.title,
          description: listing.excerpt,
          canonical: `${ORIGIN}/blog/${listing.slug}/`,
        },
      });
    }
  }

  const postRecords: RecordOut[] = [];
  for (const post of postsBySlug.values()) {
    const slug = String(post.slug);
    const title = String(post.title);
    const meta = (post.meta as { description?: string } | undefined) ?? {};
    const sourceUrl = `${ORIGIN}/blog/${slug}/`;
    postRecords.push({
      collection: "posts",
      legacyId: `post:${slug}`,
      sourceUrl,
      data: {
        title,
        slug,
        path: `/blog/${slug}`,
        legacyId: `post:${slug}`,
        sourceUrl,
        category: post.category ?? null,
        dek: post.dek ?? null,
        readTime: post.readTime ?? null,
        postDate: post.date ?? null,
        imageSrc: (post.image as { src?: string } | undefined)?.src ?? null,
        imageAlt: (post.image as { alt?: string } | undefined)?.alt ?? null,
        content: post,
        excerpt: meta.description ?? null,
        canonicalUrl: sourceUrl,
        _status: "draft",
      },
    });
  }

  const globals = {
    header: {
      logoUrl: BRAND.logo,
      logoAlt: BRAND.name,
      navItems: PRIMARY_NAV.map((item) => ({
        label: item.label,
        href: item.href,
        children: item.children ? [...item.children] : [],
      })),
    },
    footer: {
      tagline: BRAND.tagline,
      links: FOOTER_LINKS.map((l) => ({ label: l.label, href: l.href })),
    },
    "site-settings": {
      siteName: BRAND.name,
      tagline: BRAND.tagline,
      phoneDisplay: CONTACT.phoneDisplay,
      phoneHref: CONTACT.phoneHref,
      email: CONTACT.email,
      street: CONTACT.address.street,
      cityState: CONTACT.address.cityState,
      bookingUrl: CONTACT.bookingUrl,
      reviewsUrl: CONTACT.reviewsUrl,
    },
  };

  const all = [...records, ...postRecords];
  const byPath = new Map(all.map((r) => [String(r.data.path), r]));
  const missing = editorialCmsPaths().filter((p) => !byPath.has(p));

  return {
    version: 1 as const,
    records: all,
    globals,
    aboutSubnav: ABOUT_SUBNAV,
    missing,
  };
}

const isMain = process.argv[1]?.replace(/\\/g, "/").includes("cms-export");
if (isMain) {
  const outDir = path.join(process.cwd(), "data");
  mkdirSync(outDir, { recursive: true });
  const payload = buildContentExport();
  const file = path.join(outDir, "content-export.json");
  writeFileSync(file, JSON.stringify(payload, null, 2), "utf8");
  console.log(
    `Wrote ${payload.records.length} records to ${file} (${payload.missing.length} manifest gaps)`,
  );
  if (payload.missing.length) {
    console.warn("Missing paths:", payload.missing);
  }
}
