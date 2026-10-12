import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogIndexView from "@/app/components/blog/BlogIndexView";
import { BLOG_INDEX_META } from "@/app/lib/blog-content";
import { getBlogListing, pageCountFor, paginateItems } from "@/app/lib/ranked/to-site";
import { SITE_ORIGIN } from "@/app/lib/site-config";

export const revalidate = 3600;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ page: string }>;
};

export async function generateStaticParams(): Promise<{ page: string }[]> {
  const listing = await getBlogListing().catch(() => []);
  const total = pageCountFor(listing.length);
  const params: { page: string }[] = [];
  for (let p = 2; p <= total; p += 1) {
    params.push({ page: String(p) });
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { page } = await params;
  const num = Number(page);
  const canonical = `${SITE_ORIGIN}/blog/page/${num}/`;
  const title = `${BLOG_INDEX_META.title}, Page ${num}`;
  return {
    title,
    description: BLOG_INDEX_META.description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      title,
      description: BLOG_INDEX_META.description,
      url: canonical,
      siteName: "Genesis Integrative Medicine",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: BLOG_INDEX_META.description,
    },
  };
}

export default async function BlogPageNumber({ params }: PageProps) {
  const { page } = await params;
  const num = Number(page);
  const listing = await getBlogListing();
  const total = pageCountFor(listing.length);
  if (!Number.isInteger(num) || num < 2 || num > total) {
    notFound();
  }
  const posts = paginateItems(listing, num);
  const canonical = `${SITE_ORIGIN}/blog/page/${num}/`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["CollectionPage", "Blog"],
          "@id": canonical,
          url: canonical,
          name: `${BLOG_INDEX_META.title}, Page ${num}`,
          isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
          description: BLOG_INDEX_META.description,
          breadcrumb: { "@id": `${canonical}#breadcrumb` },
          inLanguage: "en-US",
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonical}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_ORIGIN}/blog/` },
            { "@type": "ListItem", position: 3, name: `Page ${num}` },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
           
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <BlogIndexView posts={posts} currentPage={num} totalPages={total} />
    </>
  );
}
