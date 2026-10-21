"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef, useState } from "react";

import BookNowTrigger from "@/app/components/booking/BookNowTrigger";
import {
  InsuranceLogos,
  MagneticButton,
  Reveal,
} from "@/app/components/home/motion-primitives";
import { CONTACT } from "@/app/lib/site-config";
import { CONSULTATION_CTA, INSURANCE_MISSION } from "@/app/lib/services-content";
import {
  formatPostDate,
  isRemoteImage,
  pageHref,
  postHref,
  type BlogPost,
} from "@/app/lib/blog-content";

const EASE = [0.16, 1, 0.3, 1] as const;

type BlogIndexViewProps = {
  posts: readonly BlogPost[];
  /** Full listing used by the category filter. Defaults to the current page. */
  catalog?: readonly BlogPost[];
  currentPage: number;
  totalPages: number;
};

export default function BlogIndexView({
  posts,
  catalog,
  currentPage,
  totalPages,
}: BlogIndexViewProps) {
  const source = catalog ?? posts;
  const categories = useMemo(() => {
    const names = new Set<string>();
    for (const post of source) {
      if (post.category) names.add(post.category);
    }
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, [source]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? source.filter((post) => post.category === activeCategory)
    : posts;

  return (
    <article className="bg-white">
      <BreadcrumbBar currentPage={currentPage} />
      <Hero />
      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />
      <PostsSection
        posts={filteredPosts}
        catalog={source}
        currentPage={currentPage}
        totalPages={totalPages}
        showFeatured={currentPage === 1 && !activeCategory}
        activeCategory={activeCategory}
      />
      {!activeCategory && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
      <ConsultationCta />
      <MissionBlock />
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Category filter                                                             */
/* -------------------------------------------------------------------------- */

function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: readonly string[];
  active: string | null;
  onChange: (category: string | null) => void;
}) {
  return (
    <section className="border-b border-brand-line bg-white py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <FilterChip active={active === null} onClick={() => onChange(null)}>
            All Topics
          </FilterChip>
          {categories.map((category) => (
            <FilterChip
              key={category}
              active={active === category}
              onClick={() => onChange(active === category ? null : category)}
            >
              {category}
            </FilterChip>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-all ${
        active
          ? "border-transparent bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/25"
          : "border-brand-line bg-white text-brand-ink/70 hover:-translate-y-0.5 hover:border-brand-blue/40 hover:text-brand-blue hover:shadow-sm"
      }`}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Breadcrumb                                                                  */
/* -------------------------------------------------------------------------- */

function BreadcrumbBar({ currentPage }: { currentPage: number }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-brand-line bg-brand-mist/60">
      <ol className=" mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-xs">
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
        {currentPage > 1 ? (
          <>
            <li>
              <Link
                href="/blog/"
                className="font-semibold uppercase tracking-[0.12em] text-brand-ink/60 transition-colors hover:text-brand-blue"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden className="text-brand-ink/30">
              /
            </li>
            <li
              aria-current="page"
              className="font-semibold uppercase tracking-[0.12em] text-brand-navy"
            >
              Page {currentPage}
            </li>
          </>
        ) : (
          <li
            aria-current="page"
            className="font-semibold uppercase tracking-[0.12em] text-brand-navy"
          >
            Blog
          </li>
        )}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-brand-mist/30 to-white"
    >
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: blobY }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-sky/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 h-[380px] w-[520px] rounded-full bg-brand-cyan/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: dotY }}
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #00508C 1px, transparent 0)",
            backgroundSize: "34px 34px",
          }}
        />
      </motion.div>

      {/* Floating decor shapes */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[12%] top-[22%] h-6 w-6 rounded-lg bg-brand-cyan/60"
            animate={{ y: [0, -14, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: EASE }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[10%] top-[38%] h-8 w-8 rounded-full border-2 border-brand-blue/50"
            animate={{ y: [0, 12, 0], rotate: [0, -30, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: EASE, delay: 0.6 }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
            Insights &amp; Education
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-brand-ink sm:text-6xl lg:text-[5rem]">
            <span className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-ink/70 sm:text-lg">
            Articles on chiropractic care, regenerative medicine, weight loss,
            neuropathy, sciatica and more, written for patients in
            Geneva, IL and the surrounding Fox Valley communities.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Posts grid                                                                  */
/* -------------------------------------------------------------------------- */

function PostsSection({
  posts,
  catalog,
  currentPage,
  totalPages,
  showFeatured,
  activeCategory,
}: {
  posts: readonly BlogPost[];
  catalog: readonly BlogPost[];
  currentPage: number;
  totalPages: number;
  showFeatured: boolean;
  activeCategory: string | null;
}) {
  if (posts.length === 0) {
    return (
      <EmptyState currentPage={currentPage} activeCategory={activeCategory} />
    );
  }
  const [featured, ...rest] = posts;
  const gridPosts = showFeatured ? rest : posts;
  // Fill a trailing partial row (grid is 3-wide on desktop) so the last
  // row never ends with a lone card next to empty space. Prefer borrowing
  // real upcoming posts from the next page over a placeholder CTA tile.
  const gapFillers = (3 - (gridPosts.length % 3)) % 3;
  const usedSlugs = new Set(posts.map((post) => post.slug));
  const upcomingPosts =
    gapFillers > 0 && !activeCategory
      ? catalog.filter((post) => !usedSlugs.has(post.slug)).slice(0, gapFillers)
      : [];
  const remainingFillers = activeCategory ? 0 : gapFillers - upcomingPosts.length;
  const nextPageHref =
    !activeCategory && currentPage < totalPages ? pageHref(currentPage + 1) : "/blog/";
  return (
    <section className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {activeCategory && (
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.14em] text-brand-ink/60">
            {posts.length} {posts.length === 1 ? "article" : "articles"} in{" "}
            <span className="text-brand-blue">{activeCategory}</span>
          </p>
        )}
        {featured && showFeatured && <FeaturedCard post={featured} />}
        <div
          key={activeCategory ?? "all"}
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {gridPosts.map((post, i) => (
            <div
              key={post.slug}
              className="blog-card-reveal"
              style={{ "--reveal-delay": `${Math.min(i, 8) * 60}ms` } as React.CSSProperties}
            >
              <PostCard post={post} />
            </div>
          ))}
          {upcomingPosts.map((post, i) => (
            <div
              key={post.slug}
              className="blog-card-reveal"
              style={{
                "--reveal-delay": `${Math.min(gridPosts.length + i, 8) * 60}ms`,
              } as React.CSSProperties}
            >
              <PostCard post={post} />
            </div>
          ))}
          {remainingFillers > 0 && (
            <div
              className="blog-card-reveal"
              style={{
                "--reveal-delay": `${Math.min(gridPosts.length + upcomingPosts.length, 8) * 60}ms`,
              } as React.CSSProperties}
            >
              <BrowseMoreCard href={nextPageHref} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function BrowseMoreCard({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="group relative flex h-full min-h-[280px] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-brand-blue/30 bg-brand-mist/40 p-6 text-center transition-all hover:-translate-y-1 hover:border-brand-blue/50 hover:bg-brand-mist/70"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm transition-colors group-hover:bg-brand-blue group-hover:text-white">
        <ArrowRight className="h-5 w-5" />
      </span>
      <span className="text-sm font-bold uppercase tracking-[0.12em] text-brand-navy">
        Browse more articles
      </span>
    </Link>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const reduce = useReducedMotion();
  return (
    <Reveal>
      <Link
        href={postHref(post.slug)}
        className="group relative block overflow-hidden rounded-[2rem] border border-brand-line bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan p-1 shadow-xl shadow-brand-navy/10 transition-shadow hover:shadow-2xl hover:shadow-brand-blue/25"
      >
        <div className="relative overflow-hidden rounded-[calc(2rem-4px)] bg-brand-ink p-8 text-white sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-brand-cyan/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-brand-blue/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #64B4DC 1px, transparent 0)",
              backgroundSize: "34px 34px",
            }}
          />
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 1.2, ease: EASE }}
              style={{
                background:
                  "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
              }}
            />
          )}
          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-sky backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                  Latest
                </span>
                {post.category && (
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                    {post.category}
                  </span>
                )}
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                  {formatPostDate(post.date)}
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
                {post.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                {post.excerpt}
              </p>
              <p className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-cyan transition-transform group-hover:translate-x-1">
                Read the article
                <ArrowRight className="h-3.5 w-3.5" />
              </p>
            </div>
            <div className="hidden lg:col-span-4 lg:block">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-blue/40 via-brand-navy/60 to-brand-cyan/30">
                {post.image ? (
                  <>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      priority
                      unoptimized={isRemoteImage(post.image)}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-tr from-brand-ink/40 via-transparent to-brand-cyan/10"
                    />
                  </>
                ) : (
                  <>
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 30% 30%, rgba(100,180,220,0.55), transparent 55%), radial-gradient(circle at 70% 70%, rgba(0,80,140,0.55), transparent 55%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FeaturedGlyph />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={postHref(post.slug)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-line bg-white transition-all hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/10"
    >
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-mist via-white to-brand-mist">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            unoptimized={isRemoteImage(post.image)}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <PlaceholderMedia category={post.category} />
        )}
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          {post.category && (
            <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-blue shadow-sm backdrop-blur">
              {post.category}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ink/50">
          {formatPostDate(post.date)}
        </p>
        <h3 className="mt-3 text-lg font-bold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue sm:text-xl">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-brand-ink/70">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-brand-line pt-4">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue">
            Read more
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-mist text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PlaceholderMedia({ category }: { category?: string }) {
  return (
    <div className="relative h-full w-full">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 30%, rgba(100,180,220,0.35), transparent 55%), radial-gradient(circle at 75% 70%, rgba(0,80,140,0.28), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #00508C 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/85 text-brand-blue shadow-lg backdrop-blur">
            <QuillIcon className="h-6 w-6" />
          </span>
          {category && (
            <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-navy shadow-sm">
              {category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  currentPage,
  activeCategory,
}: {
  currentPage: number;
  activeCategory: string | null;
}) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            {activeCategory ? "No matches" : "Coming soon"}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-navy sm:text-4xl">
            {activeCategory
              ? `No posts in ${activeCategory} yet`
              : `No posts on page ${currentPage} yet`}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-brand-ink/70">
            More articles are being added regularly. In the meantime, browse the
            latest posts from the start of the blog.
          </p>
          <div className="mt-8">
            <MagneticButton>
              <Link
                href="/blog/"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/30 transition-shadow hover:shadow-xl hover:shadow-brand-blue/50"
              >
                Back to Blog
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Pagination                                                                  */
/* -------------------------------------------------------------------------- */

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav
      aria-label="Blog pagination"
      className="border-y border-brand-line bg-brand-mist/40 py-10"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-6">
        <PageLink
          href={prev ? pageHref(prev) : undefined}
          label="Previous"
          disabled={!prev}
          arrow="left"
        />

        <ul className="flex flex-wrap items-center gap-2">
          {pages.map((p) => {
            const active = p === currentPage;
            return (
              <li key={p}>
                {active ? (
                  <span
                    aria-current="page"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-sm font-bold text-white shadow-lg shadow-brand-blue/30"
                  >
                    {p}
                  </span>
                ) : (
                  <Link
                    href={pageHref(p)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-sm font-bold text-brand-navy transition-all hover:-translate-y-0.5 hover:border-brand-blue/40 hover:text-brand-blue hover:shadow-md"
                  >
                    {p}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <PageLink
          href={next ? pageHref(next) : undefined}
          label="Next"
          disabled={!next}
          arrow="right"
        />
      </div>
    </nav>
  );
}

function PageLink({
  href,
  label,
  disabled,
  arrow,
}: {
  href: string | undefined;
  label: string;
  disabled: boolean;
  arrow: "left" | "right";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-all";
  if (disabled || !href) {
    return (
      <span
        aria-disabled
        className={`${base} cursor-not-allowed border-brand-line bg-white/40 text-brand-ink/30`}
      >
        {arrow === "left" && <ArrowRight className="h-3 w-3 rotate-180" />}
        {label}
        {arrow === "right" && <ArrowRight className="h-3 w-3" />}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className={`${base} border-brand-line bg-white text-brand-navy hover:-translate-y-0.5 hover:border-brand-blue/40 hover:text-brand-blue hover:shadow-md`}
    >
      {arrow === "left" && <ArrowRight className="h-3 w-3 rotate-180" />}
      {label}
      {arrow === "right" && <ArrowRight className="h-3 w-3" />}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Consultation CTA + Mission (shared pattern)                                 */
/* -------------------------------------------------------------------------- */

function ConsultationCta() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-line bg-brand-ink p-10 text-white shadow-2xl shadow-brand-navy/30 sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-brand-cyan/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-brand-blue/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, #64B4DC 1px, transparent 0)",
                backgroundSize: "34px 34px",
              }}
            />
            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-sky">
                  Ready when you are
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {CONSULTATION_CTA.heading}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                  {CONSULTATION_CTA.paragraph}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
                <MagneticButton>
                  <BookNowTrigger className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/30 transition-shadow hover:shadow-xl hover:shadow-brand-blue/50">
                    Book Appointment
                  </BookNowTrigger>
                </MagneticButton>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-brand-cyan/40 hover:bg-white/[0.08]"
                >
                  Call {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MissionBlock() {
  return (
    <section className="border-t border-brand-line bg-brand-mist/50 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            Our mission
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            {INSURANCE_MISSION.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-ink/75 sm:text-base">
            {INSURANCE_MISSION.paragraph}
          </p>
          <InsuranceLogos />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                       */
/* -------------------------------------------------------------------------- */

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.5 10h11m0 0-4.5-4.5M15.5 10 11 14.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuillIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M20 4c-6 0-11 4-13 10l-3 6 6-3c6-2 10-7 10-13Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m9 15 6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FeaturedGlyph() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      {!reduce && (
        <>
          <motion.span
            aria-hidden
            className="absolute h-full w-full rounded-full border-2 border-white/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            aria-hidden
            className="absolute h-3/4 w-3/4 rounded-full border border-brand-cyan/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}
      <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/95 text-brand-blue shadow-xl">
        <QuillIcon className="h-8 w-8" />
      </span>
    </div>
  );
}
