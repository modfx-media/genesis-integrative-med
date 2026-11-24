"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion as useReducedMotion } from "@/app/lib/use-prefers-reduced-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import BookNowTrigger from "@/app/components/booking/BookNowTrigger";
import { CONTACT } from "@/app/lib/site-config";

/**
 * Sticky "Book Now" banner, slides up from the bottom after the user scrolls
 * past the hero. Dismissable for the current session. Persistent across all
 * pages via the root layout.
 */
export default function BookNowBanner() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [nearFooter, setNearFooter] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Honor per-session dismissal
    try {
      if (sessionStorage.getItem("gim-book-banner-dismissed") === "1") return;
    } catch {
      // sessionStorage may be unavailable; ignore
    }
    setDismissed(false);
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide before the footer scrolls into view so the banner never sits over it.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -140px 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("gim-book-banner-dismissed", "1");
    } catch {
      // ignore
    }
  };

  // Redundant with the contact page's own booking/contact CTAs.
  const hiddenOnRoute = pathname?.startsWith("/contact") ?? false;
  const show = visible && !dismissed && !nearFooter && !hiddenOnRoute;

  // Push the 3rd-party (knock-knock) chat widget above this banner so they don't overlap.
  useEffect(() => {
    const body = document.body;
    const el = cardRef.current;
    if (!show || !el) {
      body.classList.remove("book-banner-open");
      return;
    }
    body.classList.add("book-banner-open");
    const setHeight = () =>
      body.style.setProperty("--book-banner-h", `${el.offsetHeight}px`);
    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => {
      observer.disconnect();
      body.classList.remove("book-banner-open");
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="complementary"
          aria-label="Book an appointment"
          initial={reduce ? false : { y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="motion-reveal pointer-events-none fixed inset-x-0 bottom-0 z-40"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="pointer-events-auto mx-auto flex max-w-6xl px-3 sm:px-6">
            <div
              ref={cardRef}
              className="relative flex-1 overflow-hidden rounded-2xl border border-brand-line bg-white/95 shadow-2xl shadow-brand-navy/25 backdrop-blur-md"
            >
              {/* Gradient accent hairline */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-cyan"
              />

              <div className="flex items-center gap-2.5 p-2.5 sm:gap-4 sm:p-3">
                {/* Icon badge */}
                <span
                  aria-hidden
                  className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/25 sm:flex"
                >
                  <CalendarPulseIcon className="h-4 w-4" />
                </span>

                {/* Copy */}
                <div className="min-w-0 flex-1">
                  <p className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-brand-blue sm:block">
                    Ready to feel better?
                  </p>
                  <p className="truncate text-xs font-bold leading-tight text-brand-navy sm:mt-0.5 sm:text-sm">
                    Book your appointment, same-week availability
                  </p>
                </div>

                {/* Phone (desktop only) */}
                <a
                  href={CONTACT.phoneHref}
                  className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-brand-line px-3.5 py-1.5 text-xs font-bold text-brand-navy transition-colors hover:border-brand-blue/30 hover:bg-brand-mist md:inline-flex"
                >
                  <PhoneIcon className="h-3.5 w-3.5 text-brand-blue" />
                  {CONTACT.phoneDisplay}
                </a>

                {/* Primary CTA */}
                <BookNowTrigger className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-md shadow-brand-blue/25 transition-shadow hover:shadow-lg hover:shadow-brand-blue/40">
                  Schedule Appointment
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </BookNowTrigger>

                {/* Dismiss */}
                <button
                  type="button"
                  aria-label="Dismiss banner"
                  onClick={dismiss}
                  className="ml-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-brand-ink/50 transition-colors hover:bg-brand-mist hover:text-brand-navy"
                >
                  <XCloseIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                       */
/* -------------------------------------------------------------------------- */

function CalendarPulseIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M8 15l2 2 4-4" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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

function XCloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}
