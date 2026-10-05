import { readFileSync } from "fs";
import path from "path";
import { config as loadEnv } from "dotenv";
import { getPayload } from "payload";

import config from "../payload.config";

loadEnv({ path: path.join(process.cwd(), ".env.local") });
loadEnv();

type ImportRecord = {
  collection: "pages" | "posts";
  legacyId: string;
  sourceUrl: string;
  data: Record<string, unknown>;
};

type ExportFile = {
  version: number;
  records: ImportRecord[];
  globals: Record<string, Record<string, unknown>>;
};

function hasApplyFlag(argv: string[]): boolean {
  return argv.includes("--apply") || process.env.CMS_IMPORT_APPLY === "1";
}

async function findExisting(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: "pages" | "posts",
  rec: ImportRecord,
) {
  const byLegacy = await payload.find({
    collection,
    where: { legacyId: { equals: rec.legacyId } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
    draft: true,
  });
  if (byLegacy.docs[0]) return byLegacy.docs[0];
  const bySource = await payload.find({
    collection,
    where: { sourceUrl: { equals: rec.sourceUrl } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
    draft: true,
  });
  return bySource.docs[0] ?? null;
}

async function main() {
  const apply = hasApplyFlag(process.argv);
  const fileArg =
    process.argv.filter((a) => !a.startsWith("-") && a.endsWith(".json")).at(-1) ??
    path.join(process.cwd(), "data", "content-export.json");
  const raw = JSON.parse(readFileSync(fileArg, "utf8")) as ExportFile;
  if (raw.version !== 1) {
    throw new Error(`Unsupported export version ${raw.version}`);
  }

  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    throw new Error("Set pooled DATABASE_URL in .env.local before importing. SQLite is not used.");
  }
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("Set PAYLOAD_SECRET in .env.local before importing.");
  }

  console.log(`${apply ? "APPLY" : "DRY RUN"} ${raw.records.length} records from ${fileArg}`);
  if (!apply) {
    console.log("Re-run with CMS_IMPORT_APPLY=1 and --apply to write drafts.");
    return;
  }

  const payload = await getPayload({ config });

  const pages = raw.records.filter((r) => r.collection === "pages");
  const posts = raw.records.filter((r) => r.collection === "posts");
  const ordered = [...pages, ...posts];

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const rec of ordered) {
    try {
      const existing = await findExisting(payload, rec.collection, rec);
      const data = { ...rec.data, _status: "draft" as const };
      if (existing) {
        await payload.update({
          collection: rec.collection,
          id: existing.id as string | number,
          data,
          draft: true,
          overrideAccess: true,
        });
        updated += 1;
      } else {
        await payload.create({
          collection: rec.collection,
          data,
          draft: true,
          overrideAccess: true,
        });
        created += 1;
      }
    } catch (error) {
      skipped += 1;
      console.error(`[import skip] ${rec.legacyId}`, error);
    }
  }

  for (const [slug, data] of Object.entries(raw.globals ?? {})) {
    try {
      await payload.updateGlobal({
        slug: slug as "header" | "footer" | "site-settings",
        data,
        overrideAccess: true,
      });
    } catch (error) {
      console.error(`[import global skip] ${slug}`, error);
    }
  }

  console.log(`Done. created=${created} updated=${updated} skipped=${skipped}`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
