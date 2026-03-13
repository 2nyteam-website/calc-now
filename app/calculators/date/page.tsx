"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrencyInput from "@/components/currency-input";

function calculateDateDiff(start: Date, end: Date) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

export default function DateCalculator() {
  // Mode 1: Date Difference
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

  // Mode 2: Add/Subtract Days
  const [baseDate, setBaseDate] = useState(new Date().toISOString().split("T")[0]);
  const [numDays, setNumDays] = useState("30");
  const [operation, setOperation] = useState<"add" | "subtract">("add");

  const diffResult = useMemo(() => {
    if (!startDate || !endDate) return null;
    const s = new Date(startDate + "T00:00:00");
    const e = new Date(endDate + "T00:00:00");
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;

    const isReversed = s > e;
    const earlier = isReversed ? e : s;
    const later = isReversed ? s : e;

    const diff = calculateDateDiff(earlier, later);
    const totalMs = later.getTime() - earlier.getTime();
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = diff.years * 12 + diff.months;

    return { ...diff, totalDays, totalWeeks, totalMonths, isReversed };
  }, [startDate, endDate]);

  const addResult = useMemo(() => {
    if (!baseDate || !numDays) return null;
    const base = new Date(baseDate + "T00:00:00");
    if (isNaN(base.getTime())) return null;
    const days = parseInt(numDays) || 0;
    const ms = days * 24 * 60 * 60 * 1000;
    const result = new Date(base.getTime() + (operation === "add" ? ms : -ms));

    const formatted = result.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const dayOfWeek = result.toLocaleDateString("en-US", { weekday: "long" });

    return { formatted, dayOfWeek };
  }, [baseDate, numDays, operation]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Date Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Calculate the difference between two dates or add and subtract days from a date.
        </p>
        <Badge variant="secondary" className="mt-2">No data sent to server</Badge>
      </div>

      <Tabs defaultValue="difference">
        <TabsList>
          <TabsTrigger value="difference">Date Difference</TabsTrigger>
          <TabsTrigger value="add-subtract">Add/Subtract Days</TabsTrigger>
        </TabsList>

        <TabsContent value="difference">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    className="h-12"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    className="h-12"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date Difference</CardTitle>
              </CardHeader>
              <CardContent aria-live="polite">
                {diffResult ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-5 text-center">
                      <div className="flex justify-center gap-6">
                        <div>
                          <p className="text-4xl font-bold text-blue-700">{diffResult.years}</p>
                          <p className="text-sm text-blue-600">Years</p>
                        </div>
                        <div>
                          <p className="text-4xl font-bold text-blue-700">{diffResult.months}</p>
                          <p className="text-sm text-blue-600">Months</p>
                        </div>
                        <div>
                          <p className="text-4xl font-bold text-blue-700">{diffResult.days}</p>
                          <p className="text-sm text-blue-600">Days</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Total Days</span>
                        <span className="font-semibold">{diffResult.totalDays.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Total Weeks</span>
                        <span className="font-semibold">{diffResult.totalWeeks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Total Months</span>
                        <span className="font-semibold">{diffResult.totalMonths.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">Enter valid dates to see the difference.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="add-subtract">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Add or Subtract Days</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="base-date">Start Date</Label>
                  <Input
                    id="base-date"
                    type="date"
                    className="h-12"
                    value={baseDate}
                    onChange={(e) => setBaseDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="num-days">Number of Days</Label>
                  <CurrencyInput id="num-days" value={numDays} onChange={setNumDays} />
                </div>
                <div className="space-y-2">
                  <Label>Operation</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={operation === "add" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOperation("add")}
                    >
                      Add Days
                    </Button>
                    <Button
                      variant={operation === "subtract" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOperation("subtract")}
                    >
                      Subtract Days
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent aria-live="polite">
                {addResult ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-5 text-center">
                      <p className="text-sm text-blue-600 mb-1">Resulting Date</p>
                      <p className="text-4xl font-bold text-blue-700">{addResult.formatted}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Day of the Week</span>
                        <span className="font-semibold">{addResult.dayOfWeek}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">Enter a valid date and number of days.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="how-to">How to Use</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">About the Date Calculator</h2>
          <p>
            This <strong>date calculator</strong> helps you find the exact <strong>difference between two dates</strong> broken down into years, months, and days. Whether you need to calculate the duration of a project, the length of a lease, or the time between two life events, this tool gives you a precise result instantly. It also shows the difference in <strong>total days</strong>, total weeks, and total months for easy reference.
          </p>
          <p>
            The second mode lets you <strong>add or subtract days</strong> from any given date. This is useful for calculating <strong>deadlines</strong>, delivery dates, due dates, or counting forward and backward from a specific event. Enter any number of days and instantly see the resulting date along with the <strong>day of the week</strong> it falls on.
          </p>
          <p>
            All calculations handle <strong>month boundaries</strong>, varying month lengths, and leap years correctly. The date arithmetic follows the same logic used in professional scheduling and project management tools. Everything runs entirely in your browser using <strong>JavaScript Date objects</strong>, so no data is sent to any server.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Choose <strong>Date Difference</strong> mode to find the time between two dates, or <strong>Add/Subtract Days</strong> to calculate a future or past date.</li>
            <li>For date difference, enter a <strong>start date</strong> and <strong>end date</strong> using the date pickers. The result updates instantly.</li>
            <li>For adding or subtracting, enter a <strong>start date</strong>, the <strong>number of days</strong>, and select whether to add or subtract.</li>
            <li>View the breakdown in <strong>years, months, days</strong> as well as total days, weeks, and months.</li>
            <li>The resulting date in add/subtract mode also shows the <strong>day of the week</strong>.</li>
          </ul>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>Does it handle leap years?</strong> Yes, the calculator correctly accounts for leap years when calculating date differences and when adding or subtracting days.</p>
          <p><strong>Can I enter the end date before the start date?</strong> Yes, the calculator will still show the absolute difference between the two dates regardless of order.</p>
          <p><strong>What is the maximum number of days I can add?</strong> There is no practical limit. You can add thousands or even millions of days, though extremely large values may exceed the range of JavaScript dates.</p>
          <p><strong>Does it account for time zones?</strong> The calculator works with dates only (not times) and uses your local system date as reference. It does not factor in time zone changes or daylight saving time.</p>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Related Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculators/age" className="text-sm text-primary hover:underline">Age Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/percentage" className="text-sm text-primary hover:underline">Percentage Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/unit-converter" className="text-sm text-primary hover:underline">Unit Converter</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/salary" className="text-sm text-primary hover:underline">Salary Calculator</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
