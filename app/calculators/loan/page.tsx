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

export default function LoanCalculator() {
  const [amount, setAmount] = useState("25000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("5");

  const P = parseFloat(amount) || 0;
  const annualRate = parseFloat(rate) || 0;
  const years = parseFloat(term) || 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;

  let monthlyPayment = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (P > 0 && n > 0) {
    if (r === 0) {
      monthlyPayment = P / n;
    } else {
      monthlyPayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    totalPayment = monthlyPayment * n;
    totalInterest = totalPayment - P;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Loan Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Calculate your monthly payment, total interest, and total cost of any loan.
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
              <Label htmlFor="amount">Loan Amount ($)</Label>
              <Input id="amount" type="number" className="h-12" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input id="rate" type="number" className="h-12" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Loan Term (Years)</Label>
              <Input id="term" type="number" className="h-12" min="0" value={term} onChange={(e) => setTerm(e.target.value)} />
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
                <span className="text-muted-foreground">Total Payment</span>
                <span className="text-lg font-semibold">${fmt(totalPayment)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="text-lg font-semibold text-red-600">${fmt(totalInterest)}</span>
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
          <h2 className="text-lg font-semibold text-foreground">About the Loan Calculator</h2>
          <p>
            This loan calculator helps you estimate your monthly payments and the total cost of borrowing. It works for personal loans, auto loans, student loans, and any fixed-rate installment loan. The calculator uses the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1], where M is the monthly payment, P is the principal (loan amount), r is the monthly interest rate, and n is the total number of payments.
          </p>
          <p>
            Understanding the true cost of a loan goes beyond just the monthly payment. The total interest paid over the life of the loan can be substantial. For example, a $25,000 loan at 6.5% for 5 years costs about $4,360 in interest alone. By shortening the term or finding a lower rate, you can save thousands of dollars.
          </p>
          <p>
            This tool is designed for fixed-rate loans with equal monthly payments. Variable-rate loans or loans with balloon payments may require different calculations. All calculations are performed instantly in your browser with no data transmitted to any server.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <p>
            Enter the loan amount (the total amount you plan to borrow), the annual interest rate offered by your lender, and the loan term in years. Results update instantly as you type. The calculator shows your monthly payment amount, total payment over the life of the loan, and how much of that total is interest.
          </p>
          <p>
            Try adjusting the term to see how shorter or longer repayment periods affect your monthly payment and total interest. A shorter term means higher monthly payments but significantly less interest paid overall.
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>Does this work for car loans?</strong> Yes, this calculator works for any fixed-rate installment loan including auto loans, personal loans, and student loans.</p>
          <p><strong>What about variable rate loans?</strong> This calculator assumes a fixed interest rate. For variable rates, results will only be accurate for the initial fixed period.</p>
          <p><strong>Why is shorter term better?</strong> A shorter loan term means you pay less total interest, even though the monthly payment is higher. You save money overall.</p>
          <p><strong>Is my information private?</strong> Absolutely. All calculations run in your browser. Nothing is stored or transmitted.</p>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Related Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculators/mortgage" className="text-sm text-primary hover:underline">Mortgage Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/compound-interest" className="text-sm text-primary hover:underline">Compound Interest Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/percentage" className="text-sm text-primary hover:underline">Percentage Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/salary" className="text-sm text-primary hover:underline">Salary Calculator</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
