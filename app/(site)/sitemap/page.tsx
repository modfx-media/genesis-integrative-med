import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { BLOG_POSTS, postHref } from "@/app/lib/blog-content";
import {
  AREA_CITIES,
  AREA_TOPICS,
  areaCityUrlPath,
  areaComboUrlPath,
} from "@/app/lib/areas-we-serve-content";
import {
  ABOUT_SUBNAV,
  CONDITIONS_SUBNAV,
  SERVICES_SUBNAV,
} from "@/app/lib/site-config";

/** Plain internal-nav-only pages that don't already appear in a subnav list above. */
const MAIN_PAGES = [
  { label: "Home", href: "/" },
  { label: "Book Now", href: "/book-now/" },
  { label: "Forms", href: "/forms/" },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "Contact", href: "/contact/" },
  { label: "Blog", href: "/blog/" },
  { label: "Lipo Peptides & Medical Weight Loss", href: "/lipo-peptides-weight/" },
] as const;

const LEGAL_PAGES = [
  { label: "Privacy Policy", href: "/your-privacy/" },
  { label: "Terms & Conditions", href: "/our-terms/" },
  { label: "Accessibility Statement", href: "/accessibility-statement/" },
] as const;

function LinkList({ items }: { items: readonly { label: string; href: string }[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="text-sm text-brand-ink/75 transition-colors hover:text-brand-blue hover:underline"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SitemapSection({
  heading,
  count,
  children,
}: {
  heading: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-brand-line py-10 first:pt-0 last:border-0">
      <h2 className="text-xl font-bold tracking-tight text-brand-navy">
        {heading}{" "}
        <span className="text-sm font-semibold text-brand-ink/40">
          ({count})
        </span>
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "A full index of every page on the Genesis Integrative Medicine website, including every service, condition, and area we serve.",
  alternates: { canonical: "https://genesisintegrativemed.com/sitemap/" },
  // Navigational aid for users/crawlers, not meant to rank on its own.
  robots: { index: false, follow: true },
};

/**
 * /sitemap/ &mdash; a human-readable index of every page on the site,
 * including the full /areas-we-serve/ pSEO cluster grouped by city.
 */
export default function SitemapPage() {
  const totalAreaLinks =
    1 + AREA_CITIES.length + AREA_CITIES.length * AREA_TOPICS.length;

  return (
    <article className="bg-white">
      <nav
        aria-label="Breadcrumb"
        className="border-b border-brand-line bg-brand-mist/60"
      >
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-xs">
          <li>
            <Link
              href="/"
              className="font-semibold uppercase tracking-[0.12em] text-brand-ink/60 transition-colors hover:text-brand-blue"
            >
              Home
            </Link>
          </li>
          <li aria-hidden className="text-brand-ink/30">
            /
          </li>
          <li
            aria-current="page"
            className="font-semibold uppercase tracking-[0.12em] text-brand-navy"
          >
            Sitemap
          </li>
        </ol>
      </nav>

      <section className="mx-auto max-w-4xl px-6 py-14 text-center sm:py-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-brand-ink sm:text-5xl">
          Sitemap
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-ink/70">
          Every page on genesisintegrativemed.com, including every city we
          serve.
        </p>
      </section>

      <div className="mx-auto max-w-5xl px-6 pb-20 sm:pb-24">
        <SitemapSection heading="Main Pages" count={MAIN_PAGES.length}>
          <LinkList items={MAIN_PAGES} />
        </SitemapSection>

        <SitemapSection heading="About" count={ABOUT_SUBNAV.length}>
          <LinkList items={ABOUT_SUBNAV} />
        </SitemapSection>

        <SitemapSection
          heading="Services"
          count={SERVICES_SUBNAV.length + 1}
        >
          <LinkList items={[{ label: "All Services", href: "/services/" }, ...SERVICES_SUBNAV]} />
        </SitemapSection>

        <SitemapSection
          heading="Conditions Treated"
          count={CONDITIONS_SUBNAV.length + 1}
        >
          <LinkList
            items={[
              { label: "All Conditions Treated", href: "/conditions-treated/" },
              ...CONDITIONS_SUBNAV,
            ]}
          />
        </SitemapSection>

        <SitemapSection heading="Areas We Serve" count={totalAreaLinks}>
          <p className="mb-5 text-sm text-brand-ink/70">
            <Link
              href="/areas-we-serve/"
              className="font-semibold text-brand-blue hover:underline"
            >
              Areas We Serve overview
            </Link>{" "}
            &mdash; {AREA_CITIES.length} communities, each with a hub page and{" "}
            {AREA_TOPICS.length} treatment pages.
          </p>
          <div className="space-y-2">
            {AREA_CITIES.map((city) => (
              <details
                key={city.slug}
                className="group rounded-xl border border-brand-line px-4 py-3 open:bg-brand-mist/40"
              >
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-brand-navy">
                  <span>{city.name}, IL</span>
                  <span className="text-xs font-medium uppercase tracking-[0.08em] text-brand-ink/40 group-open:hidden">
                    show {AREA_TOPICS.length + 1} pages
                  </span>
                </summary>
                <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 border-t border-brand-line pt-3 sm:grid-cols-2 lg:grid-cols-3">
                  <li>
                    <Link
                      href={areaCityUrlPath(city.slug)}
                      className="text-sm font-semibold text-brand-blue hover:underline"
                    >
                      {city.name} overview
                    </Link>
                  </li>
                  {AREA_TOPICS.map((topic) => (
                    <li key={topic.slug}>
                      <Link
                        href={areaComboUrlPath(city.slug, topic.slug)}
                        className="text-sm text-brand-ink/75 transition-colors hover:text-brand-blue hover:underline"
                      >
                        {topic.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </SitemapSection>

        <SitemapSection heading="Blog Posts" count={BLOG_POSTS.length}>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <li key={post.slug}>
                <Link
                  href={postHref(post.slug)}
                  className="text-sm text-brand-ink/75 transition-colors hover:text-brand-blue hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </SitemapSection>

        <SitemapSection heading="Legal" count={LEGAL_PAGES.length}>
          <LinkList items={LEGAL_PAGES} />
        </SitemapSection>
      </div>
    </article>
  );
}
