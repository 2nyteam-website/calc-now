import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator - Create Strong Random Passwords",
  description:
    "Free password generator to create strong, secure random passwords. Customize length, uppercase, lowercase, numbers, and symbols. Uses cryptographic randomness for maximum security.",
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
                name: "Password Generator - CalcNow",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description:
                  "Free password generator to create strong, secure random passwords with customizable options.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.calcnow.cc" },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Password Generator",
                    item: "https://www.calcnow.cc/calculators/password-generator",
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
