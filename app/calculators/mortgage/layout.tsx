import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator - Estimate Your Monthly House Payment",
  description:
    "Free mortgage calculator to estimate monthly payments with down payment, interest rate, and loan term options. Compare 15-year vs 30-year mortgages. See total interest and payment breakdowns instantly.",
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
                name: "Mortgage Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free mortgage calculator to estimate monthly payments with down payment, interest rate, and loan term options.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  { "@type": "ListItem", position: 2, name: "All Calculators", item: "https://www.calcnow.cc/all-calculators" },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Mortgage Calculator",
                    item: "https://www.calcnow.cc/calculators/mortgage",
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
