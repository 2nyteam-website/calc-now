import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Calculator - Convert Hourly, Weekly, Monthly, Annual Pay",
  description:
    "Free salary calculator to convert between hourly, daily, weekly, bi-weekly, monthly, and annual pay. Customize hours per week and weeks per year for accurate salary conversions. Instant results.",
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
                name: "Salary Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free salary calculator to convert between hourly, daily, weekly, bi-weekly, monthly, and annual pay.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Salary Calculator",
                    item: "https://www.calcnow.cc/calculators/salary",
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
