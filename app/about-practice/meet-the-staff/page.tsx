import type { Metadata } from "next";

import TeamPageView from "@/app/components/team/TeamPageView";
import { SITE_ORIGIN } from "@/app/lib/site-config";

const CANONICAL =
  "https://genesisintegrativemed.com/about-practice/meet-the-staff/";

export const metadata: Metadata = {
  title: "Get to Know Our Expert Care Team",
  description:
    "Meet the staff at Genesis Integrative Medicine to see how we care for your health. Our experts work together to provide a great experience. Schedule a visit now.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    title: "Get to Know Our Expert Care Team",
    description:
      "Meet the staff at Genesis Integrative Medicine to see how we care for your health. Our experts work together to provide a great experience. Schedule a visit now.",
    url: CANONICAL,
    siteName: "Genesis Integrative Medicine",
    images: [
      {
        url: "/images/staff/providers-images.jpg",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get to Know Our Expert Care Team",
    description:
      "Meet the staff at Genesis Integrative Medicine to see how we care for your health. Our experts work together to provide a great experience. Schedule a visit now.",
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
        name: "Get to Know Our Expert Care Team | Genesis Integrative Med",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        datePublished: "2022-07-21T00:00:00+00:00",
        dateModified: "2026-09-16T00:00:00+00:00",
        description:
          "Meet the staff at Genesis Integrative Medicine to see how we care for your health.",
        breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: `${SITE_ORIGIN}/about-practice/`,
          },
          { "@type": "ListItem", position: 3, name: "Meet The Staff" },
        ],
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Person",
          name: "Kim Bukowski",
          jobTitle: "Front Desk Manager",
          worksFor: {
            "@type": "MedicalClinic",
            name: "Genesis Integrative Medicine",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Person",
          name: "Oksana Samnadda",
          jobTitle: "Rehab Tech",
          worksFor: {
            "@type": "MedicalClinic",
            name: "Genesis Integrative Medicine",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Person",
          name: "Angela Warmuth",
          jobTitle: "Weight Loss Consultant",
          worksFor: {
            "@type": "MedicalClinic",
            name: "Genesis Integrative Medicine",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Person",
          name: "Tori Sapienza Conroy",
          jobTitle: "Community Outreach & Marketing Director",
          worksFor: {
            "@type": "MedicalClinic",
            name: "Genesis Integrative Medicine",
          },
        },
      },
    ],
  },
];

const STAFF = [
  {
    name: "Kim Bukowski",
    title: "Front Desk Manager",
    image: {
      src: "/images/staff/kim-bukowski.jpg",
      alt: "Kim Bukowski, Front Desk Manager at Genesis Integrative Medicine",
      width: 2856,
      height: 3224,
    },
    bio: [
      "I\u2019ve been an active Cosmetologist for many years. I love interacting with people, getting to know them on a personal level & making them feel their very best.",
      "I\u2019m a family girl who appreciates the littlest things in life. I\u2019m a proud mom & grandma who enjoys spending any chance I get with my awesome family. Family is everything to me.",
      "Summer time is my happy time! Any chance I get I\u2019m outdoors. I enjoy spending time at the pool, boating, family gatherings & cookouts, riding quads, zip lining and hiking etc...",
      "What some people don\u2019t know about me is Im a risk taker and \u201CSkydiving\u201D is 1 thing on my bucket list.",
    ],
  },
  {
    name: "Oksana Samnadda",
    title: "Rehab Tech",
    image: {
      src: "/images/staff/oksana-samnadda.jpg",
      alt: "Oksana Samnadda, Rehab Tech at Genesis Integrative Medicine",
      width: 2038,
      height: 1740,
    },
    bio: [
      "Oksana has an extensive background in rehabilitative therapy, always having a passion for helping people achieve their goals and putting her patients first. She believes in movement, that people must move their bodies in order to stay healthy for as long as possible. She is also passionate about yoga and it\u2019s benefits, as being active is one of her biggest contributors to both her happiness and her health.",
    ],
  },
  {
    name: "Angela Warmuth",
    title: "Weight Loss Consultant",
    image: {
      src: "/images/staff/angela-warmuth.jpg",
      alt: "Angela Warmuth, Weight Loss Consultant at Genesis Integrative Medicine",
      width: 2416,
      height: 2440,
    },
    bio: [
      "Angela is our Lead Weight Loss Consultant with over 33 years of experience in the medical and weight loss field.",
      "She loves improving the overall health & well-being of all her clients through our customized weight loss programs",
      "Losing weight is very personal and each client is unique in their journey. She very much enjoys figuring out with each client the absolute best path for them to reach their goals.",
      "Angela enjoys spending her free time with her family & friends, boating, floating, anything on the water, Glamping LOL, and nature walks/hikes!",
    ],
  },
  {
    name: "Tori Sapienza Conroy",
    title: "Community Outreach & Marketing Director",
    image: {
      src: "/images/staff/tori-sapienza-conroy.png",
      alt: "Tori Sapienza Conroy, Community Outreach & Marketing Director at Genesis Integrative Medicine",
      width: 533,
      height: 640,
    },
    bio: [
      "Tori brings a background in nursing, pharmaceutical sales, and healthcare marketing to Genesis Integrative Medicine. She enjoys connecting with the community and helping patients feel welcomed and supported throughout their wellness journey.",
      "Outside of the office, Tori loves spending time with her husband and three boys, cheering them on from the sidelines at their sporting events, and hanging out with her mini Goldendoodle sidekick, Apollo.",
    ],
  },
] as const;

export default function MeetTheStaffPage() {
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
      <TeamPageView
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about-practice/" },
          { label: "Meet The Staff" },
        ]}
        kicker="Genesis Integrative Medicine"
        h1="Meet The Staff"
        sectionKicker="Our Team"
        sectionHeading="Meet Our Team"
        members={STAFF}
      />
    </>
  );
}
