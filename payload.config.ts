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

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
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
  secret: process.env.PAYLOAD_SECRET || "invalid-secret-replace-in-env-xxxxxxxx",
  serverURL: getPublicOrigin(),
  cors: corsOrigins(),
  csrf: corsOrigins(),
  db: vercelPostgresAdapter({
    pool: { connectionString: connectionString() },
    forceUseVercelPostgres: true,
    push: !isVercel && !isImport && process.env.NODE_ENV !== "production",
  }),
  plugins: [
    seoPlugin({
      collections: ["pages", "posts"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) =>
        typeof doc?.title === "string" ? doc.title : "Genesis Integrative Medicine",
      generateURL: ({ doc }) => {
        const origin = getPublicOrigin();
        const pathValue =
          typeof doc?.path === "string"
            ? doc.path
            : typeof doc?.slug === "string"
              ? `/${doc.slug}`
              : "/";
        if (pathValue === "/") return `${origin}/`;
        const trimmed = pathValue.replace(/\/+$/, "");
        return `${origin}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}/`;
      },
    }),
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
