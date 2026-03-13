import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentages Instantly",
  description:
    "Free percentage calculator with three modes: find a percentage of a number, find what percent one number is of another, and calculate percentage change between two values. Fast and easy to use.",
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
                name: "Percentage Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free percentage calculator with three modes: find percentage of a number, what percent, and percentage change.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Percentage Calculator",
                    item: "https://www.calcnow.cc/calculators/percentage",
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
