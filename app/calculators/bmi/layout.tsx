import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator - Calculate Your Body Mass Index",
  description:
    "Free BMI calculator supporting both metric (kg/cm) and imperial (lbs/ft-in) units. Instantly see your BMI value, weight category, and health guidance. No sign-up or data collection required.",
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
                name: "BMI Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free BMI calculator supporting metric and imperial units. See your BMI value and weight category instantly.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  { "@type": "ListItem", position: 2, name: "All Calculators", item: "https://www.calcnow.cc/all-calculators" },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "BMI Calculator",
                    item: "https://www.calcnow.cc/calculators/bmi",
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
