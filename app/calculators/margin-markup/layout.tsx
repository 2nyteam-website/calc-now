import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Margin & Markup Calculator - Calculate Profit Margin and Markup Percentage",
  description:
    "Free margin and markup calculator for business owners. Calculate profit margin, markup percentage, and profit from cost and selling price. Includes reverse calculation from target margin or markup.",
  keywords: [
    "margin calculator",
    "markup calculator",
    "profit margin calculator",
    "markup percentage calculator",
    "gross margin calculator",
    "margin vs markup",
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
                name: "Margin & Markup Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free margin and markup calculator. Calculate profit margin, markup percentage, and profit from cost and revenue.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  { "@type": "ListItem", position: 2, name: "All Calculators", item: "https://www.calcnow.cc/all-calculators" },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Margin & Markup Calculator",
                    item: "https://www.calcnow.cc/calculators/margin-markup",
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
