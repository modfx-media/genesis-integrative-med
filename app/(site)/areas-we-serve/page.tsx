import type { Metadata } from "next";

import AreaIndexView from "@/app/components/areas/AreaIndexView";
import { buildAreasIndexJsonLd } from "@/app/components/services/service-jsonld";
import { AREAS_INDEX_META, AREA_CITIES } from "@/app/lib/areas-we-serve-content";

export const metadata: Metadata = {
  title: AREAS_INDEX_META.title,
  description: AREAS_INDEX_META.description,
  alternates: { canonical: AREAS_INDEX_META.canonicalOrigin },
  openGraph: {
    type: "website",
    title: AREAS_INDEX_META.title,
    description: AREAS_INDEX_META.description,
    url: AREAS_INDEX_META.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: AREAS_INDEX_META.title,
    description: AREAS_INDEX_META.description,
  },
};

export default function AreasWeServePage() {
  const blocks = buildAreasIndexJsonLd({
    title: AREAS_INDEX_META.title,
    description: AREAS_INDEX_META.description,
    canonicalUrl: AREAS_INDEX_META.canonicalOrigin,
    cityNames: AREA_CITIES.map((c) => `${c.name}, IL`),
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
      <AreaIndexView />
    </>
  );
}
