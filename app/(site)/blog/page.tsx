import type { Metadata } from "next";

import BlogIndexView from "@/app/components/blog/BlogIndexView";
import { BLOG_INDEX_META } from "@/app/lib/blog-content";
import { getBlogListing, pageCountFor, paginateItems } from "@/app/lib/ranked/to-site";
import { SITE_ORIGIN } from "@/app/lib/site-config";

export const revalidate = 3600;

const CANONICAL = BLOG_INDEX_META.canonicalOrigin;

export const metadata: Metadata = {
  title: BLOG_INDEX_META.title,
  description: BLOG_INDEX_META.description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    title: BLOG_INDEX_META.title,
    description: BLOG_INDEX_META.description,
    url: CANONICAL,
    siteName: "Genesis Integrative Medicine",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: BLOG_INDEX_META.title,
    description: BLOG_INDEX_META.description,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["CollectionPage", "Blog"],
        "@id": CANONICAL,
        url: CANONICAL,
        name: BLOG_INDEX_META.title,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        description: BLOG_INDEX_META.description,
        breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Blog" },
        ],
      },
    ],
  },
];

export default async function BlogPage() {
  const listing = await getBlogListing();
  const totalPages = pageCountFor(listing.length);
  const posts = paginateItems(listing, 1);
  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
           
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <BlogIndexView posts={posts} currentPage={1} totalPages={totalPages} />
    </>
  );
}
