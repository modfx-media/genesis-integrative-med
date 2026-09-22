"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import BookNowTrigger from "@/app/components/booking/BookNowTrigger";
import {
  InsuranceLogos,
  MagneticButton,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/app/components/home/motion-primitives";
import { CONTACT } from "@/app/lib/site-config";
import { CONSULTATION_CTA, INSURANCE_MISSION } from "@/app/lib/services-content";
import {
  GoogleGIcon,
  ReviewCard,
  StarIcon,
  StarRow,
} from "@/app/components/testimonials/ReviewCard";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * /testimonials/, a CTA-first page pointing to the practice's live Google
 * Reviews profile, plus a grid of 5-star reviews with written text. No
 * reviewer names or quotes are fabricated. The badge shows Google's overall
 * rating and total review count.
 */

const WRITE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJnc8OryDjDogRyMliAgrmNZI";

export type TestimonialsViewItem = {
  name: string;
  quote: string;
  when?: string;
};

export type TestimonialsViewProps = {
  reviews: TestimonialsViewItem[];
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
};

export default function TestimonialsPageView({
  reviews,
  rating,
  reviewCount,
  reviewsUrl,
}: TestimonialsViewProps) {
  if (reviews.length === 0) return null;

  return (
    <article className="bg-white">
      <BreadcrumbBar />
      <Hero rating={rating} reviewCount={reviewCount} reviewsUrl={reviewsUrl} />
      <HighlightsStrip rating={rating} reviewCount={reviewCount} />
      <ReviewsCTA rating={rating} reviewCount={reviewCount} reviewsUrl={reviewsUrl} />
      <ReviewsGrid reviews={reviews} />
      <TrustBlock />
      <ConsultationCta />
      <MissionBlock />
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Breadcrumb                                                                  */
/* -------------------------------------------------------------------------- */

function BreadcrumbBar() {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-brand-line bg-brand-mist/60">
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
          Testimonials
        </li>
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

function Hero({
  rating,
  reviewCount,
  reviewsUrl,
}: {
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
}) {
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

      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[10%] top-[24%] h-6 w-6 rounded-md bg-brand-cyan/60"
            animate={{ y: [0, -14, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: EASE }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[12%] top-[36%] h-8 w-8 rounded-full border-2 border-brand-blue/45"
            animate={{ y: [0, 12, 0], rotate: [0, -30, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: EASE, delay: 0.6 }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
            Patient Reviews
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-brand-ink sm:text-6xl lg:text-[5rem]">
            <span className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan bg-clip-text text-transparent">
              Testimonials
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <StarRow />
            <p className="text-xl font-semibold text-brand-navy sm:text-2xl">
              {rating.toFixed(1)} from {reviewCount.toLocaleString()} Google reviews
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-ink/70 sm:text-lg">
            Real, verified reviews from our patients across Geneva, IL and the
            surrounding Fox Valley, hosted on Google so every word is in
            their own voice, unedited and unfiltered.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton>
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/30 transition-shadow hover:shadow-xl hover:shadow-brand-blue/50"
              >
                View All Reviews
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </MagneticButton>
            <a
              href={WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy backdrop-blur transition-colors hover:border-brand-blue/30 hover:bg-brand-mist"
            >
              Write a Review
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Highlights strip                                                            */
/* -------------------------------------------------------------------------- */

function HighlightsStrip({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  const highlights = [
    {
      icon: "star" as const,
      label: `${rating.toFixed(1)} Google rating`,
      note: "Verified on Google",
    },
    {
      icon: "people" as const,
      label: `${reviewCount.toLocaleString()} reviews`,
      note: "Neighbors from Geneva &amp; the Fox Valley",
    },
    {
      icon: "shield" as const,
      label: "Verified &amp; unedited",
      note: "Powered by Google Business",
    },
    {
      icon: "heart" as const,
      label: "Real patients",
      note: "Real, in-their-own-words stories",
    },
  ] as const;
  return (
    <section className="border-y border-brand-line bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Stagger
          className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4"
          gap={0.06}
        >
          {highlights.map((h) => (
            <StaggerItem key={h.label}>
              <div className="group flex items-start gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 text-brand-blue transition-colors group-hover:from-brand-blue group-hover:to-brand-cyan group-hover:text-white"
                >
                  <HighlightIcon name={h.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p
                    className="text-sm font-bold text-brand-navy"
                    dangerouslySetInnerHTML={{ __html: h.label }}
                  />
                  <p
                    className="mt-1 text-xs leading-relaxed text-brand-ink/60"
                    dangerouslySetInnerHTML={{ __html: h.note }}
                  />
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
/* Reviews CTA, mirrors what actually lives on the page                       */
/* -------------------------------------------------------------------------- */

function ReviewsCTA({
  rating,
  reviewCount,
  reviewsUrl,
}: {
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-line bg-gradient-to-br from-white via-brand-mist/40 to-white p-10 shadow-xl shadow-brand-navy/5 sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-cyan/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-brand-blue/15 blur-3xl"
            />
            {!reduce && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute right-8 top-8"
                animate={{ y: [0, -6, 0], rotate: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: EASE }}
              >
                <StarIcon className="h-6 w-6 text-brand-cyan/70" />
              </motion.div>
            )}

            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                  Real people, real stories
                </p>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl">
                  Read our reviews on Google
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-ink/75 sm:text-lg">
                  Every review on our profile is written by an actual patient
                  and verified by Google, nothing curated, nothing
                  cherry-picked. Read what your neighbors are saying, then add
                  your own experience if we&rsquo;ve had the privilege of
                  caring for you.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton>
                    <a
                      href={reviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/30 transition-shadow hover:shadow-xl hover:shadow-brand-blue/50"
                    >
                      View All Reviews
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </MagneticButton>
                  <a
                    href={WRITE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy transition-colors hover:border-brand-blue/30 hover:bg-brand-mist"
                  >
                    Write a Review
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <ScoreCard rating={rating} reviewCount={reviewCount} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ScoreCard({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-line bg-white p-6 shadow-lg shadow-brand-navy/5 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-brand-cyan/25 blur-2xl"
      />
      <div className="relative flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-md">
          <GoogleGIcon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-ink/60">
            Google Business Profile
          </p>
          <p className="text-base font-bold text-brand-navy">Genesis Integrative Medicine</p>
        </div>
      </div>
      <div className="mt-6 flex items-end gap-3">
        <p className="text-5xl font-extrabold leading-none text-brand-navy">{rating.toFixed(1)}</p>
        <div className="pb-1">
          <StarRow />
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-ink/60">
            Average rating
          </p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-brand-line pt-6">
        <div>
          <p className="text-2xl font-extrabold text-brand-blue">{reviewCount.toLocaleString()}</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-ink/60">
            Verified reviews
          </p>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-brand-blue">Geneva, IL</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-ink/60">
            Fox Valley clinic
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Reviews grid, verbatim Google reviews                                      */
/* -------------------------------------------------------------------------- */

function ReviewsGrid({ reviews }: { reviews: TestimonialsViewItem[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="bg-brand-mist/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            From Google
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            What our patients are saying
          </h2>
        </Reveal>
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {reviews.map((review, i) => (
            <ReviewCard
              key={review.name + i}
              name={review.name}
              quote={review.quote}
              when={review.when ?? "Posted on Google"}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Trust block                                                                 */
/* -------------------------------------------------------------------------- */

function TrustBlock() {
  return (
    <section className="relative overflow-hidden bg-brand-mist/50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-1">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                Why we link out
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl">
                Reviews you can trust.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-ink/70">
                We publish reviews directly on Google so nothing can be edited,
                filtered, or fabricated on our end. What you read is what our
                patients wrote.
              </p>
            </Reveal>
          </div>
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2" gap={0.06}>
            {[
              {
                title: "Verified by Google",
                body: "Reviewers sign in with a Google account, and every review is time-stamped and traceable.",
                icon: "shield" as const,
              },
              {
                title: "Nothing hidden",
                body: "You&rsquo;ll see every rating, not just the five-star ones. Full transparency, always.",
                icon: "eye" as const,
              },
              {
                title: "In their own words",
                body: "No paraphrasing, no marketing polish. Every quote is preserved as the patient wrote it.",
                icon: "quote" as const,
              },
              {
                title: "Updated live",
                body: "New reviews appear on Google the moment they&rsquo;re posted, no delay, no gatekeeper.",
                icon: "spark" as const,
              },
            ].map((c) => (
              <StaggerItem key={c.title}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-brand-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 text-brand-blue transition-colors group-hover:from-brand-blue group-hover:to-brand-cyan group-hover:text-white">
                    <TrustIcon name={c.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-brand-navy">{c.title}</h3>
                  <p
                    className="mt-2 text-sm leading-relaxed text-brand-ink/70"
                    dangerouslySetInnerHTML={{ __html: c.body }}
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
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

type HighlightIconName = "star" | "people" | "shield" | "heart";
function HighlightIcon({
  name,
  ...props
}: { name: HighlightIconName } & React.SVGProps<SVGSVGElement>) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "star":
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...common} {...props}>
          <path d="m12 3 2.8 6 6.2.6-4.8 4.4 1.5 6.1L12 17l-5.7 3.1 1.5-6.1L3 9.6 9.2 9Z" />
        </svg>
      );
    case "people":
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...common} {...props}>
          <circle cx="8" cy="9" r="3" />
          <circle cx="17" cy="10" r="2.4" />
          <path d="M2.5 20a5.5 5.5 0 0 1 11 0M13.5 20a4.5 4.5 0 0 1 8 0" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...common} {...props}>
          <path d="M12 3 4.5 6v6c0 4.5 3.3 7.8 7.5 9 4.2-1.2 7.5-4.5 7.5-9V6Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...common} {...props}>
          <path d="M12 20s-7-4.3-7-10a4.5 4.5 0 0 1 7-3.7A4.5 4.5 0 0 1 19 10c0 5.7-7 10-7 10Z" />
        </svg>
      );
  }
}

type TrustIconName = "shield" | "eye" | "quote" | "spark";
function TrustIcon({
  name,
  ...props
}: { name: TrustIconName } & React.SVGProps<SVGSVGElement>) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "shield":
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...common} {...props}>
          <path d="M12 3 4.5 6v6c0 4.5 3.3 7.8 7.5 9 4.2-1.2 7.5-4.5 7.5-9V6Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "eye":
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...common} {...props}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "quote":
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...common} {...props}>
          <path d="M7 10c0-2 1.5-4 4-4M15 10c0-2 1.5-4 4-4" />
          <path d="M4 15h6v-5H4v5Zm8 0h6v-5h-6v5Z" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...common} {...props}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
        </svg>
      );
  }
}
