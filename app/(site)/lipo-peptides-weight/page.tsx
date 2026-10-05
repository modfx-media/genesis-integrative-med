import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import type { ServicePageContent } from "@/app/lib/services-content";
import { SITE_ORIGIN } from "@/app/lib/site-config";

/**
 * /lipo-peptides-weight/, root-level route mirroring the live page at
 * https://genesisintegrativemed.com/lipo-peptides-weight/.
 *
 * All H2 sections, body copy, and the "Conditions Treated" sidebar are
 * preserved verbatim from the live page. Sidebar links have been remapped
 * from the live site's flat root-level slugs (e.g. /neck-pain) to our
 * canonical /conditions-treated/... URLs so internal navigation stays on
 * this rebuild.
 */

const CANONICAL = `${SITE_ORIGIN}/lipo-peptides-weight/`;

const TITLE = "Lipo Peptides for Weight Loss in Geneva | Genesis Integrative Medicine";
const DESCRIPTION =
  "Discover lipo peptides for weight loss in Geneva at Genesis Integrative Medicine. Enhance fat burning, boost metabolism, and preserve lean muscle with a holistic, personalized plan.";
const OG_IMAGE = "/images/services/medical-weight-loss-card.jpg";

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
    images: [OG_IMAGE],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/**
 * Conditions Treated links from the live page sidebar, remapped from the
 * live root-level slugs (/neck-pain) to our canonical
 * /conditions-treated/{slug}/ URLs.
 */
const CONDITIONS_SIDEBAR = [
  { label: "Neck Pain", href: "/conditions-treated/neck-pain/" },
  { label: "Back Pain", href: "/conditions-treated/back-pain/" },
  { label: "Headaches", href: "/conditions-treated/headaches/" },
  { label: "Joint Pain", href: "/conditions-treated/joint-pain/" },
  { label: "Shoulder Pain", href: "/conditions-treated/shoulder-pain/" },
  { label: "Foot Pain", href: "/conditions-treated/foot-pain/" },
  { label: "Sciatica", href: "/conditions-treated/sciatica/" },
  { label: "Herniated Disc", href: "/conditions-treated/herniated-disc/" },
  { label: "Neuropathy", href: "/conditions-treated/neuropathy/" },
  { label: "Tendonitis", href: "/conditions-treated/tendonitis/" },
  { label: "Bursitis", href: "/conditions-treated/bursitis/" },
  { label: "Allergies", href: "/conditions-treated/allergies/" },
  {
    label: "Erectile Dysfunction (ED)",
    href: "/conditions-treated/erectile-dysfunction-ed/",
  },
] as const;

