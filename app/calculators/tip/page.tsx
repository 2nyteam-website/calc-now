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

const TIP_PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculator() {
  const [bill, setBill] = useState("85.50");
  const [tipPct, setTipPct] = useState("18");
  const [people, setPeople] = useState("2");

  const billAmount = parseFloat(bill) || 0;
  const tipPercent = parseFloat(tipPct) || 0;
  const numPeople = Math.max(1, parseInt(people) || 1);

  const tipAmount = billAmount * (tipPercent / 100);
  const totalBill = billAmount + tipAmount;
  const totalPerPerson = totalBill / numPeople;
  const tipPerPerson = tipAmount / numPeople;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tip Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Calculate the tip amount and split the bill between multiple people.
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
              <Label htmlFor="bill">Bill Amount ($)</Label>
              <Input id="bill" type="number" className="h-12" min="0" step="0.01" value={bill} onChange={(e) => setBill(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Tip Percentage</Label>
              <div className="flex flex-wrap gap-2">
                {TIP_PRESETS.map((p) => (
                  <Button
                    key={p}
                    variant={tipPct === String(p) ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTipPct(String(p))}
                  >
                    {p}%
                  </Button>
                ))}
              </div>
              <Input id="tipPct" type="number" className="h-12" min="0" value={tipPct} onChange={(e) => setTipPct(e.target.value)} placeholder="Custom %" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="people">Number of People</Label>
              <Input id="people" type="number" className="h-12" min="1" value={people} onChange={(e) => setPeople(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent aria-live="polite">
            <div className="bg-blue-50 rounded-lg p-5 mb-4 text-center">
              <p className="text-sm text-blue-600 mb-1">Total per Person</p>
              <p className="text-4xl font-bold text-blue-700">${fmt(totalPerPerson)}</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Tip Amount</span>
                <span className="text-lg font-semibold">${fmt(tipAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Total Bill</span>
                <span className="text-lg font-semibold">${fmt(totalBill)}</span>
              </div>
              {numPeople > 1 && (
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Tip per Person</span>
                  <span className="text-lg font-semibold">${fmt(tipPerPerson)}</span>
                </div>
              )}
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
          <h2 className="text-lg font-semibold text-foreground">About the Tip Calculator</h2>
          <p>
            Tipping is a customary practice in many countries, especially in the United States where it forms a significant portion of service workers&apos; income. This tip calculator helps you quickly determine the appropriate tip amount based on your bill and desired tip percentage, and evenly splits the total among your group.
          </p>
          <p>
            The standard tip range in the US is 15-20% for sit-down restaurants. For exceptional service, 20-25% is common. For counter service or takeout, 10-15% is typical. Delivery services generally warrant 15-20%. Use the preset buttons for common percentages or enter a custom amount. The calculator handles bill splitting automatically — just enter the number of people in your group.
          </p>
          <p>
            The formula is straightforward: Tip = Bill Amount x (Tip Percentage / 100). The total per person is (Bill + Tip) / Number of People. All calculations happen instantly in your browser.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <p>
            Enter your bill amount, select a tip percentage using the preset buttons or type a custom percentage, and enter the number of people splitting the bill. The results show the tip amount, total bill, and each person&apos;s share instantly. Adjusting any input updates results in real time.
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>What is the standard tip percentage?</strong> In the US, 15-20% is standard for restaurants. 18% is a popular middle ground.</p>
          <p><strong>Should I tip on tax?</strong> Traditionally, you tip on the pre-tax amount. Enter the pre-tax bill amount for the most accurate calculation.</p>
          <p><strong>Is tipping required?</strong> In the US, tipping is customary and expected for table service. In many other countries, tipping practices vary widely.</p>
          <p><strong>Can I enter a custom tip percentage?</strong> Yes, you can type any percentage in the input field. The preset buttons are just shortcuts.</p>
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
            <Link href="/calculators/discount" className="text-sm text-primary hover:underline">Discount Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/salary" className="text-sm text-primary hover:underline">Salary Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/unit-converter" className="text-sm text-primary hover:underline">Unit Converter</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
