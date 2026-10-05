import type { Metadata } from "next";

import { GoogleReviews } from "@/app/components/home/GoogleReviews";
import { HomeTestimonials } from "@/app/components/home/HomeTestimonials";
import {
  ConditionsShowcase,
  ConditionsStripSection,
  ContactSection,
  DoctorSnippet,
  GetStartedSection,
  HomeHero,
  InsuranceStrip,
  ServiceCards,
  ServicesShowcase,
  SurgeriesSection,
  UnlockPainFreeSection,
  VideosShowcase,
  WhyChooseUsSection,
  WhyIntegrativeMedicine,
} from "@/app/components/home/HomeSections";
import { HOME_META } from "@/app/lib/home-content";
import { SITE_ORIGIN } from "@/app/lib/site-config";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";

const CANONICAL = `${SITE_ORIGIN}/`;

export const metadata: Metadata = {
  title: HOME_META.title,
  description: HOME_META.description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: "Genesis Integrative Medicine",
    title: HOME_META.title,
    description: HOME_META.description,
    images: [
      {
        url: HOME_META.ogImage,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

/**
 * JSON-LD graph, replicated from the live homepage per the migration brief.
 * Values preserved verbatim; only @id / url resolve to the canonical origin.
 * Image URLs point to local assets and the MedicalClinic NAP fields have
 * been aligned with the displayed phone number (see fix notes below).
 */
const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": CANONICAL,
      url: CANONICAL,
      name: HOME_META.title,
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      primaryImageOfPage: { "@id": `${SITE_ORIGIN}/#primaryimage` },
      image: { "@id": `${SITE_ORIGIN}/#primaryimage` },
      thumbnailUrl: HOME_META.ogImage,
      datePublished: "2024-03-08T11:34:48+00:00",
      dateModified: "2026-04-09T10:44:48+00:00",
      description: HOME_META.description,
      breadcrumb: { "@id": `${SITE_ORIGIN}/#breadcrumb` },
      inLanguage: "en-US",
      potentialAction: [{ "@type": "ReadAction", target: [CANONICAL] }],
    },
    {
      "@type": "ImageObject",
      inLanguage: "en-US",
      "@id": `${SITE_ORIGIN}/#primaryimage`,
      url: HOME_META.ogImage,
      contentUrl: HOME_META.ogImage,
      width: 500,
      height: 104,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_ORIGIN}/#breadcrumb`,
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home" }],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: CANONICAL,
      name: "Genesis Integrative Medicine",
      description: "Integrative Medical Office | Pain Management Clinic",
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_ORIGIN}/?s={search_term_string}`,
          },
          "query-input": {
            "@type": "PropertyValueSpecification",
            valueRequired: true,
            valueName: "search_term_string",
          },
        },
      ],
      inLanguage: "en-US",
    },
  ],
};

const physicianJsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Genesis Integrative Medicine",
  image: `${SITE_ORIGIN}/images/logo/Genesis_Logo.png`,
  "@id": CANONICAL,
  url: CANONICAL,
  telephone: "630-845-8925",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1881 S. Randall Rd",
    addressLocality: "Geneva",
    addressRegion: "IL",
    postalCode: "60134",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.8682334,
    longitude: -88.3397087,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Thursday"],
      opens: "15:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "09:00",
      closes: "12:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/genesisintegrativemed/",
    "https://www.instagram.com/genesis.integrative.med/?hl=en",
  ],
};

const websiteSimpleJsonLd = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "Genesis Integrative Medicine",
  url: CANONICAL,
  potentialAction: {
    "@type": "SearchAction",
    target: "{search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const medicalClinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Genesis Integrative Medicine",
  image: `${SITE_ORIGIN}/images/logo/Genesis_Logo.png`,
  "@id": `${SITE_ORIGIN}/#medicalclinic`,
  url: CANONICAL,
  telephone: "630-845-8925",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1881 S. Randall Rd, Suite C",
    addressLocality: "Geneva, IL",
    addressRegion: "IL",
    postalCode: "60134",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Friday"],
      opens: "08:00",
      closes: "11:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "15:00",
      closes: "18:00",
    },
  ],
};

export default async function Home() {
  const { meta } = await getDisplayedGoogleReviews();
  const clinicJsonLd = {
    ...medicalClinicJsonLd,
    ...(meta.rating > 0 && meta.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: meta.rating,
            reviewCount: meta.reviewCount,
            bestRating: "5",
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSimpleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
      />

      <HomeHero
        rating={meta.rating}
        reviewCount={meta.reviewCount}
        reviewsUrl={meta.reviewsUrl}
      />
      <InsuranceStrip />
      <ServiceCards />
      <ServicesShowcase />
      <WhyIntegrativeMedicine />
      <SurgeriesSection />
      <UnlockPainFreeSection />
      <DoctorSnippet />
      <WhyChooseUsSection />
      <GoogleReviews>
        {({ reviews, meta: reviewMeta }) => (
          <HomeTestimonials
            items={reviews.map((review) => ({
              name: review.name,
              quote: review.quote,
              when: review.relativeTime ?? "Posted on Google",
            }))}
            rating={reviewMeta.rating}
            reviewCount={reviewMeta.reviewCount}
            reviewsUrl={reviewMeta.reviewsUrl}
          />
        )}
      </GoogleReviews>
      <ConditionsShowcase />
      <ConditionsStripSection reviewsUrl={meta.reviewsUrl} />
      <VideosShowcase />
      <GetStartedSection />
      <ContactSection />
    </>
  );
}