const CONTENT: ServicePageContent = {
  slug: "lipo-peptides-weight",
  urlPath: "/lipo-peptides-weight/",
  meta: {
    title: TITLE,
    description: DESCRIPTION,
    canonicalOrigin: CANONICAL,
    ogImage: OG_IMAGE,
  },
  breadcrumbs: [
    { name: "Home", item: SITE_ORIGIN + "/" },
    { name: "Lipo Peptides for Weight Loss in Geneva" },
  ],
  hero: {
    kicker: "Medical Weight Loss",
    h1: "Lipo Peptides for Weight Loss in Geneva",
    intro:
      "Achieving and maintaining a healthy weight can be a challenging journey, especially with the many factors that contribute to weight gain, such as lifestyle, metabolism, hormonal imbalances, and stress. At Genesis Integrative Medicine, we understand that sustainable weight loss often requires more than just diet and exercise. That\u2019s why we offer innovative solutions such as lipo peptides for weight loss in Geneva to help you reach your goals. Our holistic approach combines advanced treatments with personalized care to support your body\u2019s natural fat-burning processes, making weight loss more effective and sustainable.",
  },
  featuredImage: {
    src: "/images/services/peptide-weight-loss.webp",
    alt: "Lipo peptides for weight loss at Genesis Integrative Medicine in Geneva, IL",
    width: 1200,
    height: 800,
  },
  highlights: [
    { icon: "bolt", label: "Enhanced fat burning", note: "Targets stubborn areas" },
    { icon: "spark", label: "Improved metabolism", note: "Energy over storage" },
    { icon: "shield", label: "Preserved muscle", note: "Lean mass maintained" },
    { icon: "heart", label: "Whole-person plan", note: "Beyond diet & exercise" },
  ],
  layout: "sidebar",
  sections: [
    {
      kind: "prose",
      heading: "What Are Lipo Peptides?",
      paragraphs: [
        "Lipo peptides are specially formulated compounds that work to enhance the body\u2019s ability to burn fat, boost metabolism, and improve overall energy levels. These peptides are designed to target stubborn fat areas, helping to reduce body fat while preserving lean muscle mass. By incorporating lipo peptides for weight loss in Geneva into your weight loss plan, you can benefit from a treatment that goes beyond traditional methods, addressing the underlying factors that make losing weight difficult.",
        "Lipo peptides contain a combination of amino acids, vitamins, and lipotropic agents that work synergistically to break down fat deposits, enhance liver function, and improve metabolic efficiency. This treatment is particularly beneficial for individuals who have struggled with weight loss due to metabolic resistance, hormonal imbalances, or difficulty sticking to restrictive diets.",
      ],
    },
    {
      kind: "prose",
      heading: "How Lipo Peptides Work",
      paragraphs: [
        "Lipo peptides work by stimulating the body\u2019s metabolism and supporting the breakdown of fat cells. The peptides promote lipolysis, the process by which fat is broken down and released into the bloodstream to be used as energy. This not only helps reduce overall body fat but also boosts energy levels, making it easier to stay active and motivated. By choosing lipo peptides for weight loss in Geneva, you\u2019re opting for a scientifically backed approach that helps your body burn fat more efficiently.",
        "In addition to aiding fat loss, lipo peptides can help improve muscle tone, enhance recovery after exercise, and support overall metabolic health. They work by regulating various metabolic pathways, ensuring that your body is functioning optimally to achieve your weight loss goals.",
      ],
    },
    {
      kind: "list",
      heading: "Benefits of Lipo Peptides for Weight Loss in Geneva",
      intro:
        "Using lipo peptides for weight loss in Geneva offers several benefits that can enhance your weight loss journey, making it more manageable and effective. Here are some of the key advantages:",
      items: [
        "Enhanced Fat Burning: Lipo peptides help accelerate the fat-burning process, targeting stubborn areas such as the abdomen, thighs, and hips that are often resistant to diet and exercise alone.",
        "Improved Metabolism: By boosting metabolic function, lipo peptides ensure that your body is efficiently converting food into energy rather than storing it as fat.",
        "Preserved Muscle Mass: Unlike many weight loss methods that lead to muscle loss, lipo peptides help preserve lean muscle, which is essential for maintaining a healthy metabolism and body composition.",
        "Increased Energy Levels: As your body burns fat more effectively, you may notice improved energy levels, making it easier to stay active and stick to your weight loss plan.",
        "Reduced Cravings and Appetite Control: Lipo peptides can help regulate appetite, making it easier to maintain healthy eating habits without feeling deprived.",
      ],
    },
    {
      kind: "prose",
      heading: "A Holistic Approach to Weight Loss",
      paragraphs: [
        "At Genesis Integrative Medicine, we believe that weight loss should be approached holistically, addressing not only the physical aspects but also the emotional and psychological factors that play a role in your journey. When you choose lipo peptides for weight loss in Geneva, you\u2019re opting for a comprehensive, integrative approach that supports your overall well-being.",
        "Our team of experts will work with you to create a personalized weight loss plan that incorporates lipo peptides along with other therapies, such as nutritional counseling, lifestyle coaching, and stress management techniques. By addressing the root causes of weight gain and creating a balanced plan, we aim to help you achieve lasting results.",
      ],
    },
    {
      kind: "prose",
      heading: "Personalized Care from Your Weight Loss Team",
      paragraphs: [
        "Every individual\u2019s weight loss journey is unique, and our approach at Genesis Integrative Medicine reflects that. Our experienced providers will take the time to understand your health history, lifestyle, and weight loss goals. By conducting thorough evaluations, including body composition analysis and metabolic testing, we can develop a customized plan that incorporates lipo peptides for weight loss in Geneva tailored specifically to your needs.",
        "We prioritize open communication and work collaboratively with you throughout your treatment, making adjustments as needed to ensure you are on track to reach your goals. Our goal is to empower you with the tools and support necessary to succeed in your weight loss journey, promoting not just a slimmer body but also improved health and confidence.",
      ],
    },
    {
      kind: "prose",
      heading: "Why Choose Genesis Integrative Medicine?",
      paragraphs: [
        "As your trusted provider of lipo peptides for weight loss in Geneva, Genesis Integrative Medicine offers a patient-centered approach that combines the latest in weight loss science with compassionate care. We understand that the weight loss process can be complex, and we are committed to providing the guidance and support you need to achieve your desired results.",
        "Choosing Genesis Integrative Medicine means having access to a range of innovative treatments that go beyond traditional weight loss methods. Our integrative approach ensures that you receive comprehensive care that addresses all aspects of your health, enhancing the effectiveness of your weight loss efforts while supporting long-term maintenance.",
      ],
    },
    {
      kind: "prose",
      heading: "What to Expect during Your Appointment",
      paragraphs: [
        "When you schedule an appointment for lipo peptides for weight loss in Geneva, you will begin with a consultation to discuss your weight loss history, challenges, and goals. Our team will perform a detailed assessment to determine the most appropriate course of treatment, ensuring that lipo peptides are integrated into a personalized plan that meets your needs.",
        "We will guide you through each step of the treatment, providing education on how lipo peptides work and what you can expect during the process. Our goal is to make your experience as comfortable and effective as possible, supporting you with regular check-ins and adjustments to your treatment plan as necessary.",
      ],
    },
    {
      kind: "prose",
      heading: "Start Your Weight Loss Journey Today",
      paragraphs: [
        "At Genesis Integrative Medicine, we believe in empowering our patients with the knowledge and resources they need to succeed. Let our team guide you through a personalized approach that incorporates lipo peptides for weight loss in Geneva, helping you achieve sustainable weight loss and enhanced overall wellness.",
      ],
    },
  ],
  relatedNav: {
    kicker: "Explore",
    heading: "Conditions Treated",
    items: CONDITIONS_SIDEBAR,
    footerLabel: "View all conditions",
    footerHref: "/conditions-treated/",
  },
  serviceJsonLd: {
    name: "Lipo Peptides for Weight Loss",
    description:
      "Lipo peptides for weight loss in Geneva at Genesis Integrative Medicine, a holistic, personalized program combining lipotropic peptide therapy with nutritional counseling and lifestyle coaching to support sustainable fat loss.",
    canonicalServiceUrl: CANONICAL,
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
        name: TITLE,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        description: DESCRIPTION,
        primaryImageOfPage: { "@id": `${CANONICAL}#primaryimage` },
        breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
        inLanguage: "en-US",
      },
      {
        "@type": "ImageObject",
        "@id": `${CANONICAL}#primaryimage`,
        url: OG_IMAGE,
        contentUrl: OG_IMAGE,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Lipo Peptides for Weight Loss in Geneva" },
        ],
      },
      {
        "@type": "MedicalTherapy",
        name: CONTENT.serviceJsonLd.name,
        description: CONTENT.serviceJsonLd.description,
        url: CANONICAL,
        provider: {
          "@type": "MedicalBusiness",
          name: "Genesis Integrative Medicine",
          url: SITE_ORIGIN,
        },
      },
    ],
  },
];

export default function LipoPeptidesWeightPage() {
  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
           
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <ServicePageTemplate content={CONTENT} />
    </>
  );
}
