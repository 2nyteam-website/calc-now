import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "All Calculators",
  description:
    "Browse all free online calculators on CalcNow. Finance, health, math, and everyday tools — 100% browser-based.",
  alternates: { canonical: "/all-calculators" },
};

const CALCULATORS = [
  {
    category: "Finance",
    count: 9,
    tools: [
      { name: "Compound Interest Calculator", href: "/calculators/compound-interest", desc: "Calculate future value with compound interest over time." },
      { name: "Loan Calculator", href: "/calculators/loan", desc: "Monthly payments, total interest, and amortization for any loan." },
      { name: "Mortgage Calculator", href: "/calculators/mortgage", desc: "Home loan payments with down payment and interest rate." },
      { name: "Auto Loan Calculator", href: "/calculators/auto-loan", desc: "Car loan payments with down payment and trade-in value." },
      { name: "ROI Calculator", href: "/calculators/roi", desc: "Return on investment with annualized ROI." },
      { name: "Margin & Markup Calculator", href: "/calculators/margin-markup", desc: "Profit margin, markup percentage, and selling price." },
      { name: "Salary Calculator", href: "/calculators/salary", desc: "Convert between hourly, weekly, monthly, and annual salary." },
      { name: "Tip Calculator", href: "/calculators/tip", desc: "Split bills and calculate tips for any group size." },
      { name: "Discount Calculator", href: "/calculators/discount", desc: "Find the final price after single or stacked discounts." },
    ],
  },
  {
    category: "Health & Life",
    count: 4,
    tools: [
      { name: "BMI Calculator", href: "/calculators/bmi", desc: "Body Mass Index with WHO health categories." },
      { name: "TDEE Calculator", href: "/calculators/tdee", desc: "Total Daily Energy Expenditure and calorie goals." },
      { name: "Body Fat Calculator", href: "/calculators/body-fat", desc: "Body fat percentage using the US Navy method." },
      { name: "Age Calculator", href: "/calculators/age", desc: "Exact age in years, months, and days from your birthdate." },
    ],
  },
  {
    category: "Math & Conversion",
    count: 2,
    tools: [
      { name: "Percentage Calculator", href: "/calculators/percentage", desc: "3-in-1 percentage calculations for any scenario." },
      { name: "Unit Converter", href: "/calculators/unit-converter", desc: "Length, weight, and temperature conversions." },
    ],
  },
  {
    category: "Everyday Tools",
    count: 3,
    tools: [
      { name: "Date Calculator", href: "/calculators/date", desc: "Date difference and add or subtract days from a date." },
      { name: "GPA Calculator", href: "/calculators/gpa", desc: "Calculate your college GPA with dynamic course list." },
      { name: "Password Generator", href: "/calculators/password-generator", desc: "Generate secure random passwords with custom options." },
    ],
  },
];

export default function AllCalculatorsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All Free Online Calculators",
    description: "Browse all free online calculators on CalcNow.",
    url: "https://www.calcnow.cc/all-calculators",
    numberOfItems: 18,
    itemListElement: CALCULATORS.flatMap((cat) =>
      cat.tools.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: tool.name,
        url: `https://www.calcnow.cc${tool.href}`,
      }))
    ),
  };

  return (
    <div className="space-y-8 py-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Calculators</h1>
        <p className="text-muted-foreground mt-2">
          Browse our full collection of free online calculators. All tools run entirely in your browser.
        </p>
        <Badge variant="secondary" className="mt-2">
          18 Calculators — 100% Free
        </Badge>
      </div>

      {CALCULATORS.map((cat) => (
        <section key={cat.category}>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold">{cat.category}</h2>
            <Badge variant="outline" className="text-xs">
              {cat.count}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.tools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="h-full hover:border-blue-400 hover:shadow-md transition-all cursor-pointer justify-center">
                  <CardContent className="py-4 px-6">
                    <h3 className="font-semibold text-sm text-gray-900">{tool.name}</h3>
                    <p className="text-muted-foreground text-xs mt-1">
                      {tool.desc}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
