import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { ED_CONDITION_CONTENT } from "@/app/lib/conditions-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: ED_CONDITION_CONTENT.meta.title,
  description: ED_CONDITION_CONTENT.meta.description,
  alternates: { canonical: ED_CONDITION_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: ED_CONDITION_CONTENT.meta.title,
    description: ED_CONDITION_CONTENT.meta.description,
    url: ED_CONDITION_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [
      { url: ED_CONDITION_CONTENT.meta.ogImage, width: 1200, height: 800, type: "image/jpeg" },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: ED_CONDITION_CONTENT.meta.title,
    description: ED_CONDITION_CONTENT.meta.description,
    images: [ED_CONDITION_CONTENT.meta.ogImage],
  },
};

export default function ErectileDysfunctionPage() {
  const blocks = buildServicePageJsonLd(ED_CONDITION_CONTENT, {
    datePublished: "2025-11-01T00:00:00+00:00",
    dateModified: "2026-04-09T10:33:18+00:00",
    faqEnabled: false,
  });
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <ServicePageTemplate content={ED_CONDITION_CONTENT} />
    </>
  );
}
