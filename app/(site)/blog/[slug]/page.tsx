import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

import BlogPostTemplate from "@/app/components/blog/BlogPostTemplate";
import { BLOG_POST_BODIES, BLOG_POST_SLUGS } from "@/app/lib/blog-post-bodies";
import { getBlogPost } from "@/app/lib/blog-post-content";
import type { BlogPostContent } from "@/app/lib/blog-post-content";
import { getPublishedBlogPost, getPublishedBlogSlugs } from "@/app/lib/ranked/posts";
import { rankedToBlogPostContent } from "@/app/lib/ranked/to-site";
import { SITE_ORIGIN } from "@/app/lib/site-config";
import { getCmsBlogPost, listPublishedCmsSlugs } from "@/lib/cms/blog-posts";

export const revalidate = 300;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Compiled articles keep their designed bodies. Payload posts that are not
 * already compiled resolve from the CMS at /blog/<document slug>/.
 */
const resolvePost = cache(async (slug: string): Promise<BlogPostContent | undefined> => {
  const local = getBlogPost(slug) ?? BLOG_POST_BODIES[slug];
  if (local) return local;
  const cms = await getCmsBlogPost(slug);
  if (cms) return cms;
  const ranked = await getPublishedBlogPost(slug);
  return ranked ? rankedToBlogPostContent(ranked) : undefined;
});

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const [ranked, cms] = await Promise.all([
    getPublishedBlogSlugs().catch(() => [] as string[]),
    listPublishedCmsSlugs().catch(() => [] as string[]),
  ]);
  const slugs = new Set<string>([...BLOG_POST_SLUGS, ...ranked, ...cms]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) return cmsMetadata(`/blog/${slug}`, {});
  return cmsMetadata(`/blog/${slug}`, {
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
  });
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
    <CMSRoute path={`/blog/${slug}`}>
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
  </CMSRoute>
  );
}
