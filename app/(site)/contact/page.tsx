import type { Metadata } from "next";

import ContactPageView from "@/app/components/contact/ContactPageView";
import { CONTACT, SITE_ORIGIN } from "@/app/lib/site-config";

const CANONICAL = "https://genesisintegrativemed.com/contact/";

const TITLE = "Contact | Genesis Integrative Medicine";
const DESCRIPTION =
  "Contact Genesis Integrative Medicine in Geneva, IL. Book online, call 630-845-8925, or visit our clinic at 1881 S. Randall Rd, Suite C, Geneva, IL 60134.";

export const metadata: Metadata = {
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

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "ContactPage"],
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
          { "@type": "ListItem", position: 2, name: "Contact" },
        ],
      },
      {
        "@type": "MedicalBusiness",
        name: "Genesis Integrative Medicine",
        url: SITE_ORIGIN,
        telephone: CONTACT.phoneDisplay,
        email: CONTACT.email,
        faxNumber: CONTACT.faxDisplay,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.address.street,
          addressLocality: "Geneva",
          addressRegion: "IL",
          postalCode: "60134",
          addressCountry: "US",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Wednesday"],
            opens: "09:00",
            closes: "12:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Wednesday"],
            opens: "15:00",
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
          CONTACT.social.facebook,
          CONTACT.social.instagram,
          CONTACT.social.yelp,
        ],
      },
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
           
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <ContactPageView />
    </>
  );
}
