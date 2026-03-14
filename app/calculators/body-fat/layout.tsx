import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Body Fat Calculator - US Navy Method",
  description:
    "Free body fat percentage calculator using the US Navy method. Calculate your body fat %, fat mass, lean mass, and body fat category. Supports metric and imperial units.",
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
                name: "Body Fat Calculator - CalcNow",
                applicationCategory: "HealthApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free body fat percentage calculator using the US Navy method. Get your body fat %, fat mass, lean mass, and category instantly.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  { "@type": "ListItem", position: 2, name: "All Calculators", item: "https://www.calcnow.cc/all-calculators" },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Body Fat Calculator",
                    item: "https://www.calcnow.cc/calculators/body-fat",
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
