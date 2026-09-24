import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostTemplate from "@/app/components/blog/BlogPostTemplate";
import { BLOG_POST_BODIES, BLOG_POST_SLUGS } from "@/app/lib/blog-post-bodies";
import { getBlogPost } from "@/app/lib/blog-post-content";
import type { BlogPostContent } from "@/app/lib/blog-post-content";
import { getPublishedBlogPost, getPublishedBlogSlugs } from "@/app/lib/ranked/posts";
import { rankedToBlogPostContent } from "@/app/lib/ranked/to-site";
import { SITE_ORIGIN } from "@/app/lib/site-config";

export const revalidate = 3600;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Ranked CMS integration is disabled; this always resolves from local content.
 */
async function resolvePost(slug: string): Promise<BlogPostContent | undefined> {
  const local = getBlogPost(slug) ?? BLOG_POST_BODIES[slug];
  if (local) return local;
  const ranked = await getPublishedBlogPost(slug);
  return ranked ? rankedToBlogPostContent(ranked) : undefined;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const ranked = await getPublishedBlogSlugs().catch(() => []);
  const slugs = new Set<string>([...BLOG_POST_SLUGS, ...ranked]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: post.meta.canonical },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      url: post.meta.canonical,
      siteName: "Genesis Integrative Medicine",
      locale: "en_US",
      publishedTime: `${post.date}T17:00:03+00:00`,
      modifiedTime: post.modifiedDate
        ? `${post.modifiedDate}T17:00:03+00:00`
        : `${post.date}T17:00:03+00:00`,
      section: post.category,
      images: post.meta.ogImage ? [{ url: post.meta.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
      images: post.meta.ogImage ? [post.meta.ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) notFound();

  const canonical = post.meta.canonical;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": canonical,
          url: canonical,
          mainEntityOfPage: { "@id": canonical },
          isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
          headline: post.title,
          description: post.meta.description,
          articleSection: post.category,
          datePublished: `${post.date}T17:00:03+00:00`,
          dateModified: post.modifiedDate
            ? `${post.modifiedDate}T17:00:03+00:00`
            : `${post.date}T17:00:03+00:00`,
          inLanguage: "en-US",
          image: post.meta.ogImage ? [post.meta.ogImage] : undefined,
          author: {
            "@type": "Organization",
            "@id": `${SITE_ORIGIN}/#organization`,
            name: "Genesis Integrative Medicine",
            url: SITE_ORIGIN,
          },
          publisher: {
            "@type": "Organization",
            "@id": `${SITE_ORIGIN}/#organization`,
            name: "Genesis Integrative Medicine",
            url: SITE_ORIGIN,
          },
          breadcrumb: { "@id": `${canonical}#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonical}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_ORIGIN}/blog/` },
            { "@type": "ListItem", position: 3, name: post.title },
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
      <BlogPostTemplate post={post} />
    </>
  );
}
