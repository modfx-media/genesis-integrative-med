import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Pages, Posts } from "./collections/Pages";
import { Users } from "./collections/Users";
import { Footer, Header, SiteSettings } from "./globals/Site";
import { corsOrigins, getPublicOrigin } from "./lib/cms/urls";

import { scheduledPublishPlugin } from "./scheduled-publish";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isVercel = Boolean(process.env.VERCEL);
const isImport = process.env.CMS_IMPORT_APPLY === "1";

function connectionString(): string {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    ""
  );
}

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, "app/(payload)/admin/importMap.js"),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Pages, Posts],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  // Empty when unset so /admin fails loudly instead of booting with a placeholder secret.
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: getPublicOrigin(),
  cors: corsOrigins(),
  csrf: corsOrigins(),
  db: vercelPostgresAdapter({
    pool: { connectionString: connectionString() },
    forceUseVercelPostgres: true,
    push: !isVercel && !isImport && process.env.NODE_ENV !== "production",
  }),
  plugins: [
    scheduledPublishPlugin(),
    seoPlugin({
      collections: ["pages", "posts"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) =>
        typeof doc?.title === "string" ? doc.title : "Genesis Integrative Medicine",
      generateURL: ({ doc }) => {
        const origin = getPublicOrigin();
        const raw =
          typeof doc?.path === "string"
            ? doc.path
            : typeof doc?.slug === "string"
              ? `/${doc.slug}`
              : null;
        if (!raw || raw.includes("null") || raw.includes("undefined")) return "";
        if (raw === "/") return `${origin}/`;
        const trimmed = raw.replace(/\/+$/, "");
        return `${origin}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}/`;
      },
    }),
    ...(blobToken
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: blobToken,
          }),
        ]
      : []),
  ],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
