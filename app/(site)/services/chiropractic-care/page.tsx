import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { CHIROPRACTIC_CARE_CONTENT } from "@/app/lib/services-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: CHIROPRACTIC_CARE_CONTENT.meta.title,
  description: CHIROPRACTIC_CARE_CONTENT.meta.description,
  alternates: { canonical: CHIROPRACTIC_CARE_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: CHIROPRACTIC_CARE_CONTENT.meta.title,
    description: CHIROPRACTIC_CARE_CONTENT.meta.description,
    url: CHIROPRACTIC_CARE_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: CHIROPRACTIC_CARE_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: CHIROPRACTIC_CARE_CONTENT.meta.title,
    description: CHIROPRACTIC_CARE_CONTENT.meta.description,
    images: [CHIROPRACTIC_CARE_CONTENT.meta.ogImage],
  },
};

export default function ChiropracticCarePage() {
  const blocks = buildServicePageJsonLd(CHIROPRACTIC_CARE_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T09:53:35+00:00",
    faqEnabled: true,
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
      <ServicePageTemplate content={CHIROPRACTIC_CARE_CONTENT} />
    </>
  );
}
