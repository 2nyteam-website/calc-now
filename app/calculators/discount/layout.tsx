import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discount Calculator - Calculate Sale Price & Savings",
  description:
    "Free discount calculator to find the final price after applying one or two discount percentages. See how much you save instantly. Perfect for shopping sales, coupons, and promotional offers.",
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
                name: "Discount Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free discount calculator to find the final price after applying discount percentages. See savings instantly.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  { "@type": "ListItem", position: 2, name: "All Calculators", item: "https://www.calcnow.cc/all-calculators" },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Discount Calculator",
                    item: "https://www.calcnow.cc/calculators/discount",
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
