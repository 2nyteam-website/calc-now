import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Calculator - Find Date Difference or Add/Subtract Days",
  description:
    "Free date calculator to find the difference between two dates in years, months, and days, or add and subtract days from a date. Fast, accurate, and works offline.",
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
                name: "Date Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free date calculator to find the difference between two dates or add and subtract days from a date.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  { "@type": "ListItem", position: 2, name: "All Calculators", item: "https://www.calcnow.cc/all-calculators" },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Date Calculator",
                    item: "https://www.calcnow.cc/calculators/date",
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
