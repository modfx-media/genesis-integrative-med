import type { Metadata } from "next";

import TeamPageView from "@/app/components/team/TeamPageView";
import { SITE_ORIGIN } from "@/app/lib/site-config";

const CANONICAL = "https://genesisintegrativemed.com/our-providers/";

export const metadata: Metadata = {
  title: "Learn About Our Integrative Health Team in Geneva, IL",
  description:
    "Meet the team at Genesis Integrative Medicine for health solutions in Geneva, IL. We combine modern tools with natural methods. Visit us for a consultation.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    title: "Learn About Our Integrative Health Team in Geneva, IL",
    description:
      "Meet the team at Genesis Integrative Medicine for health solutions in Geneva, IL. We combine modern tools with natural methods. Visit us for a consultation.",
    url: CANONICAL,
    siteName: "Genesis Integrative Medicine",
    images: [
      {
        url: "/images/providers/anthony-leazzo-new.jpg",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn About Our Integrative Health Team in Geneva, IL",
    description:
      "Meet the team at Genesis Integrative Medicine for health solutions in Geneva, IL. We combine modern tools with natural methods. Visit us for a consultation.",
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
        name: "Learn About Our Integrative Health Team in Geneva, IL",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        datePublished: "2022-07-21T00:00:00+00:00",
        dateModified: "2026-04-09T09:36:44+00:00",
        description:
          "Meet the team at Genesis Integrative Medicine for health solutions in Geneva, IL.",
        breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Our Providers" },
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
          name: "Nathan Conroy, DC",
          jobTitle: "Chiropractic & Physical Medicine",
          worksFor: { "@type": "MedicalClinic", name: "Genesis Integrative Medicine" },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Person",
          name: "Jeff Floyd, PA",
          jobTitle: "Physicians Assistant",
          worksFor: { "@type": "MedicalClinic", name: "Genesis Integrative Medicine" },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Person",
          name: "Dr. Anthony Leazzo, DO",
          jobTitle: "Clinic Director",
          worksFor: { "@type": "MedicalClinic", name: "Genesis Integrative Medicine" },
        },
      },
    ],
  },
];

const PROVIDERS = [
  {
    name: "Nathan Conroy, DC",
    title: "Chiropractic & Physical Medicine",
    image: {
      src: "/images/providers/nathan-conroy-zoom.jpg",
      alt: "Nathan Conroy, DC, Chiropractic & Physical Medicine at Genesis Integrative Medicine",
      width: 1358,
      height: 1698,
    },
    bio: [
      "Nathan Conroy, DC, is certain that a healthy spine is key to a long, happy life. At Genesis Integrative Medicine in Geneva, Illinois, Dr. Conroy, DC, offers a variety of services to improve his patients\u2019 physical and overall health without medications or surgery. Inspired by his grandfather, a medical doctor, he pursued his degree in chiropractic care because of the many benefits chiropractic adjustments offer to the body. He brings over 15 years of experience in chiropractic care to Genesis Integrative Medicine.",
      "A graduate of the University of Illinois at Urbana-Champaign, Dr. Conroy, DC, was impressed by a visit to a local chiropractic college and later enrolled in classes at the National University of Health Sciences in Lombard, Illinois. He noted that many of his classes were similar to those in medical school, with the biggest distinction being classes in chiropractic adjusting instead of pharmacy courses. He liked the idea that chiropractic care can boost health and prevent disease without drugs and chemicals.",
      "Dr. Conroy, DC, designs custom treatment plans to address a variety of conditions that cause pain or limit mobility, such as migraines, joint disease, and nerve compression. He often combines manual adjustments with cold laser therapy and physical therapy to help patients achieve optimum health.",
      "When he\u2019s not working with his patients, Dr. Conroy, DC, spends his time with his wife, Tori, and their three active sons. He also stays fit at the gym, riding area bike trails, sailing on Lake Michigan, and getting weekly preventive chiropractic adjustments. Dr. Conroy, DC, loves cooking, preferring recipes that call for fresh organic meats and vegetables.",
    ],
  },
  {
    name: "Jeff Floyd, PA",
    title: "Physicians Assistant",
    image: {
      src: "/images/providers/jeff-floyd.jpg",
      alt: "Jeff Floyd, PA, Physicians Assistant at Genesis Integrative Medicine",
      width: 800,
      height: 1000,
    },
    bio: [
      "I am here to help you stay healthy! I truly believe integrating individualized wellness recommendations with alternative medical services will help you reach your highest potential! Whether it be pain relief, regenerative medicine, increasing mobility, restoring proper nervous system function, allergy testing, or weight loss; I am inspired to help you reach your goals here at Genesis!",
      "Jeff is a Certified Physicians Assistant who has been practicing for the past 14 years with an emphasis on Orthopedics. He is excited to explore what opportunities for treatment are available to you.",
      "When he is not working, Jeff enjoys time with his family, skiing, traveling, and good food!",
    ],
  },
  {
    name: "Dr. Anthony Leazzo, DO",
    title: "Clinic Director",
    image: {
      src: "/images/providers/anthony-leazzo-new.jpg",
      alt: "Dr. Anthony Leazzo, DO, Clinic Director at Genesis Integrative Medicine",
      width: 978,
      height: 1222,
    },
    bio: [
      "As Clinic Director and a Doctor of Osteopathic Medicine, Dr. Anthony Leazzo, DO, leads the medical team at Genesis Integrative Medicine with a simple philosophy: rather than treat every ill with a pill, consider the benefits of an integrative approach to achieving a happy, pain-free life.",
      "Dr. Leazzo oversees the clinic\u2019s approach to regenerative medicine, chiropractic care, and rehabilitation, working closely with the rest of the care team to make sure every treatment plan addresses the root cause of a patient\u2019s pain, not just its symptoms.",
      "He is committed to staying at the forefront of integrative and osteopathic medicine so that patients in Geneva have access to the most effective, least invasive treatment options available.",
    ],
  },
] as const;

export default function OurProvidersPage() {
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
          { label: "Our Providers" },
        ]}
        kicker="experience The difference"
        h1="Our Providers"
        sectionKicker="Qualified Professionals"
        sectionHeading="Qualified Professionals"
        intro="Our mission is to help people take charge of their health by understanding their problems and making the necessary changes to achieve optimal health. We pride ourselves on staying up to date with the latest guidelines in pain management in an effort to increase function and decrease pain while avoiding surgery."
        members={PROVIDERS}
      />
    </>
  );
}
