import type { Metadata } from "next";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { JOINT_PAIN_CONTENT } from "@/app/lib/conditions-content";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";

export const metadata: Metadata = {
  title: JOINT_PAIN_CONTENT.meta.title,
  description: JOINT_PAIN_CONTENT.meta.description,
  alternates: { canonical: JOINT_PAIN_CONTENT.meta.canonicalOrigin },
  openGraph: {
    type: "article",
    title: JOINT_PAIN_CONTENT.meta.title,
    description: JOINT_PAIN_CONTENT.meta.description,
    url: JOINT_PAIN_CONTENT.meta.canonicalOrigin,
    siteName: "Genesis Integrative Medicine",
    images: [{ url: JOINT_PAIN_CONTENT.meta.ogImage }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: JOINT_PAIN_CONTENT.meta.title,
    description: JOINT_PAIN_CONTENT.meta.description,
    images: [JOINT_PAIN_CONTENT.meta.ogImage],
  },
};

export default function JointPainPage() {
  const blocks = buildServicePageJsonLd(JOINT_PAIN_CONTENT, {
    datePublished: "2022-07-21T00:00:00+00:00",
    dateModified: "2026-04-09T10:31:31+00:00",
    faqEnabled: false,
  });
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <ServicePageTemplate content={JOINT_PAIN_CONTENT} />
    </>
  );
}
