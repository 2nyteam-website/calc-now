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

interface BfCategory {
  label: string;
  color: string;
  maleRange: string;
  femaleRange: string;
}

const BF_CATEGORIES: BfCategory[] = [
  { label: "Essential Fat", color: "text-red-600", maleRange: "2-5%", femaleRange: "10-13%" },
  { label: "Athletes", color: "text-blue-600", maleRange: "6-13%", femaleRange: "14-20%" },
  { label: "Fitness", color: "text-green-600", maleRange: "14-17%", femaleRange: "21-24%" },
  { label: "Average", color: "text-yellow-600", maleRange: "18-24%", femaleRange: "25-31%" },
  { label: "Obese", color: "text-red-600", maleRange: "25%+", femaleRange: "32%+" },
];

function getBfCategory(bf: number, gender: Gender): { label: string; color: string } {
  if (gender === "male") {
    if (bf <= 5) return { label: "Essential Fat", color: "text-red-600" };
    if (bf <= 13) return { label: "Athletes", color: "text-blue-600" };
    if (bf <= 17) return { label: "Fitness", color: "text-green-600" };
    if (bf <= 24) return { label: "Average", color: "text-yellow-600" };
    return { label: "Obese", color: "text-red-600" };
  }
  if (bf <= 13) return { label: "Essential Fat", color: "text-red-600" };
  if (bf <= 20) return { label: "Athletes", color: "text-blue-600" };
  if (bf <= 24) return { label: "Fitness", color: "text-green-600" };
  if (bf <= 31) return { label: "Average", color: "text-yellow-600" };
  return { label: "Obese", color: "text-red-600" };
}

