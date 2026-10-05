import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { SHOULDER_PAIN_CONTENT } from "@/app/lib/conditions-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: SHOULDER_PAIN_CONTENT.meta.title,
  description: SHOULDER_PAIN_CONTENT.meta.description,
  alternates: { canonical: SHOULDER_PAIN_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: SHOULDER_PAIN_CONTENT.meta.title,
    description: SHOULDER_PAIN_CONTENT.meta.description,
    url: SHOULDER_PAIN_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: SHOULDER_PAIN_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SHOULDER_PAIN_CONTENT.meta.title,
    description: SHOULDER_PAIN_CONTENT.meta.description,
    images: [SHOULDER_PAIN_CONTENT.meta.ogImage],
  },
};

export default function ShoulderPainPage() {
  const blocks = buildServicePageJsonLd(SHOULDER_PAIN_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T09:51:03+00:00",
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
      <ServicePageTemplate content={SHOULDER_PAIN_CONTENT} />
    </>
  );
}
