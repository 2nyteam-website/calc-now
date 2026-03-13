import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About CalcNow",
  description:
    "CalcNow provides free online calculators for finance, health, math, and everyday life. 100% browser-based, no sign-up required.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About CalcNow</h1>
        <p className="text-muted-foreground mt-2">
          Fast, free, and private calculators for everyone.
        </p>
      </div>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          <strong className="text-foreground">CalcNow</strong> is a collection
          of free online calculators designed to help you with everyday
          calculations. Whether you need to figure out a loan payment, check
          your BMI, convert units, or calculate a tip, we have you covered.
        </p>

        <h2 className="text-lg font-semibold text-foreground pt-2">
          Why CalcNow?
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong className="text-foreground">100% Free</strong> — No hidden
            fees, no premium tiers, no limits on usage.
          </li>
          <li>
            <strong className="text-foreground">No Sign-Up Required</strong> —
            Just open a calculator and start using it. No account needed.
          </li>
          <li>
            <strong className="text-foreground">Browser-Based</strong> — All
            calculations happen right in your browser. Nothing is sent to a
            server.
          </li>
          <li>
            <strong className="text-foreground">Privacy-Focused</strong> — We
            don&apos;t collect, store, or transmit any of your input data.
          </li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground pt-2">
          Our Calculators
        </h2>
        <p>We offer calculators across several categories:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong className="text-foreground">Finance</strong> — Compound
            interest, loan, mortgage, salary, tip, and discount calculators.
          </li>
          <li>
            <strong className="text-foreground">Health &amp; Life</strong> — BMI
            calculator and age calculator.
          </li>
          <li>
            <strong className="text-foreground">Math &amp; Conversion</strong>{" "}
            — Percentage calculator and unit converter.
          </li>
        </ul>

        <p className="pt-2">
          Browse the full list on our{" "}
          <Link
            href="/all-calculators"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            All Calculators
          </Link>{" "}
          page.
        </p>
      </section>
    </div>
  );
}
