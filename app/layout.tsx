import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import BookNowBanner from "@/app/components/BookNowBanner";
import BookingPopupProvider from "@/app/components/booking/BookingPopupProvider";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { BRAND } from "@/app/lib/site-config";

import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-brand-ink">
        <BookingPopupProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
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
