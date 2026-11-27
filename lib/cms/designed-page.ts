/**
 * Designed-page guard.
 *
 * A published service, condition, area-combo, lipo, or legal document is
 * rendered with the same designed components the route already uses:
 * `ServicePageTemplate` or `LegalPageView`. Those components supply the
 * markup and styling. The CMS document supplies the content props (hero,
 * sections, breadcrumbs, and the rest of that content object). This is not
 * a generic or unstyled renderer.
 *
 * The route is replaced only when `content` has a hero, sections, and
 * breadcrumbs, so a SEO-only publish cannot swap in an empty shell. Home
 * and the other marketing templates have no overlay and always keep their
 * designed tree. The published home page is one of those.
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
