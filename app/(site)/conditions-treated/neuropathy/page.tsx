import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { NEUROPATHY_CONTENT } from "@/app/lib/conditions-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: NEUROPATHY_CONTENT.meta.title,
  description: NEUROPATHY_CONTENT.meta.description,
  alternates: { canonical: NEUROPATHY_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: NEUROPATHY_CONTENT.meta.title,
    description: NEUROPATHY_CONTENT.meta.description,
    url: NEUROPATHY_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: NEUROPATHY_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: NEUROPATHY_CONTENT.meta.title,
    description: NEUROPATHY_CONTENT.meta.description,
    images: [NEUROPATHY_CONTENT.meta.ogImage],
  },
};

export default function NeuropathyPage() {
  const blocks = buildServicePageJsonLd(NEUROPATHY_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T09:57:36+00:00",
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
      <ServicePageTemplate content={NEUROPATHY_CONTENT} />
    </>
  );
}
