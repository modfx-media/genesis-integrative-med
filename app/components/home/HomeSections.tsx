"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionTemplate, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import {
  CONDITIONS_CATALOG,
  CONDITIONS_STRIP,
  GET_STARTED,
  HERO,
  HOME_CONTACT,
  HOME_VIDEOS,
  INSURANCE,
  REVIEWS_BADGE,
  SERVICE_CARDS,
  SERVICES_CATALOG,
  SURGERIES_SECTION,
  UNLOCK_PAIN_FREE,
  WHY_CHOOSE_US,
  WHY_INTEGRATIVE,
} from "@/app/lib/home-content";
import { BRAND, CONTACT, PROVIDERS } from "@/app/lib/site-config";

import BookNowTrigger from "@/app/components/booking/BookNowTrigger";
import ContactFormEmbed from "@/app/components/contact/ContactFormEmbed";

import {
  CountUp,
  MagneticButton,
  Marquee,
  Reveal,
  Stagger,
  StaggerItem,
  useParallaxY,
  useSpotlight,
} from "./motion-primitives";

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export function HomeHero({
  rating,
  reviewCount,
  reviewsUrl = CONTACT.reviewsUrl,
}: {
  rating?: number;
  reviewCount?: number;
  reviewsUrl?: string;
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const { sx, sy, reduce } = useSpotlight(ref);
  const parallaxY = useParallaxY(visualRef, 30);
  const spotlight = useMotionTemplate`radial-gradient(600px 400px at ${sx}px ${sy}px, rgba(0,140,200,0.14), transparent 70%)`;

  return (
    <section ref={ref} className="relative overflow-hidden bg-brand-mist">
      {/* Background photo, blurred clinic reception (from live site) */}
      <Image
        src="/images/home/hero-clinic-bg.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      />
      {/* Legibility overlay, heavy white on left, softer on right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/70"
      />
      {/* Static dot pattern, subtle on top of image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #00508C 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />
      {/* Ambient blurs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand-sky/25 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[520px] rounded-full bg-brand-cyan/20 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={reduce ? undefined : { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      {/* Cursor spotlight */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: spotlight }}
        />
      )}

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <Stagger className="lg:col-span-7" gap={0.09} delayChildren={0.15}>
          <StaggerItem>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
              <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
              {HERO.kicker}
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
              {HERO.siteTitle}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 max-w-2xl text-2xl font-semibold leading-tight sm:text-3xl">
              <span className="bg-gradient-to-r from-brand-navy via-brand-blue to-brand-cyan bg-clip-text text-transparent">
                {HERO.headline}
              </span>
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-ink/75 sm:text-lg">
              {HERO.intro}
            </p>
          </StaggerItem>

          <StaggerItem className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Link
                href={HERO.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/25 transition-shadow hover:shadow-xl hover:shadow-brand-blue/40"
              >
                {HERO.primaryCta.label}
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </MagneticButton>
            <MagneticButton strength={14}>
              <Link
                href={HERO.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy transition-colors hover:border-brand-blue/30 hover:bg-brand-mist"
              >
                {HERO.secondaryCta.label}
              </Link>
            </MagneticButton>
            <BookNowTrigger className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy transition-colors hover:text-brand-blue">
              {HERO.bookingCta.label}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </BookNowTrigger>
          </StaggerItem>
        </Stagger>

        {/* Visual, modern specialty card (no big photo tile) */}
        <motion.div
          ref={visualRef}
          className="lg:col-span-5"
          style={{ y: parallaxY }}
        >
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-brand-line bg-white/90 p-6 shadow-2xl shadow-brand-navy/15 backdrop-blur-md sm:p-7"
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {/* Ambient orb inside the card */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-cyan/15 blur-3xl"
              animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.55, 0.85, 0.55] }}
              transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-brand-blue/15 blur-3xl"
              animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={reduce ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />

            {/* Top row: kicker + Now Booking */}
            <div className="relative flex items-center justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                Our specialties
              </p>
              <span className="flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-50/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                <span aria-hidden className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Now booking
              </span>
            </div>

            {/* 3×2 specialty grid */}
            <div className="relative mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "Shockwave", href: "/services/shockwave-therapy/", Icon: WavesIcon },
                { label: "Cold Laser", href: "/services/cold-laser/", Icon: SunriseIcon },
                { label: "Chiropractic", href: "/services/chiropractic-care/", Icon: SpiralIcon },
                { label: "PRP", href: "/services/prp-injections-geneva/", Icon: PillIcon },
                { label: "Regenerative", href: "/services/regenerative-medicine/", Icon: HandHealingIcon },
                { label: "Weight Loss", href: "/services/peptide-weight-loss/", Icon: LeafIcon },
              ].map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={spec.href}
                    className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-brand-line bg-white/70 p-3 text-center transition-all hover:-translate-y-0.5 hover:border-brand-blue/30 hover:bg-white hover:shadow-md hover:shadow-brand-blue/10"
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/25"
                    >
                      <spec.Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[10px] font-bold uppercase leading-tight tracking-[0.08em] text-brand-navy">
                      {spec.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer: reviews + location */}
            <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-brand-line pt-5">
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <div aria-hidden className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-3.5 w-3.5" />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-navy transition-colors group-hover:text-brand-blue">
                  {rating && reviewCount
                    ? `${rating.toFixed(1)} · ${reviewCount.toLocaleString()} Google reviews`
                    : "Read reviews"}
                </span>
              </a>
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-ink/60">
                <MapPinIcon className="h-3 w-3 text-brand-blue" />
                Geneva, IL
              </span>
            </div>
          </motion.div>

          {/* Trust stats, pinned below the specialty card */}
          <motion.dl
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            className="mt-8 grid grid-cols-3 gap-4 border-t border-brand-line/70 pt-6"
          >
            <TrustStat
              label="Years in Geneva"
              value={<CountUp to={20} suffix="+" />}
            />
            <TrustStat
              label="Therapies"
              value={<CountUp to={11} suffix="+" />}
            />
            <TrustStat label="Approach" value={<span>Root-Cause</span>} />
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-ink/50">
        {label}
      </dt>
      <dd className="mt-1 whitespace-nowrap text-xl font-extrabold tracking-tight text-brand-navy">
        {value}
      </dd>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Insurance strip (marquee)                                                  */
/* -------------------------------------------------------------------------- */

