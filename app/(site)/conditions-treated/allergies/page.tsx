import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { ALLERGIES_CONTENT } from "@/app/lib/conditions-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: ALLERGIES_CONTENT.meta.title,
  description: ALLERGIES_CONTENT.meta.description,
  alternates: { canonical: ALLERGIES_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: ALLERGIES_CONTENT.meta.title,
    description: ALLERGIES_CONTENT.meta.description,
    url: ALLERGIES_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: ALLERGIES_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: ALLERGIES_CONTENT.meta.title,
    description: ALLERGIES_CONTENT.meta.description,
    images: [ALLERGIES_CONTENT.meta.ogImage],
  },
};

export default function AllergiesPage() {
  const blocks = buildServicePageJsonLd(ALLERGIES_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T10:30:03+00:00",
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
      <ServicePageTemplate content={ALLERGIES_CONTENT} />
    </>
  );
}
