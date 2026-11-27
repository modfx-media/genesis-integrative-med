import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { canReplaceDesignedPage } from "./designed-page";

const PUBLISHED_HOME = {
  collection: "pages" as const,
  doc: {
    title: "Multidisciplinary Medicine | Genesis Integrative Medicine",
    slug: "home",
    path: "/",
    template: "home",
    _status: "published",
    content: {
      meta: {
        title: "Integrative Medicine | Genesis Integrative Medicine",
        description:
          "Discover root-cause pain relief in Geneva, IL. Genesis Integrative Medicine offers chiropractic, shockwave therapy & regenerative care. Book your visit today!",
        canonicalPath: "/",
        ogImage: "/images/logo/Genesis_Logo.png",
      },
    },
    meta: {
      title: "Integrative Medicine | Genesis Integrative Medicine",
      description:
        "Discover root-cause pain relief in Geneva, IL. Genesis Integrative Medicine offers chiropractic, shockwave therapy & regenerative care. Book your visit today!",
    },
  },
};

const SERVICE_CONTENT = {
  slug: "chiropractic-care",
  urlPath: "/services/chiropractic-care/",
  meta: {
    title: "Chiropractic Care",
    description: "Care",
    canonicalOrigin: "https://example.com",
    ogImage: "/og.png",
  },
  breadcrumbs: [{ name: "Home" }],
  hero: { h1: "Chiropractic Care" },
  sections: [{ heading: "Care", paragraphs: ["Body"] }],
};

const LEGAL_CONTENT = {
  slug: "our-terms",
  urlPath: "/our-terms/",
  meta: { title: "Terms", description: "Terms", canonical: "https://example.com/our-terms/" },
  hero: { kicker: "Legal", h1: "Terms & Conditions" },
  breadcrumbs: [{ name: "Home" }, { name: "Terms" }],
  sections: [{ heading: "Use", paragraphs: ["Body"] }],
};

describe("designed-page guard", () => {
  it("keeps the published home page on its designed route", () => {
    assert.equal(canReplaceDesignedPage(PUBLISHED_HOME), false);
  });

  it("keeps marketing templates even when content could render another template", () => {
    for (const template of ["home", "about", "contact", "blogIndex", "testimonials", "generic", ""]) {
      assert.equal(
        canReplaceDesignedPage({
          collection: "pages",
          doc: { template, content: SERVICE_CONTENT },
        }),
        false,
        template || "(empty)",
      );
    }
  });

  it("keeps a designed page when a publish only has SEO meta", () => {
    assert.equal(
      canReplaceDesignedPage({
        collection: "pages",
        doc: {
          template: "service",
          content: { meta: { title: "Chiropractic Care" } },
        },
      }),
      false,
    );
    assert.equal(
      canReplaceDesignedPage({
        collection: "pages",
        doc: {
          template: "legal",
          content: { meta: { title: "Terms" } },
        },
      }),
      false,
    );
  });

  it("replaces a service or legal page only when the overlay content is complete", () => {
    for (const template of ["service", "condition", "areaCombo", "lipo"]) {
      assert.equal(
        canReplaceDesignedPage({
          collection: "pages",
          doc: { template, content: SERVICE_CONTENT },
        }),
        true,
        template,
      );
    }
    assert.equal(
      canReplaceDesignedPage({
        collection: "pages",
        doc: { template: "legal", content: LEGAL_CONTENT },
      }),
      true,
    );
    assert.equal(
      canReplaceDesignedPage({
        collection: "pages",
        doc: {
          template: "service",
          content: { ...SERVICE_CONTENT, breadcrumbs: undefined },
        },
      }),
      false,
    );
  });

  it("does not replace a designed blog route with raw post JSON", () => {
    assert.equal(
      canReplaceDesignedPage({
        collection: "posts",
        doc: { template: "service", content: SERVICE_CONTENT },
      }),
      false,
    );
  });
});
