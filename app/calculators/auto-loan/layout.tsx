import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Loan Calculator - Calculate Your Monthly Car Payment",
  description:
    "Free auto loan calculator to estimate your monthly car payment, total interest, and total cost. Factor in down payment and trade-in value. Compare 3, 4, 5, and 6 year loan terms instantly.",
  keywords: [
    "auto loan calculator",
    "car payment calculator",
    "car loan calculator",
    "monthly car payment",
    "vehicle loan calculator",
    "auto financing calculator",
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
                name: "Auto Loan Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free auto loan calculator to estimate your monthly car payment with down payment and trade-in value options.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Auto Loan Calculator",
                    item: "https://www.calcnow.cc/calculators/auto-loan",
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
