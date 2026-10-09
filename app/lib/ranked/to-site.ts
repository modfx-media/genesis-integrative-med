import { SITE_ORIGIN } from './config'
import { getPublishedBlogPosts } from './posts'
import type { BlogPostData } from './types'
import { isRemoteImage, POSTS_PER_PAGE, type BlogPost } from '@/app/lib/blog-content'
import type { BlogPostContent } from '@/app/lib/blog-post-content'

function categoryFromTitle(title: string): string {
  const t = title.toLowerCase()
  if (t.includes('prp')) return 'PRP'
  if (t.includes('shockwave')) return 'Shockwave Therapy'
  if (t.includes('cold laser') || t.includes('laser')) return 'Cold Laser'
  if (t.includes('neuropath')) return 'Neuropathy'
  if (t.includes('sciatica')) return 'Sciatica'
  if (t.includes('chiropractic') || t.includes('spine')) return 'Chiropractic'
  if (t.includes('weight') || t.includes('peptide') || t.includes('lipo')) return 'Weight Loss'
  if (t.includes('knee')) return 'Knee Pain'
  if (t.includes('shoulder')) return 'Shoulder Pain'
  if (t.includes('heel') || t.includes('plantar') || t.includes('foot')) return 'Foot Pain'
  if (t.includes('arthritis')) return 'Arthritis'
  if (t.includes('joint')) return 'Joint Pain'
  if (t.includes('back')) return 'Back Pain'
  if (t.includes('neck')) return 'Neck Pain'
  if (t.includes('regenerative') || t.includes('stem cell')) return 'Regenerative Medicine'
  return 'Wellness'
}

function readTimeFromPost(post: BlogPostData): string {
  const words = [post.intro, ...post.sections.flatMap((s) => s.body)].join(' ').split(/\s+/).filter(Boolean)
    .length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

export function rankedToBlogPost(post: BlogPostData): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    date: post.publishDate,
    excerpt: post.intro,
    image: post.coverImage,
    category: categoryFromTitle(post.title),
  }
}

export function rankedToBlogPostContent(post: BlogPostData): BlogPostContent {
  const canonical = `${SITE_ORIGIN}/blog/${post.slug}/`
  const ogImage = isRemoteImage(post.coverImage)
    ? post.coverImage
    : `${SITE_ORIGIN}${post.coverImage}`

  return {
    slug: post.slug,
    title: post.h1 || post.title,
    dek: post.intro,
    date: post.publishDate,
    category: categoryFromTitle(post.title),
    readTime: readTimeFromPost(post),
    image: {
      src: post.coverImage,
      alt: post.coverAlt || post.title,
    },
    sections: post.sections.map((section) => ({
      heading: section.heading,
      blocks: section.body.map((text) => ({ kind: 'paragraph' as const, text })),
    })),
    cta: {
      kicker: 'Ready when you are',
      heading: 'Talk with our Geneva team',
      body: 'If this article speaks to what you are feeling, we can help you sort out the next step.',
      primary: { label: post.cta.label, href: post.cta.href },
    },
    meta: {
      title: post.title,
      description: post.metaDescription,
      canonical,
      ogImage,
    },
  }
}

export function pageCountFor(itemCount: number): number {
  return Math.max(1, Math.ceil(itemCount / POSTS_PER_PAGE))
}

export function paginateItems<T>(items: readonly T[], page: number): readonly T[] {
  const start = (page - 1) * POSTS_PER_PAGE
  return items.slice(start, start + POSTS_PER_PAGE)
}

export async function getBlogListing(): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts()
  return [...posts]
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate) || a.slug.localeCompare(b.slug))
    .map(rankedToBlogPost)
}
