"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CurrencyInput from "@/components/currency-input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

type Period = "hour" | "day" | "week" | "month" | "year";

export default function SalaryCalculator() {
  const [amount, setAmount] = useState("50000");
  const [per, setPer] = useState<Period>("year");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");

  const val = parseFloat(amount) || 0;
  const hpw = parseFloat(hoursPerWeek) || 40;
  const wpy = parseFloat(weeksPerYear) || 52;

  // Convert everything to annual first
  let annual = 0;
  switch (per) {
    case "hour":
      annual = val * hpw * wpy;
      break;
    case "day":
      annual = val * 5 * wpy; // assumes 5-day work week
      break;
    case "week":
      annual = val * wpy;
      break;
    case "month":
      annual = val * 12;
      break;
    case "year":
      annual = val;
      break;
  }

  const hourly = hpw > 0 && wpy > 0 ? annual / (hpw * wpy) : 0;
  const daily = wpy > 0 ? annual / (wpy * 5) : 0;
  const weekly = wpy > 0 ? annual / wpy : 0;
  const biWeekly = wpy > 0 ? annual / (wpy / 2) : 0;
  const monthly = annual / 12;

  const periods = [
    { label: "Hour", short: "hour" as Period },
    { label: "Day", short: "day" as Period },
    { label: "Week", short: "week" as Period },
    { label: "Month", short: "month" as Period },
    { label: "Year", short: "year" as Period },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Salary Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Convert between hourly, daily, weekly, monthly, and annual salary.
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
              <Label htmlFor="amount">Salary Amount ($)</Label>
              <CurrencyInput id="amount" value={amount} onChange={setAmount} prefix="$" />
            </div>
            <div className="space-y-2">
              <Label>Pay Period</Label>
              <div className="flex flex-wrap gap-2">
                {periods.map((p) => (
                  <Button
                    key={p.short}
                    variant={per === p.short ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPer(p.short)}
                  >
                    Per {p.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hpw">Hours per Week</Label>
              <CurrencyInput id="hpw" value={hoursPerWeek} onChange={setHoursPerWeek} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wpy">Weeks per Year</Label>
              <CurrencyInput id="wpy" value={weeksPerYear} onChange={setWeeksPerYear} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Salary Breakdown</CardTitle>
          </CardHeader>
          <CardContent aria-live="polite">
            <div className="bg-blue-50 rounded-lg p-5 mb-4 text-center">
              <p className="text-sm text-blue-600 mb-1">Annual Salary</p>
              <p className="text-4xl font-bold text-blue-700">${fmt(annual)}</p>
            </div>
            <div className="space-y-3">
              {[
                { label: "Hourly", value: hourly },
                { label: "Daily", value: daily },
                { label: "Weekly", value: weekly },
                { label: "Bi-Weekly", value: biWeekly },
                { label: "Monthly", value: monthly },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-lg font-semibold">${fmt(item.value)}</span>
                </div>
              ))}
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
          <h2 className="text-lg font-semibold text-foreground">About the Salary Calculator</h2>
          <p>
            Whether you are evaluating a <strong>job offer</strong>, negotiating a raise, or converting between pay periods, this <strong>salary calculator</strong> makes it easy to see your earnings across all time frames. It converts between hourly, daily, weekly, bi-weekly, monthly, and <strong>annual pay</strong> using your specific work schedule.
          </p>
          <p>
            The calculation assumes a standard work schedule that you can customize. By default, it uses <strong>40 hours per week</strong> and 52 weeks per year. If you work part-time (e.g., 20 hours per week) or take unpaid time off (e.g., 50 weeks per year), adjust these settings for accurate results. Daily pay assumes a <strong>5-day work week</strong>. Bi-weekly pay is calculated as annual divided by 26 pay periods.
          </p>
          <p>
            This tool is especially useful when comparing job offers that quote pay in different periods. A $25/hour job may sound different from a $52,000/year salary, but they are nearly equivalent at 40 hours per week. Use this calculator to make <strong>apples-to-apples comparisons</strong>.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enter your <strong>salary amount</strong> in dollars.</li>
            <li>Select the <strong>pay period</strong> (per hour, day, week, month, or year).</li>
            <li>Optionally adjust the <strong>hours per week</strong> and <strong>weeks per year</strong> if your schedule differs from the standard 40 hours, 52 weeks.</li>
          </ul>
          <p>
            The breakdown on the right instantly shows your equivalent pay for every time period.
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>Does this include taxes?</strong> No, this shows gross (pre-tax) salary conversions. Your take-home pay will be lower after federal, state, and local taxes.</p>
          <p><strong>How is bi-weekly different from twice a month?</strong> Bi-weekly means every 2 weeks (26 pay periods per year). Semi-monthly means twice a month (24 pay periods per year). This calculator shows bi-weekly.</p>
          <p><strong>Why adjust weeks per year?</strong> If you have unpaid vacation or take time off without pay, reducing weeks per year gives you a more accurate annual total.</p>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Related Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculators/compound-interest" className="text-sm text-primary hover:underline">Compound Interest Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/loan" className="text-sm text-primary hover:underline">Loan Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/tip" className="text-sm text-primary hover:underline">Tip Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/percentage" className="text-sm text-primary hover:underline">Percentage Calculator</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