function calculateBodyFat(
  gender: Gender,
  waistIn: number,
  neckIn: number,
  heightIn: number,
  hipIn: number,
): number {
  if (waistIn <= 0 || neckIn <= 0 || heightIn <= 0) return 0;
  if (gender === "female" && hipIn <= 0) return 0;

  if (gender === "male") {
    const diff = waistIn - neckIn;
    if (diff <= 0) return 0;
    return 86.01 * Math.log10(diff) - 70.041 * Math.log10(heightIn) + 36.76;
  }
  const sum = waistIn + hipIn - neckIn;
  if (sum <= 0) return 0;
  return 163.205 * Math.log10(sum) - 97.684 * Math.log10(heightIn) - 78.387;
}

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [unit, setUnit] = useState<Unit>("imperial");
  const [weight, setWeight] = useState("180");
  const [waist, setWaist] = useState("34");
  const [neck, setNeck] = useState("15");
  const [height, setHeight] = useState("70");
  const [hip, setHip] = useState("38");

  // Parse values
  const weightNum = parseFloat(weight) || 0;
  const waistNum = parseFloat(waist) || 0;
  const neckNum = parseFloat(neck) || 0;
  const heightNum = parseFloat(height) || 0;
  const hipNum = parseFloat(hip) || 0;

  // Convert to inches for the US Navy formula
  let waistIn = waistNum;
  let neckIn = neckNum;
  let heightIn = heightNum;
  let hipIn = hipNum;
  let weightLbs = weightNum;

  if (unit === "metric") {
    waistIn = waistNum / 2.54;
    neckIn = neckNum / 2.54;
    heightIn = heightNum / 2.54;
    hipIn = hipNum / 2.54;
    weightLbs = weightNum * 2.205;
  }

  const bf = calculateBodyFat(gender, waistIn, neckIn, heightIn, hipIn);
  const validBf = bf > 0 && bf < 100;
  const fatMass = validBf && weightNum > 0 ? (weightLbs * bf) / 100 : 0;
  const leanMass = validBf && weightNum > 0 ? weightLbs - fatMass : 0;
  const category = validBf ? getBfCategory(bf, gender) : { label: "Enter your data", color: "text-muted-foreground" };

  const weightUnit = unit === "metric" ? "kg" : "lbs";
  const lengthUnit = unit === "metric" ? "cm" : "in";

  // For fat/lean mass display, use the original unit
  let fatMassDisplay = fatMass;
  let leanMassDisplay = leanMass;
  if (unit === "metric" && validBf && weightNum > 0) {
    fatMassDisplay = (weightNum * bf) / 100;
    leanMassDisplay = weightNum - fatMassDisplay;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Body Fat Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Estimate your body fat percentage using the US Navy method.
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

            {/* Unit Toggle */}
            <div className="flex gap-2">
              <Button variant={unit === "imperial" ? "default" : "outline"} size="sm" onClick={() => setUnit("imperial")}>
                Imperial (in/lbs)
              </Button>
              <Button variant={unit === "metric" ? "default" : "outline"} size="sm" onClick={() => setUnit("metric")}>
                Metric (cm/kg)
              </Button>
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label htmlFor="weight">Weight ({weightUnit})</Label>
              <CurrencyInput id="weight" value={weight} onChange={setWeight} suffix={weightUnit} />
            </div>

            {/* Height */}
            <div className="space-y-2">
              <Label htmlFor="height">Height ({lengthUnit})</Label>
              <CurrencyInput id="height" value={height} onChange={setHeight} suffix={lengthUnit} />
            </div>

            {/* Waist */}
            <div className="space-y-2">
              <Label htmlFor="waist">Waist circumference ({lengthUnit})</Label>
              <CurrencyInput id="waist" value={waist} onChange={setWaist} suffix={lengthUnit} />
              <p className="text-xs text-muted-foreground">Measure at navel level</p>
            </div>

            {/* Neck */}
            <div className="space-y-2">
              <Label htmlFor="neck">Neck circumference ({lengthUnit})</Label>
              <CurrencyInput id="neck" value={neck} onChange={setNeck} suffix={lengthUnit} />
              <p className="text-xs text-muted-foreground">Measure just below the larynx</p>
            </div>

            {/* Hip — only for female */}
            {gender === "female" && (
              <div className="space-y-2">
                <Label htmlFor="hip">Hip circumference ({lengthUnit})</Label>
                <CurrencyInput id="hip" value={hip} onChange={setHip} suffix={lengthUnit} />
                <p className="text-xs text-muted-foreground">Measure at the widest point</p>
              </div>
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
                <p className="text-sm text-blue-600 mb-2">Body Fat Percentage</p>
                <p className={`text-4xl font-bold ${category.color}`}>
                  {validBf ? `${bf.toFixed(1)}%` : "--"}
                </p>
                <p className={`text-xl font-semibold mt-2 ${category.color}`}>{category.label}</p>
              </div>

              {validBf && weightNum > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Fat Mass</p>
                    <p className="text-lg font-semibold">{fatMassDisplay.toFixed(1)} {weightUnit}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Lean Mass</p>
                    <p className="text-lg font-semibold">{leanMassDisplay.toFixed(1)} {weightUnit}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <p className="font-medium text-foreground">Body Fat Categories ({gender === "male" ? "Male" : "Female"})</p>
                {BF_CATEGORIES.map((cat) => (
                  <div key={cat.label} className="flex justify-between py-1">
                    <span className={cat.color}>{cat.label}</span>
                    <span className="text-muted-foreground">{gender === "male" ? cat.maleRange : cat.femaleRange}</span>
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
          <h2 className="text-lg font-semibold text-foreground">About the Body Fat Calculator</h2>
          <p>
            <strong>Body fat percentage</strong> is the proportion of your total body weight that is made up of fat tissue. Unlike BMI, which only considers height and weight, body fat percentage gives a more direct measurement of <strong>body composition</strong> and is a better indicator of health and fitness.
          </p>
          <p>
            This calculator uses the <strong>US Navy method</strong>, a well-established circumference-based formula developed by Hodgdon and Beckett. For men, the formula uses <strong>waist, neck, and height</strong> measurements. For women, it additionally requires <strong>hip circumference</strong>. The method uses logarithmic calculations to estimate the percentage of body fat from these simple tape measurements.
          </p>
          <p>
            Body fat is categorized into several ranges: <strong>Essential Fat</strong> (the minimum needed for basic physiological functions), <strong>Athletes</strong> (typical for competitive athletes), <strong>Fitness</strong> (associated with an active lifestyle), <strong>Average</strong> (acceptable but not optimal), and <strong>Obese</strong> (associated with increased health risks). These ranges differ significantly between <strong>men and women</strong> due to biological differences in fat distribution.
          </p>
          <p>
            Both <strong>imperial and metric units</strong> are supported. Metric measurements are automatically converted to inches for the formula. For the most accurate results, take measurements in the morning before eating and use a flexible measuring tape pulled snug but not compressing the skin.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Select your <strong>gender</strong> — the formula and body fat categories differ for Male and Female.</li>
            <li>Choose your <strong>unit system</strong> — Imperial (inches/lbs) or Metric (cm/kg).</li>
            <li>Enter your <strong>weight</strong> — this is used to calculate fat mass and lean mass.</li>
            <li>Enter your <strong>height</strong> — standing height without shoes.</li>
            <li>Measure your <strong>waist circumference</strong> at navel level. Stand relaxed, do not suck in your stomach.</li>
            <li>Measure your <strong>neck circumference</strong> just below the larynx (Adam&apos;s apple). Keep the tape level and snug.</li>
            <li>For <strong>females only</strong>, measure your <strong>hip circumference</strong> at the widest point of your buttocks.</li>
            <li>Your <strong>body fat percentage</strong>, fat mass, lean mass, and category will appear instantly in the results panel.</li>
          </ul>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>How accurate is the US Navy method?</strong> Studies show the US Navy method typically estimates body fat within 3-4% of results from hydrostatic weighing. It is most accurate for people with average body types and may be less precise for very lean or very overweight individuals.</p>
          <p><strong>Why are the categories different for men and women?</strong> Women naturally carry more essential body fat than men due to hormonal differences and reproductive functions. A body fat percentage that would be considered lean for a woman would be average or above for a man.</p>
          <p><strong>When should I take the measurements?</strong> For the most consistent results, measure in the morning before eating or drinking, and after using the restroom. Use a flexible tape measure and take each measurement two or three times, using the average.</p>
          <p><strong>Why does my body fat percentage seem higher than expected?</strong> Many people underestimate their body fat. The circumference-based method can also be affected by water retention, bloating, or measuring technique. Try measuring consistently at the same time of day for best tracking.</p>
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
            <Link href="/calculators/tdee" className="text-sm text-primary hover:underline">TDEE Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/age" className="text-sm text-primary hover:underline">Age Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/unit-converter" className="text-sm text-primary hover:underline">Unit Converter</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
