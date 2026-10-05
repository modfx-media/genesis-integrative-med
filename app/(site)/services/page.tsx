import type { Metadata } from "next";

import ServicesIndexView from "@/app/components/services/ServicesIndexView";
import {
  SERVICES_INDEX_META,
} from "@/app/lib/services-content";
import { buildServicesIndexJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: SERVICES_INDEX_META.title,
  description: SERVICES_INDEX_META.description,
  alternates: { canonical: SERVICES_INDEX_META.canonicalOrigin },
  openGraph: {
    type: "article",
    title: SERVICES_INDEX_META.title,
    description: SERVICES_INDEX_META.description,
    url: SERVICES_INDEX_META.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: SERVICES_INDEX_META.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SERVICES_INDEX_META.title,
    description: SERVICES_INDEX_META.description,
    images: [SERVICES_INDEX_META.ogImage],
  },
};

export default function ServicesIndexPage() {
  const blocks = buildServicesIndexJsonLd({
    title: SERVICES_INDEX_META.title,
    description: SERVICES_INDEX_META.description,
    canonicalUrl: SERVICES_INDEX_META.canonicalOrigin,
    ogImage: SERVICES_INDEX_META.ogImage,
    datePublished: SERVICES_INDEX_META.datePublished,
    dateModified: SERVICES_INDEX_META.dateModified,
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
      <ServicesIndexView />
    </>
  );
}
