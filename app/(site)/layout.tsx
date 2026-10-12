import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import BookNowBanner from "@/app/components/BookNowBanner";
import BookingPopupProvider from "@/app/components/booking/BookingPopupProvider";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { BRAND, type NavItem } from "@/app/lib/site-config";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { buildGoogleReviewsJsonLd } from "@/lib/google-reviews-jsonld";
import {
  getFooterGlobal,
  getHeaderGlobal,
  getSiteSettingsGlobal,
} from "@/lib/cms/queries";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://genesisintegrativemed.com",
  ),
  title: {
    default: `${BRAND.name} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Integrative medicine in Geneva, IL, chiropractic, regenerative medicine, PRP, peptide weight loss, cold laser, and more.",
};

function mapNav(global: unknown): readonly NavItem[] | undefined {
  if (!global || typeof global !== "object") return undefined;
  const items = (global as { navItems?: unknown }).navItems;
  if (!Array.isArray(items) || items.length === 0) return undefined;
  const mapped: NavItem[] = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const label = typeof row.label === "string" ? row.label : "";
    const href = typeof row.href === "string" ? row.href : "";
    if (!label || !href) continue;
    const children = Array.isArray(row.children)
      ? row.children.flatMap((child) => {
          if (!child || typeof child !== "object") return [];
          const c = child as Record<string, unknown>;
          if (typeof c.label === "string" && typeof c.href === "string") {
            return [{ label: c.label, href: c.href }];
          }
          return [];
        })
      : [];
    mapped.push({
      label,
      href,
      ...(children.length ? { children } : {}),
    });
  }
  return mapped.length ? mapped : undefined;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ reviews, meta }, headerGlobal, footerGlobal, settings] = await Promise.all([
    getDisplayedGoogleReviews(),
    getHeaderGlobal(),
    getFooterGlobal(),
    getSiteSettingsGlobal(),
  ]);
  const reviewsJsonLd = buildGoogleReviewsJsonLd(reviews, meta);
  const navItems = mapNav(headerGlobal);
  const rawLinks =
    footerGlobal && typeof footerGlobal === "object"
      ? (footerGlobal as { links?: unknown }).links
      : undefined;
  const footerLinks = Array.isArray(rawLinks)
    ? rawLinks
        .filter((l): l is { label: string; href: string } =>
          Boolean(l && typeof l === "object" && (l as { label?: string }).label && (l as { href?: string }).href),
        )
        .map((l) => ({ label: l.label, href: l.href }))
    : undefined;
  const settingsReviews =
    settings &&
    typeof settings === "object" &&
    "reviewsUrl" in settings &&
    typeof settings.reviewsUrl === "string"
      ? settings.reviewsUrl
      : undefined;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-brand-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
        />
        <BookingPopupProvider>
          <Header navItems={navItems} />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer
            links={footerLinks}
            reviewsUrl={settingsReviews ?? meta.reviewsUrl}
            rating={meta.rating}
            reviewCount={meta.reviewCount}
          />
          <BookNowBanner />
        </BookingPopupProvider>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ECJR0J4REF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ECJR0J4REF');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yj6kw4s3qs");
          `}
        </Script>
        <Script id="knock-knock-widget" strategy="afterInteractive">
          {`
            window.company_id = '6a7b00dd939f9f6c9aaa74c3';
            var newScript = document.createElement('script');
            newScript.src = 'https://api.knock-knockapp.com/widget/widget.js';
            document.getElementsByTagName('HEAD')[0].appendChild(newScript);
          `}
        </Script>
      </body>
    </html>
  );
}
