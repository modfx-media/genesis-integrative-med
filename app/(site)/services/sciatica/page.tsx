import type { Metadata } from "next";

import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { SCIATICA_CONTENT } from "@/app/lib/services-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

const FALLBACK_METADATA: Metadata = {
  title: SCIATICA_CONTENT.meta.title,
  description: SCIATICA_CONTENT.meta.description,
  alternates: { canonical: SCIATICA_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: SCIATICA_CONTENT.meta.title,
    description: SCIATICA_CONTENT.meta.description,
    url: SCIATICA_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: SCIATICA_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SCIATICA_CONTENT.meta.title,
    description: SCIATICA_CONTENT.meta.description,
    images: [SCIATICA_CONTENT.meta.ogImage],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/services/sciatica", FALLBACK_METADATA);
}

export default function SciaticaPage() {
  // Sciatica uses inline treatment accordions rather than a formal FAQ block.
  const blocks = buildServicePageJsonLd(SCIATICA_CONTENT, {
    datePublished: "2022-08-05T05:40:27+00:00",
    dateModified: "2026-04-09T09:53:35+00:00",
    faqEnabled: false,
  });
  return (
    <CMSRoute path={"/services/sciatica"}>
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <ServicePageTemplate content={SCIATICA_CONTENT} />
    </>
  </CMSRoute>
  );
}
