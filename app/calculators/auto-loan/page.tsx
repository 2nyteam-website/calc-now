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

export default function AutoLoanCalculator() {
  const [price, setPrice] = useState("35000");
  const [downPayment, setDownPayment] = useState("5000");
  const [tradeIn, setTradeIn] = useState("0");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("5");

  const vehiclePrice = parseFloat(price) || 0;
  const down = parseFloat(downPayment) || 0;
  const trade = parseFloat(tradeIn) || 0;
  const annualRate = parseFloat(rate) || 0;
  const years = parseFloat(term) || 0;

  const loanAmount = Math.max(vehiclePrice - down - trade, 0);
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

  const totalCost = totalPayment + down + trade;

  const termPresets = [3, 4, 5, 6];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Auto Loan Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Estimate your monthly car payment with down payment and trade-in value.
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
              <Label htmlFor="price">Vehicle Price ($)</Label>
              <CurrencyInput id="price" value={price} onChange={setPrice} prefix="$" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="down">Down Payment ($)</Label>
              <CurrencyInput id="down" value={downPayment} onChange={setDownPayment} prefix="$" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trade">Trade-in Value ($)</Label>
              <CurrencyInput id="trade" value={tradeIn} onChange={setTradeIn} prefix="$" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <CurrencyInput id="rate" value={rate} onChange={setRate} suffix="%" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Loan Term (Years)</Label>
              <CurrencyInput id="term" value={term} onChange={setTerm} />
              <div className="flex gap-2 mt-1">
                {termPresets.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setTerm(String(y))}
                    className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                      term === String(y)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {y} yr
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent aria-live="polite">
            <div className="bg-blue-50 rounded-lg p-5 mb-4 text-center">
              <p className="text-sm text-blue-600 mb-1">Monthly Payment</p>
              <p className="text-4xl font-bold text-blue-700">${fmt(monthlyPayment)}</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Total Loan Amount</span>
                <span className="text-lg font-semibold">${fmt(loanAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="text-lg font-semibold text-red-600">${fmt(totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Total Cost</span>
                <span className="text-lg font-semibold">${fmt(totalCost)}</span>
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
          <h2 className="text-lg font-semibold text-foreground">About the Auto Loan Calculator</h2>
          <p>
            Buying a car is one of the largest purchases most people make, and understanding your <strong>monthly car payment</strong> before visiting the dealership puts you in a stronger negotiating position. This <strong>auto loan calculator</strong> factors in your vehicle price, down payment, and trade-in value to give you an accurate estimate of what you will pay each month. It uses the standard amortization formula: <strong>M = P[r(1+r)^n] / [(1+r)^n - 1]</strong>, where P is the loan principal (price minus down payment and trade-in), r is the monthly interest rate, and n is the total number of monthly payments.
          </p>
          <p>
            The difference between a 3-year and a 6-year auto loan can be dramatic. A shorter term means higher monthly payments but significantly <strong>less total interest</strong> paid. For example, financing $30,000 at 6.5% for 3 years costs about $3,090 in interest, while the same loan over 6 years costs about $6,360 — more than double. Understanding these trade-offs helps you choose a term that fits both your <strong>monthly budget</strong> and your long-term financial goals.
          </p>
          <p>
            This calculator also accounts for <strong>down payments</strong> and <strong>trade-in values</strong>, which reduce the amount you need to finance. A larger down payment lowers your monthly payment and total interest cost. Financial experts typically recommend putting at least 20% down on a new car and 10% on a used car to avoid being &quot;upside down&quot; on your loan — owing more than the car is worth.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enter the <strong>vehicle price</strong> — the total sticker price or negotiated price of the car.</li>
            <li>Enter your <strong>down payment</strong> — the cash amount you plan to pay upfront.</li>
            <li>Enter the <strong>trade-in value</strong> of your current vehicle, if applicable. Leave at 0 if you have no trade-in.</li>
            <li>Enter the <strong>interest rate</strong> offered by your lender or dealership (check your pre-approval letter for the exact rate).</li>
            <li>Select or type the <strong>loan term</strong> in years. Use the preset buttons (3, 4, 5, 6 yr) for quick comparisons.</li>
          </ul>
          <p>
            Results update instantly as you adjust any input. Compare different term lengths to see how they affect your monthly payment and total interest. A good strategy is to find the shortest term where the monthly payment still fits comfortably within your budget.
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>What is a good interest rate for a car loan?</strong> As of 2024-2025, rates for new cars with excellent credit range from 4-7%, while used car rates are typically 1-2% higher. Your credit score, loan term, and whether the car is new or used all affect the rate.</p>
          <p><strong>Should I choose a longer loan term for lower payments?</strong> While a longer term reduces monthly payments, you pay significantly more in total interest. You also risk owing more than the car is worth (negative equity). Aim for the shortest term you can comfortably afford.</p>
          <p><strong>Does the trade-in value reduce my loan amount?</strong> Yes. The trade-in value is subtracted from the vehicle price along with your down payment, reducing the total amount you need to finance.</p>
          <p><strong>Is my data private?</strong> Absolutely. All calculations run entirely in your browser. No personal or financial data is sent to any server.</p>
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
            <Link href="/calculators/compound-interest" className="text-sm text-primary hover:underline">Compound Interest Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/percentage" className="text-sm text-primary hover:underline">Percentage Calculator</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
