import Image from "next/image";
import Link from "next/link";

import {
  BRAND,
  CONTACT,
  FOOTER_LINKS,
} from "@/app/lib/site-config";

/**
 * Site-wide footer.
 * - Deep-navy background (brand-ink) with subtle gradient accent line
 * - Four-column layout on desktop, stacks on mobile
 * - Reversed (white) logo, quick links, hours, Google review + social
 */
export default function Footer({
  reviewsUrl = CONTACT.reviewsUrl,
  rating,
  reviewCount,
}: {
  reviewsUrl?: string;
  rating?: number;
  reviewCount?: number;
} = {}) {
  const year = new Date().getFullYear();
  const reviewsLabel =
    rating && reviewCount
      ? `${rating.toFixed(1)} · ${reviewCount.toLocaleString()} Google Reviews`
      : "Read our Google Reviews";

  return (
    <footer className="relative overflow-hidden bg-brand-ink text-white">
      {/* Subtle gradient accent at the very top edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[80%] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label={`${BRAND.name}, Home`}
              className="inline-block"
            >
              {/* Reversed (white) logo, uses CSS filter so we ship a single asset */}
              <Image
                src={BRAND.logo}
                alt={`${BRAND.name} logo`}
                width={220}
                height={80}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {BRAND.tagline}. Integrative, non-invasive care, combining
              advanced medicine with holistic therapies to treat the root
              cause.
            </p>

            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/90 backdrop-blur-sm transition-colors hover:border-brand-cyan/50 hover:bg-white/[0.06]"
            >
              <GoogleGIcon className="h-4 w-4" />
              <span className="flex items-center gap-1.5">
                <span className="text-white">{reviewsLabel}</span>
                <ArrowRightIcon className="h-3 w-3" />
              </span>
            </a>

            {/* CareCredit financing partner */}
            <a
              href={CONTACT.careCreditUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply for financing with CareCredit"
              className="group mt-4 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white p-2.5 shadow-lg shadow-brand-navy/20 transition-all hover:-translate-y-0.5 hover:border-brand-cyan/50 hover:shadow-xl"
            >
              <Image
                src="/images/care-credit-small-300x62.png"
                alt="CareCredit"
                width={300}
                height={62}
                className="h-8 w-auto"
              />
              <span className="pr-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-navy">
                Apply for financing
                <ArrowRightIcon className="ml-1 inline h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-sky">
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-sky">
              Contact
            </p>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <li>
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 hover:text-white"
                >
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue transition-colors group-hover:text-brand-cyan" />
                  <span>
                    {CONTACT.address.street}
                    <br />
                    {CONTACT.address.cityState}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="group flex items-center gap-3 hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4 text-brand-blue transition-colors group-hover:text-brand-cyan" />
                  <span className="font-medium tracking-wide">
                    {CONTACT.phoneDisplay}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaxIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                <span className="text-white/70">
                  Fax {CONTACT.faxDisplay}
                </span>
              </li>
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="group flex items-center gap-3 hover:text-white"
                >
                  <MailIcon className="h-4 w-4 text-brand-blue transition-colors group-hover:text-brand-cyan" />
                  <span className="break-all">{CONTACT.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours + social */}
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-sky">
              Hours
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/80">
              {CONTACT.hours.map((h) => (
                <li key={h.day}>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-white/60">
                    {h.day}
                  </span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-sky">
              Follow
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-brand-cyan/50 hover:bg-white/[0.06] hover:text-brand-cyan"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-brand-cyan/50 hover:bg-white/[0.06] hover:text-brand-cyan"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.social.yelp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yelp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-brand-cyan/50 hover:bg-white/[0.06] hover:text-brand-cyan"
              >
                <YelpIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider + baseline row */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© {year} {BRAND.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/your-privacy/"
              className="hover:text-white/80"
            >
              Privacy Policy
            </Link>
            <Link
              href="/our-terms/"
              className="hover:text-white/80"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/accessibility-statement/"
              className="hover:text-white/80"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Inline icons                                                                */
/* -------------------------------------------------------------------------- */

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function FaxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YelpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="12" r="1.7" />
      <ellipse cx="12" cy="5.6" rx="1.9" ry="3.5" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="5.6" rx="1.9" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="5.6" rx="1.9" ry="3.5" transform="rotate(120 12 12)" />
      <ellipse cx="12" cy="5.6" rx="1.9" ry="3.5" transform="rotate(180 12 12)" />
      <ellipse cx="12" cy="5.6" rx="1.9" ry="3.5" transform="rotate(240 12 12)" />
      <ellipse cx="12" cy="5.6" rx="1.9" ry="3.5" transform="rotate(300 12 12)" />
    </svg>
  );
}

function GoogleGIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.56-2.77c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.29 9.14 5.38 12 5.38z" />
    </svg>
  );
}
