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
import ContactFormEmbed from "@/app/components/contact/ContactFormEmbed";
import { CONTACT } from "@/app/lib/site-config";
import { INSURANCE_MISSION } from "@/app/lib/services-content";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * /contact/, mirrors the live page (https://genesisintegrativemed.com/contact/)
 * with our design system + motion primitives.
 *
 * Content preserved from the live page:
 * - Practice card: Genesis Integrative Medicine, 1881 S. Randall Rd
 *   Suite C, Geneva, IL 60134
 * - Phone: 630-845-8925 / Fax: 630-845-8965
 * - Email: info@genesisintegrativemed.com
 * - Opening Hours: Mon & Wed 9:00 AM – 12:00 PM, 3:00 PM – 6:00 PM;
 *   Tue & Thu 3:00 PM – 6:00 PM; Fri 9:00 AM – 12:00 PM; Sat & Sun Closed
 *
 * The live page embeds two LeadConnectorHQ forms:
 *   • Primary "Website Form"       (form id ui8Cws8VEvRRDMpmSR8J), height 827
 *   • Secondary "Contact Us!" form (form id ToXLBiqT0qS6iABzJ9HD), height 754
 * Both are reproduced verbatim below so patients see the exact same
 * intake experience. (The calendar Book Now widget has been removed.)
 */

const WEBSITE_FORM_SRC =
  "https://api.leadconnectorhq.com/widget/form/ui8Cws8VEvRRDMpmSR8J";
const MAP_QUERY = encodeURIComponent(
  `${CONTACT.address.street}, ${CONTACT.address.cityState}`,
);
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`;

/** Opening hours preserved from the live page. */
const OPENING_HOURS: readonly { day: string; time: string }[] = [
  { day: "Monday & Wednesday", time: "9:00 AM – 12:00 PM, 3:00 PM – 6:00 PM" },
  { day: "Tuesday & Thursday", time: "3:00 PM – 6:00 PM" },
  { day: "Friday", time: "9:00 AM – 12:00 PM" },
  { day: "Saturday & Sunday", time: "Closed" },
];

export default function ContactPageView() {
  return (
    <article className="bg-white">
      <BreadcrumbBar />
      <Hero />
      <QuickContactStrip />
      <WebsiteFormSection />
      <PracticeSection />
      <MapSection />
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
          Contact
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
            Get in touch
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-brand-ink sm:text-6xl lg:text-[5rem]">
            <span className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-cyan bg-clip-text text-transparent">
              Contact
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-ink/70 sm:text-lg">
            Book your visit online, call the front desk, or stop by our Geneva
            clinic on Randall Road. We&rsquo;re here to help you take the next
            step.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Quick contact strip                                                         */
/* -------------------------------------------------------------------------- */

function QuickContactStrip() {
  const items = [
    {
      icon: "phone" as const,
      label: "Phone",
      value: CONTACT.phoneDisplay,
      href: CONTACT.phoneHref,
    },
    {
      icon: "fax" as const,
      label: "Fax",
      value: CONTACT.faxDisplay,
      href: undefined,
    },
    {
      icon: "mail" as const,
      label: "Email",
      value: CONTACT.email,
      href: CONTACT.emailHref,
    },
    {
      icon: "pin" as const,
      label: "Address",
      value: `${CONTACT.address.street}, ${CONTACT.address.cityState}`,
      href: CONTACT.directionsUrl,
    },
  ];
  return (
    <section className="border-y border-brand-line bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
          {items.map((item) => (
            <StaggerItem key={item.label}>
              <div className="group flex items-start gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 text-brand-blue transition-colors group-hover:from-brand-blue group-hover:to-brand-cyan group-hover:text-white"
                >
                  <QuickIcon name={item.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ink/50">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-1 block text-sm font-bold text-brand-navy transition-colors hover:text-brand-blue"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-bold text-brand-navy">{item.value}</p>
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
/* Booking section (LeadConnector iframe + sidebar)                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Website form section (LeadConnector primary intake form)                    */
/* -------------------------------------------------------------------------- */

function WebsiteFormSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id="website-form"
      className="relative overflow-hidden bg-gradient-to-b from-brand-mist/40 via-white to-white py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 h-[420px] w-[420px] rounded-full bg-brand-sky/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-brand-cyan/15 blur-3xl"
      />
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-[18%] h-6 w-6 rounded-md bg-brand-cyan/60"
          animate={{ y: [0, -12, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: EASE }}
        />
      )}
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy column */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                Send us a message
              </p>
              <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl">
                Have a question?{" "}
                <span className="bg-gradient-to-br from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                  We&rsquo;re listening.
                </span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-brand-ink/70">
                Share a few details and our team will reach out with the next
                step, whether you&rsquo;re curious about a specific
                therapy, need help picking a time, or just want to talk to a
                real person about your goals.
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                {[
                  {
                    title: "Personal response",
                    body: "A real team member reviews every message. No form-letter replies.",
                  },
                  {
                    title: "Typically within one business day",
                    body: "We aim to respond during clinic hours, Monday through Friday.",
                  },
                  {
                    title: "Private & secure",
                    body: "Your information stays with our care team.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 text-brand-blue"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-bold text-brand-navy">{item.title}</p>
                      <p
                        className="mt-0.5 text-brand-ink/70"
                        dangerouslySetInnerHTML={{ __html: item.body }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-brand-line bg-white p-5 shadow-sm">
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white"
                >
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-ink/50">
                    Prefer a phone call?
                  </p>
                  <a
                    href={CONTACT.phoneHref}
                    className="mt-0.5 block text-lg font-extrabold text-brand-navy transition-colors hover:text-brand-blue"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <div className="lg:col-span-7">
            <ContactFormEmbed
              src={WEBSITE_FORM_SRC}
              title=" 🟢 Website Form"
              height={812}
              label="Send a Message"
              sublabel="We usually reply within one business day"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Practice / hours section                                                    */
/* -------------------------------------------------------------------------- */

function PracticeSection() {
  return (
    <section className="relative overflow-hidden bg-brand-mist/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-brand-line bg-white p-8 shadow-lg shadow-brand-navy/5 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-cyan/20 blur-3xl"
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                Visit us
              </p>
              <h3 className="mt-3 text-2xl font-extrabold text-brand-navy sm:text-3xl">
                Genesis Integrative Medicine
              </h3>
              <address className="mt-4 not-italic text-base leading-relaxed text-brand-ink/80">
                {CONTACT.address.street}
                <br />
                {CONTACT.address.cityState}
              </address>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <dt className="mt-0.5">
                    <PhoneIcon aria-hidden className="h-4 w-4 text-brand-blue" />
                    <span className="sr-only">Phone</span>
                  </dt>
                  <dd>
                    <a
                      href={CONTACT.phoneHref}
                      className="font-bold text-brand-navy transition-colors hover:text-brand-blue"
                    >
                      Phone: {CONTACT.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="flex items-start gap-3">
                  <dt className="mt-0.5">
                    <FaxIcon aria-hidden className="h-4 w-4 text-brand-blue" />
                    <span className="sr-only">Fax</span>
                  </dt>
                  <dd className="font-semibold text-brand-ink/80">
                    Fax: {CONTACT.faxDisplay}
                  </dd>
                </div>
                <div className="flex items-start gap-3">
                  <dt className="mt-0.5">
                    <MailIcon aria-hidden className="h-4 w-4 text-brand-blue" />
                    <span className="sr-only">Email</span>
                  </dt>
                  <dd>
                    <a
                      href={CONTACT.emailHref}
                      className="break-all font-semibold text-brand-navy transition-colors hover:text-brand-blue"
                    >
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={CONTACT.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-mist/60 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy transition-colors hover:border-brand-blue/30 hover:bg-white"
                >
                  Get directions
                  <ArrowRight className="h-3 w-3" />
                </a>
                <a
                  href={CONTACT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-blue transition-colors hover:border-brand-blue/30 hover:text-brand-navy"
                >
                  <SocialIcon name="facebook" className="h-4 w-4" />
                </a>
                <a
                  href={CONTACT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-blue transition-colors hover:border-brand-blue/30 hover:text-brand-navy"
                >
                  <SocialIcon name="instagram" className="h-4 w-4" />
                </a>
                <a
                  href={CONTACT.social.yelp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yelp"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-blue transition-colors hover:border-brand-blue/30 hover:text-brand-navy"
                >
                  <SocialIcon name="yelp" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-brand-line bg-white p-8 shadow-lg shadow-brand-navy/5 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-brand-blue/15 blur-3xl"
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                We&rsquo;re open
              </p>
              <h3 className="mt-3 text-2xl font-extrabold text-brand-navy sm:text-3xl">
                Opening Hours
              </h3>
              <ul className="mt-6 divide-y divide-brand-line">
                {OPENING_HOURS.map((row) => {
                  const closed = row.time.toLowerCase() === "closed";
                  return (
                    <li
                      key={row.day}
                      className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <span className="text-sm font-bold text-brand-navy">
                        {row.day}
                      </span>
                      <span
                        className={
                          closed
                            ? "text-sm font-semibold text-brand-ink/40"
                            : "text-sm font-semibold text-brand-ink/80"
                        }
                      >
                        {row.time}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-brand-ink/60">
                Hours may vary on holidays. Call ahead to confirm availability.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Map                                                                         */
/* -------------------------------------------------------------------------- */

function MapSection() {
  return (
    <section className="relative bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                Find us
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-brand-navy sm:text-4xl">
                Right on Randall Road in Geneva
              </h2>
            </div>
            <a
              href={CONTACT.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-md shadow-brand-blue/25 transition-shadow hover:shadow-lg"
            >
              Open in Google Maps
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </Reveal>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-line bg-brand-mist/40 shadow-xl shadow-brand-navy/10">
            <iframe
              src={MAP_EMBED_SRC}
              title={`Map to ${CONTACT.address.street}, ${CONTACT.address.cityState}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[440px] w-full border-0"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
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

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m4 10.5 3.5 3.5 8.5-9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
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

function FaxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7 8V4h9l3 3v13M7 8h13M7 8v13h13V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 12h9M9 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-4 3v-3H6a2 2 0 0 1-2-2V6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 9h8M8 12h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

type QuickIconName = "phone" | "fax" | "mail" | "pin";
function QuickIcon({ name, ...props }: { name: QuickIconName } & React.SVGProps<SVGSVGElement>) {
  switch (name) {
    case "phone":
      return <PhoneIcon {...props} />;
    case "fax":
      return <FaxIcon {...props} />;
    case "mail":
      return <MailIcon {...props} />;
    case "pin":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path
            d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

type SocialName = "facebook" | "instagram" | "yelp";
function SocialIcon({ name, ...props }: { name: SocialName } & React.SVGProps<SVGSVGElement>) {
  switch (name) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.8V13.6h2.7V22h3Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
        </svg>
      );
    case "yelp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path d="M12.5 2.5v9l6-1.5-6-7.5Zm-1 11-6 2 2 5.5 4-7.5Zm2.5 1.2 4 3.3-2 3.5-2-6.8Zm-2-.6L6 12l1.8-5.6 4.2 7.7Zm4.5-.4 4 .8-1 3.8-3-4.6Z" />
        </svg>
      );
  }
}
