"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("350000");
  const [downPct, setDownPct] = useState("20");
  const [rate, setRate] = useState("6.5");
  const [termYears, setTermYears] = useState("30");

  const price = parseFloat(homePrice) || 0;
  const downPercent = parseFloat(downPct) || 0;
  const annualRate = parseFloat(rate) || 0;
  const years = parseFloat(termYears) || 0;

  const downPayment = price * (downPercent / 100);
  const loanAmount = price - downPayment;
  const r = annualRate / 100 / 12;
  const n = years * 12;

  let monthlyPayment = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (loanAmount > 0 && n > 0) {
    if (r === 0) {
      monthlyPayment = loanAmount / n;
    } else {
      monthlyPayment = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    totalPayment = monthlyPayment * n;
    totalInterest = totalPayment - loanAmount;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mortgage Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Estimate your monthly mortgage payment with down payment and interest rate.
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
              <Label htmlFor="price">Home Price ($)</Label>
              <Input id="price" type="number" min="0" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="down">Down Payment (%)</Label>
              <Input id="down" type="number" min="0" max="100" value={downPct} onChange={(e) => setDownPct(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input id="rate" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Loan Term (Years)</Label>
              <div className="flex gap-2">
                <Button variant={termYears === "15" ? "default" : "outline"} size="sm" onClick={() => setTermYears("15")}>15 yr</Button>
                <Button variant={termYears === "20" ? "default" : "outline"} size="sm" onClick={() => setTermYears("20")}>20 yr</Button>
                <Button variant={termYears === "30" ? "default" : "outline"} size="sm" onClick={() => setTermYears("30")}>30 yr</Button>
              </div>
              <Input id="term" type="number" min="0" value={termYears} onChange={(e) => setTermYears(e.target.value)} />
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
                <span className="text-muted-foreground">Monthly Payment</span>
                <span className="text-2xl font-bold text-primary">${fmt(monthlyPayment)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Down Payment</span>
                <span className="text-lg font-semibold">${fmt(downPayment)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Loan Amount</span>
                <span className="text-lg font-semibold">${fmt(loanAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Total Payment</span>
                <span className="text-lg font-semibold">${fmt(totalPayment)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="text-lg font-semibold text-red-400">${fmt(totalInterest)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="how-to">How to Use</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="prose prose-invert max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">About the Mortgage Calculator</h2>
          <p>
            A mortgage is typically the largest financial commitment most people will make. This mortgage calculator helps you understand the true cost of buying a home by factoring in the home price, down payment, interest rate, and loan term. It uses the standard amortization formula to calculate your fixed monthly payment.
          </p>
          <p>
            The down payment is a crucial factor. A larger down payment reduces your loan amount, which means lower monthly payments and less total interest paid. Most lenders require at least 3-5% down for conventional loans, while 20% down eliminates the need for private mortgage insurance (PMI). This calculator does not include PMI, property taxes, or homeowners insurance — your actual monthly housing cost may be higher.
          </p>
          <p>
            Comparing 15-year and 30-year terms is important. A 15-year mortgage has higher monthly payments but saves you tens of thousands of dollars in interest. Use the term buttons to quickly compare options.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose-invert max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <p>
            Enter the home price you are considering, your down payment as a percentage, the interest rate from your lender, and choose a loan term. Click the 15, 20, or 30 year buttons for quick selection, or type a custom term. All results update instantly.
          </p>
          <p>
            The results show your estimated monthly principal and interest payment, down payment amount, total loan amount, total payment over the full term, and total interest cost. Try different scenarios to find the right balance between monthly affordability and total cost.
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose-invert max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>Does this include taxes and insurance?</strong> No, this calculates principal and interest only. Your actual payment will include property taxes, insurance, and possibly PMI.</p>
          <p><strong>What is a good down payment?</strong> 20% is ideal to avoid PMI, but many people buy with 3-10% down. The more you put down, the less you pay in interest.</p>
          <p><strong>15-year vs 30-year: which is better?</strong> 15-year saves significantly on interest but has higher monthly payments. Choose based on your budget and financial goals.</p>
          <p><strong>Is this calculation exact?</strong> It provides an accurate estimate based on the standard fixed-rate mortgage formula. Actual payments may vary slightly due to rounding by your lender.</p>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Related Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculators/loan" className="text-sm text-primary hover:underline">Loan Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/compound-interest" className="text-sm text-primary hover:underline">Compound Interest Calculator</Link>
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
