"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import BookNowTrigger from "@/app/components/booking/BookNowTrigger";
import {
  BRAND,
  CONTACT,
  PRIMARY_NAV,
  type NavItem,
} from "@/app/lib/site-config";

/**
 * Sticky site header, one-line desktop layout with hover/keyboard dropdowns
 * for "Conditions Treated" and "Services", collapsible mobile drawer with
 * accordion sub-menus, and scroll-triggered backdrop.
 */
export default function Header({
  navItems = PRIMARY_NAV,
}: {
  navItems?: readonly NavItem[];
} = {}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/" && pathname !== null && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility strip */}
      <div className="hidden bg-brand-ink text-white/85 lg:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-1.5 text-xs">
          <div className="flex items-center gap-6">
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-brand-sky"
            >
              <MapPinIcon className="h-3.5 w-3.5 text-brand-blue" />
              <span className="tracking-wide">
                {CONTACT.address.street}, {CONTACT.address.cityState}
              </span>
            </a>
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-brand-sky"
            >
              <PhoneIcon className="h-3.5 w-3.5 text-brand-blue" />
              <span className="font-medium tracking-wide">
                {CONTACT.phoneDisplay}
              </span>
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={CONTACT.careCreditUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply for financing with CareCredit"
              className="group flex items-center gap-2 whitespace-nowrap rounded-full bg-white py-1 pl-2.5 pr-3 transition-colors hover:bg-brand-sky/90"
            >
              <Image
                src="/images/care-credit-small-300x62.png"
                alt="CareCredit"
                width={300}
                height={62}
                className="h-3.5 w-auto"
              />
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-brand-navy">
                Apply for Financing
                <ArrowRightIcon className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
            <SocialLinks
              className="flex items-center gap-3 text-white/70"
              iconClass="h-3.5 w-3.5 hover:text-brand-sky transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-brand-line bg-white/90 shadow-sm backdrop-blur-md"
            : "border-transparent bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-1.5 lg:px-6 lg:py-2">
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${BRAND.name}, Home`}
            className="flex shrink-0 items-center transition-transform hover:scale-[1.02]"
          >
            <Image
              src={BRAND.logo}
              alt={`${BRAND.name} logo`}
              width={280}
              height={100}
              priority
              className="h-12 w-auto md:h-14 lg:h-16"
            />
          </Link>

          {/* Desktop nav, kept on one line */}
          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center justify-center lg:flex"
          >
            <ul className="flex flex-nowrap items-center">
              {navItems.map((item) => (
                <NavItemDesktop
                  key={item.href}
                  item={item}
                  active={isActive(item.href)}
                />
              ))}
            </ul>
          </nav>

          {/* CTA + mobile toggle */}
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <BookNowTrigger className="group hidden items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-md shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-blue/40 md:inline-flex">
              Schedule Appointment
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </BookNowTrigger>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-line text-brand-navy transition-colors hover:bg-brand-mist lg:hidden"
            >
              {open ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto bg-brand-ink text-white lg:hidden"
          >
            <div className="mx-auto max-w-xl px-6 py-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-sky">
                Menu
              </p>
              <nav aria-label="Mobile" className="mt-4">
                <ul className="flex flex-col divide-y divide-white/10">
                  {navItems.map((item) => (
                    <NavItemMobile
                      key={item.href}
                      item={item}
                      isActive={isActive}
                      onNavigate={() => setOpen(false)}
                    />
                  ))}
                </ul>
              </nav>

              <BookNowTrigger className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg">
                Schedule Appointment
                <ArrowRightIcon className="h-4 w-4" />
              </BookNowTrigger>

              <div className="mt-10 space-y-4 border-t border-white/10 pt-8 text-sm text-white/80">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-sky">
                  Get in touch
                </p>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-3 hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4 text-brand-blue" />
                  {CONTACT.phoneDisplay}
                </a>
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white"
                >
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                  <span>
                    {CONTACT.address.street}
                    <br />
                    {CONTACT.address.cityState}
                  </span>
                </a>
                <SocialLinks
                  className="flex items-center gap-4 pt-2"
                  iconClass="h-5 w-5 text-white/70 hover:text-brand-cyan transition-colors"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop nav item (with optional dropdown)                                   */
/* -------------------------------------------------------------------------- */

function NavItemDesktop({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLLIElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const baseLinkClasses =
    "group relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors";
  const stateClasses = active
    ? "text-brand-navy"
    : "text-brand-ink hover:text-brand-blue";

  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={`${baseLinkClasses} ${stateClasses}`}>
          {item.label}
          <span
            aria-hidden
            className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-center rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan transition-transform duration-300 ${
              active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </Link>
      </li>
    );
  }

  return (
    <li
      ref={wrapperRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
      onFocus={openNow}
      onBlur={(e) => {
        // close if focus leaves the entire wrapper
        if (
          !wrapperRef.current?.contains(e.relatedTarget as Node | null)
        ) {
          setOpen(false);
        }
      }}
    >
      {/* Parent label, navigates to the index page (e.g. /services/, /conditions-treated/).
          The chevron sibling toggles the dropdown on click / keyboard; hover opens it automatically. */}
      <div
        className={`${baseLinkClasses} ${stateClasses} group/parent gap-0 pr-1`}
      >
        <Link
          href={item.href}
          className="inline-flex items-center pr-1.5"
          aria-current={active ? "page" : undefined}
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`Toggle ${item.label} menu`}
          onClick={() => setOpen((v) => !v)}
          className="ml-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-current transition-colors hover:bg-brand-mist"
        >
          <ChevronDownIcon
            className={`h-3 w-3 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-center rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan transition-transform duration-300 ${
            active || open ? "scale-x-100" : "scale-x-0 group-hover/parent:scale-x-100"
          }`}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={item.label}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 ${
              item.children.length <= 3
                ? "w-[min(92vw,320px)]"
                : "w-[min(92vw,580px)]"
            }`}
          >
            {/* Invisible hover bridge so quick mouse travel doesn't close it */}
            <div aria-hidden className="h-3 w-full" />
            <div className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-2xl shadow-brand-navy/15 ring-1 ring-black/[0.02]">
              <div className="flex items-center justify-between gap-4 border-b border-brand-line bg-brand-mist/60 px-5 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
                  {item.label}
                </p>
                <Link
                  href={item.href}
                  role="menuitem"
                  className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy transition-colors hover:text-brand-blue"
                >
                  View all
                  <ArrowRightIcon className="h-3 w-3" />
                </Link>
              </div>
              <ul
                className={`grid gap-x-2 gap-y-1 p-3 ${
                  item.children.length <= 3 ? "grid-cols-1" : "grid-cols-2"
                }`}
              >
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      role="menuitem"
                      className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-ink/80 transition-colors hover:bg-brand-mist hover:text-brand-navy"
                    >
                      <span className="truncate">{child.label}</span>
                      <ArrowRightIcon className="h-3 w-3 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 text-brand-blue" />
                    </Link>
                  </li>
                ))}
                {item.children.length > 3 && item.children.length % 2 === 1 && (
                  <li>
                    <Link
                      href={item.href}
                      role="menuitem"
                      className="group flex items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-brand-blue/10 to-brand-cyan/10 px-3 py-2.5 text-sm font-semibold text-brand-navy transition-all hover:from-brand-blue hover:to-brand-cyan hover:text-white"
                    >
                      <span>See all {item.label}</span>
                      <ArrowRightIcon className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                )}
              </ul>
              {/* Book Appointment CTA, always one click away */}
              <BookNowTrigger
                role="menuitem"
                className="group flex w-full items-center justify-between gap-3 border-t border-brand-line bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-3.5 text-white transition-opacity hover:opacity-95"
              >
                <span className="flex items-center gap-2.5">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em]">
                    Book appointment
                  </span>
                </span>
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </BookNowTrigger>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile nav item (with optional accordion)                                   */
/* -------------------------------------------------------------------------- */

