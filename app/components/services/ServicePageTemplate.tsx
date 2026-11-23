"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { usePrefersReducedMotion as useReducedMotion } from "@/app/lib/use-prefers-reduced-motion";
import { useRef, useState, type CSSProperties } from "react";

import {
  ALL_SERVICES_LIST,
  CONSULTATION_CTA,
  INSURANCE_MISSION,
  type Highlight,
  type SectionImage,
  type ServicePageContent,
  type ServiceSection,
} from "@/app/lib/services-content";
import { CONTACT } from "@/app/lib/site-config";
import BookNowTrigger from "@/app/components/booking/BookNowTrigger";
import {
  InsuranceLogos,
  MagneticButton,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/app/components/home/motion-primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

const ACCENTS = [
  "from-brand-navy to-brand-blue",
  "from-brand-blue to-brand-cyan",
  "from-brand-cyan to-brand-sky",
  "from-brand-blue to-brand-navy",
] as const;

/**
 * Slug → hero image mapping. Uses the same imagery shown on the service
 * cards over on the /services/ index page so each detail page has a
 * consistent visual identity.
 */
const HERO_IMAGES: Record<string, { src: string; alt: string }> = {
  sciatica: {
    src: "/images/services/sciatica.webp",
    alt: "Sciatica treatment at Genesis Integrative Medicine",
  },
  "chiropractic-care": {
    src: "/images/services/chiropractic-care.webp",
    alt: "Chiropractic care at Genesis Integrative Medicine",
  },
  "active-rehab-geneva": {
    src: "/images/services/active-rehab.webp",
    alt: "Active rehabilitation program at Genesis Integrative Medicine",
  },
  "prp-injections-geneva": {
    src: "/images/services/prp-injections.webp",
    alt: "PRP injection therapy at Genesis Integrative Medicine",
  },
  "peptide-weight-loss": {
    src: "/images/services/peptide-weight-loss.webp",
    alt: "Medical weight loss program at Genesis Integrative Medicine",
  },
  "regenerative-medicine": {
    src: "/images/services/regenerative-medicine.webp",
    alt: "Regenerative medicine at Genesis Integrative Medicine",
  },
  "cold-laser": {
    src: "/images/services/cold-laser.webp",
    alt: "Cold laser therapy at Genesis Integrative Medicine",
  },
  "peripheral-neuropathy-treatment": {
    src: "/images/services/peripheral-neuropathy.webp",
    alt: "Peripheral neuropathy treatment at Genesis Integrative Medicine",
  },
  "ed-shockwave-mens-wellness": {
    src: "/images/services/ed-shockwave.jpeg",
    alt: "ED / ShockWave men's wellness therapy at Genesis Integrative Medicine",
  },
  "shockwave-therapy": {
    src: "/images/services/ed/ed-hero.jpeg",
    alt: "Shockwave therapy (EPAT) for musculoskeletal pain at Genesis Integrative Medicine",
  },
  "allergy-testing-geneva": {
    src: "/images/services/allergy-testing.webp",
    alt: "Allergy testing at Genesis Integrative Medicine",
  },
};

/* -------------------------------------------------------------------------- */
/* Main template                                                              */
/* -------------------------------------------------------------------------- */

export default function ServicePageTemplate({
  content,
}: {
  content: ServicePageContent;
}) {
  const useSidebar = content.layout === "sidebar";
  // When a hero video replaces the banner photo, show that photo in its own
  // section further down the page instead of the banner slot.
  const showBannerPhoto = Boolean(content.heroVideo) && Boolean(content.featuredImage);
  return (
    <article className="bg-white">
      <BreadcrumbBar items={content.breadcrumbs} />
      <ServiceHero content={content} />
      {content.highlights && content.highlights.length > 0 && (
        <HighlightsStrip highlights={content.highlights} />
      )}

      {useSidebar ? (
        <SidebarLayout content={content} />
      ) : (
        <SectionsRenderer sections={content.sections} />
      )}

      {content.videos && content.videos.length > 0 && (
        <ServiceVideos videos={content.videos} heroVideo={content.heroVideo} />
      )}
      {showBannerPhoto && content.featuredImage && (
        <ServiceBannerPhoto image={content.featuredImage} />
      )}
      {content.gallery && content.gallery.length > 0 && (
        <ServiceGallery images={content.gallery} />
      )}
      {content.faqs && content.faqs.length > 0 && (
        <FAQAccordion
          heading={content.faqHeading ?? "Frequently Asked Questions"}
          faqs={content.faqs}
        />
      )}
      <AllServicesList
        currentSlug={content.slug}
        relatedNav={content.relatedNav}
      />
      <ConsultationCta />
      <InsuranceMissionBlock />
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Breadcrumb                                                                 */
/* -------------------------------------------------------------------------- */

function BreadcrumbBar({
  items,
}: {
  items: readonly { name: string; item?: string }[];
}) {
  const toInternal = (href?: string): string | undefined => {
    if (!href) return undefined;
    return href.replace(/^https?:\/\/genesisintegrativemed\.com/, "") || "/";
  };
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-brand-line bg-brand-mist/60"
    >
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3 text-xs">
        {items.map((b, i) => {
          const isLast = i === items.length - 1;
          const href = toInternal(b.item);
          return (
            <li key={`${b.name}-${i}`} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-brand-ink/30">
                  /
                </span>
              )}
              {!isLast && href ? (
                <Link
                  href={href}
                  className="font-semibold uppercase tracking-[0.12em] text-brand-ink/60 transition-colors hover:text-brand-blue"
                >
                  {b.name}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-semibold uppercase tracking-[0.12em] text-brand-navy"
                >
                  {b.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero, content left, motion-driven image right                             */
/* -------------------------------------------------------------------------- */

function ServiceHero({ content }: { content: ServicePageContent }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const { hero } = content;
  const heroImage =
    content.featuredImage ??
    HERO_IMAGES[content.slug] ??
    null;
  const heroVideo = content.heroVideo ?? null;
  const [heroPlaying, setHeroPlaying] = useState(false);
  const heroVideoSrc =
    heroVideo &&
    (heroVideo.provider === "vimeo"
      ? `https://player.vimeo.com/video/${heroVideo.id}?dnt=1&title=0&byline=0&portrait=0&autoplay=1`
      : `https://www.youtube-nocookie.com/embed/${heroVideo.id}?rel=0&modestbranding=1&autoplay=1`);
  // Cap the desktop hero video's rendered height so tall/portrait thumbnails
  // don't dwarf the text column; landscape videos stay well under this and
  // are unaffected. Portrait ("reels"-style) videos are additionally clamped
  // to a 4:5 minimum width/height ratio so they read as a proportionate
  // banner card instead of a squeezed vertical strip.
  const heroVideoMaxHeight = 420;
  const heroVideoAspectRatio = heroVideo
    ? Math.max(heroVideo.thumbnail.width / heroVideo.thumbnail.height, 0.8)
    : null;
  const heroVideoMaxWidth = heroVideoAspectRatio
    ? Math.round(heroVideoMaxHeight * heroVideoAspectRatio)
    : null;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-brand-mist/30 to-white"
    >
      {/* Ambient */}
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

      <div
        className={`relative mx-auto px-6 ${
          heroImage
            ? "grid max-w-7xl grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24"
            : "max-w-4xl py-20 text-center sm:py-28"
        }`}
      >
        {/* Text column */}
        <Stagger
          className={heroImage ? "lg:col-span-7" : ""}
          gap={0.09}
          delayChildren={0.1}
        >
          {hero.kicker && (
            <StaggerItem>
              <p
                className={`inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue backdrop-blur ${heroImage ? "" : ""}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                {hero.kicker}
              </p>
            </StaggerItem>
          )}
          <StaggerItem>
            <h1
              className={`mt-6 font-extrabold leading-[1.02] tracking-tight text-brand-ink ${
                heroImage
                  ? "text-4xl sm:text-5xl lg:text-[4.5rem]"
                  : "text-5xl sm:text-6xl lg:text-[5rem]"
              }`}
            >
              <span className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan bg-clip-text text-transparent">
                {hero.h1}
              </span>
            </h1>
          </StaggerItem>
          {hero.subtitle && (
            <StaggerItem>
              <p className="mt-6 text-xl font-semibold text-brand-navy sm:text-2xl">
                {hero.subtitle}
              </p>
            </StaggerItem>
          )}
          {hero.intro && (
            <StaggerItem>
              <p
                className={`mt-6 text-base leading-relaxed text-brand-ink/70 sm:text-lg ${heroImage ? "max-w-2xl" : "mx-auto max-w-2xl"}`}
              >
                {hero.intro}
              </p>
            </StaggerItem>
          )}
          <StaggerItem>
            <div
              className={`mt-8 flex flex-wrap items-center gap-3 ${heroImage ? "" : "justify-center"}`}
            >
              <MagneticButton>
                <Link
                  href="/contact/"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/30 transition-shadow hover:shadow-xl hover:shadow-brand-blue/50"
                >
                  Schedule Consultation
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </MagneticButton>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy backdrop-blur transition-colors hover:border-brand-blue/30 hover:bg-brand-mist"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
                Call {CONTACT.phoneDisplay}
              </a>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Image column */}
        {heroImage && (
          <motion.div
            className={`motion-reveal relative lg:col-span-5 ${heroVideo ? "lg:mt-16" : ""}`}
            initial={reduce ? false : { opacity: 0, y: 36, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.15 }}
          >
            {/* Image — merged directly into the page, no frame/bezel. Left edge fades into the page bg on desktop (side-by-side layout) */}
            <div
              className={`relative overflow-hidden rounded-[2rem] shadow-2xl shadow-brand-navy/20 hero-image-fade ${
                heroVideo ? "lg:mx-auto lg:max-w-[var(--hero-video-max-w)]" : ""
              }`}
              style={
                heroVideo
                  ? ({ "--hero-video-max-w": `${heroVideoMaxWidth}px` } as CSSProperties)
                  : undefined
              }
            >
              <motion.div
                className={`relative w-full ${
                  heroVideo || content.featuredImage ? "" : "aspect-[4/3]"
                }`}
                style={{
                  ...(reduce ? {} : { y: imageY }),
                  // Match the poster's own ratio (the real video thumbnail when
                  // there's a hero video, clamped so portrait videos don't
                  // render as a squeezed strip) so object-cover/the embed
                  // never gets badly letterboxed against a mismatched ratio.
                  ...(heroVideoAspectRatio
                    ? {
                        aspectRatio: String(heroVideoAspectRatio),
                      }
                    : content.featuredImage
                      ? {
                          aspectRatio: `${content.featuredImage.width} / ${content.featuredImage.height}`,
                        }
                      : {}),
                }}
              >
                {heroVideo && heroPlaying ? (
                  <iframe
                    src={heroVideoSrc ?? undefined}
                    title={heroVideo.title}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <Image
                    src={heroVideo ? heroVideo.thumbnail.src : heroImage.src}
                    alt={heroVideo ? heroVideo.title : heroImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 560px"
                    quality={95}
                    className="object-cover"
                  />
                )}
                {heroVideo && !heroPlaying && (
                  <button
                    type="button"
                    onClick={() => setHeroPlaying(true)}
                    aria-label={`Play video: ${heroVideo.title}`}
                    className="group absolute inset-0 flex h-full w-full items-center justify-center"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-brand-ink/20 transition-colors group-hover:bg-brand-ink/35"
                    />
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
                      <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-brand-ink sm:h-8 sm:w-8">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </button>
                )}
              </motion.div>
              {/* Soft gradient wash at the base for depth */}
              {!(heroVideo && heroPlaying) && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-navy/35 via-brand-navy/0 to-transparent"
                />
              )}
              {/* Shine sweep, one-shot on mount */}
              {!reduce && !(heroVideo && heroPlaying) && (
                <motion.div
                  aria-hidden
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "160%", opacity: [0, 0.35, 0] }}
                  transition={{
                    duration: 1.6,
                    ease: EASE,
                    delay: 0.8,
                  }}
                  className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
              )}
            </div>

            {/* Floating badge — hidden when a hero video is present so it doesn't cover the play button */}
            {!heroVideo && (
            <motion.div
              style={reduce ? undefined : { y: badgeY }}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
              className="motion-reveal absolute -bottom-6 -left-6 hidden max-w-[240px] rounded-2xl border border-brand-line bg-white/95 p-4 shadow-xl shadow-brand-navy/15 backdrop-blur md:block"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/30"
                >
                  <SparkIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">
                    Geneva, IL
                  </p>
                  <p className="text-sm font-bold leading-tight text-brand-ink">
                    Integrative care, personalized.
                  </p>
                </div>
              </div>
            </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Highlights strip                                                           */
/* -------------------------------------------------------------------------- */

function HighlightsStrip({
  highlights,
}: {
  highlights: readonly Highlight[];
}) {
  return (
    <section className="border-y border-brand-line bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Stagger
          className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4"
          gap={0.06}
        >
          {highlights.map((h, i) => (
            <StaggerItem key={`${h.label}-${i}`}>
              <div className="group flex items-start gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 text-brand-blue transition-colors group-hover:from-brand-blue group-hover:to-brand-cyan group-hover:text-white"
                >
                  <HighlightIcon name={h.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-brand-navy">{h.label}</p>
                  {h.note && (
                    <p className="mt-1 text-xs leading-relaxed text-brand-ink/60">
                      {h.note}
                    </p>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Sections renderer                                                          */
/* -------------------------------------------------------------------------- */

function SectionsRenderer({
  sections,
}: {
  sections: readonly ServiceSection[];
}) {
  return (
    <>
      {sections.map((section, i) => (
        <SectionDispatcher key={i} section={section} index={i} />
      ))}
    </>
  );
}

function SectionDispatcher({
  section,
  index,
}: {
  section: ServiceSection;
  index: number;
}) {
  // Dark variant → immersive full-width feature strip
  if (section.variant === "dark") {
    return <DarkFeatureSection section={section} />;
  }

  const bg: "white" | "mist" =
    section.variant === "mist" ? "mist" : index % 2 === 0 ? "white" : "mist";

  switch (section.kind) {
    case "prose":
      if (isEditorialProse(section)) {
        return <EditorialProseSection section={section} bg={bg} />;
      }
      return <CenteredProseSection section={section} bg={bg} />;
    case "list":
      return <EditorialListSection section={section} bg={bg} />;
    case "subsections":
      return <SubsectionsCardsSection section={section} bg={bg} />;
    case "benefits":
      return <BenefitsCardsSection section={section} bg={bg} />;
  }
}

function isEditorialProse(
  section: Extract<ServiceSection, { kind: "prose" }>,
): boolean {
  return !!section.heading && section.paragraphs.length >= 2;
}

/* -------------------------------------------------------------------------- */
/* Editorial prose section, sticky label + body copy (About-style)           */
/* -------------------------------------------------------------------------- */

function EditorialProseSection({
  section,
  bg,
}: {
  section: Extract<ServiceSection, { kind: "prose" }>;
  bg: "white" | "mist";
}) {
  const bgClass = bg === "mist" ? "bg-brand-mist/50" : "bg-white";
  return (
    <section className={`relative ${bgClass} py-16 sm:py-24`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                {section.kicker && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                    <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
                    {section.kicker}
                  </p>
                )}
                <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl">
                  {section.heading}
                </h2>
              </Reveal>
            </div>
          </aside>
          <div className="lg:col-span-8">
            <Stagger className="space-y-5" gap={0.08}>
              {section.paragraphs.map((p, i) => (
                <StaggerItem key={i}>
                  <p className="text-base leading-relaxed text-brand-ink/80 sm:text-lg">
                    {p}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Centered prose section, short prose blocks                                */
/* -------------------------------------------------------------------------- */

function CenteredProseSection({
  section,
  bg,
}: {
  section: Extract<ServiceSection, { kind: "prose" }>;
  bg: "white" | "mist";
}) {
  const bgClass = bg === "mist" ? "bg-brand-mist/50" : "bg-white";
  return (
    <section className={`${bgClass} py-14 sm:py-20`}>
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader
          kicker={section.kicker}
          heading={section.heading}
          align="center"
        />
        <Stagger
          className={`${section.heading || section.kicker ? "mt-6" : ""} space-y-4`}
          gap={0.08}
        >
          {section.paragraphs.map((p, i) => (
            <StaggerItem key={i}>
              <p className="text-base leading-relaxed text-brand-ink/80 sm:text-lg">
                {p}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Editorial list section, sticky heading + checklist cards                  */
/* -------------------------------------------------------------------------- */

function EditorialListSection({
  section,
  bg,
}: {
  section: Extract<ServiceSection, { kind: "list" }>;
  bg: "white" | "mist";
}) {
  const bgClass = bg === "mist" ? "bg-brand-mist/50" : "bg-white";
  const hasSidebar = !!(section.kicker || section.heading || section.intro);
  return (
    <section className={`${bgClass} py-16 sm:py-24`}>
      <div className="mx-auto max-w-7xl px-6">
        {hasSidebar ? (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <Reveal>
                  {section.kicker && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                      <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
                      {section.kicker}
                    </p>
                  )}
                  {section.heading && (
                    <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl">
                      {section.heading}
                    </h2>
                  )}
                  {section.intro && (
                    <p className="mt-5 text-base leading-relaxed text-brand-ink/70 sm:text-lg">
                      {section.intro}
                    </p>
                  )}
                </Reveal>
              </div>
            </aside>
            <div className="lg:col-span-8">
              <ListItems items={section.items} />
              {section.outro && (
                <Reveal delay={0.1}>
                  <p className="mt-6 text-base leading-relaxed text-brand-ink/80 sm:text-lg">
                    {section.outro}
                  </p>
                </Reveal>
              )}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            <ListItems items={section.items} />
            {section.outro && (
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-relaxed text-brand-ink/80 sm:text-lg">
                  {section.outro}
                </p>
              </Reveal>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ListItems({ items }: { items: readonly string[] }) {
  return (
    <Stagger className="space-y-3" gap={0.06}>
      {items.map((item, i) => (
        <StaggerItem key={i}>
          <motion.div
            whileHover={{ x: 3 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="flex items-start gap-3 rounded-2xl border border-brand-line bg-white p-4 shadow-sm transition-colors hover:border-brand-blue/25 hover:bg-brand-mist/40"
          >
            <span
              aria-hidden
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/25"
            >
              <CheckIcon className="h-3 w-3" />
            </span>
            <span className="text-sm leading-relaxed text-brand-ink/85 sm:text-base">
              {item}
            </span>
          </motion.div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* -------------------------------------------------------------------------- */
/* Subsections cards section, like About's PillarsBlock                      */
/* -------------------------------------------------------------------------- */

function SubsectionsCardsSection({
  section,
  bg,
}: {
  section: Extract<ServiceSection, { kind: "subsections" }>;
  bg: "white" | "mist";
}) {
  const bgClass = bg === "mist" ? "bg-brand-mist/50" : "bg-white";
  const single = section.subs.length === 1;
  return (
    <section
      className={`relative overflow-hidden ${bgClass} py-16 sm:py-24`}
    >
      {bg === "mist" && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[600px] rounded-full bg-brand-sky/20 blur-3xl"
        />
      )}
      <div className="relative mx-auto max-w-7xl px-6">
        {(section.kicker || section.heading || section.intro) && (
          <Reveal className="mx-auto max-w-2xl text-center">
            {section.kicker && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
                {section.kicker}
              </p>
            )}
            {section.heading && (
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                {section.heading}
              </h2>
            )}
            {section.intro && (
              <p className="mt-4 text-base leading-relaxed text-brand-ink/70 sm:text-lg">
                {section.intro}
              </p>
            )}
          </Reveal>
        )}
        <Stagger
          className={`mt-12 grid grid-cols-1 gap-5 ${single ? "" : "sm:grid-cols-2"}`}
          gap={0.07}
        >
          {section.subs.map((sub, i) => (
            <StaggerItem key={i}>
              <SubCard
                heading={sub.heading}
                paragraphs={sub.paragraphs}
                items={sub.items}
                outro={sub.outro}
                index={i}
                accent={ACCENTS[i % ACCENTS.length]}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function SubCard({
  heading,
  paragraphs,
  items,
  outro,
  index,
  accent,
}: {
  heading: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
  outro?: string;
  index: number;
  accent: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group relative h-full overflow-hidden rounded-3xl border border-brand-line bg-white p-7 shadow-md shadow-brand-navy/5 transition-shadow hover:shadow-xl hover:shadow-brand-navy/10"
    >
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${accent} transition-transform duration-500 group-hover:scale-x-100`}
      />
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-md shadow-brand-blue/25`}
        >
          <span className="text-sm font-bold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
      </div>
      <h3 className="mt-6 text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">
        {heading}
      </h3>
      {paragraphs?.map((p, pi) => (
        <p
          key={pi}
          className="mt-3 text-sm leading-relaxed text-brand-ink/75 sm:text-base"
        >
          {p}
        </p>
      ))}
      {items && items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {items.map((it, ii) => (
            <li
              key={ii}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-ink/80"
            >
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue"
              />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )}
      {outro && (
        <p className="mt-4 text-sm leading-relaxed text-brand-ink/75 sm:text-base">
          {outro}
        </p>
      )}
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/* Benefits cards section, numbered feature cards                             */
/* -------------------------------------------------------------------------- */

function BenefitsCardsSection({
  section,
  bg,
}: {
  section: Extract<ServiceSection, { kind: "benefits" }>;
  bg: "white" | "mist";
}) {
  const bgClass = bg === "mist" ? "bg-brand-mist/50" : "bg-white";
  return (
    <section
      className={`relative overflow-hidden ${bgClass} py-16 sm:py-24`}
    >
      {bg === "mist" && (
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[600px] rounded-full bg-brand-cyan/20 blur-3xl"
        />
      )}
      <div className="relative mx-auto max-w-7xl px-6">
        {(section.kicker || section.heading || section.intro) && (
          <Reveal className="mx-auto max-w-2xl text-center">
            {section.kicker && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
                {section.kicker}
              </p>
            )}
            {section.heading && (
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                {section.heading}
              </h2>
            )}
            {section.intro && (
              <p className="mt-4 text-base leading-relaxed text-brand-ink/70 sm:text-lg">
                {section.intro}
              </p>
            )}
          </Reveal>
        )}
        <Stagger
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
          gap={0.06}
        >
          {section.subs.map((sub, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group relative h-full overflow-hidden rounded-2xl border border-brand-line bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-brand-navy/10"
              >
                <div
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r ${ACCENTS[i % ACCENTS.length]} transition-transform duration-500 group-hover:scale-x-100`}
                />
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} text-white shadow-lg shadow-brand-blue/30`}
                  >
                    <span className="text-sm font-bold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="text-lg font-bold text-brand-navy">
                    {sub.heading}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-brand-ink/75">
                  {sub.paragraph}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Dark feature section, text-only immersive strip                           */
/* -------------------------------------------------------------------------- */

function DarkFeatureSection({ section }: { section: ServiceSection }) {
  return (
    <section className="relative overflow-hidden bg-brand-ink text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[400px] w-[600px] rounded-full bg-brand-blue/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[380px] w-[520px] rounded-full bg-brand-cyan/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #64B4DC 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-24">
        <DarkSectionHeader section={section} />
        <DarkSectionBody section={section} />
      </div>
    </section>
  );
}

function DarkSectionHeader({ section }: { section: ServiceSection }) {
  const heading = "heading" in section ? section.heading : undefined;
  const intro =
    section.kind === "list" || section.kind === "subsections"
      ? section.intro
      : undefined;
  if (!section.kicker && !heading && !intro) return null;
  return (
    <div className="text-center mx-auto max-w-2xl">
      {section.kicker && (
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-sky">
            <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
            {section.kicker}
          </p>
        </Reveal>
      )}
      {heading && (
        <Reveal delay={section.kicker ? 0.05 : 0}>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {heading}
          </h2>
        </Reveal>
      )}
      {intro && (
        <Reveal delay={heading ? 0.1 : 0.05}>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

function DarkSectionBody({ section }: { section: ServiceSection }) {
  switch (section.kind) {
    case "prose":
      return (
        <Stagger className="mt-8 space-y-4" gap={0.08}>
          {section.paragraphs.map((p, i) => (
            <StaggerItem key={i}>
              <p className="text-base leading-relaxed text-white/80 sm:text-lg">
                {p}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      );
    case "list":
      return (
        <>
          <Stagger className="mt-8 space-y-3" gap={0.06}>
            {section.items.map((it, i) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/25"
                  >
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span className="text-sm leading-relaxed text-white/85 sm:text-base">
                    {it}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          {section.outro && (
            <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
              {section.outro}
            </p>
          )}
        </>
      );
    case "subsections":
      return (
        <div className="mt-10 space-y-5">
          {section.subs.map((sub, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden
                    className="shrink-0 font-mono text-xs font-bold tabular-nums text-brand-sky"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    {sub.heading}
                  </h3>
                </div>
                {sub.paragraphs?.map((p, pi) => (
                  <p
                    key={pi}
                    className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base"
                  >
                    {p}
                  </p>
                ))}
                {sub.items && sub.items.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {sub.items.map((it, ii) => (
                      <li
                        key={ii}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-white/80"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan"
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sub.outro && (
                  <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                    {sub.outro}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      );
    case "benefits":
      return (
        <Stagger
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          gap={0.06}
        >
          {section.subs.map((sub, i) => (
            <StaggerItem key={i}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-lg shadow-brand-blue/30"
                  >
                    <span className="text-sm font-bold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="text-lg font-bold text-white">{sub.heading}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  {sub.paragraph}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Shared centered section header (kicker + heading)                          */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  kicker,
  heading,
  align = "center",
}: {
  kicker?: string;
  heading?: string;
  align?: "left" | "center";
}) {
  if (!kicker && !heading) return null;
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {kicker && (
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
            {kicker}
          </p>
        </Reveal>
      )}
      {heading && (
        <Reveal delay={kicker ? 0.05 : 0}>
          <h2
            className={`${kicker ? "mt-3" : ""} text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl`}
          >
            {heading}
          </h2>
        </Reveal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar layout, text-only left column, sticky related-nav on the right    */
/* -------------------------------------------------------------------------- */

function SidebarLayout({ content }: { content: ServicePageContent }) {
  const groups = groupSidebarSections(content.sections);
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <main className="lg:col-span-8 xl:col-span-9">
            <div className="space-y-12 sm:space-y-16">
              {groups.map((group, i) =>
                group.type === "cards" ? (
                  <ProseCardsGroup key={i} sections={group.sections} />
                ) : (
                  <LinearSection key={i} section={group.section} />
                ),
              )}
            </div>
          </main>
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:flex lg:flex-col">
              <ConditionsSidebar
                currentSlug={content.slug}
                relatedNav={content.relatedNav}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/**
 * Groups consecutive headed "prose" sections into card-grid blocks so
 * sidebar-layout pages (conditions) don't render as an unbroken wall of
 * paragraphs. Headingless prose (usually the lead intro) and any other
 * section kind (list/subsections/benefits, which already render as
 * cards) pass through unchanged.
 */
type ProseWithHeading = Extract<ServiceSection, { kind: "prose" }> & {
  heading: string;
};
type SidebarGroup =
  | { type: "single"; section: ServiceSection }
  | { type: "cards"; sections: ProseWithHeading[] };

function groupSidebarSections(
  sections: readonly ServiceSection[],
): SidebarGroup[] {
  const groups: SidebarGroup[] = [];
  let run: ProseWithHeading[] = [];
  const flushRun = () => {
    if (run.length > 0) groups.push({ type: "cards", sections: run });
    run = [];
  };
  for (const section of sections) {
    if (section.kind === "prose" && section.heading) {
      run.push(section as ProseWithHeading);
    } else {
      flushRun();
      groups.push({ type: "single", section });
    }
  }
  flushRun();
  return groups;
}

function ProseCardsGroup({
  sections,
}: {
  sections: readonly ProseWithHeading[];
}) {
  return (
    <div className="space-y-6">
      {sections.map((s, i) => {
        const accent = ACCENTS[i % ACCENTS.length];
        return (
          // Plain div, not <Reveal>: whileInView reveals can get stuck at
          // opacity 0 in this stack, and these boxes must stay visible.
          <div
            key={i}
            className="group relative overflow-hidden rounded-3xl border border-brand-line bg-white p-6 shadow-sm shadow-brand-navy/5 transition-shadow hover:shadow-lg hover:shadow-brand-navy/10 sm:p-9"
          >
            <div
              aria-hidden
              className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${accent}`}
            />
            <div className="flex items-center gap-4 pl-2.5 sm:pl-3">
              <span
                aria-hidden
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-md shadow-brand-blue/25`}
              >
                <span className="text-sm font-bold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <h3 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">
                {s.heading}
              </h3>
            </div>
            <div className="mt-4 space-y-3 pl-2.5 sm:pl-3">
              {s.paragraphs?.map((p, pi) => (
                <p
                  key={pi}
                  className="text-base leading-relaxed text-brand-ink/75"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LinearSection({ section }: { section: ServiceSection }) {
  return (
    <section>
      <LinearSectionHeader section={section} />
      <LinearSectionBody section={section} />
    </section>
  );
}

function LinearSectionHeader({ section }: { section: ServiceSection }) {
  const heading = "heading" in section ? section.heading : undefined;
  const intro =
    section.kind === "list" || section.kind === "subsections"
      ? section.intro
      : undefined;
  if (!section.kicker && !heading && !intro) return null;
  return (
    <div>
      {section.kicker && (
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
            {section.kicker}
          </p>
        </Reveal>
      )}
      {heading && (
        <Reveal delay={section.kicker ? 0.05 : 0}>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            {heading}
          </h2>
        </Reveal>
      )}
      {intro && (
        <Reveal delay={heading ? 0.1 : 0.05}>
          <p className="mt-4 text-base leading-relaxed text-brand-ink/75 sm:text-lg">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

function LinearSectionBody({ section }: { section: ServiceSection }) {
  switch (section.kind) {
    case "prose":
      return (
        <Stagger className="mt-5 space-y-4" gap={0.08}>
          {section.paragraphs.map((p, i) => (
            <StaggerItem key={i}>
              <p className="text-base leading-relaxed text-brand-ink/80 sm:text-lg">
                {p}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      );
    case "list":
      return (
        <>
          <div className="mt-6">
            <ListItems items={section.items} />
          </div>
          {section.outro && (
            <p className="mt-5 text-base leading-relaxed text-brand-ink/80 sm:text-lg">
              {section.outro}
            </p>
          )}
        </>
      );
    case "subsections":
      return (
        <div className="mt-8 space-y-5">
          {section.subs.map((sub, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="group relative overflow-hidden rounded-3xl border border-brand-line bg-white p-6 transition-all hover:border-brand-blue/25 hover:shadow-lg hover:shadow-brand-navy/5 sm:p-8">
                <div
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-brand-blue to-brand-cyan transition-transform duration-500 group-hover:scale-y-100"
                />
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden
                    className="shrink-0 font-mono text-xs font-bold tabular-nums text-brand-blue"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold text-brand-navy sm:text-2xl">
                    {sub.heading}
                  </h3>
                </div>
                {sub.paragraphs?.map((p, pi) => (
                  <p
                    key={pi}
                    className="mt-3 text-sm leading-relaxed text-brand-ink/80 sm:text-base"
                  >
                    {p}
                  </p>
                ))}
                {sub.items && sub.items.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {sub.items.map((it, ii) => (
                      <li
                        key={ii}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-ink/80 sm:text-base"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue"
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sub.outro && (
                  <p className="mt-4 text-sm leading-relaxed text-brand-ink/80 sm:text-base">
                    {sub.outro}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      );
    case "benefits":
      return (
        <Stagger
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
          gap={0.06}
        >
          {section.subs.map((sub, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group relative h-full overflow-hidden rounded-2xl border border-brand-line bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-brand-navy/10"
              >
                <div
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r ${ACCENTS[i % ACCENTS.length]} transition-transform duration-500 group-hover:scale-x-100`}
                />
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} text-white shadow-lg shadow-brand-blue/30`}
                  >
                    <span className="text-sm font-bold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="text-lg font-bold text-brand-navy">
                    {sub.heading}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-brand-ink/75">
                  {sub.paragraph}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Conditions Sidebar, sticky right-column nav in sidebar layout             */
/* -------------------------------------------------------------------------- */

function ConditionsSidebar({
  currentSlug,
  relatedNav,
}: {
  currentSlug: string;
  relatedNav?: import("@/app/lib/services-content").RelatedNav;
}) {
  const nav = relatedNav ?? {
    kicker: "Explore",
    heading: "All Services",
    items: ALL_SERVICES_LIST,
    footerLabel: "View all",
    footerHref: "/services/",
  };
  return (
    <Reveal className="lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-brand-line bg-white shadow-lg shadow-brand-navy/10">
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan px-5 py-4 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-brand-sky">
              <span className="mr-2 inline-block h-1 w-1 -translate-y-0.5 rounded-full bg-brand-cyan" />
              {nav.kicker ?? "Explore"}
            </p>
            <h3 className="mt-1.5 text-base font-extrabold leading-tight sm:text-lg">
              {nav.heading}
            </h3>
          </div>
        </div>
        <nav
          aria-label={nav.heading}
          className="min-h-0 flex-1 divide-y divide-brand-line overflow-y-auto"
        >
          {nav.items.map((item, i) => {
            const isCurrent = item.href.includes(`/${currentSlug}/`);
            return (
              <motion.div
                key={item.href}
                className="motion-reveal"
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, ease: EASE, delay: i * 0.015 }}
              >
                <Link
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`group relative flex items-center justify-between gap-2 px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                    isCurrent
                      ? "bg-brand-mist text-brand-navy"
                      : "text-brand-ink/75 hover:bg-brand-mist/60 hover:text-brand-navy"
                  }`}
                >
                  {isCurrent && (
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-blue to-brand-cyan"
                    />
                  )}
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      aria-hidden
                      className={`inline-flex h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                        isCurrent
                          ? "bg-brand-blue"
                          : "bg-brand-ink/25 group-hover:bg-brand-blue"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  <ArrowUpRight
                    className={`h-3 w-3 shrink-0 transition-transform ${
                      isCurrent
                        ? "text-brand-blue"
                        : "text-brand-ink/40 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue"
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>
        <div className="shrink-0 border-t border-brand-line bg-brand-mist/40 p-3">
          <a
            href={CONTACT.phoneHref}
            className="group flex items-center justify-between gap-2 rounded-xl border border-brand-line bg-white px-3 py-2 text-[13px] font-bold text-brand-navy transition-colors hover:border-brand-blue/40 hover:bg-brand-mist"
          >
            <span className="flex items-center gap-2">
              <span
                aria-hidden
                className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-white"
              >
                <PhoneIcon className="h-3 w-3" />
              </span>
              <span>{CONTACT.phoneDisplay}</span>
            </span>
            <ArrowRight className="h-3 w-3 text-brand-blue transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/contact/"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-md shadow-brand-blue/25 transition-shadow hover:shadow-lg hover:shadow-brand-blue/40"
          >
            Schedule Consultation
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Video embed                                                                */
/* -------------------------------------------------------------------------- */

type ServiceVideoItem = NonNullable<ServicePageContent["videos"]>[number];

function ServiceVideos({
  videos,
  heroVideo,
}: {
  videos: readonly ServiceVideoItem[];
  heroVideo?: ServicePageContent["heroVideo"];
}) {
  // Drop any entry that's already playing as the hero banner video instead
  // of showing it a second time (as a video or an orphaned static image).
  const uniqueVideos = videos.filter(
    (v) => !(heroVideo && heroVideo.provider === v.provider && heroVideo.id === v.id),
  );
  if (uniqueVideos.length === 0) return null;
  const multiple = uniqueVideos.length > 1;
  return (
    <section className="bg-white py-16 sm:py-24">
      <div
        className={`mx-auto px-6 ${multiple ? "max-w-6xl" : "max-w-5xl"}`}
      >
        <div
          className={
            multiple
              ? "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2"
              : "grid grid-cols-1 gap-y-10"
          }
        >
          {/* headings render first so both sit in the same grid row and their
              players (rendered next) start at an equal height regardless of
              how many lines each heading wraps to */}
          {uniqueVideos.map((video, i) => (
            <ServiceVideoHeading key={`heading-${video.provider}-${video.id}-${i}`} video={video} />
          ))}
          {uniqueVideos.map((video, i) => (
            <ServiceVideoPlayer key={`player-${video.provider}-${video.id}-${i}`} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceVideoHeading({ video }: { video: ServiceVideoItem }) {
  if (!video.kicker && !video.heading) return null;
  return (
    <Reveal className="flex flex-col justify-end text-center">
      {video.kicker && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
          {video.kicker}
        </p>
      )}
      {video.heading && (
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          {video.heading}
        </h2>
      )}
    </Reveal>
  );
}

function ServiceVideoPlayer({ video }: { video: ServiceVideoItem }) {
  const [playing, setPlaying] = useState(false);
  const src =
    video.provider === "vimeo"
      ? `https://player.vimeo.com/video/${video.id}?dnt=1&title=0&byline=0&portrait=0&autoplay=1`
      : `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1&autoplay=1`;
  return (
    <Reveal delay={0.1}>
      <div className="overflow-hidden rounded-[2rem] border border-brand-line bg-brand-ink shadow-2xl shadow-brand-navy/25">
        <div className="relative aspect-video w-full">
          {playing ? (
            <iframe
              src={src}
              title={video.title}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${video.title}`}
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              <Image
                src={video.thumbnail.src}
                alt={video.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-brand-ink/20 transition-colors group-hover:bg-brand-ink/35"
              />
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
                  <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-brand-ink sm:h-8 sm:w-8">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function ServiceVideoImageCard({
  image,
}: {
  image: NonNullable<ServicePageContent["featuredImage"]>;
}) {
  return (
    <Reveal delay={0.1}>
      <div className="overflow-hidden rounded-[2rem] border border-brand-line bg-brand-ink shadow-2xl shadow-brand-navy/25">
        <div className="relative aspect-video w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </Reveal>
  );
}

/**
 * The page's original banner photo, displayed further down the page when a
 * hero video has taken over the banner slot.
 */
function ServiceBannerPhoto({
  image,
}: {
  image: NonNullable<ServicePageContent["featuredImage"]>;
}) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ServiceVideoImageCard image={image} />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Gallery                                                                    */
/* -------------------------------------------------------------------------- */

function ServiceGallery({ images }: { images: readonly SectionImage[] }) {
  return (
    <section className="bg-brand-mist py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            In our clinic
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            Recovery, personalized.
          </h2>
        </Reveal>
        <Stagger
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          gap={0.07}
        >
          {images.map((img, i) => (
            <StaggerItem key={img.src + i}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
                className={`group relative overflow-hidden rounded-3xl bg-brand-ink shadow-lg shadow-brand-navy/10 ${
                  i === 0
                    ? "lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-[5/4]"
                    : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 640px) 100vw, 33vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent"
                />
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ accordion                                                              */
/* -------------------------------------------------------------------------- */

function FAQAccordion({
  heading,
  faqs,
}: {
  heading: string;
  faqs: readonly { question: string; answer: string }[];
}) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            Frequently asked
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            {heading}
          </h2>
        </Reveal>
        <Stagger className="mt-12 space-y-3" gap={0.05}>
          {faqs.map((faq, i) => (
            <StaggerItem key={i}>
              <FAQItem faq={faq} defaultOpen={i === 0} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  defaultOpen,
}: {
  faq: { question: string; answer: string };
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-white transition-colors ${
        open
          ? "border-brand-blue/30 shadow-md shadow-brand-navy/5"
          : "border-brand-line hover:border-brand-blue/25"
      }`}
    >
      <div
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b from-brand-blue to-brand-cyan transition-transform duration-300 ${open ? "scale-y-100" : "scale-y-0"}`}
      />
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-bold text-brand-navy sm:text-lg">
          {faq.question}
        </span>
        <span
          aria-hidden
          className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-brand-blue transition-all ${
            open ? "rotate-45 border-brand-blue/30 bg-brand-mist" : "border-brand-line"
          }`}
        >
          <PlusIcon className="h-3.5 w-3.5" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="motion-reveal overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-brand-ink/80 sm:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Related pages list                                                          */
/* -------------------------------------------------------------------------- */

function AllServicesList({
  currentSlug,
  relatedNav,
}: {
  currentSlug: string;
  relatedNav?: import("@/app/lib/services-content").RelatedNav;
}) {
  const nav = relatedNav ?? {
    kicker: "Explore",
    heading: "All Services",
    items: ALL_SERVICES_LIST,
    footerLabel: "View services overview",
    footerHref: "/services/",
  };
  const items = nav.items.filter(
    (s) => !s.href.includes(`/${currentSlug}/`),
  );
  return (
    <section className="relative overflow-hidden bg-brand-mist py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[400px] w-[500px] rounded-full bg-brand-sky/25 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            {nav.kicker ?? "Explore"}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            {nav.heading}
          </h2>
        </Reveal>
        <Stagger
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          gap={0.04}
        >
          {items.map((s) => (
            <StaggerItem key={s.href}>
              <Link
                href={s.href}
                className="group flex items-center justify-between rounded-2xl border border-brand-line bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md hover:shadow-brand-navy/5"
              >
                <span className="text-sm font-bold text-brand-navy">
                  {s.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-brand-blue transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        {nav.footerHref && nav.footerLabel && (
          <Reveal delay={0.1} className="mt-10 flex justify-center">
            <MagneticButton strength={14}>
              <Link
                href={nav.footerHref}
                className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy transition-colors hover:border-brand-blue hover:bg-brand-navy hover:text-white"
              >
                {nav.footerLabel}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </MagneticButton>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Consultation CTA                                                           */
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
                  <BookNowTrigger className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/30 transition-shadow hover:shadow-xl hover:shadow-brand-blue/50">
                    Book Appointment
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </BookNowTrigger>
                </MagneticButton>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-brand-cyan/40 hover:bg-white/[0.08]"
                >
                  <PhoneIcon className="h-3.5 w-3.5" />
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

/* -------------------------------------------------------------------------- */
/* Insurance mission block                                                    */
/* -------------------------------------------------------------------------- */

function InsuranceMissionBlock() {
  return (
    <section className="border-t border-brand-line bg-brand-mist/50 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            Coverage
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

function HighlightIcon({
  name,
  ...props
}: { name?: Highlight["icon"] } & React.SVGProps<SVGSVGElement>) {
  switch (name) {
    case "spark":
      return <SparkIcon {...props} />;
    case "shield":
      return <ShieldIcon {...props} />;
    case "heart":
      return <HeartIcon {...props} />;
    case "clock":
      return <ClockIcon {...props} />;
    case "bolt":
      return <BoltIcon {...props} />;
    case "leaf":
      return <LeafIcon {...props} />;
    case "target":
      return <TargetIcon {...props} />;
    case "check":
    default:
      return <CheckIcon {...props} />;
  }
}

function baseIconProps(): React.SVGProps<SVGSVGElement> {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps()} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ArrowUpRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps()} {...props}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps()} strokeWidth={3} {...props}>
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps()} strokeWidth={2.5} {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps()} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function SparkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps()} {...props}>
      <path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
    </svg>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps()} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps()} {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps()} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function BoltIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps()} {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps()} {...props}>
      <path d="M11 20A7 7 0 0 1 4 13V6a4 4 0 0 1 4-4h5a7 7 0 0 1 7 7v3a7 7 0 0 1-7 7z" />
      <path d="M4 20L20 4" />
    </svg>
  );
}

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps()} {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
