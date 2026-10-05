import type { ReactNode } from "react";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";
import BlogPostTemplate from "@/app/components/blog/BlogPostTemplate";
import LegalPageView from "@/app/components/legal/LegalPageView";
import type { BlogPostContent } from "@/app/lib/blog-post-content";
import type { LegalPage } from "@/app/lib/legal-content";
import type { ServicePageContent } from "@/app/lib/services-content";

export function RenderRoutedContent({
  collection,
  doc,
  fallback,
}: {
  collection: "pages" | "posts";
  doc: Record<string, unknown>;
  fallback: ReactNode;
}) {
  const content = doc.content;
  if (collection === "posts" && content && typeof content === "object") {
    return (
      <BlogPostTemplate post={content as BlogPostContent} />
    );
  }

  const template = typeof doc.template === "string" ? doc.template : "";
  if (
    content &&
    typeof content === "object" &&
    (template === "service" ||
      template === "condition" ||
      template === "areaCombo" ||
      template === "lipo")
  ) {
    const page = content as ServicePageContent;
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

  if (template === "legal" && content && typeof content === "object") {
    return <LegalPageView page={content as LegalPage} />;
  }

  return fallback;
}
