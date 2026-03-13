import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "All Calculators",
  description:
    "Browse all free online calculators on CalcNow. Finance, health, math, and conversion tools — 100% browser-based.",
  alternates: { canonical: "/all-calculators" },
};

const CALCULATORS = [
  {
    category: "Finance",
    count: 6,
    tools: [
      {
        name: "Compound Interest Calculator",
        href: "/calculators/compound-interest",
        desc: "Calculate future value with compound interest over time.",
      },
      {
        name: "Loan Calculator",
        href: "/calculators/loan",
        desc: "Monthly payments, total interest, and amortization for any loan.",
      },
      {
        name: "Mortgage Calculator",
        href: "/calculators/mortgage",
        desc: "Home loan payments with down payment and property tax estimates.",
      },
      {
        name: "Salary Calculator",
        href: "/calculators/salary",
        desc: "Convert between hourly, weekly, monthly, and annual salary.",
      },
      {
        name: "Tip Calculator",
        href: "/calculators/tip",
        desc: "Split bills and calculate tips for any group size.",
      },
      {
        name: "Discount Calculator",
        href: "/calculators/discount",
        desc: "Find the final price after single or stacked discounts.",
      },
    ],
  },
  {
    category: "Health & Life",
    count: 2,
    tools: [
      {
        name: "BMI Calculator",
        href: "/calculators/bmi",
        desc: "Body Mass Index with WHO health categories.",
      },
      {
        name: "Age Calculator",
        href: "/calculators/age",
        desc: "Exact age in years, months, and days from your birthdate.",
      },
    ],
  },
  {
    category: "Math & Conversion",
    count: 2,
    tools: [
      {
        name: "Percentage Calculator",
        href: "/calculators/percentage",
        desc: "3-in-1 percentage calculations for any scenario.",
      },
      {
        name: "Unit Converter",
        href: "/calculators/unit-converter",
        desc: "Length, weight, and temperature conversions.",
      },
    ],
  },
];

export default function AllCalculatorsPage() {
  return (
    <div className="space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Calculators</h1>
        <p className="text-muted-foreground mt-2">
          Browse our full collection of free online calculators. All tools run
          entirely in your browser.
        </p>
        <Badge variant="secondary" className="mt-2">
          10 Calculators — 100% Free
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