export function InsuranceStrip() {
  return (
    <section className="border-y border-brand-line bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-8 flex items-center justify-center gap-3 text-center">
          <span
            aria-hidden
            className="h-px w-8 bg-brand-line"
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-ink/50">
            {INSURANCE.kicker}
          </p>
          <span aria-hidden className="h-px w-8 bg-brand-line" />
        </Reveal>
        <Marquee speed={35} className="items-center">
          {INSURANCE.carriers.map((c) => (
            <div
              key={c.name}
              className="flex h-24 shrink-0 items-center justify-center px-4 opacity-80 transition-opacity hover:opacity-100 sm:h-28"
            >
              <Image
                src={c.logo}
                alt={c.name}
                width={220}
                height={100}
                className="h-16 w-auto object-contain sm:h-20"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Services showcase, horizontal marquee                                     */
/* -------------------------------------------------------------------------- */

export function ServicesShowcase() {
  const allItems = SERVICES_CATALOG;
  // Featured shortlist, the rest live behind the "View all" button below.
  const items = allItems.slice(0, 6);
  const [active, setActive] = useState(0);
  const current = items[active];
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-brand-mist py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-[400px] w-[500px] rounded-full bg-brand-sky/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: heading + interactive list */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                Our services
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
                Every therapy we offer,{" "}
                <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                  under one roof
                </span>
              </h2>
            </Reveal>

            <div className="mt-10 h-px w-full bg-brand-line/70" />

            <ul className="divide-y divide-brand-line/70">
              {items.map((item, i) => (
                <ServiceRow
                  key={item.href}
                  item={item}
                  index={i}
                  isActive={active === i}
                  onEnter={() => setActive(i)}
                />
              ))}
            </ul>

            {/* View all services CTA below the featured list */}
            <Reveal delay={0.15}>
              <div className="mt-8 flex items-center gap-4">
                <div
                  aria-hidden
                  className="h-px flex-1 bg-brand-line/70"
                />
                <MagneticButton strength={14}>
                  <Link
                    href="/services/"
                    className="group inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy transition-colors hover:border-brand-blue hover:bg-brand-navy hover:text-white"
                  >
                    View all {allItems.length} services
                    <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </MagneticButton>
                <div
                  aria-hidden
                  className="h-px flex-1 bg-brand-line/70"
                />
              </div>
            </Reveal>
          </div>

          {/* Right: preview pane (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 mx-auto flex max-w-[380px] flex-col">
              <Reveal>
                <p className="max-w-xs text-sm leading-relaxed text-brand-ink/70">
                  Safe, non-invasive care, combining advanced medicine with
                  holistic therapies to treat the root cause.
                </p>
              </Reveal>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="relative mt-6 aspect-[4/5] w-full overflow-hidden rounded-3xl bg-brand-mist shadow-2xl shadow-brand-navy/20"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.href}
                    initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.image}
                      alt={current.alt}
                      fill
                      sizes="(max-width: 1024px) 0px, 380px"
                      quality={100}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/25 to-transparent" />
                    <div className="absolute inset-x-6 bottom-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-cyan">
                        {String(active + 1).padStart(2, "0")} /{" "}
                        {String(items.length).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
                        {current.title}
                      </h3>
                      <Link
                        href={current.href}
                        className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:text-brand-cyan"
                      >
                        Learn more
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  item,
  index,
  isActive,
  onEnter,
}: {
  item: (typeof SERVICES_CATALOG)[number];
  index: number;
  isActive: boolean;
  onEnter: () => void;
}) {
  return (
    <li onMouseEnter={onEnter} onFocus={onEnter}>
      <Link
        href={item.href}
        className={`group flex items-center gap-4 py-3.5 pr-2 transition-colors ${
          isActive
            ? "text-brand-navy"
            : "text-brand-ink/45 hover:text-brand-ink"
        }`}
      >
        <span
          className={`w-7 shrink-0 text-[11px] font-bold tabular-nums transition-colors ${
            isActive ? "text-brand-blue" : "text-brand-ink/25"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`flex-1 text-lg font-bold tracking-tight transition-transform sm:text-xl lg:text-2xl ${
            isActive ? "translate-x-1" : "group-hover:translate-x-0.5"
          }`}
        >
          {item.title}
        </span>
        <span
          aria-hidden
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
            isActive
              ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30"
              : "border border-brand-line text-brand-ink/40 group-hover:border-brand-blue/30 group-hover:text-brand-blue"
          }`}
        >
          <ArrowUpRightIcon className="h-3 w-3" />
        </span>
      </Link>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Conditions showcase, horizontal marquee (reverse direction)                */
/* -------------------------------------------------------------------------- */

export function ConditionsShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  // Auto-scroll loop with seamless reset, items are duplicated in the DOM,
  // so when we hit the halfway mark we jump back to the equivalent position
  // and the visual is identical to before the jump.
  useEffect(() => {
    if (reduce || paused) return;
    const el = scrollerRef.current;
    if (!el) return;
    let rafId = 0;
    const step = () => {
      if (el) {
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0 && el.scrollLeft >= halfWidth) {
          el.scrollLeft = el.scrollLeft - halfWidth;
        }
        el.scrollLeft += 0.5;
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [paused, reduce]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pauseBriefly = (ms = 2500) => {
    setPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setPaused(false), ms);
  };

  const doScroll = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 288, behavior: "smooth" });
    pauseBriefly();
  };

  // Duplicate items so the auto-scroll can loop seamlessly.
  const items = [...CONDITIONS_CATALOG, ...CONDITIONS_CATALOG];

  return (
    <section className="relative bg-brand-mist py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
              Conditions we treat
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Care for the whole body, head to foot
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Scroll conditions left"
                onClick={() => doScroll(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-navy transition-all hover:border-brand-blue/40 hover:bg-brand-navy hover:text-white"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll conditions right"
                onClick={() => doScroll(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-navy transition-all hover:border-brand-blue/40 hover:bg-brand-navy hover:text-white"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
              <MagneticButton strength={14}>
                <Link
                  href="/conditions-treated/"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy transition-colors hover:border-brand-blue hover:bg-brand-navy hover:text-white"
                >
                  View all conditions
                  <ArrowRightIcon className="h-3 w-3" />
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* Boxed auto-scroller with edge-fade masks; hover to pause */}
        <div
          className="relative mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-brand-mist to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-brand-mist to-transparent"
          />
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((it, i) => (
              <div key={`${it.href}-${i}`} className="shrink-0">
                <ShowcaseCard item={it} />
              </div>
            ))}
          </div>

          {/* Accent bar */}
          <div className="mx-auto mt-8 h-px w-24 rounded-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-cyan opacity-70" />
        </div>
      </div>
    </section>
  );
}

type ShowcaseItem = {
  readonly title: string;
  readonly href: string;
  readonly image: string;
  readonly alt: string;
};

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <Link
      href={item.href}
      className="group relative block h-72 w-56 shrink-0 overflow-hidden rounded-2xl bg-brand-ink shadow-lg shadow-brand-navy/10 ring-1 ring-black/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-navy/20 sm:h-80 sm:w-64"
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 240px, 280px"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Bottom-to-top dark gradient for text contrast */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/40 to-transparent"
      />
      {/* Brand tint overlay on hover */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Top-right chevron badge */}
      <span
        aria-hidden
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100"
      >
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </span>
      {/* Title */}
      <div className="absolute inset-x-4 bottom-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-cyan/90">
          Learn more
        </p>
        <h3 className="mt-1 text-lg font-bold leading-tight text-white sm:text-xl">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Service cards                                                              */
/* -------------------------------------------------------------------------- */

export function ServiceCards() {
  // Image + alt for each of the 4 featured SERVICE_CARDS, in order.
  const cardMedia: readonly { image: string; alt: string }[] = [
    {
      image: "/images/services/shockwave-therapy-card.jpg",
      alt: "Shockwave therapy for musculoskeletal pain",
    },
    {
      image: "/images/services/cold-laser-card.jpg",
      alt: "Cold laser therapy treatment",
    },
    {
      image: "/images/services/chiropractic-card.jpg",
      alt: "Chiropractic adjustment for pain relief",
    },
    {
      image: "/images/services/regenerative-medicine-card.webp",
      alt: "Regenerative medicine therapy",
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            What we treat
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            Care built around your body, not a diagnosis code.
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.09}>
          {SERVICE_CARDS.map((s, i) => {
            const media = cardMedia[i];
            return (
              <StaggerItem key={s.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="group h-full"
                >
                  <Link
                    href={s.href}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white transition-shadow hover:shadow-xl hover:shadow-brand-navy/10"
                  >
                    {/* Image slot + numbered badge overhanging its bottom edge */}
                    <div className="relative">
                      <div className="relative aspect-[16/11] overflow-hidden bg-brand-ink">
                        <Image
                          src={media.image}
                          alt={media.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                          quality={92}
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/10 to-transparent"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-blue to-brand-cyan transition-transform duration-500 group-hover:scale-x-100"
                        />
                      </div>
                      <motion.div
                        className="absolute -bottom-5 left-6 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-lg shadow-brand-blue/30 ring-4 ring-white"
                        whileHover={{ scale: 1.06, rotate: -4 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="text-sm font-bold tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6 pt-10">
                      <h3 className="text-lg font-bold text-brand-navy">{s.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-ink/70">
                        {s.body}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue transition-colors group-hover:text-brand-navy">
                        Learn more
                        <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Why Integrative Medicine + feature triad                                    */
/* -------------------------------------------------------------------------- */

export function WhyIntegrativeMedicine() {
  const { heading, highlightWord, mosaic, featureChips, ctas, paragraphs, kicker } =
    WHY_INTEGRATIVE;
  const headlineParts = splitHeadline(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-brand-mist py-20 sm:py-24">
      {/* Ambient decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-[420px] w-[420px] rounded-full bg-brand-sky/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-16 h-[380px] w-[380px] rounded-full bg-brand-cyan/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #00508C 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left, photo mosaic */}
          <Reveal className="lg:col-span-6">
            <PhotoMosaic mosaic={mosaic} />
          </Reveal>

          {/* Right, editorial copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-px w-10 bg-gradient-to-r from-transparent via-brand-blue to-brand-cyan"
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                  {kicker}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-[3.25rem]">
                {headlineParts.before}
                {headlineParts.highlight && (
                  <span className="relative inline-block">
                    <span className="relative z-10">{headlineParts.highlight}</span>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-sm bg-gradient-to-r from-brand-cyan/45 via-brand-sky/45 to-brand-cyan/25 sm:h-4"
                    />
                  </span>
                )}
                {headlineParts.after}
              </h2>
            </Reveal>
            <Stagger
              className="mt-7 space-y-5 text-base leading-relaxed text-brand-ink/75"
              gap={0.08}
            >
              {paragraphs.map((p, i) => (
                <StaggerItem key={i}>
                  <p>{p}</p>
                </StaggerItem>
              ))}
            </Stagger>

            {/* 2x2 feature chips */}
            <Stagger
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
              gap={0.06}
            >
              {featureChips.map((chip) => (
                <StaggerItem key={chip.title}>
                  <FeatureChip
                    title={chip.title}
                    body={chip.body}
                    icon={chip.icon}
                  />
                </StaggerItem>
              ))}
            </Stagger>

            {/* CTA + phone */}
            <Reveal delay={0.1}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton strength={14}>
                  <Link
                    href={ctas[0].href}
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-navy to-brand-blue px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-navy/25 transition-shadow hover:shadow-xl hover:shadow-brand-navy/35"
                  >
                    {ctas[0].label}
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </MagneticButton>
                <a
                  href={CONTACT.phoneHref}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-brand-line bg-white/80 px-5 py-3 text-sm font-bold text-brand-navy backdrop-blur transition-colors hover:border-brand-blue/30 hover:bg-white"
                >
                  <span
                    aria-hidden
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 text-brand-blue transition-colors group-hover:from-brand-blue group-hover:to-brand-cyan group-hover:text-white"
                  >
                    <PhoneMiniIcon className="h-4 w-4" />
                  </span>
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Stagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3" gap={0.1}>
          {WHY_INTEGRATIVE.featureCards.map((card) => (
            <StaggerItem key={card.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Link
                  href={card.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-line transition-all hover:shadow-xl hover:shadow-brand-navy/10 hover:ring-brand-blue/30"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 420px"
                      quality={90}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-brand-navy">{card.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-ink/70">
                      {card.body}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue">
                      View More
                      <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Why Integrative Medicine helpers                                            */
/* -------------------------------------------------------------------------- */

type MosaicData = typeof WHY_INTEGRATIVE.mosaic;
type FeatureChipIcon = (typeof WHY_INTEGRATIVE.featureChips)[number]["icon"];

function splitHeadline(
  heading: string,
  highlight: string | undefined,
): { before: string; highlight: string | null; after: string } {
  if (!highlight) return { before: heading, highlight: null, after: "" };
  const idx = heading.indexOf(highlight);
  if (idx < 0) return { before: heading, highlight: null, after: "" };
  return {
    before: heading.slice(0, idx),
    highlight,
    after: heading.slice(idx + highlight.length),
  };
}

function PhotoMosaic({ mosaic }: { mosaic: MosaicData }) {
  return (
    <div className="relative">
      {/* Decorative dot cluster behind mosaic */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 opacity-40 sm:h-28 sm:w-28"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #64B4DC 1.5px, transparent 0)",
          backgroundSize: "12px 12px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 opacity-40 sm:h-28 sm:w-28"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #64B4DC 1.5px, transparent 0)",
          backgroundSize: "12px 12px",
        }}
      />

      {/*
        Mobile: 2-col grid, big photo full-width, small1/small2 side by
        side, stat card gets its own full-width auto-height row so its
        text never gets clipped. Desktop (sm:): 12-col bento grid, grid
        auto-placement recreates the original nested small2+stat split.
      */}
      <div className="relative grid grid-cols-2 grid-rows-[200px_140px_auto] gap-3 sm:grid-cols-12 sm:grid-rows-[280px_160px] sm:gap-4">
        {/* Big portrait, spans 2 rows on the left (desktop) */}
        <div className="relative col-span-2 overflow-hidden rounded-2xl shadow-lg shadow-brand-navy/10 ring-1 ring-brand-line sm:col-span-7 sm:row-span-2">
          <Image
            src={mosaic.big.src}
            alt={mosaic.big.alt}
            fill
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 60vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/25 via-transparent to-transparent"
          />
          {/* Badge chip top-left */}
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-xl bg-white/95 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-navy shadow-md backdrop-blur sm:left-4 sm:top-4">
            <span
              aria-hidden
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-cyan text-white"
            >
              <LeafBadgeIcon className="h-3.5 w-3.5" />
            </span>
            {mosaic.badge}
          </span>
        </div>

        {/* Small square */}
        <div className="relative col-span-1 overflow-hidden rounded-2xl shadow-md shadow-brand-navy/10 ring-1 ring-brand-line sm:col-span-5">
          <Image
            src={mosaic.small1.src}
            alt={mosaic.small1.alt}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Small square */}
        <div className="relative col-span-1 overflow-hidden rounded-2xl shadow-md shadow-brand-navy/10 ring-1 ring-brand-line sm:col-span-2">
          <Image
            src={mosaic.small2.src}
            alt={mosaic.small2.alt}
            fill
            sizes="(min-width: 1024px) 130px, 20vw"
            className="object-cover"
          />
        </div>

        {/* Stat card, full-width row on mobile so text has room to breathe */}
        <div className="relative col-span-2 flex flex-col justify-between gap-3 rounded-2xl border border-brand-line bg-white p-4 shadow-md shadow-brand-navy/10 sm:col-span-3 sm:gap-2 sm:overflow-hidden sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-blue text-white shadow-sm"
            >
              <HeartBadgeIcon className="h-[18px] w-[18px]" />
            </span>
            <span className="flex items-center gap-1 rounded-full bg-brand-mist px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-brand-blue">
              <StarMiniIcon className="h-3 w-3" />
              {mosaic.stat.trustLabel}
            </span>
          </div>
          <div>
            <p className="text-sm font-extrabold leading-tight text-brand-navy sm:text-base">
              {mosaic.stat.value}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-brand-ink/60">
              {mosaic.stat.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureChip({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: FeatureChipIcon;
}) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-brand-line bg-white/70 p-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand-blue/30 hover:bg-white hover:shadow-md hover:shadow-brand-navy/10">
      <span
        aria-hidden
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 text-brand-blue transition-colors group-hover:from-brand-blue group-hover:to-brand-cyan group-hover:text-white"
      >
        <FeatureChipIconGlyph name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold leading-snug text-brand-navy">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-brand-ink/65">{body}</p>
      </div>
    </div>
  );
}

function FeatureChipIconGlyph({
  name,
  ...props
}: { name: FeatureChipIcon } & React.SVGProps<SVGSVGElement>) {
  switch (name) {
    case "heart":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path
            d="M12 20s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.83A4.5 4.5 0 0 1 19 10c0 5.65-7 10-7 10Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path
            d="M12 3.5 5 6v6c0 4.5 3.05 7.9 7 8.5 3.95-.6 7-4 7-8.5V6l-7-2.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="m9 12 2.2 2.2L15 10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "medal":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <circle cx="12" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="m8 10 1.5-6h5L16 10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path
            d="m12 12 .9 1.8 2 .3-1.45 1.4.35 2L12 16.6l-1.8.9.35-2L9.1 14.1l2-.3.9-1.8Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "sparkle":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path
            d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3.5 3.5M14.5 14.5 18 18M6 18l3.5-3.5M14.5 9.5 18 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

function LeafBadgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 20c0-9 6-14 16-14 0 10-6 15-16 15Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 18c4-4 6-7 10-10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartBadgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 20s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.83A4.5 4.5 0 0 1 19 10c0 5.65-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarMiniIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.2 1.05 5.9L12 17l-5.25 2.8L7.8 13.9 3.5 9.7l5.9-.8L12 3.5Z" />
    </svg>
  );
}

function PhoneMiniIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Surgeries and Medication, dark comparison infographic                      */
/* -------------------------------------------------------------------------- */

export function SurgeriesSection() {
  const reduce = useReducedMotion();

  // Bullets pulled directly from the paragraphs' own phrasing,
  // no new content, just a visual index of what's stated below.
  const conventional = [
    { label: "Surgery", Icon: ScalpelIcon },
    { label: "Pain medication", Icon: PillIcon },
    { label: "Symptom relief", Icon: BandagePlusIcon },
    { label: "Recovery risks", Icon: AlertIcon },
  ];
  const integrative = [
    { label: "Physical therapy", Icon: HandHealingIcon },
    { label: "Lifestyle changes", Icon: LeafIcon },
    { label: "Integrative therapies", Icon: SpiralIcon },
    { label: "Root-cause healing", Icon: SparkleIcon },
  ];

  const paragraphIcons = [LayersIcon, ShieldAlertIcon, SunriseIcon];

  return (
    <section className="relative overflow-hidden bg-brand-ink py-20 text-white sm:py-24">
      {/* Hairlines + ambient blurs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-brand-blue/25 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={reduce ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/5 h-80 w-80 rounded-full bg-brand-cyan/15 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={reduce ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Fine grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,184,230,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,230,0.9) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-sky">
              A different first step
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {SURGERIES_SECTION.heading}
            </h2>
          </Reveal>
        </div>

        {/* Comparison infographic */}
        <motion.div
          className="relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent shadow-[0_30px_120px_-40px_rgba(0,184,230,0.35)] backdrop-blur-sm"
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
            {/* Conventional panel */}
            <motion.div
              className="relative p-8 sm:p-10"
              initial={reduce ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/50"
                >
                  <XIcon className="h-4 w-4" />
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                  Conventional
                </p>
              </div>
              <h3 className="mt-4 text-xl font-bold text-white/85 sm:text-2xl">
                Treats the symptom
              </h3>
              <ul className="mt-6 space-y-3">
                {conventional.map(({ label, Icon }, i) => (
                  <motion.li
                    key={label}
                    className="flex items-center gap-3 text-sm text-white/60"
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.45 + i * 0.08,
                    }}
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/45"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{label}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Center connector, path draw animation */}
            <div className="relative flex items-center justify-center px-2 py-2 md:px-4">
              {/* Vertical divider on mobile / horizontal arrow on desktop */}
              <motion.svg
                viewBox="0 0 120 40"
                className="hidden h-10 w-28 md:block"
                fill="none"
                aria-hidden
              >
                <motion.path
                  d="M4 20 L 108 20"
                  stroke="url(#surg-grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.35 }}
                />
                <motion.path
                  d="M100 12 L 116 20 L 100 28"
                  stroke="#00B8E6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                />
                <defs>
                  <linearGradient id="surg-grad" x1="0" x2="1">
                    <stop offset="0" stopColor="#64B4DC" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#00B8E6" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </motion.svg>

              <motion.svg
                viewBox="0 0 40 120"
                className="block h-24 w-10 md:hidden"
                fill="none"
                aria-hidden
              >
                <motion.path
                  d="M20 4 L 20 108"
                  stroke="url(#surg-grad-v)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.35 }}
                />
                <motion.path
                  d="M12 100 L 20 116 L 28 100"
                  stroke="#00B8E6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduce ? false : { opacity: 0, y: -6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                />
                <defs>
                  <linearGradient id="surg-grad-v" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#64B4DC" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#00B8E6" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Vertical divider line (subtle, static) */}
              <div
                aria-hidden
                className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent md:block"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent md:hidden"
              />
            </div>

            {/* Integrative panel */}
            <motion.div
              className="relative overflow-hidden p-8 sm:p-10"
              initial={reduce ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            >
              {/* Panel glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-cyan/15 blur-3xl"
              />
              <div className="relative flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan shadow-[0_0_20px_-2px_rgba(0,184,230,0.6)]"
                >
                  <CheckIcon className="h-4 w-4" />
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                  Integrative
                </p>
              </div>
              <h3 className="relative mt-4 text-xl font-bold text-white sm:text-2xl">
                <span className="bg-gradient-to-r from-white via-brand-sky to-brand-cyan bg-clip-text text-transparent">
                  Heals the cause
                </span>
              </h3>
              <ul className="relative mt-6 space-y-3">
                {integrative.map(({ label, Icon }, i) => (
                  <motion.li
                    key={label}
                    className="flex items-center gap-3 text-sm text-white/90"
                    initial={reduce ? false : { opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.55 + i * 0.08,
                    }}
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan shadow-[0_0_18px_-4px_rgba(0,184,230,0.7)]"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{label}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Paragraphs, themed cards */}
        <Stagger className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3" gap={0.09}>
          {SURGERIES_SECTION.paragraphs.map((p, i) => {
            const IconCmp = paragraphIcons[i];
            return (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-start gap-3">
                    <motion.span
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-cyan/30 bg-gradient-to-br from-brand-blue/20 to-brand-cyan/10 text-brand-cyan shadow-[0_0_24px_-6px_rgba(0,184,230,0.7)]"
                      whileHover={reduce ? undefined : { rotate: [0, -6, 6, -3, 0] }}
                      transition={{ duration: 0.55 }}
                    >
                      <IconCmp className="h-5 w-5" />
                    </motion.span>
                    <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-sky/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-5 text-[15px] leading-relaxed text-white/80">
                    {p}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Unlock Your Path to Pain-Free Living                                        */
/* -------------------------------------------------------------------------- */

export function UnlockPainFreeSection() {
  const services = [
    {
      label: "Shockwave Therapy",
      href: "/services/shockwave-therapy/",
      image: "/images/conditions/shockwave-therapy-back-pain.png",
    },
    {
      label: "Cold Laser",
      href: "/services/cold-laser/",
      image: "/images/services/cold-laser-card.jpg",
    },
    {
      label: "Active Rehab",
      href: "/services/active-rehab-geneva/",
      image: "/images/services/active-rehab/physiotherapist-exam.jpg",
    },
    {
      label: "PRP Injections",
      href: "/services/prp-injections-geneva/",
      image: "/images/services/prp/prp-centrifuge.jpg",
    },
    {
      label: "Chiropractic",
      href: "/services/chiropractic-care/",
      image: "/images/conditions/shoulder-pain/athlete-physio.jpg",
    },
    {
      label: "Regenerative Medicine",
      href: "/services/regenerative-medicine/",
      image: "/images/images copy.jpeg",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      {/* Ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-96 w-[500px] rounded-full bg-brand-sky/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-0 h-80 w-[400px] rounded-full bg-brand-cyan/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
              Chronic pain & injury recovery
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl lg:text-5xl">
              {UNLOCK_PAIN_FREE.heading}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-brand-ink/75">
              {UNLOCK_PAIN_FREE.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <MagneticButton>
              <Link
                href="/contact/"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/25 transition-shadow hover:shadow-xl hover:shadow-brand-blue/40"
              >
                Start Your Recovery
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </MagneticButton>
          </Reveal>

          <Stagger
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-7 lg:gap-4"
            gap={0.07}
          >
            {services.map((item) => (
              <StaggerItem key={item.href}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group h-full"
                >
                  <Link
                    href={item.href}
                    className="relative block h-full overflow-hidden rounded-2xl bg-brand-ink shadow-md shadow-brand-navy/10 ring-1 ring-brand-line transition-all duration-500 hover:ring-brand-cyan/50 hover:shadow-2xl hover:shadow-brand-blue/25"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {/* Base image, starts slightly desaturated + cool, blooms into full color on hover */}
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                        quality={92}
                        className="object-cover saturate-[0.85] brightness-[0.92] contrast-[1.05] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12] group-hover:saturate-100 group-hover:brightness-100"
                      />

                      {/* Cool duotone tint that lifts on hover */}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-br from-brand-navy/25 via-transparent to-brand-blue/15 mix-blend-multiply opacity-70 transition-opacity duration-700 group-hover:opacity-0"
                      />

                      {/* Cyan corner glow, sits in top-right, brightens on hover */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-cyan/25 blur-3xl opacity-40 transition-opacity duration-700 group-hover:opacity-90"
                      />

                      {/* Diagonal shine sweep on hover */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 overflow-hidden"
                      >
                        <div className="absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[350%]" />
                      </div>

                      {/* Bottom ink gradient for label legibility */}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/50 to-transparent"
                      />

                      {/* Soft vignette to add depth around the edges */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_90%_at_50%_50%,transparent_55%,rgba(10,25,41,0.35)_100%)]"
                      />

                      {/* Top accent line that slides in on hover */}
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-sky transition-transform duration-500 group-hover:scale-x-100"
                      />

                      {/* Label + arrow */}
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold leading-tight text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
                            {item.label}
                          </span>
                          <span
                            aria-hidden
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:border-brand-cyan/60 group-hover:bg-brand-cyan group-hover:text-white group-hover:shadow-[0_0_18px_rgba(0,184,230,0.55)]"
                          >
                            <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Doctor / providers snippet                                                  */
/* -------------------------------------------------------------------------- */

export function DoctorSnippet() {
  const reduce = useReducedMotion();

  // Discipline chips shown on the left column, animate in as pillars of care.
  const pillars = [
    { label: "3 providers", icon: "layers" as const },
    { label: "1 clinic", icon: "roof" as const },
    { label: "Shared plan", icon: "link" as const },
  ];

  // Rotating specialty ribbon under the portraits.
  const specialties = [
    "Shockwave Therapy",
    "Cold Laser",
    "Osteopathic Medicine",
    "Chiropractic Care",
    "Physicians Assistant",
    "Regenerative Medicine",
    "Peripheral Neuropathy",
    "Peptide Therapy",
  ];

  // Different vertical offsets create a staggered "wave" layout instead
  // of a flat grid, first card down, middle card up, last card down.
  const offsets = ["lg:mt-10", "lg:-mt-4", "lg:mt-14"] as const;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-mist/25 to-white py-24 sm:py-32">
      {/* Ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-8%] h-[520px] w-[520px] rounded-full bg-brand-sky/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] left-[-6%] h-[360px] w-[420px] rounded-full bg-brand-cyan/15 blur-3xl"
      />
      {/* Dot grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #003D6A 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Floating decorative shapes */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[6%] top-[14%] h-3 w-3 rounded-full bg-brand-cyan"
            animate={{ y: [0, -14, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[10%] top-[26%] h-4 w-4 rounded bg-brand-blue/25"
            animate={{ rotate: [0, 90, 0], y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[14%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-brand-blue"
            animate={{ y: [0, 12, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ────────── Left column: copy + animated pillars ────────── */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue backdrop-blur">
                <span aria-hidden className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                </span>
                Meet your team
              </span>
              <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
                Board-certified{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-blue bg-clip-text text-transparent">
                    integrative care
                  </span>
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-full bg-brand-cyan/25"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </span>{" "}
                in one clinic.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-brand-ink/70">
                An osteopathic physician, chiropractor, and physicians assistant
                working under one roof, so your treatment plan stays
                coordinated and personal.
              </p>
            </Reveal>

            {/* Animated pillar chips */}
            <Stagger className="mt-8 flex flex-wrap gap-2.5" gap={0.09}>
              {pillars.map((p) => (
                <StaggerItem key={p.label}>
                  <div className="group inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-md">
                    <span
                      aria-hidden
                      className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 text-brand-blue"
                    >
                      <PillarIcon variant={p.icon} className="h-3.5 w-3.5" />
                    </span>
                    {p.label}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2}>
              <MagneticButton>
                <Link
                  href="/our-providers/"
                  className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/25 transition-shadow hover:shadow-xl hover:shadow-brand-blue/40"
                >
                  Meet the full team
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </MagneticButton>
            </Reveal>
          </div>

          {/* ────────── Right column: staggered portraits + connectors ────────── */}
          <div className="relative lg:col-span-7">
            {/* Animated SVG connectors linking the three cards (draw-in on view) */}
            <svg
              aria-hidden
              viewBox="0 0 600 400"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            >
              <defs>
                <linearGradient id="connect-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#008CC8" stopOpacity="0" />
                  <stop offset="50%" stopColor="#00A9E0" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#008CC8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 90 260 Q 200 100 300 180 T 510 220"
                stroke="url(#connect-grad)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />
              {[
                { cx: 100, cy: 260 },
                { cx: 300, cy: 180 },
                { cx: 500, cy: 220 },
              ].map((c, i) => (
                <motion.circle
                  key={i}
                  cx={c.cx}
                  cy={c.cy}
                  r={4}
                  fill="#00A9E0"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </svg>

            <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
              {PROVIDERS.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative ${offsets[i] ?? ""}`}
                >
                  <Link
                    href={p.href}
                    className="relative block"
                    aria-label={`${p.name}, ${p.title}`}
                  >
                    {/* Rotating gradient ring on hover */}
                    {!reduce && (
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute -inset-[2px] rounded-[1.75rem] opacity-0 blur-[1px] transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "conic-gradient(from 0deg, #008CC8, #00B8E6, #64B4DC, #008CC8)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    {/* Card body */}
                    <div className="relative overflow-hidden rounded-[1.5rem] border border-brand-line bg-white p-3 shadow-sm transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-brand-navy/15">
                      {/* Portrait tile */}
                      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-brand-mist">
                        <Image
                          src={p.image}
                          alt={`${p.name}, ${p.credentials}`}
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 30vw, 240px"
                          quality={92}
                          className="object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.06]"
                        />
                        {/* Vignette */}
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-brand-ink/55 via-transparent to-transparent"
                        />
                        {/* Floating credential badge */}
                        <motion.span
                          aria-hidden
                          className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/50 bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-navy shadow-lg backdrop-blur"
                          animate={
                            reduce
                              ? undefined
                              : { y: [0, -4, 0] }
                          }
                          transition={{
                            duration: 3.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                          }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan" />
                          {p.credentials}
                        </motion.span>
                        {/* Corner accent */}
                        <span
                          aria-hidden
                          className="absolute bottom-0 left-0 h-14 w-14 border-b-[3px] border-l-[3px] border-brand-cyan/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      </div>

                      {/* Name / title / arrow */}
                      <div className="flex items-center justify-between gap-3 px-2 py-4">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-extrabold text-brand-navy">
                            {p.name}
                          </h3>
                          <p className="mt-0.5 truncate text-[11px] leading-snug text-brand-ink/65">
                            {p.title}
                          </p>
                        </div>
                        <span
                          aria-hidden
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-mist text-brand-navy transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-brand-blue group-hover:to-brand-cyan group-hover:text-white group-hover:shadow-md"
                        >
                          <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Specialty ribbon marquee */}
            <div className="relative mt-10 overflow-hidden rounded-2xl border border-brand-line bg-white/70 py-3 backdrop-blur">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent"
              />
              <Marquee speed={60}>
                {specialties.map((s) => (
                  <span
                    key={s}
                    className="mx-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-navy/80"
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan"
                    />
                    {s}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Local icon for pillar chips (osteopath / chiropractor / assistant hint). */
function PillarIcon({
  variant,
  className,
}: {
  variant: "layers" | "roof" | "link";
  className?: string;
}) {
  if (variant === "layers") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (variant === "roof") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9 15a5 5 0 0 1 0-7l2-2a5 5 0 0 1 7 7l-1 1M15 9a5 5 0 0 1 0 7l-2 2a5 5 0 0 1-7-7l1-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Why Choose Us                                                              */
/* -------------------------------------------------------------------------- */

export function WhyChooseUsSection() {
  return (
    <section className="bg-brand-mist py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            The Genesis difference
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            {WHY_CHOOSE_US.heading}
          </h2>
        </Reveal>
        <Stagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.09}>
          {WHY_CHOOSE_US.blocks.map((b) => (
            <StaggerItem key={b.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full rounded-2xl border border-brand-line bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-brand-navy/5"
              >
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 p-2"
                  whileHover={{ rotate: [0, -6, 6, -3, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={b.icon}
                    alt={b.alt}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
                <h3 className="mt-6 text-lg font-bold text-brand-navy">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">
                  {b.body}
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
/* Conditions strip                                                           */
/* -------------------------------------------------------------------------- */

export function ConditionsStripSection({
  reviewsUrl = CONTACT.reviewsUrl,
}: {
  reviewsUrl?: string;
} = {}) {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      {/* Ambient blurs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-brand-sky/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-brand-cyan/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Centered heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            {CONDITIONS_STRIP.heading}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl lg:text-5xl">
            {CONDITIONS_STRIP.subheading}
          </h2>
        </Reveal>

        {/* Reviews badge centered */}
        <Reveal delay={0.1} className="mt-6 flex justify-center">
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-brand-line bg-white px-3 py-1.5 shadow-sm transition-shadow hover:shadow-md"
          >
            <Image
              src={REVIEWS_BADGE.src}
              alt={REVIEWS_BADGE.alt}
              width={140}
              height={44}
              className="h-9 w-auto"
            />
            <span className="pr-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-navy">
              Read reviews →
            </span>
          </a>
        </Reveal>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Central vertical line, desktop only */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-blue/30 to-transparent lg:block"
          />

          <div className="space-y-6 lg:space-y-12">
            {CONDITIONS_STRIP.conditions.map((c, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={c.title}
                  className="relative grid grid-cols-1 items-center gap-4 lg:grid-cols-12"
                >
                  {/* Central pulsing dot */}
                  <motion.div
                    aria-hidden
                    initial={reduce ? false : { opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                  >
                    <span className="relative flex h-4 w-4">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-50" />
                      <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-brand-blue shadow-lg shadow-brand-blue/40 ring-4 ring-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                    </span>
                  </motion.div>

                  {/* Card, alternates left / right of the line */}
                  <motion.div
                    initial={reduce ? false : { opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={
                      isLeft
                        ? "lg:col-span-6 lg:col-start-1 lg:pr-12"
                        : "lg:col-span-6 lg:col-start-7 lg:pl-12"
                    }
                  >
                    <Link
                      href={c.href}
                      className="group relative block overflow-hidden rounded-2xl border border-brand-line bg-white/95 p-6 shadow-lg shadow-brand-navy/5 backdrop-blur-sm transition-all hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-navy/10"
                    >
                      {/* Watermark number */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute right-4 top-2 select-none text-7xl font-black leading-none text-brand-line/70"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      {/* Top gradient hairline on hover */}
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-blue to-brand-cyan transition-transform duration-500 group-hover:scale-x-100"
                      />
                      <div className="relative">
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/15 to-brand-cyan/15 text-brand-blue"
                          >
                            <SpiralIcon className="h-5 w-5" />
                          </span>
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">
                            Condition {String(i + 1).padStart(2, "0")}
                          </p>
                        </div>
                        <h3 className="mt-4 text-xl font-bold text-brand-navy">
                          {c.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">
                          {c.body}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue transition-colors group-hover:text-brand-navy">
                          Learn more
                          <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Videos showcase, horizontal carousel                                       */
/* -------------------------------------------------------------------------- */

export function VideosShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const doScroll = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  if (HOME_VIDEOS.length === 0) return null;

  return (
    <section className="bg-brand-mist py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
              Genesis Integrative Medicine
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl lg:text-5xl">
              Watch &amp; learn with Dr. Nathan Conroy
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-ink/70">
              Short videos on the conditions we treat and the therapies we use to treat them.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Scroll videos left"
                onClick={() => doScroll(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-navy transition-all hover:border-brand-blue/40 hover:bg-brand-navy hover:text-white"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll videos right"
                onClick={() => doScroll(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-navy transition-all hover:border-brand-blue/40 hover:bg-brand-navy hover:text-white"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-brand-mist to-transparent sm:w-16"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-brand-mist to-transparent sm:w-16"
          />
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {HOME_VIDEOS.map((video, i) => (
              <div
                key={`${video.provider}-${video.id}-${i}`}
                className="w-[280px] shrink-0 snap-start sm:w-[340px]"
              >
                <HomeVideoCard video={video} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeVideoCard({ video }: { video: (typeof HOME_VIDEOS)[number] }) {
  const [playing, setPlaying] = useState(false);
  const src =
    video.provider === "vimeo"
      ? `https://player.vimeo.com/video/${video.id}?dnt=1&title=0&byline=0&portrait=0&autoplay=1`
      : `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1&autoplay=1`;
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white shadow-lg shadow-brand-navy/5">
      <div className="relative aspect-video w-full shrink-0 bg-brand-ink">
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
              sizes="(max-width: 640px) 280px, 340px"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-brand-ink/20 transition-colors group-hover:bg-brand-ink/35"
            />
            <span aria-hidden className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-brand-ink">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">
          {video.sourceLabel}
        </p>
        <h3 className="mt-1.5 text-lg font-bold text-brand-navy">
          {video.heading ?? video.title}
        </h3>
        <Link
          href={video.href}
          className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue transition-colors hover:text-brand-navy"
        >
          Learn more
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Get Started with Integrative Medicine                                       */
/* -------------------------------------------------------------------------- */

export function GetStartedSection() {
  return (
    <section className="bg-brand-mist py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="relative">
              {/* Clean image tile, no gradient offset, just rounded frame + soft shadow */}
              <div className="relative overflow-hidden rounded-3xl bg-brand-ink shadow-2xl shadow-brand-navy/15">
                <Image
                  src={GET_STARTED.image.src}
                  alt={GET_STARTED.image.alt}
                  width={GET_STARTED.image.width}
                  height={GET_STARTED.image.height}
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"
                />
              </div>
              {/* Floating badge, modest, no colored panel behind image */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-3 right-6 rounded-full border border-brand-line bg-white px-4 py-2 shadow-lg shadow-brand-navy/10"
              >
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-navy">
                  <span aria-hidden className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Personalized care
                </span>
              </motion.div>
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                Your first visit
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                {GET_STARTED.heading}
              </h2>
            </Reveal>
            <Stagger className="mt-6 space-y-5 text-base leading-relaxed text-brand-ink/75" gap={0.09}>
              {GET_STARTED.paragraphs.map((p, i) => (
                <StaggerItem key={i}>
                  <p>{p}</p>
                </StaggerItem>
              ))}
              <StaggerItem>
                <MagneticButton>
                  <Link
                    href={GET_STARTED.cta.href}
                    className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/25"
                  >
                    {GET_STARTED.cta.label}
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </MagneticButton>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact + Map, unified section with premium form frame                     */
/* -------------------------------------------------------------------------- */

export function ContactSection() {
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=1881%20S.%20Randall%20Rd%20Suite%20C%20Geneva%20IL%2060134&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white py-20 sm:py-28"
    >
      {/* Ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-96 w-[500px] rounded-full bg-brand-sky/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-0 h-80 w-[400px] rounded-full bg-brand-cyan/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading + quick-actions */}
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
              Reach out
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
              {HOME_CONTACT.heading}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-ink/70">
              Book online, call us, or send a message, we&apos;ll get back to
              you the same business day.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:flex lg:justify-end">
            <div className="flex flex-wrap gap-3">
              <MagneticButton>
                <a
                  href={CONTACT.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/25 transition-shadow hover:shadow-xl hover:shadow-brand-blue/40"
                >
                  Get Directions
                  <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </MagneticButton>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy transition-colors hover:border-brand-blue/30 hover:bg-brand-mist"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Form + Map row */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-12">
          {/* Form column */}
          <div className="lg:col-span-7">
            <ContactFormEmbed
              src={HOME_CONTACT.formEmbed.src}
              title={HOME_CONTACT.formEmbed.title}
              height={HOME_CONTACT.formEmbed.height}
              kicker="Send us a message"
              label="Patient Intake"
              sublabel="We reply within one business day"
              statusLabel="Same-day"
            />
          </div>

          {/* Right column: map on top + info cards stacked below */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Reveal delay={0.15} className="flex-1">
              <div className="relative h-full min-h-[380px] overflow-hidden rounded-3xl border border-brand-line bg-brand-ink shadow-xl shadow-brand-navy/15">
                <iframe
                  src={mapEmbedUrl}
                  title="Genesis Integrative Medicine, Geneva, IL"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0, filter: "grayscale(10%) contrast(0.98)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                {/* Floating clinic card */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: -20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-4 top-4 max-w-[240px] rounded-2xl border border-brand-line bg-white/95 p-4 shadow-2xl backdrop-blur-md"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/30"
                    >
                      <MapPinIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">
                        Our clinic
                      </p>
                      <p className="text-sm font-bold text-brand-navy">
                        {BRAND.shortName}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-0.5 text-xs text-brand-ink/80">
                    <p>{CONTACT.address.street}</p>
                    <p>{CONTACT.address.cityState}</p>
                  </div>
                  <a
                    href={CONTACT.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-blue transition-colors hover:text-brand-navy"
                  >
                    Get Directions
                    <ArrowUpRightIcon className="h-3 w-3" />
                  </a>
                </motion.div>
              </div>
            </Reveal>

            {/* Info cards, single column on mobile, 2×2 on sm+ */}
            <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2" gap={0.08}>
              <StaggerItem className="h-full">
                <InfoCard
                  icon={<MapPinIcon className="h-5 w-5" />}
                  label="Our Location"
                  lines={[CONTACT.address.street, CONTACT.address.cityState]}
                  href={CONTACT.directionsUrl}
                  actionLabel="Get directions"
                  external
                />
              </StaggerItem>
              <StaggerItem className="h-full">
                <InfoCard
                  icon={<PhoneIcon className="h-5 w-5" />}
                  label="Phone"
                  lines={[CONTACT.phoneDisplay, `Fax ${CONTACT.faxDisplay}`]}
                  href={CONTACT.phoneHref}
                  actionLabel="Call now"
                  pulse
                />
              </StaggerItem>
              <StaggerItem className="h-full">
                <InfoCard
                  icon={<MailIcon className="h-5 w-5" />}
                  label="Email"
                  lines={[CONTACT.email]}
                  href={CONTACT.emailHref}
                  actionLabel="Send email"
                />
              </StaggerItem>
              <StaggerItem className="h-full">
                <InfoCard
                  icon={<ClockIcon className="h-5 w-5" />}
                  label="Business Hours"
                  lines={CONTACT.hours.map((h) => `${h.day} · ${h.time}`)}
                />
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  lines,
  href,
  actionLabel,
  external,
  pulse,
}: {
  icon: React.ReactNode;
  label: string;
  lines: readonly string[];
  href?: string;
  actionLabel?: string;
  external?: boolean;
  pulse?: boolean;
}) {
  const extraProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white p-5 transition-all hover:border-brand-blue/30"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-blue to-brand-cyan transition-transform duration-500 group-hover:scale-x-100"
      />
      <div className="flex items-start gap-4">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 text-brand-blue"
          >
            {icon}
          </motion.div>
          {pulse && (
            <span
              aria-hidden
              className="pointer-events-none absolute -right-1 -top-1 flex h-3 w-3"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-cyan" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">
            {label}
          </p>
          <div className="mt-2 space-y-0.5 text-sm text-brand-ink/85">
            {lines.map((l) => (
              <p key={l} className="break-words">
                {l}
              </p>
            ))}
          </div>
          {href && actionLabel && (
            <a
              href={href}
              {...extraProps}
              className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-blue transition-colors hover:text-brand-navy"
            >
              {actionLabel}
              <ArrowUpRightIcon className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                       */
/* -------------------------------------------------------------------------- */

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ArrowUpRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function svgBase(props: React.SVGProps<SVGSVGElement>) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

/* --- Conventional (left panel) --- */

function ScalpelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M21 3 12 12l-3 3 3 3 3-3 9-9z" />
      <path d="M9 15l-6 6" />
    </svg>
  );
}

function PillIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <rect x="2" y="9" width="20" height="6" rx="3" transform="rotate(-30 12 12)" />
      <path d="M8.5 7.5l7 7" />
    </svg>
  );
}

function BandagePlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <rect x="2" y="8" width="20" height="8" rx="4" transform="rotate(-20 12 12)" />
      <path d="M12 10v4M10 12h4" />
    </svg>
  );
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 17h.01" />
    </svg>
  );
}

/* --- Integrative (right panel) --- */

function HandHealingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M8 13V6a2 2 0 1 1 4 0v5" />
      <path d="M12 11V4.5a2 2 0 1 1 4 0V13" />
      <path d="M16 12v-2a2 2 0 1 1 4 0v6a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-3l-1.5-1.5a2 2 0 1 1 2.83-2.83L9 10" />
    </svg>
  );
}

function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M11 20A7 7 0 0 1 4 13c0-6 6-9 16-9 0 8-3 16-9 16-2 0-4-1-4-3z" />
      <path d="M4 20l8-8" />
    </svg>
  );
}

function SpiralIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M12 20a8 8 0 1 0-8-8 6 6 0 0 0 6 6 4 4 0 0 0 4-4 2 2 0 0 0-2-2 1 1 0 0 0-1 1" />
    </svg>
  );
}

function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
    </svg>
  );
}

/* --- Paragraph card icons --- */

function LayersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M12 3 3 8l9 5 9-5-9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 18l9 5 9-5" opacity=".6" />
    </svg>
  );
}

function ShieldAlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" />
      <path d="M12 8v5M12 16h.01" />
    </svg>
  );
}

function SunriseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M12 3v3M4.9 6.9l2.1 2.1M2 13h3M19 13h3M17 9l2.1-2.1" />
      <path d="M7 17a5 5 0 0 1 10 0" />
      <path d="M3 20h18" />
    </svg>
  );
}

function WavesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M2 6c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
      <path d="M2 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
      <path d="M2 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
    </svg>
  );
}

/* --- Contact / Map icons --- */

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l3 6.9 7.5.6-5.7 4.9 1.8 7.3L12 17.8 5.4 21.7l1.8-7.3L1.5 9.5l7.5-.6L12 2z" />
    </svg>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgBase(props)}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
