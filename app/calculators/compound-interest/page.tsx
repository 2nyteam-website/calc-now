"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");

  const P = parseFloat(principal) || 0;
  const PMT = parseFloat(monthly) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const t = parseFloat(years) || 0;
  const n = 12;

  let futureValue = 0;
  let totalContributions = P + PMT * n * t;

  if (r === 0) {
    futureValue = P + PMT * n * t;
  } else {
    const rn = r / n;
    const nt = n * t;
    const compoundFactor = Math.pow(1 + rn, nt);
    futureValue = P * compoundFactor + PMT * ((compoundFactor - 1) / rn);
  }

  const totalInterest = futureValue - totalContributions;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compound Interest Calculator</h1>
        <p className="text-muted-foreground mt-1">
          See how your investments grow over time with the power of compounding.
        </p>
        <Badge variant="secondary" className="mt-2">No data sent to server</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Initial Investment ($)</Label>
              <Input id="principal" type="number" min="0" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly">Monthly Contribution ($)</Label>
              <Input id="monthly" type="number" min="0" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input id="rate" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years">Investment Period (Years)</Label>
              <Input id="years" type="number" min="0" value={years} onChange={(e) => setYears(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent aria-live="polite">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Future Value</span>
                <span className="text-2xl font-bold text-primary">${fmt(futureValue)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Total Contributions</span>
                <span className="text-lg font-semibold">${fmt(totalContributions)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Total Interest Earned</span>
                <span className="text-lg font-semibold text-green-500">${fmt(totalInterest)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEO Content */}
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="how-to">How to Use</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="prose prose-invert max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">About the Compound Interest Calculator</h2>
          <p>
            Compound interest is one of the most powerful concepts in finance. Unlike simple interest, which is calculated only on the initial principal, compound interest is calculated on the principal plus all previously accumulated interest. This means your money grows exponentially over time, often referred to as &quot;interest on interest.&quot;
          </p>
          <p>
            This calculator uses the standard compound interest formula: FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)], where P is the initial investment, r is the annual interest rate, n is the number of compounding periods per year (monthly = 12), t is the number of years, and PMT is the monthly contribution. The calculation assumes contributions are made at the end of each month.
          </p>
          <p>
            Understanding compound interest is essential for retirement planning, investment decisions, and building long-term wealth. Even small regular contributions can grow into substantial amounts over decades thanks to compounding.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose-invert max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <p>
            Enter your initial investment amount, which is the lump sum you are starting with. Then enter your planned monthly contribution — the amount you will add each month. Set the expected annual interest rate (stock market historical average is roughly 7-10%). Finally, enter the number of years you plan to invest.
          </p>
          <p>
            The results update in real time as you type. You will see three key numbers: the future value (total amount you will have), total contributions (what you actually put in), and total interest earned (free money from compounding). Compare different scenarios by adjusting the inputs to see how time, rate, and contributions affect your outcome.
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose-invert max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>How often is interest compounded?</strong> This calculator compounds monthly (12 times per year), which is the most common compounding frequency for savings accounts and investments.</p>
          <p><strong>Is this calculator accurate?</strong> Yes, it uses the standard financial compound interest formula. However, real-world returns may vary due to market fluctuations, fees, and taxes.</p>
          <p><strong>What is a good interest rate to use?</strong> The S&amp;P 500 has historically returned about 10% annually before inflation (about 7% after inflation). Savings accounts typically offer 1-5%. Use a rate that matches your investment type.</p>
          <p><strong>Is my data saved?</strong> No. All calculations happen in your browser. No data is sent to any server.</p>
        </TabsContent>
      </Tabs>

      {/* Related Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Related Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculators/loan" className="text-sm text-primary hover:underline">Loan Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/mortgage" className="text-sm text-primary hover:underline">Mortgage Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/salary" className="text-sm text-primary hover:underline">Salary Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/percentage" className="text-sm text-primary hover:underline">Percentage Calculator</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
