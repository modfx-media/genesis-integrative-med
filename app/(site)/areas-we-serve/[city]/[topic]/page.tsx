import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServicePageTemplate from "@/app/components/services/ServicePageTemplate";
import { buildServicePageJsonLd } from "@/app/components/services/service-jsonld";
import {
  AREA_CITIES,
  AREA_TOPICS,
  buildAreaComboContent,
  getCity,
  getTopic,
} from "@/app/lib/areas-we-serve-content";

type PageProps = {
  params: Promise<{ city: string; topic: string }>;
};

export async function generateStaticParams(): Promise<
  { city: string; topic: string }[]
> {
  const params: { city: string; topic: string }[] = [];
  for (const city of AREA_CITIES) {
    for (const topic of AREA_TOPICS) {
      params.push({ city: city.slug, topic: topic.slug });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city: citySlug, topic: topicSlug } = await params;
  const city = getCity(citySlug);
  const topic = getTopic(topicSlug);
  if (!city || !topic) return {};
  const content = buildAreaComboContent(city, topic);
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: { canonical: content.meta.canonicalOrigin },
    openGraph: {
      type: "article",
      title: content.meta.title,
      description: content.meta.description,
      url: content.meta.canonicalOrigin,
      siteName: "Genesis Integrative Medicine",
      images: [{ url: content.meta.ogImage }],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: [content.meta.ogImage],
    },
  };
}

export default async function AreaComboPage({ params }: PageProps) {
  const { city: citySlug, topic: topicSlug } = await params;
  const city = getCity(citySlug);
  const topic = getTopic(topicSlug);
  if (!city || !topic) notFound();

  const content = buildAreaComboContent(city, topic);
  const blocks = buildServicePageJsonLd(content, {
    faqEnabled: true,
    areaServedCity: city.name,
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
      <ServicePageTemplate content={content} />
    </>
  );
}
