import type { Metadata } from "next";

import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

import LegalPageView from "@/app/components/legal/LegalPageView";
import { ACCESSIBILITY_PAGE } from "@/app/lib/legal-content";
import { SITE_ORIGIN } from "@/app/lib/site-config";

const CANONICAL = ACCESSIBILITY_PAGE.meta.canonical;

const FALLBACK_METADATA: Metadata = {
  title: ACCESSIBILITY_PAGE.meta.title,
  description: ACCESSIBILITY_PAGE.meta.description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    title: ACCESSIBILITY_PAGE.meta.title,
    description: ACCESSIBILITY_PAGE.meta.description,
    url: CANONICAL,
    siteName: "Genesis Integrative Medicine",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: ACCESSIBILITY_PAGE.meta.title,
    description: ACCESSIBILITY_PAGE.meta.description,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/accessibility-statement", FALLBACK_METADATA);
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": CANONICAL,
        url: CANONICAL,
        name: ACCESSIBILITY_PAGE.meta.title,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        description: ACCESSIBILITY_PAGE.meta.description,
        breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Accessibility Statement" },
        ],
      },
    ],
  },
];

export default function AccessibilityStatementPage() {
  return (
    <CMSRoute path={"/accessibility-statement"}>
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <LegalPageView page={ACCESSIBILITY_PAGE} />
    </>
  </CMSRoute>
  );
}
