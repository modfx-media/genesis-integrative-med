import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { CONDITIONS_SCIATICA_CONTENT } from "@/app/lib/conditions-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: CONDITIONS_SCIATICA_CONTENT.meta.title,
  description: CONDITIONS_SCIATICA_CONTENT.meta.description,
  alternates: { canonical: CONDITIONS_SCIATICA_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: CONDITIONS_SCIATICA_CONTENT.meta.title,
    description: CONDITIONS_SCIATICA_CONTENT.meta.description,
    url: CONDITIONS_SCIATICA_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: CONDITIONS_SCIATICA_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: CONDITIONS_SCIATICA_CONTENT.meta.title,
    description: CONDITIONS_SCIATICA_CONTENT.meta.description,
    images: [CONDITIONS_SCIATICA_CONTENT.meta.ogImage],
  },
};

export default function ConditionsSciaticaPage() {
  const blocks = buildServicePageJsonLd(CONDITIONS_SCIATICA_CONTENT, {
    datePublished: "2022-08-05T05:40:27+00:00",
    dateModified: "2026-04-09T09:53:35+00:00",
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
      <ServicePageTemplate content={CONDITIONS_SCIATICA_CONTENT} />
    </>
  );
}
