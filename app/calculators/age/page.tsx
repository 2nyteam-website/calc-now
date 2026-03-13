"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function calculateAge(birthDate: Date, today: Date) {
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function daysUntilNextBirthday(birthDate: Date, today: Date) {
  let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday <= today) {
    nextBirthday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  }
  const diff = nextBirthday.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function totalDaysAlive(birthDate: Date, today: Date) {
  const diff = today.getTime() - birthDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function AgeCalculator() {
  const [birthDateStr, setBirthDateStr] = useState("1992-06-15");

  const result = useMemo(() => {
    if (!birthDateStr) return null;
    const birth = new Date(birthDateStr + "T00:00:00");
    if (isNaN(birth.getTime())) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (birth > today) return null;

    const age = calculateAge(birth, today);
    const nextBday = daysUntilNextBirthday(birth, today);
    const totalDays = totalDaysAlive(birth, today);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = age.years * 12 + age.months;

    return { ...age, nextBday, totalDays, totalWeeks, totalMonths };
  }, [birthDateStr]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Age Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Find your exact age in years, months, and days. See when your next birthday is.
        </p>
        <Badge variant="secondary" className="mt-2">No data sent to server</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Birth Date</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="birthdate">Date of Birth</Label>
              <Input
                id="birthdate"
                type="date"
                value={birthDateStr}
                onChange={(e) => setBirthDateStr(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Age</CardTitle>
          </CardHeader>
          <CardContent aria-live="polite">
            {result ? (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="flex justify-center gap-6">
                    <div>
                      <p className="text-4xl font-bold text-primary">{result.years}</p>
                      <p className="text-sm text-muted-foreground">Years</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-primary">{result.months}</p>
                      <p className="text-sm text-muted-foreground">Months</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-primary">{result.days}</p>
                      <p className="text-sm text-muted-foreground">Days</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Next Birthday</span>
                    <span className="font-semibold">
                      {result.nextBday === 0 ? "Today!" : `in ${result.nextBday} days`}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Total Months</span>
                    <span className="font-semibold">{result.totalMonths.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Total Weeks</span>
                    <span className="font-semibold">{result.totalWeeks.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Total Days</span>
                    <span className="font-semibold">{result.totalDays.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">Enter a valid birth date to see your age.</p>
            )}
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
          <h2 className="text-lg font-semibold text-foreground">About the Age Calculator</h2>
          <p>
            This age calculator determines your exact age in years, months, and days from your date of birth. It accounts for varying month lengths and leap years to provide an accurate result. Beyond the basic age breakdown, it also shows your total age in months, weeks, and days, plus a countdown to your next birthday.
          </p>
          <p>
            Age calculation might seem simple, but handling edge cases like month boundaries and leap years correctly requires careful logic. For example, being born on January 31st and calculating age on February 28th involves special handling since February has fewer days. This calculator handles all such cases correctly using proper date arithmetic.
          </p>
          <p>
            This tool is useful for official documentation, birthday planning, age verification, or just satisfying your curiosity about exactly how long you have been alive. All calculations are performed in your browser based on your system clock.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose-invert max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <p>
            Simply select or type your date of birth using the date picker. The calculator instantly shows your age broken down into years, months, and days, along with additional statistics like total days alive and days until your next birthday. The date must be in the past.
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose-invert max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>How accurate is this?</strong> The calculator is accurate to the day, using proper date arithmetic that accounts for leap years and varying month lengths.</p>
          <p><strong>What timezone does it use?</strong> It uses your local system time to determine today&apos;s date.</p>
          <p><strong>Can I calculate someone else&apos;s age?</strong> Absolutely. Just enter any birth date and the calculator will show the age as of today.</p>
          <p><strong>What about leap year birthdays?</strong> If you were born on February 29th, the calculator handles this correctly. Your next birthday countdown will point to the correct date.</p>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Related Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculators/bmi" className="text-sm text-primary hover:underline">BMI Calculator</Link>
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
