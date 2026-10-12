import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "./access";
import { emptyToNull } from "../lib/cms/empty-to-null";
import { previewFromPath } from "../lib/cms/preview";
import { normalizeCmsPath } from "../lib/cms/urls";

const seoExtras = [
  {
    name: "canonicalUrl",
    type: "text" as const,
    admin: { description: "Must match the public path (trailing slash on the live site)." },
  },
  { name: "noIndex", type: "checkbox" as const, defaultValue: false },
  { name: "noFollow", type: "checkbox" as const, defaultValue: false },
  { name: "excludeFromSitemap", type: "checkbox" as const, defaultValue: false },
  { name: "sourceUpdatedAt", type: "date" as const },
];

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "path", "template", "_status", "updatedAt"],
    livePreview: {
      url: ({ data }) => previewFromPath(data?.path, data?.slug),
    },
    preview: (data) => previewFromPath(data?.path, data?.slug),
    useAsTitle: "title",
  },
  defaultPopulate: {
    title: true,
    slug: true,
    path: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyToNull] },
    },
    {
      name: "path",
      type: "text",
      unique: true,
      index: true,
      admin: {
        description: "Public path without trailing slash, e.g. /about-practice. Home is /.",
      },
      hooks: {
        beforeValidate: [
          emptyToNull,
          ({ value, data }) => {
            const fromValue = normalizeCmsPath(typeof value === "string" ? value : null);
            if (fromValue) return fromValue;
            const slug = data?.slug;
            if (typeof slug === "string" && slug.trim()) {
              return normalizeCmsPath(`/${slug}`);
            }
            return value === "" ? null : value;
          },
        ],
      },
    },
    {
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyToNull] },
    },
    {
      name: "sourceUrl",
      type: "text",
    },
    {
      name: "template",
      type: "select",
      options: [
        { label: "Home", value: "home" },
        { label: "Service", value: "service" },
        { label: "Condition", value: "condition" },
        { label: "Services index", value: "servicesIndex" },
        { label: "Conditions index", value: "conditionsIndex" },
        { label: "About", value: "about" },
        { label: "Staff", value: "staff" },
        { label: "Providers", value: "providers" },
        { label: "Areas index", value: "areasIndex" },
        { label: "Area city", value: "areaCity" },
        { label: "Area combo", value: "areaCombo" },
        { label: "Blog index", value: "blogIndex" },
        { label: "Contact", value: "contact" },
        { label: "Forms", value: "forms" },
        { label: "Book now", value: "bookNow" },
        { label: "Testimonials", value: "testimonials" },
        { label: "Legal", value: "legal" },
        { label: "Lipo", value: "lipo" },
        { label: "HTML sitemap", value: "htmlSitemap" },
        { label: "Generic", value: "generic" },
      ],
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "content",
      type: "json",
      admin: {
        description:
          "Structured copy for the designed template. Public overlay uses this after publish.",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
    ...seoExtras,
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data;
        if (!data.publishedAt && data._status === "published") {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "slug", "path", "_status", "updatedAt"],
    livePreview: {
      url: ({ data }) => previewFromPath(data?.path, data?.slug ? `blog/${data.slug}` : null),
    },
    preview: (data) =>
      previewFromPath(data?.path, data?.slug ? `blog/${data.slug}` : null),
    useAsTitle: "title",
  },
  defaultPopulate: {
    title: true,
    slug: true,
    path: true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyToNull] },
    },
    {
      name: "path",
      type: "text",
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          emptyToNull,
          ({ value, data }) => {
            const fromValue = normalizeCmsPath(typeof value === "string" ? value : null);
            if (fromValue) return fromValue;
            const slug = data?.slug;
            if (typeof slug === "string" && slug.trim()) {
              return normalizeCmsPath(`/blog/${slug}`);
            }
            return value === "" ? null : value;
          },
        ],
      },
    },
    {
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyToNull] },
    },
    { name: "sourceUrl", type: "text" },
    { name: "category", type: "text" },
    { name: "dek", type: "textarea" },
    { name: "readTime", type: "text" },
    { name: "postDate", type: "date" },
    { name: "imageSrc", type: "text" },
    { name: "imageAlt", type: "text" },
    {
      name: "content",
      type: "json",
      admin: { description: "Full BlogPostContent JSON for the designed post template." },
    },
    { name: "publishedAt", type: "date", admin: { position: "sidebar" } },
    ...seoExtras,
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data;
        if (!data.publishedAt && data._status === "published") {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
