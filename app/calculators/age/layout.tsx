import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Exact Age in Years, Months, Days",
  description:
    "Free age calculator to find your exact age in years, months, and days from your birth date. Also shows days until your next birthday. Simple, fast, and accurate age calculation tool.",
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
                name: "Age Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free age calculator to find your exact age in years, months, and days from your birth date.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  { "@type": "ListItem", position: 2, name: "All Calculators", item: "https://www.calcnow.cc/all-calculators" },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Age Calculator",
                    item: "https://www.calcnow.cc/calculators/age",
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
