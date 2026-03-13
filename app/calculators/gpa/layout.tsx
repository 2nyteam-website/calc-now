import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPA Calculator - Calculate Your Grade Point Average",
  description:
    "Free GPA calculator to compute your grade point average from course grades and credits. Supports A+ through F grading scale. See your GPA classification instantly.",
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
                name: "GPA Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free GPA calculator to compute your grade point average from course grades and credit hours.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "GPA Calculator",
                    item: "https://www.calcnow.cc/calculators/gpa",
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
