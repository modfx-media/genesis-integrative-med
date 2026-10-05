import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { ACTIVE_REHAB_CONTENT } from "@/app/lib/services-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: ACTIVE_REHAB_CONTENT.meta.title,
  description: ACTIVE_REHAB_CONTENT.meta.description,
  alternates: { canonical: ACTIVE_REHAB_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: ACTIVE_REHAB_CONTENT.meta.title,
    description: ACTIVE_REHAB_CONTENT.meta.description,
    url: ACTIVE_REHAB_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: ACTIVE_REHAB_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: ACTIVE_REHAB_CONTENT.meta.title,
    description: ACTIVE_REHAB_CONTENT.meta.description,
    images: [ACTIVE_REHAB_CONTENT.meta.ogImage],
  },
};

export default function ActiveRehabPage() {
  // Active Rehab page has no formal FAQ block on the live site.
  const blocks = buildServicePageJsonLd(ACTIVE_REHAB_CONTENT, {
    datePublished: "2022-08-05T00:00:00+00:00",
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
      <ServicePageTemplate content={ACTIVE_REHAB_CONTENT} />
    </>
  );
}
