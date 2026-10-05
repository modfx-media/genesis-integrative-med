import type { Metadata } from "next";

import ConditionsIndexView from "@/app/components/conditions/ConditionsIndexView";
import { CONDITIONS_INDEX_META } from "@/app/lib/conditions-content";
import { buildConditionsIndexJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: CONDITIONS_INDEX_META.title,
  description: CONDITIONS_INDEX_META.description,
  alternates: { canonical: CONDITIONS_INDEX_META.canonicalOrigin },
  openGraph: {
    type: "article",
    title: CONDITIONS_INDEX_META.title,
    description: CONDITIONS_INDEX_META.description,
    url: CONDITIONS_INDEX_META.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: CONDITIONS_INDEX_META.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: CONDITIONS_INDEX_META.title,
    description: CONDITIONS_INDEX_META.description,
    images: [CONDITIONS_INDEX_META.ogImage],
  },
};

export default function ConditionsIndexPage() {
  const blocks = buildConditionsIndexJsonLd({
    title: CONDITIONS_INDEX_META.title,
    description: CONDITIONS_INDEX_META.description,
    canonicalUrl: CONDITIONS_INDEX_META.canonicalOrigin,
    ogImage: CONDITIONS_INDEX_META.ogImage,
    datePublished: CONDITIONS_INDEX_META.datePublished,
    dateModified: CONDITIONS_INDEX_META.dateModified,
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
      <ConditionsIndexView />
    </>
  );
}
