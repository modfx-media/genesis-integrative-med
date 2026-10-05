import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col justify-center px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-brand-ink">
        This page is not available
      </h1>
      <p className="mt-4 text-brand-ink/70">
        The address may have changed. Use the menu to continue browsing Genesis
        Integrative Medicine.
      </p>
      <a href="/" className="mt-8 text-brand-navy underline-offset-4 hover:underline">
        Return home
      </a>
    </div>
  );
}
