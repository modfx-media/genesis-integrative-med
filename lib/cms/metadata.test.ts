import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import type { Metadata } from "next";

import { BRAND } from "../../app/lib/site-config";
import { withLayoutSafeTitle } from "./document-title";
import { resolveCmsMetadata } from "./resolve-metadata";

const require = createRequire(import.meta.url);
const { resolveTitle } = require("next/dist/lib/metadata/resolvers/resolve-title.js") as {
  resolveTitle: (
    title: Metadata["title"],
    stashedTemplate: string | null,
  ) => { absolute: string; template: string | null };
};

const LAYOUT_TEMPLATE = `%s | ${BRAND.name}`;

function renderedDocumentTitle(title: Metadata["title"] | undefined): string {
  if (title === undefined) {
    return `${BRAND.name} | ${BRAND.tagline}`;
  }
  return resolveTitle(title, LAYOUT_TEMPLATE).absolute;
}

function renderedSocialTitle(title: Metadata["title"] | undefined): string {
  if (title === undefined) return "";
  return resolveTitle(title, null).absolute;
}

/** Pre-fix resolver: string titles, which the layout template rewrites. */
function previousResolve(
  routed: { doc: Record<string, unknown> } | null,
  fallback: Metadata,
): Metadata {
  if (!routed) return fallback;
  const doc = routed.doc;
  const meta =
    doc.meta && typeof doc.meta === "object"
      ? (doc.meta as Record<string, unknown>)
      : {};
  const str = (value: unknown) =>
    typeof value === "string" && value.trim() ? value : undefined;
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
    robots: { index: !noIndex, follow: !noFollow },
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
    if (url) next.openGraph = { ...next.openGraph, images: [{ url }] };
  }
  return next;
}

function withoutTitle(metadata: Metadata): Omit<Metadata, "title"> {
  const copy: Metadata = { ...metadata };
  delete copy.title;
  return copy;
}

const HOME: Metadata = {
  title: "Multidisciplinary Medicine | Genesis Integrative Medicine",
  description:
    "Find a path to recovery through multidisciplinary medicine at Genesis Integrative Medicine. Our clinic serves the people of Geneva, IL. Schedule an exam now.",
  alternates: { canonical: "https://genesisintegrativemed.com/" },
  openGraph: {
    type: "website",
    url: "https://genesisintegrativemed.com/",
    siteName: "Genesis Integrative Medicine",
    title: "Multidisciplinary Medicine | Genesis Integrative Medicine",
    description:
      "Find a path to recovery through multidisciplinary medicine at Genesis Integrative Medicine. Our clinic serves the people of Geneva, IL. Schedule an exam now.",
    images: [{ url: "/images/logo/Genesis_Logo.png" }],
  },
  twitter: { card: "summary_large_image" },
};

const PAGE: Metadata = {
  title: "Contact | Genesis Integrative Medicine",
  description:
    "Contact Genesis Integrative Medicine in Geneva, IL. Book online, call 630-845-8925, or visit our clinic at 1881 S. Randall Rd, Suite C, Geneva, IL 60134.",
  alternates: { canonical: "https://genesisintegrativemed.com/contact/" },
  openGraph: {
    type: "article",
    title: "Contact | Genesis Integrative Medicine",
    description:
      "Contact Genesis Integrative Medicine in Geneva, IL. Book online, call 630-845-8925, or visit our clinic at 1881 S. Randall Rd, Suite C, Geneva, IL 60134.",
    url: "https://genesisintegrativemed.com/contact/",
    siteName: "Genesis Integrative Medicine",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Genesis Integrative Medicine",
    description:
      "Contact Genesis Integrative Medicine in Geneva, IL. Book online, call 630-845-8925, or visit our clinic at 1881 S. Randall Rd, Suite C, Geneva, IL 60134.",
  },
};

const LOCATION: Metadata = {
  title: "St. Charles, IL Chiropractic & Integrative Medicine",
  description:
    "Genesis Integrative Medicine serves St. Charles, Kane County, IL patients (about 6 miles / 12 min from Geneva). See treatments available and book a visit.",
  alternates: { canonical: "https://genesisintegrativemed.com/areas-we-serve/st-charles/" },
  openGraph: {
    type: "website",
    title: "St. Charles, IL Chiropractic & Integrative Medicine",
    description:
      "Genesis Integrative Medicine serves St. Charles, Kane County, IL patients (about 6 miles / 12 min from Geneva). See treatments available and book a visit.",
    url: "https://genesisintegrativemed.com/areas-we-serve/st-charles/",
    siteName: "Genesis Integrative Medicine",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "St. Charles, IL Chiropractic & Integrative Medicine",
    description:
      "Genesis Integrative Medicine serves St. Charles, Kane County, IL patients (about 6 miles / 12 min from Geneva). See treatments available and book a visit.",
  },
};

