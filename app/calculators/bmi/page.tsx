"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrencyInput from "@/components/currency-input";

function getBmiCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600" };
  if (bmi < 25) return { label: "Normal weight", color: "text-green-600" };
  if (bmi < 30) return { label: "Overweight", color: "text-yellow-600" };
  return { label: "Obese", color: "text-red-600" };
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weightKg, setWeightKg] = useState("70");
  const [heightCm, setHeightCm] = useState("175");
  const [weightLbs, setWeightLbs] = useState("154");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");

  let bmi = 0;
  if (unit === "metric") {
    const w = parseFloat(weightKg) || 0;
    const h = (parseFloat(heightCm) || 0) / 100;
    if (h > 0) bmi = w / (h * h);
  } else {
    const w = parseFloat(weightLbs) || 0;
    const totalInches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
    if (totalInches > 0) bmi = (w * 703) / (totalInches * totalInches);
  }

  const category = getBmiCategory(bmi);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">BMI Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Calculate your Body Mass Index with metric or imperial units.
        </p>
        <Badge variant="secondary" className="mt-2">No data sent to server</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button variant={unit === "metric" ? "default" : "outline"} size="sm" onClick={() => setUnit("metric")}>
                Metric (kg/cm)
              </Button>
              <Button variant={unit === "imperial" ? "default" : "outline"} size="sm" onClick={() => setUnit("imperial")}>
                Imperial (lbs/ft)
              </Button>
            </div>

            {unit === "metric" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="weightKg">Weight (kg)</Label>
                  <CurrencyInput id="weightKg" value={weightKg} onChange={setWeightKg} suffix="kg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heightCm">Height (cm)</Label>
                  <CurrencyInput id="heightCm" value={heightCm} onChange={setHeightCm} suffix="cm" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="weightLbs">Weight (lbs)</Label>
                  <CurrencyInput id="weightLbs" value={weightLbs} onChange={setWeightLbs} suffix="lbs" />
                </div>
                <div className="flex gap-3">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="heightFt">Height (ft)</Label>
                    <CurrencyInput id="heightFt" value={heightFt} onChange={setHeightFt} suffix="ft" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="heightIn">Height (in)</Label>
                    <CurrencyInput id="heightIn" value={heightIn} onChange={setHeightIn} suffix="in" />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent aria-live="polite">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-5 text-center">
                <p className="text-sm text-blue-600 mb-2">Your BMI</p>
                <p className={`text-5xl font-bold ${category.color}`}>{bmi > 0 ? bmi.toFixed(1) : "--"}</p>
                <p className={`text-xl font-semibold mt-2 ${category.color}`}>{bmi > 0 ? category.label : "Enter your data"}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-blue-600">Underweight</span>
                  <span className="text-muted-foreground">&lt; 18.5</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-green-600">Normal weight</span>
                  <span className="text-muted-foreground">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-yellow-600">Overweight</span>
                  <span className="text-muted-foreground">25.0 - 29.9</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-red-600">Obese</span>
                  <span className="text-muted-foreground">&ge; 30.0</span>
                </div>
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
          <h2 className="text-lg font-semibold text-foreground">About the BMI Calculator</h2>
          <p>
            <strong>Body Mass Index (BMI)</strong> is a widely used screening tool to assess whether a person has a healthy body weight relative to their height. It is calculated by dividing weight in kilograms by height in meters squared (<strong>BMI = kg/m²</strong>). For imperial units, the formula is BMI = (weight in lbs × 703) / (height in inches)². While BMI does not directly measure body fat, it correlates with more direct measures of body fat and is a useful initial screening tool.
          </p>
          <p>
            The <strong>World Health Organization (WHO)</strong> classifies BMI into four categories: Underweight (below 18.5), Normal weight (<strong>18.5 to 24.9</strong>), Overweight (25.0 to 29.9), and Obese (30.0 and above). These categories are associated with different <strong>health risk levels</strong>. However, BMI has limitations — it does not distinguish between muscle and fat mass, and may not be accurate for athletes, elderly individuals, or people with certain body types.
          </p>
          <p>
            This tool supports both metric and imperial units for your convenience. Always consult a healthcare professional for a comprehensive health assessment beyond BMI alone.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <ul>
            <li>Select your preferred unit system — <strong>Metric</strong> (kg and cm) or <strong>Imperial</strong> (lbs, feet, and inches).</li>
            <li>Enter your weight and height in the input fields.</li>
            <li>Your BMI value and category will appear instantly with a color-coded indicator.</li>
            <li>The reference chart below the result shows all BMI categories for easy comparison.</li>
          </ul>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>Is BMI accurate for athletes?</strong> BMI may overestimate body fat in muscular individuals. Athletes with high muscle mass may have a high BMI but low body fat.</p>
          <p><strong>Does BMI differ by age or gender?</strong> Standard BMI categories are the same for all adults. For children and teens, BMI is age- and sex-specific (BMI percentile).</p>
          <p><strong>What is a healthy BMI?</strong> A BMI between 18.5 and 24.9 is considered normal weight. However, overall health depends on many factors beyond BMI.</p>
          <p><strong>Is my data stored?</strong> No. All calculations run entirely in your browser. No health data is collected or transmitted.</p>
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
            <Link href="/calculators/unit-converter" className="text-sm text-primary hover:underline">Unit Converter</Link>
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
