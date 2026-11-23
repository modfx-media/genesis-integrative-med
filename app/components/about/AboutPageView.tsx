"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { usePrefersReducedMotion as useReducedMotion } from "@/app/lib/use-prefers-reduced-motion";
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

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * /about-practice/, full replica of the live page with the redesigned
 * cards + motion system. All body copy preserved verbatim from
 * https://genesisintegrativemed.com/about-practice/
 */

const HERO = {
  kicker: "About Our Practice",
  h1: "About Us",
  subtitle: "Genesis Integrative Medicine",
} as const;

const BODY_PARAGRAPHS = [
  "Genesis Integrative Medicine takes an approach to health care designed to solve an age-old problem for patients, too many doctors and a lack of communication between them. At Genesis Integrative Medicine, patients in Geneva, Illinois, have access to both traditional medical services and alternative therapies like chiropractic care for a variety of conditions, all under the same roof. The result is a cutting-edge, integrated solution to health care and disease prevention with experienced and skilled providers who work together to ensure optimum health.",
  "The team at Genesis Integrative Medicine features health providers who are board-certified in many areas of health care to provide the highest quality of care. Using an integrative approach, the compassionate staff is well-equipped to address issues like chronic joint pain, neck pain, back pain, and migraines, often without relying on medications or the need for surgery.",
  "In an effort to expand its services, Genesis Integrative Medicine has combined the latest treatment options, like platelet-rich plasma (PRP) therapy, regenerative medicine, and cold laser therapy, with traditional active rehab and chiropractic care. The goal of this integrative approach is to address chronic pain and mobility issues while enhancing their patients\u2019 overall quality of life.",
  "In addition to the advanced technologies available, the Genesis Integrative Medicine team also provides services to help patients enhance and maintain good physical, mental, and emotional health through on-site allergy testing and medical weight loss programs.",
  "Rather than treat every ill with a pill, consider the benefits of an integrative approach to achieving a happy, pain-free life.",
];

const HIGHLIGHTS = [
  {
    icon: "team" as const,
    label: "Board-certified team",
    note: "All under one roof",
  },
  {
    icon: "spark" as const,
    label: "Integrative therapies",
    note: "Traditional + alternative",
  },
  {
    icon: "shield" as const,
    label: "Non-surgical first",
    note: "Fewer medications, better outcomes",
  },
  {
    icon: "heart" as const,
    label: "Whole-person care",
    note: "Physical, mental & emotional",
  },
] as const;

/**
 * "Pillars" of the practice, cards summarizing the four service families
 * mentioned in the About body. Titles/copy derived directly from the body copy
 * (no invented content), formatted as cards for scanability.
 */
const PILLARS = [
  {
    title: "Traditional Medical Services",
    body:
      "Board-certified providers deliver chronic joint pain, neck pain, back pain, and migraine care using conventional medical approaches, without over-reliance on medications or surgery.",
    icon: "stethoscope" as const,
    accent: "from-brand-navy to-brand-blue",
  },
  {
    title: "Chiropractic & Alternative Therapies",
    body:
      "Chiropractic care and complementary therapies alongside traditional treatment, all in the same clinic, no more running between offices with no communication between them.",
    icon: "spine" as const,
    accent: "from-brand-blue to-brand-cyan",
  },
  {
    title: "Regenerative Medicine & Advanced Modalities",
    body:
      "PRP therapy, regenerative medicine, cold laser therapy, and active rehab combined to address chronic pain and mobility issues while lifting overall quality of life.",
    icon: "atom" as const,
    accent: "from-brand-cyan to-brand-sky",
  },
  {
    title: "Whole-Person Wellness",
    body:
      "On-site allergy testing and medical weight loss programs to help patients enhance and maintain physical, mental, and emotional health.",
    icon: "leaf" as const,
    accent: "from-brand-blue to-brand-navy",
  },
] as const;

