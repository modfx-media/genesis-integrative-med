import type { Metadata } from "next";

import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

import LegalPageView from "@/app/components/legal/LegalPageView";
import { TERMS_PAGE } from "@/app/lib/legal-content";
import { SITE_ORIGIN } from "@/app/lib/site-config";

const CANONICAL = TERMS_PAGE.meta.canonical;

const FALLBACK_METADATA: Metadata = {
  title: TERMS_PAGE.meta.title,
  description: TERMS_PAGE.meta.description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    title: TERMS_PAGE.meta.title,
    description: TERMS_PAGE.meta.description,
    url: CANONICAL,
    siteName: "Genesis Integrative Medicine",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TERMS_PAGE.meta.title,
    description: TERMS_PAGE.meta.description,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/our-terms", FALLBACK_METADATA);
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": CANONICAL,
        url: CANONICAL,
        name: TERMS_PAGE.meta.title,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        description: TERMS_PAGE.meta.description,
        breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Terms & Conditions" },
        ],
      },
    ],
  },
];

export default function OurTermsPage() {
  return (
    <CMSRoute path={"/our-terms"}>
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <LegalPageView page={TERMS_PAGE} />
    </>
  </CMSRoute>
  );
}
