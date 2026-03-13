"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const categories = [
  {
    label: "Finance",
    tools: [
      { name: "Compound Interest", href: "/calculators/compound-interest" },
      { name: "Loan Calculator", href: "/calculators/loan" },
      { name: "Mortgage Calculator", href: "/calculators/mortgage" },
      { name: "Auto Loan", href: "/calculators/auto-loan" },
      { name: "ROI Calculator", href: "/calculators/roi" },
      { name: "Margin & Markup", href: "/calculators/margin-markup" },
      { name: "Salary Calculator", href: "/calculators/salary" },
      { name: "Tip Calculator", href: "/calculators/tip" },
      { name: "Discount Calculator", href: "/calculators/discount" },
    ],
  },
  {
    label: "Health & Life",
    tools: [
      { name: "BMI Calculator", href: "/calculators/bmi" },
      { name: "TDEE Calculator", href: "/calculators/tdee" },
      { name: "Body Fat Calculator", href: "/calculators/body-fat" },
      { name: "Age Calculator", href: "/calculators/age" },
    ],
  },
  {
    label: "Math & Conversion",
    tools: [
      { name: "Percentage Calculator", href: "/calculators/percentage" },
      { name: "Unit Converter", href: "/calculators/unit-converter" },
    ],
  },
  {
    label: "Everyday Tools",
    tools: [
      { name: "Date Calculator", href: "/calculators/date" },
      { name: "GPA Calculator", href: "/calculators/gpa" },
      { name: "Password Generator", href: "/calculators/password-generator" },
    ],
  },
];

export default function NavDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
      >
        Calculators
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[560px] bg-white border border-border rounded-lg shadow-xl p-4 z-50 columns-2 gap-4">
          {categories.map((cat) => (
            <div key={cat.label} className="break-inside-avoid mb-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {cat.label}
              </h3>
              <ul className="space-y-1">
                {cat.tools.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      onClick={() => setOpen(false)}
                      className="block text-sm text-foreground/80 hover:text-primary hover:bg-blue-50 rounded px-2 py-1 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="break-inside-avoid border-t border-border pt-2 mt-1">
            <Link
              href="/all-calculators"
              onClick={() => setOpen(false)}
              className="block text-sm text-primary font-medium hover:underline px-2 py-1"
            >
              View All Calculators →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
