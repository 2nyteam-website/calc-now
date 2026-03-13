import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tip Calculator - Calculate Tip Amount & Split the Bill",
  description:
    "Free tip calculator to quickly figure out tip amounts and split bills between multiple people. Preset tip percentages for easy selection. Perfect for restaurants, delivery, and service tips.",
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
                name: "Tip Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free tip calculator to quickly figure out tip amounts and split bills between multiple people.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Tip Calculator",
                    item: "https://www.calcnow.cc/calculators/tip",
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
