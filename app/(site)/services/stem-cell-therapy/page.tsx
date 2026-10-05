import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { STEM_CELL_THERAPY_CONTENT } from "@/app/lib/services-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: STEM_CELL_THERAPY_CONTENT.meta.title,
  description: STEM_CELL_THERAPY_CONTENT.meta.description,
  alternates: { canonical: STEM_CELL_THERAPY_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: STEM_CELL_THERAPY_CONTENT.meta.title,
    description: STEM_CELL_THERAPY_CONTENT.meta.description,
    url: STEM_CELL_THERAPY_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: STEM_CELL_THERAPY_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: STEM_CELL_THERAPY_CONTENT.meta.title,
    description: STEM_CELL_THERAPY_CONTENT.meta.description,
    images: [STEM_CELL_THERAPY_CONTENT.meta.ogImage],
  },
};

export default function StemCellTherapyPage() {
  const blocks = buildServicePageJsonLd(STEM_CELL_THERAPY_CONTENT, {
    datePublished: "2026-08-18T00:00:00+00:00",
    dateModified: "2026-08-18T00:00:00+00:00",
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
      <ServicePageTemplate content={STEM_CELL_THERAPY_CONTENT} />
    </>
  );
}