const BLOG: Metadata = {
  title: "What Is PRP Therapy?",
  description: "Platelet-rich plasma therapy at Genesis Integrative Medicine in Geneva, IL.",
  alternates: { canonical: "https://genesisintegrativemed.com/blog/what-is-prp-therapy/" },
  openGraph: {
    type: "article",
    title: "What Is PRP Therapy?",
    description: "Platelet-rich plasma therapy at Genesis Integrative Medicine in Geneva, IL.",
    url: "https://genesisintegrativemed.com/blog/what-is-prp-therapy/",
    siteName: "Genesis Integrative Medicine",
    locale: "en_US",
    publishedTime: "2024-03-08T17:00:03+00:00",
    modifiedTime: "2026-04-09T17:00:03+00:00",
    section: "PRP",
    images: [{ url: "/images/blog/prp.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is PRP Therapy?",
    description: "Platelet-rich plasma therapy at Genesis Integrative Medicine in Geneva, IL.",
    images: ["/images/blog/prp.jpg"],
  },
};

const FALLBACKS = [
  ["home", HOME],
  ["page", PAGE],
  ["location", LOCATION],
  ["blog post", BLOG],
] as const;

const CMS_TITLE =
  "Our Story | Drug-Free Pain Relief in Geneva %s — a deliberately long SEO title that must not be truncated at sixty or seventy characters by the site";
const CMS_DESCRIPTION =
  "  Verbatim description with  double spaces and a trailing space.  " +
  "This sentence is intentionally longer than a typical 160-character meta description so a length clamp would be visible. ".repeat(
    3,
  );

describe("CMS metadata titles", () => {
  it("keeps a branded fallback absolute so the layout template cannot double it", () => {
    const safe = withLayoutSafeTitle(HOME);
    assert.deepEqual(safe.title, {
      absolute: "Multidisciplinary Medicine | Genesis Integrative Medicine",
    });
    assert.equal(
      renderedDocumentTitle(safe.title),
      "Multidisciplinary Medicine | Genesis Integrative Medicine",
    );
    assert.equal(withLayoutSafeTitle(LOCATION).title, LOCATION.title);
  });

  it("matches the site layout title template", () => {
    const layout = readFileSync(new URL("../../app/(site)/layout.tsx", import.meta.url), "utf8");
    assert.match(layout, /template:\s*`%s \| \$\{BRAND\.name\}`/);
  });

  it("renders a published SEO title verbatim, including social titles", () => {
    for (const [label, fallback] of FALLBACKS) {
      const doc = {
        title: "Document title that must not replace the SEO title",
        excerpt: "Excerpt that must not replace the SEO description",
        canonicalUrl: "https://genesisintegrativemed.com/custom/",
        noIndex: false,
        noFollow: false,
        meta: {
          title: CMS_TITLE,
          description: CMS_DESCRIPTION,
          image: { url: "https://cdn.example/og.png" },
        },
      };
      const resolved = resolveCmsMetadata({ doc }, fallback);
      const previous = previousResolve({ doc }, fallback);

      assert.deepEqual(resolved.title, { absolute: CMS_TITLE }, label);
      assert.equal(renderedDocumentTitle(resolved.title), CMS_TITLE, label);
      assert.equal(
        renderedDocumentTitle(previous.title),
        `${CMS_TITLE} | ${BRAND.name}`,
        `${label} previous suffix`,
      );
      assert.equal(renderedSocialTitle(resolved.openGraph?.title), CMS_TITLE, label);
      assert.equal(renderedSocialTitle(resolved.twitter?.title), CMS_TITLE, label);
      assert.equal(resolved.description, CMS_DESCRIPTION, label);
      assert.equal(resolved.openGraph?.description, CMS_DESCRIPTION, label);
      assert.equal(resolved.twitter?.description, CMS_DESCRIPTION, label);
      assert.equal(CMS_TITLE.length > 120, true);
      assert.equal(CMS_DESCRIPTION.length > 320, true);
      assert.deepEqual(withoutTitle(resolved), withoutTitle(previous), label);
    }
  });

  it("keeps an SEO title that already names the brand from gaining a second suffix", () => {
    const seoTitle = "Multidisciplinary Medicine | Genesis Integrative Medicine";
    const resolved = resolveCmsMetadata(
      { doc: { title: "Home", meta: { title: seoTitle, description: HOME.description } } },
      HOME,
    );
    assert.equal(renderedDocumentTitle(resolved.title), seoTitle);
    assert.equal(renderedDocumentTitle(resolved.title).endsWith(`| ${BRAND.name} | ${BRAND.name}`), false);
  });

  it("renders the published home SEO title verbatim, with no extra brand suffix", () => {
    const seoTitle = "Integrative Medicine | Genesis Integrative Medicine";
    const resolved = resolveCmsMetadata(
      {
        doc: {
          title: "Multidisciplinary Medicine | Genesis Integrative Medicine",
          template: "home",
          path: "/",
          meta: { title: seoTitle, description: HOME.description },
        },
      },
      HOME,
    );
    assert.deepEqual(resolved.title, { absolute: seoTitle });
    assert.equal(renderedDocumentTitle(resolved.title), seoTitle);
    assert.equal(renderedSocialTitle(resolved.openGraph?.title), seoTitle);
    assert.equal(renderedSocialTitle(resolved.twitter?.title), seoTitle);
  });

  it("does not let the layout template suffix a home SEO title that omits the brand", () => {
    const seoTitle = "Integrative Medicine";
    const resolved = resolveCmsMetadata(
      { doc: { title: "Home", template: "home", meta: { title: seoTitle } } },
      HOME,
    );
    assert.deepEqual(resolved.title, { absolute: seoTitle });
    assert.equal(renderedDocumentTitle(resolved.title), seoTitle);
    assert.equal(renderedDocumentTitle(resolved.title).endsWith(`| ${BRAND.name}`), false);
  });

  it("still marks a branded document title absolute when the SEO title is empty", () => {
    const docTitle = `Clinic overview | ${BRAND.name}`;
    const resolved = resolveCmsMetadata(
      { doc: { title: docTitle, meta: { title: "  ", description: "" } } },
      PAGE,
    );
    assert.deepEqual(resolved.title, { absolute: docTitle });
    assert.equal(renderedDocumentTitle(resolved.title), docTitle);
  });

  for (const [label, fallback] of FALLBACKS) {
    it(`leaves ${label} titles and descriptions unchanged when SEO fields are empty`, () => {
      assert.equal(resolveCmsMetadata(null, fallback), fallback);

      const emptyMeta = resolveCmsMetadata(
        { doc: { title: "   ", excerpt: "", meta: { title: "  ", description: "" } } },
        fallback,
      );
      const previousEmpty = previousResolve(
        { doc: { title: "   ", excerpt: "", meta: { title: "  ", description: "" } } },
        fallback,
      );
      assert.deepEqual(emptyMeta, previousEmpty);
      assert.equal(typeof emptyMeta.title, "string");
      assert.equal(renderedDocumentTitle(emptyMeta.title), renderedDocumentTitle(fallback.title));

      const docTitleOnly = {
        title: `${label} document title`,
        excerpt: `${label} excerpt used when SEO description is empty`,
        canonicalUrl: "https://genesisintegrativemed.com/example/",
        noIndex: true,
        meta: {},
      };
      const withDocTitle = resolveCmsMetadata({ doc: docTitleOnly }, fallback);
      const previousDocTitle = previousResolve({ doc: docTitleOnly }, fallback);
      assert.deepEqual(withDocTitle, previousDocTitle);
      assert.equal(withDocTitle.title, docTitleOnly.title);
      assert.equal(
        renderedDocumentTitle(withDocTitle.title),
        `${docTitleOnly.title} | ${BRAND.name}`,
      );
      assert.equal(withDocTitle.description, docTitleOnly.excerpt);
    });
  }

  it("keeps the description verbatim when only meta.description is set", () => {
    const resolved = resolveCmsMetadata(
      { doc: { title: "Contact", meta: { description: CMS_DESCRIPTION } } },
      PAGE,
    );
    const previous = previousResolve(
      { doc: { title: "Contact", meta: { description: CMS_DESCRIPTION } } },
      PAGE,
    );
    assert.deepEqual(resolved, previous);
    assert.equal(resolved.description, CMS_DESCRIPTION);
    assert.equal(resolved.title, "Contact");
  });
});
