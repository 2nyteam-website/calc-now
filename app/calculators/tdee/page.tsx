"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrencyInput from "@/components/currency-input";

type Gender = "male" | "female";
type Unit = "metric" | "imperial";
type ActivityLevel = "sedentary" | "light" | "moderate" | "very" | "extra";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, { label: string; multiplier: number; desc: string }> = {
  sedentary: { label: "Sedentary", multiplier: 1.2, desc: "Little or no exercise" },
  light: { label: "Lightly Active", multiplier: 1.375, desc: "Light exercise 1-3 days/week" },
  moderate: { label: "Moderately Active", multiplier: 1.55, desc: "Moderate exercise 3-5 days/week" },
  very: { label: "Very Active", multiplier: 1.725, desc: "Hard exercise 6-7 days/week" },
  extra: { label: "Extra Active", multiplier: 1.9, desc: "Very hard exercise, physical job" },
};

function calculateBMR(gender: Gender, weightKg: number, heightCm: number, age: number): number {
  if (weightKg <= 0 || heightCm <= 0 || age <= 0) return 0;
  if (gender === "male") {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

export default function TdeeCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [unit, setUnit] = useState<Unit>("metric");
  const [age, setAge] = useState("25");
  const [weightKg, setWeightKg] = useState("70");
  const [heightCm, setHeightCm] = useState("175");
  const [weightLbs, setWeightLbs] = useState("154");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");

  let wKg = 0;
  let hCm = 0;
  if (unit === "metric") {
    wKg = parseFloat(weightKg) || 0;
    hCm = parseFloat(heightCm) || 0;
  } else {
    wKg = (parseFloat(weightLbs) || 0) / 2.205;
    hCm = ((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)) * 2.54;
  }

  const ageNum = parseFloat(age) || 0;
  const bmr = calculateBMR(gender, wKg, hCm, ageNum);
  const tdee = bmr > 0 ? bmr * ACTIVITY_MULTIPLIERS[activity].multiplier : 0;

  const goals = [
    { label: "Weight Loss (-500 cal)", value: tdee - 500 },
    { label: "Mild Weight Loss (-250 cal)", value: tdee - 250 },
    { label: "Maintain Weight", value: tdee },
    { label: "Mild Weight Gain (+250 cal)", value: tdee + 250 },
    { label: "Weight Gain (+500 cal)", value: tdee + 500 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">TDEE Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Calculate your Total Daily Energy Expenditure using the Mifflin-St Jeor equation.
        </p>
        <Badge variant="secondary" className="mt-2">No data sent to server</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <div className="flex gap-2">
                <Button variant={gender === "male" ? "default" : "outline"} size="sm" onClick={() => setGender("male")}>
                  Male
                </Button>
                <Button variant={gender === "female" ? "default" : "outline"} size="sm" onClick={() => setGender("female")}>
                  Female
                </Button>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <CurrencyInput id="age" value={age} onChange={setAge} suffix="years" />
            </div>

            {/* Unit Toggle */}
            <div className="flex gap-2">
              <Button variant={unit === "metric" ? "default" : "outline"} size="sm" onClick={() => setUnit("metric")}>
                Metric (kg/cm)
              </Button>
              <Button variant={unit === "imperial" ? "default" : "outline"} size="sm" onClick={() => setUnit("imperial")}>
                Imperial (lbs/ft)
              </Button>
            </div>

            {/* Weight & Height */}
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

            {/* Activity Level */}
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(ACTIVITY_MULTIPLIERS) as ActivityLevel[]).map((key) => (
                  <Button
                    key={key}
                    variant={activity === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActivity(key)}
                    title={ACTIVITY_MULTIPLIERS[key].desc}
                  >
                    {ACTIVITY_MULTIPLIERS[key].label}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{ACTIVITY_MULTIPLIERS[activity].desc} (×{ACTIVITY_MULTIPLIERS[activity].multiplier})</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent aria-live="polite">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-5 text-center">
                <p className="text-sm text-blue-600 mb-2">Your TDEE</p>
                <p className="text-4xl font-bold text-blue-700">
                  {tdee > 0 ? `${Math.round(tdee).toLocaleString()}` : "--"}
                </p>
                <p className="text-sm text-blue-600 mt-1">calories/day</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Basal Metabolic Rate (BMR)</p>
                <p className="text-2xl font-semibold text-foreground">
                  {bmr > 0 ? `${Math.round(bmr).toLocaleString()} cal/day` : "--"}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Daily Calorie Goals</p>
                {goals.map((goal) => (
                  <div key={goal.label} className="flex justify-between py-1.5 text-sm border-b last:border-0">
                    <span className="text-muted-foreground">{goal.label}</span>
                    <span className="font-medium">
                      {tdee > 0 ? `${Math.max(0, Math.round(goal.value)).toLocaleString()} cal` : "--"}
                    </span>
                  </div>
                ))}
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
          <h2 className="text-lg font-semibold text-foreground">About the TDEE Calculator</h2>
          <p>
            <strong>Total Daily Energy Expenditure (TDEE)</strong> is the total number of calories your body burns in a day, accounting for all physical activity. It is calculated by first determining your <strong>Basal Metabolic Rate (BMR)</strong> — the calories your body needs at complete rest — and then multiplying it by an <strong>activity factor</strong> that reflects your daily physical activity level.
          </p>
          <p>
            This calculator uses the <strong>Mifflin-St Jeor equation</strong>, which is considered one of the most accurate predictive equations for estimating BMR. The formula accounts for your <strong>gender, weight, height, and age</strong> to produce a personalized estimate. For men, the equation is BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5. For women, the constant changes to -161.
          </p>
          <p>
            Knowing your TDEE is essential for <strong>weight management</strong>. To lose weight, you need to consume fewer calories than your TDEE (caloric deficit). To gain weight, you consume more (caloric surplus). A deficit of <strong>500 calories per day</strong> roughly corresponds to losing about 1 pound (0.45 kg) per week, while a 250-calorie deficit leads to a more gradual, sustainable loss.
          </p>
          <p>
            Both <strong>metric and imperial units</strong> are supported. Imperial values are automatically converted to metric for the calculation. Always consult a healthcare professional or registered dietitian before making significant changes to your diet.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Select your <strong>gender</strong> — Male or Female — as the BMR formula differs for each.</li>
            <li>Enter your <strong>age</strong> in years. Metabolic rate decreases with age, so this is an important factor.</li>
            <li>Choose your preferred <strong>unit system</strong> — Metric (kg/cm) or Imperial (lbs/ft-in).</li>
            <li>Enter your <strong>weight</strong> and <strong>height</strong> in the appropriate fields.</li>
            <li>Select your <strong>activity level</strong> from the five presets: Sedentary, Lightly Active, Moderately Active, Very Active, or Extra Active.</li>
            <li>Your <strong>TDEE</strong> and <strong>BMR</strong> will appear instantly in the results panel along with calorie targets for different weight goals.</li>
            <li>Use the <strong>Daily Calorie Goals</strong> table to find the right intake for weight loss, maintenance, or weight gain.</li>
          </ul>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>What is the difference between BMR and TDEE?</strong> BMR is the number of calories your body burns at complete rest (just to keep your organs functioning). TDEE adds in the calories burned through daily activities and exercise. TDEE is always higher than BMR.</p>
          <p><strong>Why is the Mifflin-St Jeor equation used?</strong> Research has shown that the Mifflin-St Jeor equation is the most reliable formula for estimating BMR in most adults, outperforming older equations like Harris-Benedict.</p>
          <p><strong>How accurate is this calculator?</strong> The Mifflin-St Jeor equation estimates BMR within about 10% accuracy for most people. Individual factors like genetics, body composition, and hormonal health can cause variation. Use the result as a starting point and adjust based on real-world results.</p>
          <p><strong>How do I choose the right activity level?</strong> Be honest about your typical week. If you have a desk job and only exercise occasionally, choose Sedentary or Lightly Active. Reserve Very Active and Extra Active for those who train intensely most days or have physically demanding jobs.</p>
          <p><strong>Is my data stored?</strong> No. All calculations run entirely in your browser. No personal or health data is collected or transmitted to any server.</p>
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
            <Link href="/calculators/body-fat" className="text-sm text-primary hover:underline">Body Fat Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/age" className="text-sm text-primary hover:underline">Age Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/unit-converter" className="text-sm text-primary hover:underline">Unit Converter</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/percentage" className="text-sm text-primary hover:underline">Percentage Calculator</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
