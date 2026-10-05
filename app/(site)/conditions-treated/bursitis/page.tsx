import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { BURSITIS_CONTENT } from "@/app/lib/conditions-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: BURSITIS_CONTENT.meta.title,
  description: BURSITIS_CONTENT.meta.description,
  alternates: { canonical: BURSITIS_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: BURSITIS_CONTENT.meta.title,
    description: BURSITIS_CONTENT.meta.description,
    url: BURSITIS_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: BURSITIS_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: BURSITIS_CONTENT.meta.title,
    description: BURSITIS_CONTENT.meta.description,
    images: [BURSITIS_CONTENT.meta.ogImage],
  },
};

export default function BursitisPage() {
  const blocks = buildServicePageJsonLd(BURSITIS_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T10:27:16+00:00",
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
      <ServicePageTemplate content={BURSITIS_CONTENT} />
    </>
  );
}
