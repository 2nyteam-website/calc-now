import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import NavDropdown from "@/components/nav-dropdown";
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
  metadataBase: new URL("https://www.calcnow.cc"),
  alternates: { canonical: "./" },
  title: {
    default: "CalcNow - Free Online Calculators",
    template: "%s | CalcNow",
  },
  description:
    "Free online calculators for finance, health, math, and everyday life. Loan, mortgage, BMI, percentage, salary, and more. 100% browser-based, no sign-up required.",
  keywords: [
    "online calculator",
    "free calculator",
    "loan calculator",
    "mortgage calculator",
    "bmi calculator",
    "percentage calculator",
    "salary calculator",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CalcNow",
  },
  verification: {
    google: "MWc-Qooq8be1b-C9c8zilSyFpdR0SGsuum3kPPfr_8o",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FL9KB5D3C8"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-FL9KB5D3C8');`}</Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2080535898067346"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Header */}
        <header className="border-b border-border bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-primary">Calc</span>
              <span className="text-gray-700">Now</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <NavDropdown />
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>CalcNow - Free online calculators. No sign-up, no limits.</p>
              <div className="flex gap-4">
                <Link href="/about" className="hover:text-foreground">About</Link>
                <Link href="/contact" className="hover:text-foreground">Contact</Link>
                <Link href="/privacy-policy" className="hover:text-foreground">Privacy</Link>
                <Link href="/terms" className="hover:text-foreground">Terms</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
