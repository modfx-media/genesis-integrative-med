import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { ED_SHOCKWAVE_CONTENT } from "@/app/lib/services-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: ED_SHOCKWAVE_CONTENT.meta.title,
  description: ED_SHOCKWAVE_CONTENT.meta.description,
  alternates: { canonical: ED_SHOCKWAVE_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: ED_SHOCKWAVE_CONTENT.meta.title,
    description: ED_SHOCKWAVE_CONTENT.meta.description,
    url: ED_SHOCKWAVE_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [
      {
        url: ED_SHOCKWAVE_CONTENT.meta.ogImage,
        width: 860,
        height: 573,
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: ED_SHOCKWAVE_CONTENT.meta.title,
    description: ED_SHOCKWAVE_CONTENT.meta.description,
    images: [ED_SHOCKWAVE_CONTENT.meta.ogImage],
  },
};

export default function EdShockwavePage() {
  const blocks = buildServicePageJsonLd(ED_SHOCKWAVE_CONTENT, {
    datePublished: "2025-10-01T00:00:00+00:00",
    dateModified: "2026-04-10T02:26:57+00:00",
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
      <ServicePageTemplate content={ED_SHOCKWAVE_CONTENT} />
    </>
  );
}
