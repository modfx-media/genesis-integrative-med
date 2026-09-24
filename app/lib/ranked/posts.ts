import { getLocalBlogPosts } from './local-posts'
import type { BlogPostData } from './types'

/** Ranked CMS integration is disabled site-wide; blog content is local-only. */
export async function getLiveRankedBlogPosts(): Promise<BlogPostData[]> {
  return []
}

export async function getPublishedBlogPost(slug: string): Promise<BlogPostData | undefined> {
  return getLocalBlogPosts().find((p) => p.slug === slug)
}

export async function getPublishedBlogPosts(): Promise<BlogPostData[]> {
  return getLocalBlogPosts()
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  return getLocalBlogPosts().map((p) => p.slug)
}
