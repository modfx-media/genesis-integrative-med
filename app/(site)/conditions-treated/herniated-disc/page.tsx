import type { Metadata } from "next";

import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { HERNIATED_DISC_CONTENT } from "@/app/lib/conditions-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

const FALLBACK_METADATA: Metadata = {
  title: HERNIATED_DISC_CONTENT.meta.title,
  description: HERNIATED_DISC_CONTENT.meta.description,
  alternates: { canonical: HERNIATED_DISC_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: HERNIATED_DISC_CONTENT.meta.title,
    description: HERNIATED_DISC_CONTENT.meta.description,
    url: HERNIATED_DISC_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: HERNIATED_DISC_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HERNIATED_DISC_CONTENT.meta.title,
    description: HERNIATED_DISC_CONTENT.meta.description,
    images: [HERNIATED_DISC_CONTENT.meta.ogImage],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/conditions-treated/herniated-disc", FALLBACK_METADATA);
}

export default function HerniatedDiscPage() {
  const blocks = buildServicePageJsonLd(HERNIATED_DISC_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T09:55:06+00:00",
    faqEnabled: false,
  });
  return (
    <CMSRoute path={"/conditions-treated/herniated-disc"}>
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <ServicePageTemplate content={HERNIATED_DISC_CONTENT} />
    </>
  </CMSRoute>
  );
}
