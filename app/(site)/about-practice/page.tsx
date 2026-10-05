import type { Metadata } from "next";

import AboutPageView from "@/app/components/about/AboutPageView";
import { SITE_ORIGIN } from "@/app/lib/site-config";

const CANONICAL = "https://genesisintegrativemed.com/about-practice/";

export const metadata: Metadata = {
  title: "Our Approach to Holistic Healing & Medicine in Geneva, IL",
  description:
    "Discover how Genesis Integrative Medicine changes lives every day in Geneva, IL. We focus on fixing the source of your discomfort. Join our healthy community.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    title: "Our Approach to Holistic Healing & Medicine in Geneva, IL",
    description:
      "Discover how Genesis Integrative Medicine changes lives every day in Geneva, IL. We focus on fixing the source of your discomfort. Join our healthy community.",
    url: CANONICAL,
    siteName: "Genesis Integrative Medicine",
    images: [
      {
        url: "/images/staff/providers-images-2.jpg",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Approach to Holistic Healing & Medicine in Geneva, IL",
    description:
      "Discover how Genesis Integrative Medicine changes lives every day in Geneva, IL. We focus on fixing the source of your discomfort. Join our healthy community.",
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
        name: "Our Approach to Holistic Healing & Medicine in Geneva, IL",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        datePublished: "2022-07-21T00:00:00+00:00",
        dateModified: "2026-04-09T09:28:17+00:00",
        description:
          "Discover how Genesis Integrative Medicine changes lives every day in Geneva, IL. We focus on fixing the source of your discomfort. Join our healthy community.",
        breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "About Us" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: "Genesis Integrative Medicine",
        inLanguage: "en-US",
      },
    ],
  },
];

export default function AboutPracticePage() {
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
      <AboutPageView />
    </>
  );
}
