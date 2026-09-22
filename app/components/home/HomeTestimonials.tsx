"use client";

import Link from "next/link";
import { useRef } from "react";

import { MagneticButton, Reveal } from "@/app/components/home/motion-primitives";
import {
  GoogleGIcon,
  ReviewCard,
  StarRow,
} from "@/app/components/testimonials/ReviewCard";

export type HomeTestimonialItem = {
  name: string;
  quote: string;
  when?: string;
};

export function HomeTestimonials({
  items,
  rating,
  reviewCount,
  reviewsUrl,
}: {
  items: HomeTestimonialItem[];
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  const ratingLabel = Number.isInteger(rating) ? rating.toFixed(1) : String(rating);

  const doScroll = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="bg-brand-mist/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
              <GoogleGIcon className="h-3.5 w-3.5" />
              Google
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              What our patients are saying
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <StarRow label={`${ratingLabel} out of 5 stars`} />
              <p className="text-sm font-semibold text-brand-navy">
                {ratingLabel} from {reviewCount.toLocaleString()} Google reviews
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Scroll reviews left"
                onClick={() => doScroll(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-navy transition-all hover:border-brand-blue/40 hover:bg-brand-navy hover:text-white"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll reviews right"
                onClick={() => doScroll(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-navy transition-all hover:border-brand-blue/40 hover:bg-brand-navy hover:text-white"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-brand-mist/40 to-transparent sm:w-12"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-brand-mist/40 to-transparent sm:w-12"
        />
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:px-8 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((review, i) => (
            <div
              key={`${review.name}-${i}`}
              className="w-[min(100%,22rem)] shrink-0 snap-start sm:w-[24rem]"
            >
              <ReviewCard
                name={review.name}
                quote={review.quote}
                when={review.when ?? "Posted on Google"}
                index={i}
                className="flex h-[22rem] flex-col"
                quoteClassName="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:thin]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-center gap-3 px-6">
        <MagneticButton>
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/30 transition-shadow hover:shadow-xl hover:shadow-brand-blue/50"
          >
            View all Google reviews
          </a>
        </MagneticButton>
        <Link
          href="/testimonials/"
          className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy transition-colors hover:border-brand-blue/30 hover:bg-brand-mist"
        >
          Read more testimonials
        </Link>
      </div>
    </section>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.5 4.5 7 10l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.5 4.5 13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
