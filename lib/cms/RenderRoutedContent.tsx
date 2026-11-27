import type { ReactNode } from "react";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";
import LegalPageView from "@/app/components/legal/LegalPageView";
import type { LegalPage } from "@/app/lib/legal-content";
import type { ServicePageContent } from "@/app/lib/services-content";

import { canReplaceDesignedPage } from "./designed-page";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asServicePage(content: unknown): ServicePageContent | null {
  if (!isRecord(content)) return null;
  if (!isRecord(content.meta) || typeof content.meta.title !== "string") return null;
  if (!isRecord(content.hero) || typeof content.hero.h1 !== "string") return null;
  if (!Array.isArray(content.sections)) return null;
  return content as unknown as ServicePageContent;
}

function asLegalPage(content: unknown): LegalPage | null {
  if (!isRecord(content)) return null;
  if (!isRecord(content.meta) || typeof content.meta.title !== "string") return null;
  return content as unknown as LegalPage;
}

/**
 * Overlay a designed page only when `canReplaceDesignedPage` allows it.
 * Otherwise return the hardcoded page.
 */
export function RenderRoutedContent({
  collection,
  doc,
  fallback,
}: {
  collection: "pages" | "posts";
  doc: Record<string, unknown>;
  fallback: ReactNode;
}) {
  if (!canReplaceDesignedPage({ collection, doc })) return fallback;

  const content = doc.content;
  const template = typeof doc.template === "string" ? doc.template : "";
  if (
    template === "service" ||
    template === "condition" ||
    template === "areaCombo" ||
    template === "lipo"
  ) {
    const page = asServicePage(content);
    if (!page) return fallback;
    const blocks = buildServicePageJsonLd(page, {
      datePublished: typeof doc.publishedAt === "string" ? doc.publishedAt : undefined,
      dateModified:
        typeof doc.sourceUpdatedAt === "string"
          ? doc.sourceUpdatedAt
          : typeof doc.updatedAt === "string"
            ? doc.updatedAt
            : undefined,
      faqEnabled: Boolean(page.faqs?.length),
    });
    return (
      <>
        {blocks.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
          />
        ))}
        <ServicePageTemplate content={page} />
      </>
    );
  }

  if (template === "legal") {
    const page = asLegalPage(content);
    if (!page) return fallback;
    return <LegalPageView page={page} />;
  }

  return fallback;
}
