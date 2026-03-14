import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator - Calculate Return on Investment Percentage",
  description:
    "Free ROI calculator to measure the return on any investment. Calculate ROI percentage, net profit or loss, and annualized return. Compare investment performance instantly.",
  keywords: [
    "ROI calculator",
    "return on investment calculator",
    "investment return calculator",
    "annualized ROI",
    "investment profit calculator",
    "ROI percentage calculator",
  ],
  alternates: { canonical: "./" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "ROI Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free ROI calculator to measure the return on any investment. Calculate ROI percentage, net profit, and annualized return.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  { "@type": "ListItem", position: 2, name: "All Calculators", item: "https://www.calcnow.cc/all-calculators" },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "ROI Calculator",
                    item: "https://www.calcnow.cc/calculators/roi",
                  },
                ],
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
