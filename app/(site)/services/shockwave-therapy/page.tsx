import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { SHOCKWAVE_THERAPY_CONTENT } from "@/app/lib/services-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: SHOCKWAVE_THERAPY_CONTENT.meta.title,
  description: SHOCKWAVE_THERAPY_CONTENT.meta.description,
  alternates: { canonical: SHOCKWAVE_THERAPY_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: SHOCKWAVE_THERAPY_CONTENT.meta.title,
    description: SHOCKWAVE_THERAPY_CONTENT.meta.description,
    url: SHOCKWAVE_THERAPY_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [
      {
        url: SHOCKWAVE_THERAPY_CONTENT.meta.ogImage,
        width: 860,
        height: 573,
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SHOCKWAVE_THERAPY_CONTENT.meta.title,
    description: SHOCKWAVE_THERAPY_CONTENT.meta.description,
    images: [SHOCKWAVE_THERAPY_CONTENT.meta.ogImage],
  },
};

export default function ShockwaveTherapyPage() {
  const blocks = buildServicePageJsonLd(SHOCKWAVE_THERAPY_CONTENT, {
    datePublished: "2026-07-25T00:00:00+00:00",
    dateModified: "2026-07-25T00:00:00+00:00",
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
      <ServicePageTemplate content={SHOCKWAVE_THERAPY_CONTENT} />
    </>
  );
}
