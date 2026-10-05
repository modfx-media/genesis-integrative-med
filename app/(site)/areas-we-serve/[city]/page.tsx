import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AreaCityHubView from "@/app/components/areas/AreaCityHubView";
import { buildAreaCityJsonLd } from "@/app/components/services/service-jsonld";
import {
  AREA_CITIES,
  areaCityUrlPath,
  getCity,
} from "@/app/lib/areas-we-serve-content";
import { SITE_ORIGIN } from "@/app/lib/site-config";

type PageProps = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams(): Promise<{ city: string }[]> {
  return AREA_CITIES.map((c) => ({ city: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return {};
  const canonical = `${SITE_ORIGIN}${areaCityUrlPath(city.slug)}`;
  const title = `${city.name}, IL Chiropractic & Integrative Medicine`;
  const description = `Genesis Integrative Medicine serves ${city.name}, ${city.county} County, IL patients (about ${city.distanceMiles} miles / ${city.driveMinutes} min from Geneva). See treatments available and book a visit.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: "Genesis Integrative Medicine",
      locale: "en_US",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function AreaCityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  const canonical = `${SITE_ORIGIN}${areaCityUrlPath(city.slug)}`;
  const blocks = buildAreaCityJsonLd({
    title: `${city.name}, IL Chiropractic & Integrative Medicine`,
    description: `Genesis Integrative Medicine serves ${city.name}, ${city.county} County, IL patients (about ${city.distanceMiles} miles / ${city.driveMinutes} min from Geneva).`,
    canonicalUrl: canonical,
    cityName: `${city.name}, IL`,
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
      <AreaCityHubView city={city} />
    </>
  );
}
