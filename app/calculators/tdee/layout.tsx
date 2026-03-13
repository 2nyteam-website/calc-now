import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TDEE Calculator - Total Daily Energy Expenditure",
  description:
    "Free TDEE calculator using the Mifflin-St Jeor equation. Calculate your Total Daily Energy Expenditure, BMR, and calorie goals for weight loss or gain. Supports metric and imperial units.",
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
                name: "TDEE Calculator - CalcNow",
                applicationCategory: "HealthApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free TDEE calculator using the Mifflin-St Jeor equation. Calculate your BMR and daily calorie needs based on activity level.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "TDEE Calculator",
                    item: "https://www.calcnow.cc/calculators/tdee",
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
