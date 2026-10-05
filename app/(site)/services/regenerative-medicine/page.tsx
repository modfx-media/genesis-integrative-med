import type { Metadata } from "next";

import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { REGENERATIVE_MEDICINE_CONTENT } from "@/app/lib/services-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

const FALLBACK_METADATA: Metadata = {
  title: REGENERATIVE_MEDICINE_CONTENT.meta.title,
  description: REGENERATIVE_MEDICINE_CONTENT.meta.description,
  alternates: { canonical: REGENERATIVE_MEDICINE_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: REGENERATIVE_MEDICINE_CONTENT.meta.title,
    description: REGENERATIVE_MEDICINE_CONTENT.meta.description,
    url: REGENERATIVE_MEDICINE_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: REGENERATIVE_MEDICINE_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: REGENERATIVE_MEDICINE_CONTENT.meta.title,
    description: REGENERATIVE_MEDICINE_CONTENT.meta.description,
    images: [REGENERATIVE_MEDICINE_CONTENT.meta.ogImage],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/services/regenerative-medicine", FALLBACK_METADATA);
}

export default function RegenerativeMedicinePage() {
  const blocks = buildServicePageJsonLd(REGENERATIVE_MEDICINE_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-10T02:15:29+00:00",
    faqEnabled: true,
  });
  return (
    <CMSRoute path={"/services/regenerative-medicine"}>
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <ServicePageTemplate content={REGENERATIVE_MEDICINE_CONTENT} />
    </>
  </CMSRoute>
  );
}
