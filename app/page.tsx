import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CALCULATORS = [
  {
    category: "Finance",
    tools: [
      { name: "Compound Interest Calculator", href: "/calculators/compound-interest", desc: "Calculate future value with compound interest" },
      { name: "Loan Calculator", href: "/calculators/loan", desc: "Monthly payments, total interest for any loan" },
      { name: "Mortgage Calculator", href: "/calculators/mortgage", desc: "Home loan payments with down payment" },
      { name: "Salary Calculator", href: "/calculators/salary", desc: "Convert between hourly, monthly, annual salary" },
      { name: "Tip Calculator", href: "/calculators/tip", desc: "Split bills and calculate tips easily" },
      { name: "Discount Calculator", href: "/calculators/discount", desc: "Find final price after discounts" },
    ],
  },
  {
    category: "Health & Life",
    tools: [
      { name: "BMI Calculator", href: "/calculators/bmi", desc: "Body Mass Index with health categories" },
      { name: "Age Calculator", href: "/calculators/age", desc: "Exact age in years, months, and days" },
    ],
  },
  {
    category: "Math & Conversion",
    tools: [
      { name: "Percentage Calculator", href: "/calculators/percentage", desc: "3-in-1 percentage calculations" },
      { name: "Unit Converter", href: "/calculators/unit-converter", desc: "Length, weight, and temperature conversions" },
    ],
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold">
          Free Online <span className="text-primary">Calculators</span>
        </h1>
        <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">
          Fast, free, and private. All calculations happen in your browser — no data is ever sent to a server.
        </p>
        <Badge variant="secondary" className="mt-3">
          100% Browser-Based — No Sign-Up Required
        </Badge>
      </div>

      {CALCULATORS.map((cat) => (
        <section key={cat.category}>
          <h2 className="text-xl font-semibold mb-4">{cat.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.tools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-sm">{tool.name}</h3>
                    <p className="text-muted-foreground text-xs mt-1">{tool.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: "CalcNow",
                url: "https://www.calcnow.cc",
                description: "Free online calculators for finance, health, math, and everyday life.",
              },
              {
                "@type": "ItemList",
                itemListElement: CALCULATORS.flatMap((cat) =>
                  cat.tools.map((tool, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    name: tool.name,
                    url: `https://www.calcnow.cc${tool.href}`,
                  }))
                ),
              },
            ],
          }),
        }}
      />
    </div>
  );
}
