import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { TENDONITIS_CONTENT } from "@/app/lib/conditions-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: TENDONITIS_CONTENT.meta.title,
  description: TENDONITIS_CONTENT.meta.description,
  alternates: { canonical: TENDONITIS_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: TENDONITIS_CONTENT.meta.title,
    description: TENDONITIS_CONTENT.meta.description,
    url: TENDONITIS_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: TENDONITIS_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TENDONITIS_CONTENT.meta.title,
    description: TENDONITIS_CONTENT.meta.description,
    images: [TENDONITIS_CONTENT.meta.ogImage],
  },
};

export default function TendonitisPage() {
  const blocks = buildServicePageJsonLd(TENDONITIS_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T09:59:29+00:00",
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
      <ServicePageTemplate content={TENDONITIS_CONTENT} />
    </>
  );
}
