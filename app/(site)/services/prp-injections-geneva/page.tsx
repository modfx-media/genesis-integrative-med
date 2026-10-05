import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { PRP_CONTENT } from "@/app/lib/services-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: PRP_CONTENT.meta.title,
  description: PRP_CONTENT.meta.description,
  alternates: { canonical: PRP_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: PRP_CONTENT.meta.title,
    description: PRP_CONTENT.meta.description,
    url: PRP_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: PRP_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: PRP_CONTENT.meta.title,
    description: PRP_CONTENT.meta.description,
    images: [PRP_CONTENT.meta.ogImage],
  },
};

export default function PrpInjectionsPage() {
  // PRP page has no formal FAQ block on the live site.
  const blocks = buildServicePageJsonLd(PRP_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T10:53:29+00:00",
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
      <ServicePageTemplate content={PRP_CONTENT} />
    </>
  );
}
