import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter - Convert Length, Weight & Temperature",
  description:
    "Free unit converter for length, weight, and temperature. Convert between metric and imperial units including mm, cm, m, km, inches, feet, miles, kg, lbs, Celsius, Fahrenheit, and Kelvin.",
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
                name: "Unit Converter - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free unit converter for length, weight, and temperature. Convert between metric and imperial units instantly.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  { "@type": "ListItem", position: 2, name: "All Calculators", item: "https://www.calcnow.cc/all-calculators" },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Unit Converter",
                    item: "https://www.calcnow.cc/calculators/unit-converter",
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
