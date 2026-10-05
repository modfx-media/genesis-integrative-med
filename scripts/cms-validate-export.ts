import { buildContentExport } from "./cms-export";
import { editorialCmsPaths } from "./cms-url-manifest";

const exported = buildContentExport();
const have = new Set(exported.records.map((r) => String(r.data.path)));
const required = editorialCmsPaths();
const missing = required.filter((p) => !have.has(p));
const extra = [...have].filter((p) => !required.includes(p));

console.log(`records=${exported.records.length} required=${required.length}`);
if (missing.length) {
  console.error("Missing CMS paths:");
  for (const p of missing) console.error(`  ${p}`);
  process.exit(1);
}
if (extra.length) {
  console.log(`Extra (ok): ${extra.length}`);
}
console.log("Export covers every editorial sitemap path.");