const PROVIDERS = [
  {
    name: "Nathan Conroy, DC",
    title: "Chiropractic & Physical Medicine",
    image: {
      src: "/images/providers/nathan-conroy-zoom.jpg",
      alt: "Nathan Conroy, DC, Chiropractic & Physical Medicine at Genesis Integrative Medicine",
    },
    href: "/our-providers/",
  },
  {
    name: "Jeff Floyd, PA",
    title: "Physicians Assistant",
    image: {
      src: "/images/providers/jeff-floyd.jpg",
      alt: "Jeff Floyd, PA, Physicians Assistant at Genesis Integrative Medicine",
    },
    href: "/our-providers/",
  },
  {
    name: "Anthony Leazzo, DO",
    title: "Clinic Director",
    image: {
      src: "/images/providers/anthony-leazzo-new.jpg",
      alt: "Dr. Anthony Leazzo, DO, Clinic Director at Genesis Integrative Medicine",
    },
    href: "/our-providers/",
  },
] as const;

export default function AboutPageView() {
  return (
    <article className="bg-white">
      <BreadcrumbBar />
      <Hero />
      <HighlightsStrip />
      <StoryBlock />
      <OfficeTourVideo />
      <PillarsBlock />
      <ProvidersBlock />
      <TestimonialsCTA />
      <ConsultationCta />
      <MissionBlock />
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Office tour video                                                          */
/* -------------------------------------------------------------------------- */

function OfficeTourVideo() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            Genesis Integrative Medicine
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            Take a Tour of Our Office
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-sm overflow-hidden rounded-[2rem] border border-brand-line bg-brand-ink shadow-2xl shadow-brand-navy/25">
            <div className="relative aspect-[9/16] w-full">
              <iframe
                src="https://player.vimeo.com/video/1217717140?dnt=1&title=0&byline=0&portrait=0"
                title="Office Tour"
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
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
        <li aria-hidden className="text-brand-ink/30">/</li>
        <li aria-current="page" className="font-semibold uppercase tracking-[0.12em] text-brand-navy">
          About Us
        </li>
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

      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
            {HERO.kicker}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-brand-ink sm:text-6xl lg:text-[5rem]">
            <span className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan bg-clip-text text-transparent">
              {HERO.h1}
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-xl font-semibold text-brand-navy sm:text-2xl">
            {HERO.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-ink/70 sm:text-lg">
            One clinic. One team. One coordinated plan for your health, combining
            traditional medicine with chiropractic, regenerative therapies and wellness
            programs, all under the same roof in Geneva, IL.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Highlights strip                                                            */
/* -------------------------------------------------------------------------- */

function HighlightsStrip() {
  return (
    <section className="border-y border-brand-line bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Stagger
          className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4"
          gap={0.06}
        >
          {HIGHLIGHTS.map((h) => (
            <StaggerItem key={h.label}>
              <div className="group flex items-start gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 text-brand-blue transition-colors group-hover:from-brand-blue group-hover:to-brand-cyan group-hover:text-white"
                >
                  <HighlightIcon name={h.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-brand-navy">{h.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-brand-ink/60">
                    {h.note}
                  </p>
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
/* Story block, original body copy in a modern editorial layout              */
/* -------------------------------------------------------------------------- */

function StoryBlock() {
  return (
    <section className="relative bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky label column */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                  <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
                  Our approach
                </p>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl">
                  Health care, coordinated.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-brand-ink/70">
                  Every provider on the same page, every treatment plan built for you.
                  Take a quick tour of what makes Genesis different.
                </p>
                <div className="mt-8 hidden lg:block">
                  <QuoteCard />
                </div>
              </Reveal>
            </div>
          </aside>

          {/* Body copy column */}
          <div className="lg:col-span-8">
            <Stagger className="space-y-6" gap={0.08}>
              {BODY_PARAGRAPHS.map((p, i) => (
                <StaggerItem key={i}>
                  <p
                    className={`text-base leading-relaxed text-brand-ink/80 sm:text-lg ${
                      i === 0
                        ? "text-xl font-medium leading-relaxed text-brand-ink sm:text-2xl"
                        : ""
                    }`}
                  >
                    {i === 0 && (
                      <span className="float-left mr-3 mt-1 text-6xl font-extrabold leading-none text-transparent bg-gradient-to-br from-brand-blue to-brand-cyan bg-clip-text sm:text-7xl">
                        G
                      </span>
                    )}
                    {i === 0 ? p.replace(/^G/, "") : p}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Mobile-only quote */}
            <div className="mt-10 lg:hidden">
              <QuoteCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-line bg-gradient-to-br from-brand-mist/60 via-white to-brand-mist/40 p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-brand-cyan/25 blur-2xl"
      />
      <QuoteIcon
        aria-hidden
        className="h-8 w-8 text-brand-blue"
      />
      <p className="mt-4 text-base font-semibold italic leading-relaxed text-brand-navy sm:text-lg">
        &ldquo;Rather than treat every ill with a pill, consider the benefits of an
        integrative approach to achieving a happy, pain-free life.&rdquo;
      </p>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blue">
        Dr. Anthony Leazzo, DO
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Pillars block, 4 service families as cards                                */
/* -------------------------------------------------------------------------- */

function PillarsBlock() {
  return (
    <section className="relative overflow-hidden bg-brand-mist/50 py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[600px] rounded-full bg-brand-sky/25 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
            What we do
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            Four pillars, one integrated care plan.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-ink/70 sm:text-lg">
            All of the services below live under the same roof so your providers can
            actually talk to each other about your care.
          </p>
        </Reveal>
        <Stagger
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2"
          gap={0.07}
        >
          {PILLARS.map((p, i) => (
            <StaggerItem key={p.title}>
              <PillarCard pillar={p} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof PILLARS)[number];
  index: number;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group relative h-full overflow-hidden rounded-3xl border border-brand-line bg-white p-7 shadow-md shadow-brand-navy/5 transition-shadow hover:shadow-xl hover:shadow-brand-navy/10"
    >
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${pillar.accent} transition-transform duration-500 group-hover:scale-x-100`}
      />
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.accent} text-white shadow-md shadow-brand-blue/25`}
        >
          <PillarIcon name={pillar.icon} className="h-5 w-5" />
        </span>
        <span
          aria-hidden
          className="font-mono text-xs font-bold tabular-nums text-brand-blue/60"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">
        {pillar.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-brand-ink/75 sm:text-base">
        {pillar.body}
      </p>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/* Providers block                                                            */
/* -------------------------------------------------------------------------- */

function ProvidersBlock() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[600px] rounded-full bg-brand-sky/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
            experience The difference
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            Qualified Professionals
          </h2>
        </Reveal>
        <Stagger
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
          gap={0.08}
        >
          {PROVIDERS.map((p) => (
            <StaggerItem key={p.name}>
              <ProviderCard provider={p} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <MagneticButton>
            <Link
              href="/our-providers/"
              className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-brand-navy transition-colors hover:border-brand-blue hover:bg-brand-navy hover:text-white"
            >
              Meet the full team
              <ArrowRight className="h-3 w-3" />
            </Link>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

function ProviderCard({ provider }: { provider: (typeof PROVIDERS)[number] }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group h-full"
    >
      <Link
        href={provider.href}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-line bg-white transition-shadow hover:shadow-xl hover:shadow-brand-navy/10"
      >
        <div className="relative aspect-square overflow-hidden bg-brand-ink">
          <Image
            src={provider.image.src}
            alt={provider.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 380px"
            quality={95}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-brand-ink/50 via-transparent to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-blue to-brand-cyan transition-transform duration-500 group-hover:scale-x-100"
          />
        </div>
        <div className="flex flex-1 items-center justify-between gap-3 p-6">
          <div>
            <h3 className="text-lg font-bold text-brand-navy sm:text-xl">
              {provider.name}
            </h3>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue">
              {provider.title}
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-brand-blue transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Testimonials CTA                                                           */
/* -------------------------------------------------------------------------- */

function TestimonialsCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-mist/50 py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[400px] w-[500px] rounded-full bg-brand-cyan/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 rounded-[2rem] border border-brand-line bg-white p-8 shadow-lg shadow-brand-navy/5 sm:p-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-brand-cyan" />
                patient testimonials
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                Gladly Serving Our Community
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-ink/70 sm:text-lg">
                Our team is ready to meet with you to discuss your needs. We will help
                to design a program that is right for you.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <MagneticButton>
                  <Link
                    href="/testimonials/"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-md shadow-brand-blue/25 transition-shadow hover:shadow-lg hover:shadow-brand-blue/40"
                  >
                    Read Testimonials
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-ink/50">
                Rated on
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href={CONTACT.reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-2xl border border-brand-line bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md"
                >
                  <Image
                    src="/images/reviews/google-review.webp"
                    alt="Google reviews"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-ink/60">
                      Google
                    </span>
                    <span className="text-xs font-bold text-brand-navy">
                      See reviews
                    </span>
                  </div>
                </a>
                <a
                  href={CONTACT.social.yelp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-2xl border border-brand-line bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md"
                >
                  <Image
                    src="/images/reviews/yelp.webp"
                    alt="Yelp reviews"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-ink/60">
                      Yelp
                    </span>
                    <span className="text-xs font-bold text-brand-navy">
                      See reviews
                    </span>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
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

/* -------------------------------------------------------------------------- */
/* Mission block                                                              */
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

type HighlightIconName = "team" | "spark" | "shield" | "heart";
function HighlightIcon({
  name,
  ...props
}: { name: HighlightIconName } & React.SVGProps<SVGSVGElement>) {
  const base: React.SVGProps<SVGSVGElement> = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "team":
      return (
        <svg {...base} {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "spark":
      return (
        <svg {...base} {...props}>
          <path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
        </svg>
      );
    case "shield":
      return (
        <svg {...base} {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "heart":
      return (
        <svg {...base} {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
  }
}

type PillarIconName = "stethoscope" | "spine" | "atom" | "leaf";
function PillarIcon({
  name,
  ...props
}: { name: PillarIconName } & React.SVGProps<SVGSVGElement>) {
  const base: React.SVGProps<SVGSVGElement> = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "stethoscope":
      return (
        <svg {...base} {...props}>
          <path d="M4 4v6a4 4 0 0 0 4 4v0a4 4 0 0 0 4-4V4" />
          <path d="M6 4h4M14 4h4M18 4v6a4 4 0 0 1-4 4v0" />
          <circle cx="18" cy="18" r="3" />
          <path d="M8 14v3a4 4 0 0 0 4 4h3" />
        </svg>
      );
    case "spine":
      return (
        <svg {...base} {...props}>
          <path d="M12 2v20" />
          <path d="M8 6h8M8 10h8M8 14h8M8 18h8" />
        </svg>
      );
    case "atom":
      return (
        <svg {...base} {...props}>
          <circle cx="12" cy="12" r="1" />
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...base} {...props}>
          <path d="M11 20A7 7 0 0 1 4 13V6a4 4 0 0 1 4-4h5a7 7 0 0 1 7 7v3a7 7 0 0 1-7 7z" />
          <path d="M4 20L20 4" />
        </svg>
      );
  }
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
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

function ArrowUpRight(props: React.SVGProps<SVGSVGElement>) {
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

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M9.5 6H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1v2a2 2 0 0 1-2 2H3v2h1a4 4 0 0 0 4-4v-6h1.5V6zm10 0H15a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1v2a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4v-6h1.5V6z" />
    </svg>
  );
}
