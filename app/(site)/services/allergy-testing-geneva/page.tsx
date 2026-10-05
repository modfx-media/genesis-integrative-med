import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { ALLERGY_TESTING_CONTENT } from "@/app/lib/services-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: ALLERGY_TESTING_CONTENT.meta.title,
  description: ALLERGY_TESTING_CONTENT.meta.description,
  alternates: { canonical: ALLERGY_TESTING_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: ALLERGY_TESTING_CONTENT.meta.title,
    description: ALLERGY_TESTING_CONTENT.meta.description,
    url: ALLERGY_TESTING_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: ALLERGY_TESTING_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: ALLERGY_TESTING_CONTENT.meta.title,
    description: ALLERGY_TESTING_CONTENT.meta.description,
    images: [ALLERGY_TESTING_CONTENT.meta.ogImage],
  },
};

export default function AllergyTestingPage() {
  // Page has no formal FAQ block; body is fully organized into H2 sections.
  const blocks = buildServicePageJsonLd(ALLERGY_TESTING_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-10T02:27:09+00:00",
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
      <ServicePageTemplate content={ALLERGY_TESTING_CONTENT} />
    </>
  );
}
