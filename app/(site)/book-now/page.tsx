import type { Metadata } from "next";

import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

import BookNowPageView from "@/app/components/booking/BookNowPageView";
import { SITE_ORIGIN } from "@/app/lib/site-config";

const CANONICAL = "https://genesisintegrativemed.com/book-now/";

const TITLE = "Book Now | Genesis Integrative Medicine";
const DESCRIPTION =
  "Schedule your visit with Genesis Integrative Medicine in Geneva, IL. Pick a day and time that works for you, same-week appointments are often available.";

const FALLBACK_METADATA: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Genesis Integrative Medicine",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/book-now", FALLBACK_METADATA);
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": CANONICAL,
        url: CANONICAL,
        name: TITLE,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        description: DESCRIPTION,
        breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Book Now" },
        ],
      },
    ],
  },
];

export default function BookNowPage() {
  return (
    <CMSRoute path={"/book-now"}>
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BookNowPageView />
    </>
  </CMSRoute>
  );
}
