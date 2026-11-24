"use client";

import { AnimatePresence, motion } from "motion/react";
import Script from "next/script";

/** GHL "🟢 Website Form" lead capture form, same one used on /contact/. */
const FORM_SRC =
  "https://api.leadconnectorhq.com/widget/form/ui8Cws8VEvRRDMpmSR8J";
const FORM_ID = "ui8Cws8VEvRRDMpmSR8J";
const FORM_TITLE = " 🟢 Website Form";
// Distinct from ContactFormEmbed's `inline-<id>` to avoid duplicate DOM ids
// when the popup and an on-page embed of the same form are both mounted.
const INLINE_ID = `popup-inline-${FORM_ID}`;

export default function BookingPopupModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={FORM_TITLE}
          className="motion-reveal fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            aria-hidden
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="motion-reveal relative flex max-h-[85vh] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-brand-line bg-white shadow-2xl shadow-brand-navy/30 sm:max-w-md"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-brand-line bg-gradient-to-r from-brand-mist/70 to-white px-5 py-3.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-blue text-white shadow-md shadow-brand-blue/25"
                >
                  <CalendarIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-brand-navy">
                    Schedule Your Appointment
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-ink/50">
                    Quick &amp; secure
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-brand-ink/50 transition-colors hover:bg-brand-mist hover:text-brand-navy"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <div className="min-h-0 flex-1 overflow-y-auto bg-white">
              <iframe
                src={FORM_SRC}
                id={INLINE_ID}
                title={FORM_TITLE}
                loading="lazy"
                className="block w-full border-0"
                style={{ height: "812px" }}
                scrolling="yes"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name={FORM_TITLE}
                data-height="812"
                data-layout-iframe-id={INLINE_ID}
                data-form-id={FORM_ID}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      <Script
        id="leadconnector-form-embed"
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </AnimatePresence>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9.5h16M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
