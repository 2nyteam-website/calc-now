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

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("99.99");
  const [discount1, setDiscount1] = useState("20");
  const [discount2, setDiscount2] = useState("");

  const price = parseFloat(originalPrice) || 0;
  const disc1 = parseFloat(discount1) || 0;
  const disc2 = parseFloat(discount2) || 0;

  const priceAfterFirst = price * (1 - disc1 / 100);
  const finalPrice = priceAfterFirst * (1 - disc2 / 100);
  const totalSavings = price - finalPrice;
  const effectiveDiscount = price > 0 ? (totalSavings / price) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Discount Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Calculate the sale price and your savings after one or two discounts.
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
              <Label htmlFor="price">Original Price ($)</Label>
              <Input id="price" type="number" className="h-12" min="0" step="0.01" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disc1">Discount (%)</Label>
              <Input id="disc1" type="number" className="h-12" min="0" max="100" value={discount1} onChange={(e) => setDiscount1(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disc2">Additional Discount (%, optional)</Label>
              <Input id="disc2" type="number" className="h-12" min="0" max="100" value={discount2} onChange={(e) => setDiscount2(e.target.value)} placeholder="e.g., extra 10% off" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent aria-live="polite">
            <div className="bg-blue-50 rounded-lg p-5 mb-4 text-center">
              <p className="text-sm text-blue-600 mb-1">Final Price</p>
              <p className="text-4xl font-bold text-blue-700">${fmt(finalPrice)}</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Original Price</span>
                <span className="text-lg font-semibold line-through text-muted-foreground">${fmt(price)}</span>
              </div>
              {disc2 > 0 && (
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">After First Discount ({disc1}%)</span>
                  <span className="text-lg font-semibold">${fmt(priceAfterFirst)}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">You Save</span>
                <span className="text-lg font-semibold text-green-600">${fmt(totalSavings)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Effective Discount</span>
                <span className="text-lg font-semibold text-green-600">{effectiveDiscount.toFixed(1)}%</span>
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
        <TabsContent value="about" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">About the Discount Calculator</h2>
          <p>
            Shopping sales can be confusing, especially when multiple discounts are stacked. This discount calculator instantly shows you the final price and total savings after applying one or two percentage discounts. It also calculates the effective total discount percentage, which is particularly useful when comparing stacked discounts.
          </p>
          <p>
            A common misconception is that 20% off plus an additional 10% off equals 30% off. In reality, the second discount applies to the already-reduced price. So 20% + 10% actually gives you a 28% total discount, not 30%. This calculator shows the effective discount clearly so you know exactly what you are getting.
          </p>
          <p>
            The formula is simple: Final Price = Original Price x (1 - Discount1/100) x (1 - Discount2/100). The savings are calculated as Original Price minus Final Price. This tool is perfect for Black Friday deals, coupon stacking, clearance sales, or any situation where you need to quickly figure out the actual price.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <p>
            Enter the original price of the item, then the discount percentage. If there is an additional discount (like an extra coupon or member discount), enter it in the second field. Leave the additional discount empty if there is only one discount. Results update instantly showing your final price, savings, and effective discount rate.
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>Does the order of discounts matter?</strong> No, mathematically the result is the same regardless of which discount is applied first. 20% then 10% gives the same result as 10% then 20%.</p>
          <p><strong>Why is 20% + 10% not 30%?</strong> The second discount applies to the already-reduced price. 20% off $100 = $80, then 10% off $80 = $72. That is a 28% total discount, not 30%.</p>
          <p><strong>Can I use this for tax calculations?</strong> This calculator is designed for discounts. For tax, you would add a percentage instead of subtracting it.</p>
          <p><strong>What is the effective discount?</strong> The effective discount is the single equivalent percentage that would give you the same final price as the stacked discounts.</p>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Related Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculators/percentage" className="text-sm text-primary hover:underline">Percentage Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/tip" className="text-sm text-primary hover:underline">Tip Calculator</Link>
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
