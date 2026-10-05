import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { PERIPHERAL_NEUROPATHY_CONTENT } from "@/app/lib/services-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: PERIPHERAL_NEUROPATHY_CONTENT.meta.title,
  description: PERIPHERAL_NEUROPATHY_CONTENT.meta.description,
  alternates: { canonical: PERIPHERAL_NEUROPATHY_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: PERIPHERAL_NEUROPATHY_CONTENT.meta.title,
    description: PERIPHERAL_NEUROPATHY_CONTENT.meta.description,
    url: PERIPHERAL_NEUROPATHY_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: PERIPHERAL_NEUROPATHY_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: PERIPHERAL_NEUROPATHY_CONTENT.meta.title,
    description: PERIPHERAL_NEUROPATHY_CONTENT.meta.description,
    images: [PERIPHERAL_NEUROPATHY_CONTENT.meta.ogImage],
  },
};

export default function PeripheralNeuropathyPage() {
  // Page is structured as prose (single H2 "Q & A" wrapping the body). No formal FAQ block.
  const blocks = buildServicePageJsonLd(PERIPHERAL_NEUROPATHY_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-10T02:20:02+00:00",
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
      <ServicePageTemplate content={PERIPHERAL_NEUROPATHY_CONTENT} />
    </>
  );
}
