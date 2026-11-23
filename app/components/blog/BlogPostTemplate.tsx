"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { usePrefersReducedMotion as useReducedMotion } from "@/app/lib/use-prefers-reduced-motion";
import { useMemo, useRef } from "react";

import BookNowTrigger from "@/app/components/booking/BookNowTrigger";
import {
  InsuranceLogos,
  MagneticButton,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/app/components/home/motion-primitives";
import { CONTACT, SITE_ORIGIN } from "@/app/lib/site-config";
import { INSURANCE_MISSION } from "@/app/lib/services-content";
import {
  BLOG_POSTS,
  formatPostDate,
  isRemoteImage,
  postHref,
  type BlogPost,
} from "@/app/lib/blog-content";
import {
  sectionAnchor,
  type BlogPostContent,
  type PostBlock,
  type PostSection,
} from "@/app/lib/blog-post-content";

const EASE = [0.16, 1, 0.3, 1] as const;

type BlogPostTemplateProps = {
  post: BlogPostContent;
};

export default function BlogPostTemplate({ post }: BlogPostTemplateProps) {
  const related = useMemo(() => pickRelated(post, 3), [post]);

  return (
    <article className="bg-white">
      <ReadingProgressBar />
      <BreadcrumbBar title={post.title} />
      <Hero post={post} />
      <BodyLayout post={post} />
      {post.cta && <InlineCta cta={post.cta} />}
      <AuthorCard />
      <PostNav post={post} />
      {related.length > 0 && <RelatedPosts posts={related} />}
      <MissionBlock />
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Reading progress                                                            */
/* -------------------------------------------------------------------------- */

function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-40 h-[3px] origin-left bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-sky"
      style={{ scaleX: width }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Breadcrumb                                                                  */
/* -------------------------------------------------------------------------- */

function BreadcrumbBar({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-brand-line bg-brand-mist/60">
      <ol className="mx-auto flex max-w-7xl items-center gap-2 overflow-hidden px-6 py-3 text-xs">
        <li className="shrink-0">
          <Link
            href="/"
            className="font-semibold uppercase tracking-[0.12em] text-brand-ink/60 transition-colors hover:text-brand-blue"
          >
            Home
          </Link>
        </li>
        <li aria-hidden className="shrink-0 text-brand-ink/30">
          /
        </li>
        <li className="shrink-0">
          <Link
            href="/blog/"
            className="font-semibold uppercase tracking-[0.12em] text-brand-ink/60 transition-colors hover:text-brand-blue"
          >
            Blog
          </Link>
        </li>
        <li aria-hidden className="shrink-0 text-brand-ink/30">
          /
        </li>
        <li
          aria-current="page"
          className="truncate font-semibold uppercase tracking-[0.12em] text-brand-navy"
          title={title}
        >
          {title}
        </li>
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

function Hero({ post }: { post: BlogPostContent }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "6%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

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

      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[8%] top-[26%] h-6 w-6 rounded-md bg-brand-cyan/60"
            animate={{ y: [0, -14, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: EASE }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[10%] top-[40%] h-8 w-8 rounded-full border-2 border-brand-blue/45"
            animate={{ y: [0, 12, 0], rotate: [0, -30, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: EASE, delay: 0.6 }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-5xl px-6 pb-10 pt-20 text-center sm:pb-16 sm:pt-28">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue backdrop-blur transition-colors hover:border-brand-blue/30 hover:text-brand-navy"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
              Blog
            </Link>
            <span
              className="inline-flex items-center rounded-full border border-brand-blue/20 bg-gradient-to-r from-brand-blue/10 to-brand-cyan/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue"
            >
              {post.category}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-[3.75rem]">
            <span className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan bg-clip-text text-transparent">
              {post.title}
            </span>
          </h1>
        </Reveal>
        {post.dek && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-brand-ink/70 sm:text-lg">
              {post.dek}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.15}>
          <MetaStrip post={post} />
        </Reveal>
      </div>

      {/* Cover image */}
      <div className="relative mx-auto max-w-6xl px-6 pb-16 sm:pb-24">
        <Reveal delay={0.2}>
          <figure className="group relative overflow-hidden rounded-[2rem] border border-brand-line bg-brand-ink shadow-2xl shadow-brand-navy/15">
            <motion.div
              className="relative aspect-[16/9] w-full"
              style={reduce ? undefined : { y: imgY, scale: imgScale }}
            >
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                priority
                unoptimized={isRemoteImage(post.image.src)}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 sm:p-7">
              <span className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                Genesis Integrative Medicine
              </span>
              {post.image.credit && (
                <span className="pointer-events-auto text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
                  {post.image.credit}
                </span>
              )}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function MetaStrip({ post }: { post: BlogPostContent }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-brand-ink/70">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-blue text-[11px] font-extrabold uppercase tracking-wide text-white shadow-md shadow-brand-navy/20"
        >
          GIM
        </span>
        <div className="text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-ink/50">
            Written by
          </p>
          <p className="text-sm font-bold text-brand-navy">
            Genesis Integrative Medicine
          </p>
        </div>
      </div>
      <span aria-hidden className="h-4 w-px bg-brand-line" />
      <div className="flex items-center gap-2">
        <CalendarIcon aria-hidden className="h-4 w-4 text-brand-blue" />
        <time dateTime={post.date} className="font-semibold text-brand-ink/80">
          {formatPostDate(post.date)}
        </time>
      </div>
      <span aria-hidden className="hidden h-4 w-px bg-brand-line sm:block" />
      <div className="flex items-center gap-2">
        <ClockIcon aria-hidden className="h-4 w-4 text-brand-blue" />
        <span className="font-semibold text-brand-ink/80">{post.readTime}</span>
      </div>
      <span aria-hidden className="hidden h-4 w-px bg-brand-line sm:block" />
      <ShareInline title={post.title} slug={post.slug} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Body                                                                        */
/* -------------------------------------------------------------------------- */

function BodyLayout({ post }: { post: BlogPostContent }) {
  return (
    <section className="relative bg-white pb-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        {/* Sticky sidebar */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24 space-y-8">
            <TocPanel sections={post.sections} />
            <ShareCard title={post.title} slug={post.slug} />
          </div>
        </aside>

        {/* Article */}
        <div className="lg:col-span-9">
          <ArticleBody sections={post.sections} />
        </div>
      </div>
    </section>
  );
}

function TocPanel({ sections }: { sections: readonly PostSection[] }) {
  return (
    <nav aria-label="On this page">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
        <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
        On this page
      </p>
      <ol className="mt-4 space-y-2 border-l border-brand-line pl-4 text-sm">
        {sections.map((s, i) => (
          <li key={s.heading}>
            <a
              href={`#${sectionAnchor(s.heading)}`}
              className="group flex items-start gap-2 text-brand-ink/70 transition-colors hover:text-brand-blue"
            >
              <span className="mt-[3px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-ink/20 transition-colors group-hover:bg-brand-blue" />
              <span className="text-[13px] leading-snug">
                <span className="mr-1 font-mono text-[11px] text-brand-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.heading}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ShareCard({ title, slug }: { title: string; slug: string }) {
  const url = `${SITE_ORIGIN}${absoluteHref(slug)}`;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return (
    <div className="rounded-2xl border border-brand-line bg-brand-mist/40 p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
        <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
        Share
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <ShareButton
          label="Facebook"
          icon="facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        />
        <ShareButton
          label="X"
          icon="x"
          href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        />
        <ShareButton
          label="LinkedIn"
          icon="linkedin"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        />
        <ShareButton
          label="Email"
          icon="email"
          href={`mailto:?subject=${encodedTitle}&body=${encoded}`}
        />
      </div>
    </div>
  );
}

function ShareInline({ title, slug }: { title: string; slug: string }) {
  const url = `${SITE_ORIGIN}${absoluteHref(slug)}`;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-ink/50">
        Share
      </span>
      <div className="flex items-center gap-1.5">
        <ShareIconLink
          label="Share on Facebook"
          icon="facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        />
        <ShareIconLink
          label="Share on X"
          icon="x"
          href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        />
        <ShareIconLink
          label="Share on LinkedIn"
          icon="linkedin"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        />
      </div>
    </div>
  );
}

function ShareButton({
  label,
  icon,
  href,
}: {
  label: string;
  icon: ShareIconName;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-brand-line bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy transition-colors hover:border-brand-blue/30 hover:bg-brand-mist"
    >
      <ShareIcon name={icon} className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}

function ShareIconLink({
  label,
  icon,
  href,
}: {
  label: string;
  icon: ShareIconName;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-brand-line bg-white text-brand-blue transition-colors hover:border-brand-blue/30 hover:text-brand-navy"
    >
      <ShareIcon name={icon} className="h-3.5 w-3.5" />
    </a>
  );
}

function ArticleBody({ sections }: { sections: readonly PostSection[] }) {
  return (
    <div className="space-y-16 sm:space-y-20">
      {sections.map((section, i) => (
        <SectionBlock
          key={section.heading}
          section={section}
          index={i}
          isFirst={i === 0}
        />
      ))}
    </div>
  );
}

function SectionBlock({
  section,
  index,
  isFirst,
}: {
  section: PostSection;
  index: number;
  isFirst: boolean;
}) {
  const id = sectionAnchor(section.heading);
  return (
    <section id={id} className="scroll-mt-24">
      <Reveal>
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan text-xs font-extrabold text-white shadow-md shadow-brand-navy/20"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-3xl lg:text-[2rem]">
            {section.heading}
          </h2>
        </div>
        <div
          aria-hidden
          className="mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-brand-blue via-brand-cyan to-transparent"
        />
      </Reveal>
      <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
        {section.blocks.map((block, bi) => (
          <BlockRenderer
            key={bi}
            block={block}
            dropCap={isFirst && bi === 0 && block.kind === "paragraph"}
          />
        ))}
      </div>
    </section>
  );
}

function safeHref(href: string): string | null {
  if (/^https?:\/\//i.test(href) || href.startsWith("/")) return href;
  return null;
}

function MarkdownText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const href = safeHref(match[2]);
    if (href) {
      const external = /^https?:\/\//i.test(href);
      nodes.push(
        <a
          key={`md-${key++}`}
          href={href}
          className="font-semibold text-brand-blue underline-offset-2 hover:underline"
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {match[1]}
        </a>,
      );
    } else {
      nodes.push(match[0]);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

function BlockRenderer({
  block,
  dropCap,
}: {
  block: PostBlock;
  dropCap: boolean;
}) {
  if (block.kind === "paragraph") {
    return (
      <Reveal>
        <p
          className={
            "text-[17px] leading-[1.75] text-brand-ink/80 sm:text-[18px]" +
            (dropCap
              ? " first-letter:mr-2 first-letter:float-left first-letter:font-serif first-letter:text-[72px] first-letter:font-black first-letter:leading-[0.85] first-letter:text-brand-navy"
              : "")
          }
        >
          <MarkdownText text={block.text} />
        </p>
      </Reveal>
    );
  }
  if (block.kind === "list") {
    return (
      <Reveal>
        <Stagger className="grid grid-cols-1 gap-3 rounded-2xl border border-brand-line bg-brand-mist/40 p-5 sm:p-6" gap={0.05}>
          {block.items.map((item) => (
            <StaggerItem key={item}>
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan"
                />
                <span className="text-[15px] leading-relaxed text-brand-ink/80 sm:text-[16px]">
                  {item}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>
    );
  }
  // callout
  return (
    <Reveal>
      <blockquote className="relative overflow-hidden rounded-2xl border-l-4 border-brand-blue bg-gradient-to-br from-white to-brand-mist/50 p-6 sm:p-8">
        <QuoteIcon
          aria-hidden
          className="absolute right-5 top-5 h-8 w-8 text-brand-blue/15"
        />
        <p className="text-lg font-medium leading-relaxed text-brand-navy sm:text-xl">
          {block.text}
        </p>
      </blockquote>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Inline CTA                                                                  */
/* -------------------------------------------------------------------------- */

function InlineCta({
  cta,
}: {
  cta: NonNullable<BlogPostContent["cta"]>;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-line bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan p-1 shadow-2xl shadow-brand-navy/15">
            <div className="relative overflow-hidden rounded-[calc(2rem-4px)] bg-brand-ink p-8 text-white sm:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-cyan/25 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-brand-blue/25 blur-3xl"
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
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: EASE }}
                  style={{
                    background:
                      "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                  }}
                />
              )}
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-sky">
                  <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
                  {cta.kicker}
                </p>
                <h3 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  {cta.heading}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                  {cta.body}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <MagneticButton>
                    <Link
                      href={cta.primary.href}
                      className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy shadow-lg shadow-black/20 transition-shadow hover:shadow-xl"
                    >
                      {cta.primary.label}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </MagneticButton>
                  {cta.secondary && (
                    <Link
                      href={cta.secondary.href}
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur transition-colors hover:bg-white/10"
                    >
                      {cta.secondary.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Author card                                                                 */
/* -------------------------------------------------------------------------- */

function AuthorCard() {
  return (
    <section className="relative bg-white pb-20 sm:pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-brand-line bg-brand-mist/40 p-8 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-cyan/20 blur-3xl"
            />
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <span
                aria-hidden
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan text-lg font-extrabold uppercase tracking-wide text-white shadow-lg shadow-brand-navy/20"
              >
                GIM
              </span>
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                  About the practice
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-brand-navy sm:text-2xl">
                  Genesis Integrative Medicine
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-ink/75 sm:text-base">
                  A Geneva, IL integrative clinic combining traditional
                  medicine with regenerative and chiropractic care under one
                  roof. We help patients across the Fox Valley move, feel, and
                  live better.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/about-practice/"
                    className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy transition-colors hover:border-brand-blue/30 hover:bg-brand-mist"
                  >
                    Meet the practice
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  <BookNowTrigger className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-md shadow-brand-blue/25 transition-shadow hover:shadow-lg">
                    Book a visit
                    <ArrowRight className="h-3 w-3" />
                  </BookNowTrigger>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Prev / next post navigation                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Prev/next hrefs in the data are stored as root-relative post slugs
 * (e.g. "/some-post/"), matching the live WordPress URL pattern. Posts
 * are served locally under /blog/<slug>/, so prefix here rather than
 * storing "/blog/" in every data entry.
 */
function blogNavHref(href: string): string {
  return href.startsWith("/blog/") ? href : `/blog${href}`;
}

function PostNav({ post }: { post: BlogPostContent }) {
  if (!post.prev && !post.next) return null;
  return (
    <section className="border-y border-brand-line bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {post.prev ? (
            <NavCard
              direction="prev"
              label="Previous article"
              title={post.prev.title}
              href={blogNavHref(post.prev.href)}
            />
          ) : (
            <div />
          )}
          {post.next ? (
            <NavCard
              direction="next"
              label="Next article"
              title={post.next.title}
              href={blogNavHref(post.next.href)}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
}

function NavCard({
  direction,
  label,
  title,
  href,
}: {
  direction: "prev" | "next";
  label: string;
  title: string;
  href: string;
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl border border-brand-line bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-navy/10 ${
        isPrev ? "text-left" : "text-right md:col-start-2"
      }`}
    >
      <div
        className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue ${
          isPrev ? "" : "justify-end"
        }`}
      >
        {isPrev && (
          <ArrowRight
            aria-hidden
            className="h-3 w-3 rotate-180 transition-transform group-hover:-translate-x-0.5"
          />
        )}
        {label}
        {!isPrev && (
          <ArrowRight
            aria-hidden
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
          />
        )}
      </div>
      <p className="mt-3 text-base font-bold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue sm:text-lg">
        {title}
      </p>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Related posts                                                               */
/* -------------------------------------------------------------------------- */

function RelatedPosts({ posts }: { posts: readonly BlogPost[] }) {
  return (
    <section className="relative bg-brand-mist/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
                Keep reading
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-brand-navy sm:text-4xl">
                More from the blog
              </h2>
            </div>
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy transition-colors hover:border-brand-blue/30 hover:bg-brand-mist"
            >
              View all articles
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Reveal>
        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {posts.map((p) => (
            <StaggerItem key={p.slug}>
              <RelatedCard post={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={postHref(post.slug)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-navy/10"
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
        {post.category && (
          <span className="rounded-full bg-gradient-to-r from-brand-blue/10 to-brand-cyan/10 px-2.5 py-1 text-brand-blue">
            {post.category}
          </span>
        )}
        <span className="text-brand-ink/50">{formatPostDate(post.date)}</span>
      </div>
      <h3 className="mt-4 text-lg font-extrabold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue">
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-brand-ink/70">
        {post.excerpt}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue">
        Read article
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Mission                                                                     */
/* -------------------------------------------------------------------------- */

function MissionBlock() {
  return (
    <section className="border-t border-brand-line bg-white py-14 sm:py-20">
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
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function absoluteHref(slug: string): string {
  return `/${slug}/`;
}

function pickRelated(
  post: BlogPostContent,
  count: number,
): readonly BlogPost[] {
  const excludeSlugs = new Set<string>([post.slug]);
  if (post.prev) excludeSlugs.add(hrefToSlug(post.prev.href));
  if (post.next) excludeSlugs.add(hrefToSlug(post.next.href));

  const sameCategory = BLOG_POSTS.filter(
    (p) => !excludeSlugs.has(p.slug) && p.category === post.category,
  );
  const others = BLOG_POSTS.filter(
    (p) => !excludeSlugs.has(p.slug) && p.category !== post.category,
  );
  return [...sameCategory, ...others].slice(0, count);
}

function hrefToSlug(href: string): string {
  return href.replace(/^\/+/, "").replace(/\/+$/, "");
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

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.17 6C4.87 6 3 7.87 3 10.17V14a5 5 0 0 0 5 5v-3a2 2 0 0 1-2-2v-.17c0-1.19.98-2.16 2.17-2.16h.66V6h-1.66Zm10 0c-2.3 0-4.17 1.87-4.17 4.17V14a5 5 0 0 0 5 5v-3a2 2 0 0 1-2-2v-.17c0-1.19.98-2.16 2.17-2.16h.66V6h-1.66Z" />
    </svg>
  );
}

type ShareIconName = "facebook" | "x" | "linkedin" | "email";

function ShareIcon({
  name,
  ...props
}: { name: ShareIconName } & React.SVGProps<SVGSVGElement>) {
  switch (name) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path d="M13.5 21v-7.5h2.53l.38-2.93H13.5V8.7c0-.85.24-1.43 1.46-1.43h1.55V4.65c-.27-.04-1.19-.12-2.26-.12-2.24 0-3.77 1.37-3.77 3.88v2.16H8v2.93h2.48V21h3.02Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path d="M17.53 3H20.5l-6.48 7.4L21.75 21h-6.02l-4.71-6.16L5.6 21H2.63l6.93-7.92L2.25 3h6.17l4.26 5.63L17.53 3Zm-1.06 16.12h1.65L7.63 4.77H5.86l10.61 14.35Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path d="M6.94 8.5v11H4V8.5h2.94ZM5.47 4a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM9 8.5h2.83v1.51h.04c.4-.72 1.37-1.51 2.82-1.51 3.02 0 3.58 1.99 3.58 4.57V19.5H15.3v-5.16c0-1.23-.02-2.82-1.72-2.82-1.72 0-1.98 1.34-1.98 2.73V19.5H9V8.5Z" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
  }
}
