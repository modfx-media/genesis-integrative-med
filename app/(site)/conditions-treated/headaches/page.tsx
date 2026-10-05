import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { HEADACHES_CONTENT } from "@/app/lib/conditions-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: HEADACHES_CONTENT.meta.title,
  description: HEADACHES_CONTENT.meta.description,
  alternates: { canonical: HEADACHES_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: HEADACHES_CONTENT.meta.title,
    description: HEADACHES_CONTENT.meta.description,
    url: HEADACHES_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: HEADACHES_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HEADACHES_CONTENT.meta.title,
    description: HEADACHES_CONTENT.meta.description,
    images: [HEADACHES_CONTENT.meta.ogImage],
  },
};

export default function HeadachesPage() {
  const blocks = buildServicePageJsonLd(HEADACHES_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T09:45:25+00:00",
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
      <ServicePageTemplate content={HEADACHES_CONTENT} />
    </>
  );
}
