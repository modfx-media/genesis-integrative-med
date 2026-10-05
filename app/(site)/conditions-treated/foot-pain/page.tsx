import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { FOOT_PAIN_CONTENT } from "@/app/lib/conditions-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: FOOT_PAIN_CONTENT.meta.title,
  description: FOOT_PAIN_CONTENT.meta.description,
  alternates: { canonical: FOOT_PAIN_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: FOOT_PAIN_CONTENT.meta.title,
    description: FOOT_PAIN_CONTENT.meta.description,
    url: FOOT_PAIN_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: FOOT_PAIN_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: FOOT_PAIN_CONTENT.meta.title,
    description: FOOT_PAIN_CONTENT.meta.description,
    images: [FOOT_PAIN_CONTENT.meta.ogImage],
  },
};

export default function FootPainPage() {
  const blocks = buildServicePageJsonLd(FOOT_PAIN_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T09:49:12+00:00",
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
      <ServicePageTemplate content={FOOT_PAIN_CONTENT} />
    </>
  );
}
