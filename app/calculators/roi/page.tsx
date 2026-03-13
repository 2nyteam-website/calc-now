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

export default function RoiCalculator() {
  const [initial, setInitial] = useState("10000");
  const [final_, setFinal] = useState("15000");
  const [years, setYears] = useState("3");

  const initialVal = parseFloat(initial) || 0;
  const finalVal = parseFloat(final_) || 0;
  const period = parseFloat(years) || 0;

  const netProfit = finalVal - initialVal;
  const roi = initialVal !== 0 ? ((finalVal - initialVal) / initialVal) * 100 : null;

  let annualizedRoi: number | null = null;
  if (initialVal > 0 && finalVal > 0 && period > 0) {
    annualizedRoi = (Math.pow(finalVal / initialVal, 1 / period) - 1) * 100;
  }

  const isPositive = netProfit >= 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ROI Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Calculate the return on investment percentage, net profit, and annualized return.
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
              <Label htmlFor="initial">Initial Investment ($)</Label>
              <CurrencyInput id="initial" value={initial} onChange={setInitial} prefix="$" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="final">Final Value ($)</Label>
              <CurrencyInput id="final" value={final_} onChange={setFinal} prefix="$" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years">Investment Period (Years, optional)</Label>
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
              <p className="text-sm text-blue-600 mb-1">Return on Investment</p>
              <p className={`text-4xl font-bold ${roi === null ? "text-blue-700" : isPositive ? "text-green-600" : "text-red-600"}`}>
                {roi === null ? "N/A" : `${isPositive ? "+" : ""}${fmt(roi)}%`}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Net Profit / Loss</span>
                <span className={`text-lg font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                  {initialVal === 0 && finalVal === 0 ? "$0.00" : `${isPositive ? "+" : "-"}$${fmt(Math.abs(netProfit))}`}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Annualized ROI</span>
                <span className={`text-lg font-semibold ${annualizedRoi === null ? "" : annualizedRoi >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {annualizedRoi === null ? "N/A" : `${annualizedRoi >= 0 ? "+" : ""}${fmt(annualizedRoi)}%`}
                </span>
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
          <h2 className="text-lg font-semibold text-foreground">About the ROI Calculator</h2>
          <p>
            <strong>Return on Investment (ROI)</strong> is one of the most widely used financial metrics for evaluating how effectively your money is working. Whether you are analyzing a stock purchase, a real estate deal, or a business venture, ROI gives you a single percentage that summarizes the <strong>profitability of your investment</strong>. The basic formula is straightforward: <strong>ROI = ((Final Value - Initial Investment) / Initial Investment) x 100</strong>.
          </p>
          <p>
            While basic ROI is useful for quick comparisons, it does not account for the <strong>time value of money</strong>. An investment that returns 50% over 10 years is very different from one that returns 50% in 1 year. That is why this calculator also computes <strong>annualized ROI</strong> (also known as CAGR — Compound Annual Growth Rate) using the formula: <strong>Annualized ROI = ((Final/Initial)^(1/years) - 1) x 100</strong>. This lets you compare investments with different time horizons on an equal basis.
          </p>
          <p>
            Keep in mind that ROI is a simplified metric. It does not factor in <strong>risk, taxes, inflation, or opportunity cost</strong>. A high ROI with extreme risk may be less desirable than a moderate ROI with steady, predictable returns. Use ROI as a starting point for evaluation, but consider the full picture before making investment decisions.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enter your <strong>initial investment</strong> — the total amount you originally put in.</li>
            <li>Enter the <strong>final value</strong> — the current or exit value of your investment (including any returns or proceeds).</li>
            <li>Optionally, enter the <strong>investment period</strong> in years to calculate the annualized ROI. Leave at 0 or empty if you only need the basic ROI percentage.</li>
          </ul>
          <p>
            Results update in real time. A positive ROI appears in green, indicating a profit. A negative ROI appears in red, indicating a loss. Try comparing different scenarios by changing the final value or time period to see how they impact your return.
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>What is a good ROI?</strong> It depends on the investment type. The S&amp;P 500 has historically averaged about 10% annually. Real estate typically returns 8-12%. Any ROI above the risk-free rate (Treasury bonds, around 4-5%) means you are earning more than the safest alternative.</p>
          <p><strong>What is annualized ROI?</strong> Annualized ROI (or CAGR) converts your total return into an equivalent yearly rate. This lets you fairly compare a 2-year investment against a 10-year one. It accounts for the compounding effect of returns over time.</p>
          <p><strong>Why does it show N/A?</strong> The calculator shows N/A when the initial investment is zero, since dividing by zero is undefined. Annualized ROI also shows N/A when the investment period is zero or not provided.</p>
          <p><strong>Does this account for taxes or fees?</strong> No. This calculator computes the raw ROI before taxes, fees, or inflation. For a net return, subtract those costs from your final value before entering it.</p>
        </TabsContent>
      </Tabs>

      {/* Related Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Related Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculators/compound-interest" className="text-sm text-primary hover:underline">Compound Interest Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/percentage" className="text-sm text-primary hover:underline">Percentage Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/salary" className="text-sm text-primary hover:underline">Salary Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/loan" className="text-sm text-primary hover:underline">Loan Calculator</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
