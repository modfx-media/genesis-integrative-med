import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { COLD_LASER_CONTENT } from "@/app/lib/services-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: COLD_LASER_CONTENT.meta.title,
  description: COLD_LASER_CONTENT.meta.description,
  alternates: { canonical: COLD_LASER_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: COLD_LASER_CONTENT.meta.title,
    description: COLD_LASER_CONTENT.meta.description,
    url: COLD_LASER_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: COLD_LASER_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: COLD_LASER_CONTENT.meta.title,
    description: COLD_LASER_CONTENT.meta.description,
    images: [COLD_LASER_CONTENT.meta.ogImage],
  },
};

export default function ColdLaserPage() {
  const blocks = buildServicePageJsonLd(COLD_LASER_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-10T02:17:01+00:00",
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
      <ServicePageTemplate content={COLD_LASER_CONTENT} />
    </>
  );
}