function NavItemMobile({
  item,
  isActive,
  onNavigate,
}: {
  item: NavItem;
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const parentActive = isActive(item.href);

  if (!item.children) {
    return (
      <li>
        <Link
          href={item.href}
          onClick={onNavigate}
          className={`flex items-center justify-between py-4 text-lg font-semibold tracking-tight transition-colors ${
            parentActive ? "text-brand-cyan" : "text-white hover:text-brand-sky"
          }`}
        >
          {item.label}
          <ArrowRightIcon className="h-4 w-4 opacity-60" />
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className="flex items-stretch">
        <Link
          href={item.href}
          onClick={onNavigate}
          className={`flex flex-1 items-center py-4 text-lg font-semibold tracking-tight transition-colors ${
            parentActive ? "text-brand-cyan" : "text-white hover:text-brand-sky"
          }`}
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
          onClick={() => setExpanded((v) => !v)}
          className="flex h-14 w-14 items-center justify-center text-white/70 transition-colors hover:text-brand-cyan"
        >
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <li>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="flex items-center justify-between border-l-2 border-brand-cyan/50 bg-white/[0.03] px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-cyan"
              >
                View all {item.label}
                <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </li>
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className="flex items-center justify-between border-l-2 border-white/10 py-3 pl-4 pr-2 text-sm text-white/85 transition-colors hover:border-brand-cyan/40 hover:bg-white/[0.03] hover:text-white"
                >
                  {child.label}
                  <ArrowRightIcon className="h-3 w-3 opacity-40" />
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Small helpers                                                              */
/* -------------------------------------------------------------------------- */

function SocialLinks({
  className,
  iconClass,
}: {
  className?: string;
  iconClass?: string;
}) {
  return (
    <div className={className}>
      <a
        href={CONTACT.social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <FacebookIcon className={iconClass} />
      </a>
      <a
        href={CONTACT.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <InstagramIcon className={iconClass} />
      </a>
      <a
        href={CONTACT.social.yelp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Yelp"
      >
        <YelpIcon className={iconClass} />
      </a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                       */
/* -------------------------------------------------------------------------- */

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
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

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M8 15l2 2 4-4" />
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
