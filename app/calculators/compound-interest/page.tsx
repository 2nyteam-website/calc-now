"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CurrencyInput from "@/components/currency-input";
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
              <CurrencyInput id="principal" value={principal} onChange={setPrincipal} prefix="$" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly">Monthly Contribution ($)</Label>
              <CurrencyInput id="monthly" value={monthly} onChange={setMonthly} prefix="$" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <CurrencyInput id="rate" value={rate} onChange={setRate} suffix="%" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years">Investment Period (Years)</Label>
              <CurrencyInput id="years" value={years} onChange={setYears} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent aria-live="polite">
            <div className="bg-blue-50 rounded-lg p-5 mb-4 text-center">
              <p className="text-sm text-blue-600 mb-1">Future Value</p>
              <p className="text-4xl font-bold text-blue-700">${fmt(futureValue)}</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Total Contributions</span>
                <span className="text-lg font-semibold">${fmt(totalContributions)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Total Interest Earned</span>
                <span className="text-lg font-semibold text-green-600">${fmt(totalInterest)}</span>
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
        <TabsContent value="about" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">About the Compound Interest Calculator</h2>
          <p>
            <strong>Compound interest</strong> is one of the most powerful concepts in finance. Unlike simple interest, which is calculated only on the initial principal, compound interest is calculated on the principal plus all previously accumulated interest. This means your money grows exponentially over time, often referred to as <strong>&quot;interest on interest.&quot;</strong>
          </p>
          <p>
            This calculator uses the standard compound interest formula:
          </p>
          <p className="font-mono text-sm text-foreground">
            <strong>FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]</strong>
          </p>
          <p>
            Where P is the initial investment, r is the annual interest rate, n is the number of compounding periods per year (monthly = 12), t is the number of years, and PMT is the monthly contribution. The calculation assumes contributions are made at the end of each month.
          </p>
          <p>
            Understanding compound interest is essential for <strong>retirement planning</strong>, investment decisions, and building <strong>long-term wealth</strong>. Even small regular contributions can grow into substantial amounts over decades thanks to compounding.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enter your <strong>initial investment</strong> amount — the lump sum you are starting with.</li>
            <li>Enter your planned <strong>monthly contribution</strong> — the amount you will add each month.</li>
            <li>Set the expected <strong>annual interest rate</strong> (stock market historical average is roughly 7-10%).</li>
            <li>Enter the <strong>number of years</strong> you plan to invest.</li>
          </ul>
          <p>
            The results update in real time as you type. You will see three key numbers: the future value (total amount you will have), total contributions (what you actually put in), and total interest earned (free money from compounding). Compare different scenarios by adjusting the inputs to see how time, rate, and contributions affect your outcome.
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
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
