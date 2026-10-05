import type { Metadata } from "next";

import FormsPageView from "@/app/components/forms/FormsPageView";
import { SITE_ORIGIN } from "@/app/lib/site-config";

const CANONICAL = "https://genesisintegrativemed.com/forms/";

export const metadata: Metadata = {
  title: "Patient Forms and Paperwork",
  description:
    "Prepare for your appointment at Genesis Integrative Medicine by filling out forms. Find knee pain and new patient paperwork for a faster check-in. Click here.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    title: "Patient Forms and Paperwork",
    description:
      "Prepare for your appointment at Genesis Integrative Medicine by filling out forms. Find knee pain and new patient paperwork for a faster check-in. Click here.",
    url: CANONICAL,
    siteName: "Genesis Integrative Medicine",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patient Forms and Paperwork",
    description:
      "Prepare for your appointment at Genesis Integrative Medicine by filling out forms. Find knee pain and new patient paperwork for a faster check-in. Click here.",
  },
};


const jsonLd = [
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": CANONICAL,
        url: CANONICAL,
        name: "Patient Forms and Paperwork | Genesis Integrative Medicine",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        datePublished: "2022-07-21T00:00:00+00:00",
        dateModified: "2026-04-10T02:29:58+00:00",
        description:
          "Prepare for your appointment at Genesis Integrative Medicine by filling out forms.",
        breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Forms" },
        ],
      },
    ],
  },
];

export default function FormsPage() {
  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <FormsPageView />
    </>
  );
}
