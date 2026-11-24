"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion as useReducedMotion } from "@/app/lib/use-prefers-reduced-motion";
import { useRef } from "react";

import {
  InsuranceLogos,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/app/components/home/motion-primitives";
import { INSURANCE_MISSION } from "@/app/lib/services-content";
import { legalAnchor, type LegalPage, type LegalSection } from "@/app/lib/legal-content";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Shared renderer for the three legal / compliance pages
 * (/our-terms/, /your-privacy/, /accessibility-statement/).
 *
 * Layout preserves the live site's text verbatim; the visual system
 * (breadcrumb bar, gradient hero with ambient blobs, sticky Table of
 * Contents sidebar, motion primitives, mission block) matches the About
 * page aesthetic used across the rebuild.
 */
export default function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <article className="bg-white">
      <BreadcrumbBar items={page.breadcrumbs} />
      <Hero hero={page.hero} />
      <BodyLayout page={page} />
      <MissionBlock />
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Breadcrumb                                                                  */
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
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

function Hero({ hero }: { hero: LegalPage["hero"] }) {
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

      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
            {hero.kicker}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-brand-ink sm:text-6xl lg:text-[4.5rem]">
            <span className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan bg-clip-text text-transparent">
              {hero.h1}
            </span>
          </h1>
        </Reveal>
        {hero.subtitle && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-ink/70 sm:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Body, sticky TOC on left, prose on right                                   */
/* -------------------------------------------------------------------------- */

function BodyLayout({ page }: { page: LegalPage }) {
  const hasToc = page.sections.length > 1;
  return (
    <section className="relative bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={
            hasToc
              ? "grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
              : "mx-auto max-w-3xl"
          }
        >
          {hasToc && (
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <Toc sections={page.sections} title={page.hero.h1} />
              </div>
            </aside>
          )}

          <div className={hasToc ? "lg:col-span-8" : undefined}>
            {page.intro && page.intro.length > 0 && (
              <Reveal>
                <div className="mb-12 rounded-3xl border border-brand-line bg-gradient-to-br from-brand-mist/60 via-white to-brand-mist/40 p-6 sm:p-8">
                  {page.intro.map((p, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? "text-lg font-medium leading-relaxed text-brand-ink sm:text-xl"
                          : "mt-4 text-base leading-relaxed text-brand-ink/80"
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            )}

            <Stagger className="space-y-14" gap={0.05}>
              {page.sections.map((section, i) => (
                <StaggerItem key={section.heading}>
                  <SectionBlock section={section} index={i} />
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
/* Table of Contents                                                           */
/* -------------------------------------------------------------------------- */

function Toc({
  sections,
  title,
}: {
  sections: readonly LegalSection[];
  title: string;
}) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-lg shadow-brand-navy/10">
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan px-5 py-4 text-white">
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
              On this page
            </p>
            <h2 className="mt-1.5 text-base font-extrabold leading-tight sm:text-lg">
              {title}
            </h2>
          </div>
        </div>
        <nav aria-label={`${title} table of contents`} className="divide-y divide-brand-line">
          {sections.map((section, i) => {
            const id = legalAnchor(section.heading);
            return (
              <motion.div
                key={id}
                className="motion-reveal"
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, ease: EASE, delay: i * 0.02 }}
              >
                <Link
                  href={`#${id}`}
                  className="group relative flex items-start gap-3 px-4 py-3 text-[13px] font-semibold text-brand-ink/75 transition-colors hover:bg-brand-mist/60 hover:text-brand-navy"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-mist text-[10px] font-bold text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white"
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0 leading-snug">{section.heading}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Section block                                                               */
/* -------------------------------------------------------------------------- */

function SectionBlock({
  section,
  index,
}: {
  section: LegalSection;
  index: number;
}) {
  const id = legalAnchor(section.heading);
  const proseClass = section.uppercase
    ? "text-sm font-semibold uppercase leading-relaxed tracking-[0.02em] text-brand-ink/80 sm:text-[15px]"
    : "text-base leading-relaxed text-brand-ink/80 sm:text-[17px]";
  const usesBadgeHeading = !section.uppercase;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <div className="flex items-baseline gap-3">
        {usesBadgeHeading && (
          <span
            aria-hidden
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-xs font-bold text-white shadow-md shadow-brand-blue/30"
          >
            {index + 1}
          </span>
        )}
        <h2
          id={`${id}-heading`}
          className={
            section.uppercase
              ? "text-xl font-extrabold uppercase tracking-[0.04em] text-brand-navy sm:text-2xl"
              : "text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl"
          }
        >
          {section.heading}
        </h2>
      </div>
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-brand-blue to-brand-cyan" />

      <BlockBody
        paragraphs={section.paragraphs}
        items={section.items}
        outro={section.outro}
        proseClass={proseClass}
      />

      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-10 space-y-10 border-l-2 border-brand-line pl-6 sm:pl-8">
          {section.subsections.map((sub) => {
            const subId = legalAnchor(sub.heading);
            const subProse = sub.uppercase
              ? "text-sm font-semibold uppercase leading-relaxed tracking-[0.02em] text-brand-ink/80 sm:text-[15px]"
              : "text-base leading-relaxed text-brand-ink/80 sm:text-[17px]";
            return (
              <div key={subId} id={subId} className="scroll-mt-24">
                <h3 className="text-lg font-bold text-brand-navy sm:text-xl">
                  {sub.heading}
                </h3>
                <div className="mt-2 h-px w-10 bg-brand-line" />
                <BlockBody
                  paragraphs={sub.paragraphs}
                  items={sub.items}
                  outro={sub.outro}
                  proseClass={subProse}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function BlockBody({
  paragraphs,
  items,
  outro,
  proseClass,
}: {
  paragraphs?: readonly string[];
  items?: readonly string[];
  outro?: readonly string[];
  proseClass: string;
}) {
  return (
    <>
      {paragraphs && paragraphs.length > 0 && (
        <div className="mt-5 space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className={proseClass}>
              {p}
            </p>
          ))}
        </div>
      )}
      {items && items.length > 0 && (
        <ul className="mt-6 space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan"
              />
              <span className="text-base leading-relaxed text-brand-ink/80 sm:text-[17px]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}
      {outro && outro.length > 0 && (
        <div className="mt-6 space-y-5">
          {outro.map((p, i) => (
            <p key={i} className={proseClass}>
              {p}
            </p>
          ))}
        </div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Mission                                                                     */
/* -------------------------------------------------------------------------- */

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
