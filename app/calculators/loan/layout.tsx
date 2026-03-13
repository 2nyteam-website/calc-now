import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Calculator - Calculate Monthly Payments & Total Interest",
  description:
    "Free loan calculator to estimate monthly payments, total interest, and total payment amount for any loan. Works for personal loans, auto loans, and more. Instant results with no sign-up required.",
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
                name: "Loan Calculator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free loan calculator to estimate monthly payments, total interest, and total payment for any loan type.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Loan Calculator",
                    item: "https://www.calcnow.cc/calculators/loan",
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
