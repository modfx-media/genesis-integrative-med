import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { PEPTIDE_WEIGHT_LOSS_CONTENT } from "@/app/lib/services-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: PEPTIDE_WEIGHT_LOSS_CONTENT.meta.title,
  description: PEPTIDE_WEIGHT_LOSS_CONTENT.meta.description,
  alternates: { canonical: PEPTIDE_WEIGHT_LOSS_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: PEPTIDE_WEIGHT_LOSS_CONTENT.meta.title,
    description: PEPTIDE_WEIGHT_LOSS_CONTENT.meta.description,
    url: PEPTIDE_WEIGHT_LOSS_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: PEPTIDE_WEIGHT_LOSS_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: PEPTIDE_WEIGHT_LOSS_CONTENT.meta.title,
    description: PEPTIDE_WEIGHT_LOSS_CONTENT.meta.description,
    images: [PEPTIDE_WEIGHT_LOSS_CONTENT.meta.ogImage],
  },
};

export default function PeptideWeightLossPage() {
  // Peptide page has no formal FAQ block on the live site.
  const blocks = buildServicePageJsonLd(PEPTIDE_WEIGHT_LOSS_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T11:05:11+00:00",
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
      <ServicePageTemplate content={PEPTIDE_WEIGHT_LOSS_CONTENT} />
    </>
  );
}
