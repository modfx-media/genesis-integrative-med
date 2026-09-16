"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
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
import {
  CONSULTATION_CTA,
  INSURANCE_MISSION,
} from "@/app/lib/services-content";

const EASE = [0.16, 1, 0.3, 1] as const;

export type TeamMember = {
  name: string;
  title: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    objectPosition?: string;
  };
  bio?: readonly string[];
};

export type TeamPageProps = {
  breadcrumb: readonly { label: string; href?: string }[];
  kicker?: string;
  h1: string;
  sectionKicker?: string;
  sectionHeading?: string;
  intro?: string;
  heroImage?: { src: string; alt: string };
  members: readonly TeamMember[];
};

export default function TeamPageView({
  breadcrumb,
  kicker,
  h1,
  sectionKicker,
  sectionHeading,
  intro,
  heroImage,
  members,
}: TeamPageProps) {
  return (
    <article className="bg-white">
      <BreadcrumbBar breadcrumb={breadcrumb} />
      <Hero
        kicker={kicker}
        h1={h1}
        sectionHeading={sectionHeading}
        intro={intro}
        heroImage={heroImage}
      />
      <TeamSection
        members={members}
        sectionKicker={sectionKicker}
        sectionHeading={sectionHeading}
      />
      <ConsultationCta />
      <MissionBlock />
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Breadcrumb                                                                 */
/* -------------------------------------------------------------------------- */

function BreadcrumbBar({
  breadcrumb,
}: {
  breadcrumb: readonly { label: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-brand-line bg-brand-mist/60"
    >
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3 text-xs">
        {breadcrumb.map((b, i) => {
          const isLast = i === breadcrumb.length - 1;
          return (
            <li key={`${b.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-brand-ink/30">
                  /
                </span>
              )}
              {!isLast && b.href ? (
                <Link
                  href={b.href}
                  className="font-semibold uppercase tracking-[0.12em] text-brand-ink/60 transition-colors hover:text-brand-blue"
                >
                  {b.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-semibold uppercase tracking-[0.12em] text-brand-navy"
                >
                  {b.label}
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
/* Hero, centered, with motion graphics                                      */
/* -------------------------------------------------------------------------- */

function Hero({
  kicker,
  h1,
  sectionHeading,
  intro,
  heroImage,
}: {
  kicker?: string;
  h1: string;
  sectionHeading?: string;
  intro?: string;
  heroImage?: { src: string; alt: string };
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-brand-mist/30 to-white"
    >
      {/* Ambient blob (parallax) */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: blobY }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[540px] w-[900px] -translate-x-1/2 rounded-full bg-brand-sky/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 h-[380px] w-[520px] rounded-full bg-brand-cyan/15 blur-3xl"
      />
      {/* Dot grid (parallax) */}
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
        <div className={heroImage ? "lg:col-span-7" : ""}>
          {kicker && (
            <Reveal>
              <p
                className={`inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue backdrop-blur`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                {kicker}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1
              className={`mt-6 font-extrabold leading-[1.02] tracking-tight text-brand-ink ${
                heroImage
                  ? "text-4xl sm:text-5xl lg:text-[4.5rem]"
                  : "text-5xl sm:text-6xl lg:text-[5rem]"
              }`}
            >
              <span className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan bg-clip-text text-transparent">
                {h1}
              </span>
            </h1>
          </Reveal>
          {sectionHeading && (
            <Reveal delay={0.1}>
              <p className="mt-6 text-xl font-semibold text-brand-navy sm:text-2xl">
                {sectionHeading}
              </p>
            </Reveal>
          )}
          {intro && (
            <Reveal delay={0.15}>
              <p
                className={`mt-6 text-base leading-relaxed text-brand-ink/70 sm:text-lg ${heroImage ? "max-w-2xl" : "mx-auto max-w-2xl"}`}
              >
                {intro}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.2}>
            <div
              className={`mt-8 flex flex-wrap items-center gap-3 ${heroImage ? "" : "justify-center"}`}
            >
              <MagneticButton>
                <BookNowTrigger className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/30 transition-shadow hover:shadow-xl hover:shadow-brand-blue/50">
                  Schedule Consultation
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </BookNowTrigger>
              </MagneticButton>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy backdrop-blur transition-colors hover:border-brand-blue/30 hover:bg-brand-mist"
              >
                Call {CONTACT.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Image column */}
        {heroImage && (
          <motion.div
            className="relative lg:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 36, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-brand-navy/20 hero-image-fade">
              <motion.div
                className="relative aspect-[4/3] w-full"
                style={reduce ? undefined : { y: imageY }}
              >
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  quality={95}
                  className="object-cover"
                />
              </motion.div>
              {/* Soft gradient wash at the base for depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-navy/35 via-brand-navy/0 to-transparent"
              />
              {/* Shine sweep, one-shot on mount */}
              {!reduce && (
                <motion.div
                  aria-hidden
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "160%", opacity: [0, 0.35, 0] }}
                  transition={{
                    duration: 1.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.8,
                  }}
                  className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
              )}
            </div>

            {/* Floating badge */}
            <motion.div
              style={reduce ? undefined : { y: badgeY }}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              className="absolute -bottom-6 -left-6 hidden max-w-[240px] rounded-2xl border border-brand-line bg-white/95 p-4 shadow-xl shadow-brand-navy/15 backdrop-blur md:block"
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
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Team section, heading + alternating member cards                          */
/* -------------------------------------------------------------------------- */

function TeamSection({
  members,
  sectionKicker,
  sectionHeading,
}: {
  members: readonly TeamMember[];
  sectionKicker?: string;
  sectionHeading?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[600px] rounded-full bg-brand-sky/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[600px] rounded-full bg-brand-cyan/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          {sectionKicker && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
              <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
              {sectionKicker}
            </p>
          )}
          {sectionHeading && (
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              {sectionHeading}
            </h2>
          )}
        </Reveal>

        <Stagger className="mt-16 space-y-24 sm:space-y-32" gap={0.09}>
          {members.map((member, i) => (
            <StaggerItem key={`${member.name}-${i}`}>
              <MemberCard member={member} index={i} total={members.length} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Individual member card                                                     */
/* -------------------------------------------------------------------------- */

function MemberCard({
  member,
  index,
  total,
}: {
  member: TeamMember;
  index: number;
  total: number;
}) {
  const imageOnRight = index % 2 === 0;
  const hasBio = !!member.bio && member.bio.length > 0;
  const firstName = member.name.split(",")[0].split(" ")[0];

  return (
    <div
      className={`relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 ${hasBio ? "items-center" : "items-start"}`}
    >
      <MemberPhoto member={member} imageOnRight={imageOnRight} />
      <MemberBio
        member={member}
        imageOnRight={imageOnRight}
        firstName={firstName}
        index={index}
        total={total}
        hasBio={hasBio}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Member photo, motion-driven                                               */
/* -------------------------------------------------------------------------- */

function MemberPhoto({
  member,
  imageOnRight,
}: {
  member: TeamMember;
  imageOnRight: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pinTop = Boolean(member.image.objectPosition);
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    pinTop ? ["0%", "4%"] : ["-6%", "6%"],
  );
  const imgScale = useTransform(
    scrollYProgress,
    [0, 1],
    pinTop ? [1.02, 1.06] : [1.05, 1.12],
  );

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: EASE }}
      className={`relative lg:col-span-5 ${imageOnRight ? "lg:order-2" : "lg:order-1"}`}
    >
      <div className="relative mx-auto max-w-md">
        {/* Image frame */}
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-line bg-brand-ink shadow-2xl shadow-brand-navy/25">
          <motion.div
            className={`relative aspect-[4/5] w-full ${pinTop ? "origin-top" : ""}`}
            style={reduce ? undefined : { y: imgY, scale: imgScale }}
          >
            <Image
              src={member.image.src}
              alt={member.image.alt}
              fill
              // Extra headroom vs. the box's real layout width: the parent
              // motion.div is continuously scaled up to 1.12x for the
              // parallax effect, which a plain sizes-for-layout-width value
              // doesn't account for, leaving the image undersized/soft.
              sizes="(max-width: 1024px) 130vw, 620px"
              quality={100}
              className="object-cover"
              style={
                member.image.objectPosition
                  ? { objectPosition: member.image.objectPosition }
                  : undefined
              }
            />
          </motion.div>
          {/* Bottom wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-ink/60 via-brand-ink/15 to-transparent"
          />
          {/* Inner ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10"
          />
          {/* Shine sweep */}
          {!reduce && (
            <motion.div
              aria-hidden
              initial={{ x: "-120%", opacity: 0 }}
              whileInView={{ x: "160%", opacity: [0, 0.35, 0] }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
          )}
          {/* Corner name/title chip */}
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-brand-ink/60 px-4 py-3 text-white backdrop-blur">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-tight">
                {member.name}
              </p>
              <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-[0.18em] text-brand-sky">
                {member.title}
              </p>
            </div>
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/40"
            >
              <SparkIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Member bio                                                                 */
/* -------------------------------------------------------------------------- */

function MemberBio({
  member,
  imageOnRight,
  firstName,
  index,
  total,
  hasBio,
}: {
  member: TeamMember;
  imageOnRight: boolean;
  firstName: string;
  index: number;
  total: number;
  hasBio: boolean;
}) {
  return (
    <div
      className={`lg:col-span-7 ${imageOnRight ? "lg:order-1" : "lg:order-2"}`}
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-[11px] font-bold text-white shadow-md shadow-brand-blue/30"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-r from-brand-blue/60 via-brand-cyan/40 to-transparent"
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue/70">
            {String(index + 1).padStart(2, "0")}
            <span className="mx-1 text-brand-ink/30">/</span>
            {String(total).padStart(2, "0")}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-mist/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
          <span className="h-1 w-1 rounded-full bg-brand-cyan" />
          Meet {firstName}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h3 className="mt-4 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
          <span className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan bg-clip-text text-transparent">
            {member.name}
          </span>
        </h3>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-blue">
          {member.title}
        </p>
      </Reveal>
      {hasBio ? (
        <BioParagraphs paragraphs={member.bio!} />
      ) : (
        <BookWithMemberCard firstName={firstName} title={member.title} />
      )}
    </div>
  );
}

function BioParagraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="relative mt-8">
      {/* Decorative left rail */}
      <span
        aria-hidden
        className="absolute left-0 top-2 hidden h-16 w-1 rounded-full bg-gradient-to-b from-brand-blue to-brand-cyan sm:block"
      />
      <div className="sm:pl-6">
        <Stagger
          className="space-y-4 text-base leading-relaxed text-brand-ink/80 sm:text-lg"
          gap={0.07}
        >
          {paragraphs.map((p, i) => (
            <StaggerItem key={i}>
              <p>{p}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Book-with-member fallback card (used when a member has no bio)             */
/* -------------------------------------------------------------------------- */

function BookWithMemberCard({
  firstName,
  title,
}: {
  firstName: string;
  title: string;
}) {
  return (
    <Reveal delay={0.1}>
      <div className="relative mt-8 overflow-hidden rounded-2xl border border-brand-line bg-gradient-to-br from-brand-mist/60 via-white to-brand-mist/40 p-6 sm:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-brand-cyan/20 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-brand-blue/15 blur-2xl"
        />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
            <span className="mr-2 inline-block h-1 w-1 -translate-y-0.5 rounded-full bg-brand-cyan" />
            Meet {firstName}
          </p>
          <h4 className="mt-3 text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">
            Book a visit with our {title}
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">
            Schedule a consultation to learn more about {firstName}&rsquo;s
            approach to integrative care at Genesis Integrative Medicine.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <BookNowTrigger className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-md shadow-brand-blue/25 transition-shadow hover:shadow-lg hover:shadow-brand-blue/40">
              Schedule Consultation
            </BookNowTrigger>
            <a
              href={CONTACT.phoneHref}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-brand-line bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy transition-colors hover:border-brand-blue/40 hover:bg-brand-mist"
            >
              Call {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </Reveal>
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
                  <BookNowTrigger className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-blue/30 transition-shadow hover:shadow-xl hover:shadow-brand-blue/50">
                    Book Appointment
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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

/* -------------------------------------------------------------------------- */
/* Mission                                                                    */
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

/* -------------------------------------------------------------------------- */
/* Icons                                                                       */
/* -------------------------------------------------------------------------- */

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function SparkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
    </svg>
  );
}
