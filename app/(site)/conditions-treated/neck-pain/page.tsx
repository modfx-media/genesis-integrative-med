import type { Metadata } from "next";

import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { NECK_PAIN_CONTENT } from "@/app/lib/conditions-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

const FALLBACK_METADATA: Metadata = {
  title: NECK_PAIN_CONTENT.meta.title,
  description: NECK_PAIN_CONTENT.meta.description,
  alternates: { canonical: NECK_PAIN_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: NECK_PAIN_CONTENT.meta.title,
    description: NECK_PAIN_CONTENT.meta.description,
    url: NECK_PAIN_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: NECK_PAIN_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: NECK_PAIN_CONTENT.meta.title,
    description: NECK_PAIN_CONTENT.meta.description,
    images: [NECK_PAIN_CONTENT.meta.ogImage],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/conditions-treated/neck-pain", FALLBACK_METADATA);
}

export default function NeckPainPage() {
  const blocks = buildServicePageJsonLd(NECK_PAIN_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T09:42:47+00:00",
    faqEnabled: false,
  });
  return (
    <CMSRoute path={"/conditions-treated/neck-pain"}>
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <ServicePageTemplate content={NECK_PAIN_CONTENT} />
    </>
  </CMSRoute>
  );
}
