import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator - Calculate Investment Growth Over Time",
  description:
    "Free compound interest calculator with monthly contributions. See how your investments grow over time with the power of compounding. Includes future value, total contributions, and interest earned breakdowns.",
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
                name: "Compound Interest Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free compound interest calculator with monthly contributions. See how your investments grow over time with the power of compounding.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Compound Interest Calculator",
                    item: "https://www.calcnow.cc/calculators/compound-interest",
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
