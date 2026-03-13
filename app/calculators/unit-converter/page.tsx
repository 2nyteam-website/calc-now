"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category = "length" | "weight" | "temperature";

interface UnitDef {
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const lengthUnits: Record<string, UnitDef> = {
  mm: { label: "Millimeter (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  cm: { label: "Centimeter (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  m: { label: "Meter (m)", toBase: (v) => v, fromBase: (v) => v },
  km: { label: "Kilometer (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  in: { label: "Inch (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  ft: { label: "Foot (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  yd: { label: "Yard (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  mi: { label: "Mile (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
};

const weightUnits: Record<string, UnitDef> = {
  mg: { label: "Milligram (mg)", toBase: (v) => v / 1_000_000, fromBase: (v) => v * 1_000_000 },
  g: { label: "Gram (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  kg: { label: "Kilogram (kg)", toBase: (v) => v, fromBase: (v) => v },
  lb: { label: "Pound (lb)", toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
  oz: { label: "Ounce (oz)", toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
};

const tempUnits: Record<string, UnitDef> = {
  C: { label: "Celsius", toBase: (v) => v, fromBase: (v) => v },
  F: { label: "Fahrenheit", toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
  K: { label: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
};

const unitsByCategory: Record<Category, Record<string, UnitDef>> = {
  length: lengthUnits,
  weight: weightUnits,
  temperature: tempUnits,
};

const defaultUnits: Record<Category, [string, string]> = {
  length: ["km", "mi"],
  weight: ["kg", "lb"],
  temperature: ["C", "F"],
};

function formatResult(n: number): string {
  if (Math.abs(n) < 0.001 && n !== 0) return n.toExponential(4);
  if (Math.abs(n) >= 1_000_000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 6 });
}

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState("km");
  const [toUnit, setToUnit] = useState("mi");
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");
  const [lastEdited, setLastEdited] = useState<"from" | "to">("from");

  const units = unitsByCategory[category];

  // Calculate based on which side was last edited
  let fromVal: number;
  let toVal: number;

  if (lastEdited === "from") {
    fromVal = parseFloat(fromValue) || 0;
    const baseValue = units[fromUnit].toBase(fromVal);
    toVal = units[toUnit].fromBase(baseValue);
  } else {
    toVal = parseFloat(toValue) || 0;
    const baseValue = units[toUnit].toBase(toVal);
    fromVal = units[fromUnit].fromBase(baseValue);
  }

  function handleCategoryChange(cat: Category) {
    setCategory(cat);
    const [defFrom, defTo] = defaultUnits[cat];
    setFromUnit(defFrom);
    setToUnit(defTo);
    setFromValue("1");
    setToValue("");
    setLastEdited("from");
  }

  function handleFromValueChange(val: string) {
    setFromValue(val);
    setLastEdited("from");
  }

  function handleToValueChange(val: string) {
    setToValue(val);
    setLastEdited("to");
  }

  function swapUnits() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  const unitKeys = Object.keys(units);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Unit Converter</h1>
        <p className="text-muted-foreground mt-1">
          Convert between length, weight, and temperature units instantly.
        </p>
        <Badge variant="secondary" className="mt-2">No data sent to server</Badge>
      </div>

      <div className="flex gap-2">
        {(["length", "weight", "temperature"] as Category[]).map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] items-end">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="fromUnit">From</Label>
                <select
                  id="fromUnit"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {unitKeys.map((k) => (
                    <option key={k} value={k}>{units[k].label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromVal">Value</Label>
                <Input
                  id="fromVal"
                  type="number"
                  value={lastEdited === "from" ? fromValue : formatResult(fromVal)}
                  onChange={(e) => handleFromValueChange(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-center pb-2">
              <Button variant="outline" size="sm" onClick={swapUnits} aria-label="Swap units">
                &#8644;
              </Button>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="toUnit">To</Label>
                <select
                  id="toUnit"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {unitKeys.map((k) => (
                    <option key={k} value={k}>{units[k].label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="toVal">Value</Label>
                <Input
                  id="toVal"
                  type="number"
                  value={lastEdited === "to" ? toValue : formatResult(toVal)}
                  onChange={(e) => handleToValueChange(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg text-center" aria-live="polite">
            <p className="text-lg">
              <span className="font-semibold">{formatResult(fromVal)} {units[fromUnit].label}</span>
              <span className="text-muted-foreground mx-2">=</span>
              <span className="font-bold text-primary text-xl">{formatResult(toVal)} {units[toUnit].label}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick reference table */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {unitKeys.filter((k) => k !== fromUnit).map((k) => {
              const base = units[fromUnit].toBase(fromVal);
              const converted = units[k].fromBase(base);
              return (
                <div key={k} className="p-2 bg-muted rounded">
                  <p className="text-muted-foreground text-xs">{units[k].label}</p>
                  <p className="font-semibold">{formatResult(converted)}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="how-to">How to Use</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="prose prose-invert max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">About the Unit Converter</h2>
          <p>
            This unit converter supports three major categories of measurement: length, weight, and temperature. It handles conversions between both metric and imperial systems, making it useful for travel, cooking, science, engineering, and everyday tasks. All conversions use precise conversion factors for accurate results.
          </p>
          <p>
            Length conversions cover millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles. Weight includes milligrams, grams, kilograms, pounds, and ounces. Temperature supports Celsius, Fahrenheit, and Kelvin. The converter uses base-unit conversion internally: all length values convert through meters, all weights through kilograms, and all temperatures through Celsius.
          </p>
          <p>
            The quick reference table below the main converter shows your input value converted to all available units at once, saving time when you need multiple conversions. The swap button lets you instantly reverse the conversion direction.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose-invert max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <p>
            Select a category (Length, Weight, or Temperature), choose your source and target units from the dropdowns, and enter a value. The conversion happens instantly. Use the swap button (arrows) to reverse the direction. The quick reference table below shows the value converted to all units in the selected category.
          </p>
        </TabsContent>
        <TabsContent value="faq" className="prose prose-invert max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>How accurate are the conversions?</strong> Conversions use standard factors (e.g., 1 inch = 0.0254 meters exactly). Results are displayed with up to 6 decimal places for precision.</p>
          <p><strong>Why is temperature conversion different?</strong> Length and weight use simple multiplication, but temperature involves offsets (e.g., Fahrenheit has a +32 offset). The converter handles this correctly.</p>
          <p><strong>Can I convert in both directions?</strong> Yes, the conversion is bidirectional. Use the swap button or change the unit dropdowns to convert in either direction.</p>
          <p><strong>Is this suitable for scientific use?</strong> Yes, the conversion factors used are the internationally accepted standard values.</p>
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
            <Link href="/calculators/age" className="text-sm text-primary hover:underline">Age Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/tip" className="text-sm text-primary hover:underline">Tip Calculator</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
