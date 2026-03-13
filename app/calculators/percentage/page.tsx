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

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [pct1, setPct1] = useState("15");
  const [val1, setVal1] = useState("200");

  // Mode 2: X is what % of Y?
  const [x2, setX2] = useState("30");
  const [y2, setY2] = useState("200");

  // Mode 3: % change from X to Y
  const [from3, setFrom3] = useState("80");
  const [to3, setTo3] = useState("100");

  // Calculations
  const result1 = (parseFloat(pct1) || 0) / 100 * (parseFloat(val1) || 0);
  const result2 = (parseFloat(y2) || 0) !== 0 ? ((parseFloat(x2) || 0) / (parseFloat(y2) || 0)) * 100 : 0;
  const fromVal = parseFloat(from3) || 0;
  const toVal = parseFloat(to3) || 0;
  const result3 = fromVal !== 0 ? ((toVal - fromVal) / Math.abs(fromVal)) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Percentage Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Three percentage calculation modes: find a percentage, find what percent, or calculate percentage change.
        </p>
        <Badge variant="secondary" className="mt-2">No data sent to server</Badge>
      </div>

      <Tabs defaultValue="mode1">
        <TabsList>
          <TabsTrigger value="mode1">X% of Y</TabsTrigger>
          <TabsTrigger value="mode2">X is ?% of Y</TabsTrigger>
          <TabsTrigger value="mode3">% Change</TabsTrigger>
        </TabsList>

        <TabsContent value="mode1">
          <Card>
            <CardHeader>
              <CardTitle>What is X% of Y?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end gap-3">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="pct1">Percentage (%)</Label>
                  <Input id="pct1" type="number" className="h-12" value={pct1} onChange={(e) => setPct1(e.target.value)} />
                </div>
                <span className="pb-2 text-muted-foreground font-semibold">% of</span>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="val1">Number</Label>
                  <Input id="val1" type="number" className="h-12" value={val1} onChange={(e) => setVal1(e.target.value)} />
                </div>
              </div>
              <div className="p-5 bg-blue-50 rounded-lg" aria-live="polite">
                <p className="text-sm text-blue-600">Result</p>
                <p className="text-4xl font-bold text-blue-700">{fmt(result1)}</p>
                <p className="text-sm text-muted-foreground mt-1">{pct1}% of {val1} = {fmt(result1)}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mode2">
          <Card>
            <CardHeader>
              <CardTitle>X is what % of Y?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end gap-3">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="x2">Number (X)</Label>
                  <Input id="x2" type="number" className="h-12" value={x2} onChange={(e) => setX2(e.target.value)} />
                </div>
                <span className="pb-2 text-muted-foreground font-semibold">is ?% of</span>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="y2">Number (Y)</Label>
                  <Input id="y2" type="number" className="h-12" value={y2} onChange={(e) => setY2(e.target.value)} />
                </div>
              </div>
              <div className="p-5 bg-blue-50 rounded-lg" aria-live="polite">
                <p className="text-sm text-blue-600">Result</p>
                <p className="text-4xl font-bold text-blue-700">{fmt(result2)}%</p>
                <p className="text-sm text-muted-foreground mt-1">{x2} is {fmt(result2)}% of {y2}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mode3">
          <Card>
            <CardHeader>
              <CardTitle>Percentage Change from X to Y</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end gap-3">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="from3">From</Label>
                  <Input id="from3" type="number" className="h-12" value={from3} onChange={(e) => setFrom3(e.target.value)} />
                </div>
                <span className="pb-2 text-muted-foreground font-semibold">to</span>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="to3">To</Label>
                  <Input id="to3" type="number" className="h-12" value={to3} onChange={(e) => setTo3(e.target.value)} />
                </div>
              </div>
              <div className="p-5 bg-blue-50 rounded-lg" aria-live="polite">
                <p className="text-sm text-blue-600">Percentage Change</p>
                <p className={`text-4xl font-bold ${result3 >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {result3 >= 0 ? "+" : ""}{fmt(result3)}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {result3 >= 0 ? "Increase" : "Decrease"} of {fmt(Math.abs(result3))}% from {from3} to {to3}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* SEO Content */}
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="how-to">How to Use</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">About the Percentage Calculator</h2>
          <p>
            Percentages are used everywhere in daily life — from shopping discounts and tax calculations to grade scoring and financial analysis. This calculator provides three essential percentage operations in one convenient tool. The first mode finds a specific percentage of any number (e.g., 15% of 200 = 30). The second mode determines what percentage one number is of another (e.g., 30 is 15% of 200). The third mode calculates the percentage change between two values (e.g., from 80 to 100 is a 25% increase).
          </p>
          <p>
            The formulas are straightforward: for &quot;X% of Y&quot; it is (X/100) * Y; for &quot;X is what % of Y&quot; it is (X/Y) * 100; and for percentage change it is ((New - Old) / |Old|) * 100. All calculations happen in real time as you enter your numbers, giving you instant results without clicking any buttons.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <p>
            Select the tab that matches your calculation needs. For &quot;X% of Y,&quot; enter the percentage and the number. For &quot;X is ?% of Y,&quot; enter both numbers. For &quot;% Change,&quot; enter the original and new values. Results update instantly as you type. The percentage change mode shows positive values in green (increase) and negative values in red (decrease).
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>Can I use negative numbers?</strong> Yes, the calculator handles negative numbers correctly. Percentage change from a negative to a positive value works as expected.</p>
          <p><strong>What if the &quot;from&quot; value is zero?</strong> Percentage change from zero is undefined (division by zero), so the result will show 0%. This is a mathematical limitation.</p>
          <p><strong>How precise are the results?</strong> Results are displayed with 2 decimal places. The internal calculation uses full floating-point precision.</p>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Related Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculators/discount" className="text-sm text-primary hover:underline">Discount Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/tip" className="text-sm text-primary hover:underline">Tip Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/compound-interest" className="text-sm text-primary hover:underline">Compound Interest Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/salary" className="text-sm text-primary hover:underline">Salary Calculator</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
