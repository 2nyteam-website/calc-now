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

type Mode = "from-prices" | "from-margin" | "from-markup";

export default function MarginMarkupCalculator() {
  const [mode, setMode] = useState<Mode>("from-prices");

  // From Prices
  const [cost, setCost] = useState("60");
  const [revenue, setRevenue] = useState("100");

  // From Margin
  const [costMargin, setCostMargin] = useState("60");
  const [targetMargin, setTargetMargin] = useState("40");

  // From Markup
  const [costMarkup, setCostMarkup] = useState("60");
  const [targetMarkup, setTargetMarkup] = useState("66.67");

  // === From Prices Calculations ===
  const costVal = parseFloat(cost) || 0;
  const revenueVal = parseFloat(revenue) || 0;
  const profit = revenueVal - costVal;
  const margin = revenueVal !== 0 ? (profit / revenueVal) * 100 : null;
  const markup = costVal !== 0 ? (profit / costVal) * 100 : null;

  // === From Margin Calculations ===
  const costMarginVal = parseFloat(costMargin) || 0;
  const targetMarginVal = parseFloat(targetMargin) || 0;
  const requiredPriceFromMargin = targetMarginVal < 100 ? costMarginVal / (1 - targetMarginVal / 100) : null;
  const markupFromMargin = requiredPriceFromMargin !== null && costMarginVal > 0
    ? ((requiredPriceFromMargin - costMarginVal) / costMarginVal) * 100
    : null;
  const profitFromMargin = requiredPriceFromMargin !== null ? requiredPriceFromMargin - costMarginVal : null;

  // === From Markup Calculations ===
  const costMarkupVal = parseFloat(costMarkup) || 0;
  const targetMarkupVal = parseFloat(targetMarkup) || 0;
  const requiredPriceFromMarkup = costMarkupVal * (1 + targetMarkupVal / 100);
  const marginFromMarkup = requiredPriceFromMarkup > 0
    ? ((requiredPriceFromMarkup - costMarkupVal) / requiredPriceFromMarkup) * 100
    : null;
  const profitFromMarkup = requiredPriceFromMarkup - costMarkupVal;

  const modes: { key: Mode; label: string }[] = [
    { key: "from-prices", label: "From Prices" },
    { key: "from-margin", label: "From Margin" },
    { key: "from-markup", label: "From Markup" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Margin &amp; Markup Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Calculate profit margin, markup percentage, and required selling price for your business.
        </p>
        <Badge variant="secondary" className="mt-2">No data sent to server</Badge>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2">
        {modes.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMode(m.key)}
            className={`px-4 py-2 text-sm rounded-md border transition-colors ${
              mode === m.key
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-muted"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* ===== FROM PRICES ===== */}
      {mode === "from-prices" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cost">Cost ($)</Label>
                <CurrencyInput id="cost" value={cost} onChange={setCost} prefix="$" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="revenue">Revenue / Selling Price ($)</Label>
                <CurrencyInput id="revenue" value={revenue} onChange={setRevenue} prefix="$" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent aria-live="polite">
              <div className="bg-blue-50 rounded-lg p-5 mb-4 text-center">
                <p className="text-sm text-blue-600 mb-1">Profit Margin</p>
                <p className={`text-4xl font-bold ${margin === null ? "text-blue-700" : margin >= 0 ? "text-blue-700" : "text-red-600"}`}>
                  {margin === null ? "N/A" : `${fmt(margin)}%`}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Markup</span>
                  <span className={`text-lg font-semibold ${markup === null ? "" : markup >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {markup === null ? "N/A" : `${fmt(markup)}%`}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Profit</span>
                  <span className={`text-lg font-semibold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {profit >= 0 ? "" : "-"}${fmt(Math.abs(profit))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ===== FROM MARGIN ===== */}
      {mode === "from-margin" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="costMargin">Cost ($)</Label>
                <CurrencyInput id="costMargin" value={costMargin} onChange={setCostMargin} prefix="$" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetMargin">Desired Margin (%)</Label>
                <CurrencyInput id="targetMargin" value={targetMargin} onChange={setTargetMargin} suffix="%" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent aria-live="polite">
              <div className="bg-blue-50 rounded-lg p-5 mb-4 text-center">
                <p className="text-sm text-blue-600 mb-1">Required Selling Price</p>
                <p className="text-4xl font-bold text-blue-700">
                  {requiredPriceFromMargin === null ? "N/A" : `$${fmt(requiredPriceFromMargin)}`}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Markup</span>
                  <span className="text-lg font-semibold text-green-600">
                    {markupFromMargin === null ? "N/A" : `${fmt(markupFromMargin)}%`}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Profit</span>
                  <span className={`text-lg font-semibold ${profitFromMargin !== null && profitFromMargin >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {profitFromMargin === null ? "N/A" : `$${fmt(profitFromMargin)}`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ===== FROM MARKUP ===== */}
      {mode === "from-markup" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="costMarkup">Cost ($)</Label>
                <CurrencyInput id="costMarkup" value={costMarkup} onChange={setCostMarkup} prefix="$" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetMarkup">Desired Markup (%)</Label>
                <CurrencyInput id="targetMarkup" value={targetMarkup} onChange={setTargetMarkup} suffix="%" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent aria-live="polite">
              <div className="bg-blue-50 rounded-lg p-5 mb-4 text-center">
                <p className="text-sm text-blue-600 mb-1">Required Selling Price</p>
                <p className="text-4xl font-bold text-blue-700">
                  ${fmt(requiredPriceFromMarkup)}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Margin</span>
                  <span className="text-lg font-semibold text-green-600">
                    {marginFromMarkup === null ? "N/A" : `${fmt(marginFromMarkup)}%`}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Profit</span>
                  <span className={`text-lg font-semibold ${profitFromMarkup >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${fmt(profitFromMarkup)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* SEO Content */}
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="how-to">How to Use</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">About the Margin &amp; Markup Calculator</h2>
          <p>
            <strong>Profit margin</strong> and <strong>markup</strong> are two of the most important metrics in business, yet they are frequently confused. Margin is the percentage of the <strong>selling price</strong> that is profit: <strong>Margin = ((Revenue - Cost) / Revenue) x 100</strong>. Markup, on the other hand, is the percentage added to the <strong>cost</strong> to arrive at the selling price: <strong>Markup = ((Revenue - Cost) / Cost) x 100</strong>. A product with a 50% markup has only a 33.3% margin — understanding this distinction is critical for pricing strategy.
          </p>
          <p>
            This calculator operates in three modes. The default <strong>&quot;From Prices&quot;</strong> mode takes your cost and selling price to compute both margin and markup simultaneously. The <strong>&quot;From Margin&quot;</strong> mode lets you enter a target profit margin and calculates the selling price you need to charge. The <strong>&quot;From Markup&quot;</strong> mode works in reverse — enter your desired markup percentage and see the required selling price and equivalent margin.
          </p>
          <p>
            Whether you are running an <strong>e-commerce store</strong>, a restaurant, or a consulting business, getting your pricing right directly impacts profitability. Many businesses fail not because they lack revenue, but because their margins are too thin to cover operating costs. Use this tool to experiment with different pricing strategies and find the sweet spot between <strong>competitive pricing</strong> and <strong>healthy profit margins</strong>.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Choose a calculation mode: <strong>From Prices</strong> (know cost and selling price), <strong>From Margin</strong> (know cost and target margin), or <strong>From Markup</strong> (know cost and target markup).</li>
            <li>In <strong>From Prices</strong> mode, enter the product cost and selling price to see the margin, markup, and profit instantly.</li>
            <li>In <strong>From Margin</strong> mode, enter the cost and your desired profit margin percentage to find out what selling price you need.</li>
            <li>In <strong>From Markup</strong> mode, enter the cost and desired markup percentage to see the required selling price and equivalent margin.</li>
            <li>Switch between modes using the buttons at the top to explore different <strong>pricing scenarios</strong>.</li>
          </ul>
          <p>
            All results update in real time. Use this to quickly compare how different cost structures or pricing targets affect your bottom line.
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>What is the difference between margin and markup?</strong> Margin is profit as a percentage of selling price. Markup is profit as a percentage of cost. A 50% markup equals a 33.3% margin. Margin is always lower than markup for the same product because the selling price (denominator for margin) is larger than the cost (denominator for markup).</p>
          <p><strong>What is a good profit margin?</strong> It varies by industry. Retail typically sees 2-5% net margins, software companies can exceed 20%, and restaurants average 3-9%. Gross margins are higher — 50% gross margin is common in many industries. Research benchmarks for your specific sector.</p>
          <p><strong>Why does it show N/A?</strong> N/A appears when a calculation would involve dividing by zero. For margin, this happens when revenue is zero. For markup, this happens when cost is zero. For the &quot;From Margin&quot; mode, a margin of 100% is impossible (it would require infinite selling price).</p>
          <p><strong>Can margin exceed 100%?</strong> No. Profit margin cannot exceed 100% because the profit can never be more than the total revenue. However, markup can be any positive number — a 200% markup means you charge 3x the cost.</p>
        </TabsContent>
      </Tabs>

      {/* Related Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Related Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculators/percentage" className="text-sm text-primary hover:underline">Percentage Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/discount" className="text-sm text-primary hover:underline">Discount Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/roi" className="text-sm text-primary hover:underline">ROI Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/salary" className="text-sm text-primary hover:underline">Salary Calculator</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
