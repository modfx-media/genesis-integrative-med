/**
 * Designed-page guard.
 *
 * `CMSRoute` wraps hardcoded pages and can replace them when a published
 * document matches an overlay template. Home and the other marketing
 * templates are not overlay templates: a publish (the live home page is
 * published) must leave the designed UI in place. Service, condition, area
 * combo, lipo, and legal pages are replaced only when `content` has the full
 * template shape. SEO-only content, including `{ meta: { title } }`, does not.
 */

const OVERLAY_TEMPLATES = new Set(["service", "condition", "areaCombo", "lipo", "legal"]);

export type DesignedPageRoute = {
  collection: "pages" | "posts";
  doc: Record<string, unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasServiceOverlay(content: unknown): boolean {
  if (!isRecord(content)) return false;
  if (!isRecord(content.meta) || !hasText(content.meta.title)) return false;
  if (!isRecord(content.hero) || !hasText(content.hero.h1)) return false;
  if (!Array.isArray(content.sections)) return false;
  if (!Array.isArray(content.breadcrumbs)) return false;
  return true;
}

function hasLegalOverlay(content: unknown): boolean {
  if (!isRecord(content)) return false;
  if (!isRecord(content.meta) || !hasText(content.meta.title)) return false;
  if (!isRecord(content.hero) || !hasText(content.hero.h1)) return false;
  if (!Array.isArray(content.sections)) return false;
  if (!Array.isArray(content.breadcrumbs)) return false;
  return true;
}

export function canReplaceDesignedPage(routed: DesignedPageRoute): boolean {
  if (routed.collection !== "pages") return false;
  const template = typeof routed.doc.template === "string" ? routed.doc.template : "";
  if (!OVERLAY_TEMPLATES.has(template)) return false;
  if (template === "legal") return hasLegalOverlay(routed.doc.content);
  return hasServiceOverlay(routed.doc.content);
}
