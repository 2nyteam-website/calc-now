"use client";

import { Input } from "@/components/ui/input";

interface CurrencyInputProps {
  id: string;
  value: string;
  onChange: (raw: string) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: string;
  placeholder?: string;
  className?: string;
}

function formatWithCommas(value: string): string {
  const parts = value.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function stripCommas(value: string): string {
  return value.replace(/,/g, "");
}

export default function CurrencyInput({
  id,
  value,
  onChange,
  prefix,
  suffix,
  className = "h-12",
}: CurrencyInputProps) {
  const displayValue = value ? formatWithCommas(value) : "";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = stripCommas(e.target.value);
    // Allow empty, digits, one decimal point, and optional negative sign
    if (raw === "" || raw === "-" || /^-?\d*\.?\d*$/.test(raw)) {
      onChange(raw);
    }
  }

  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
          {prefix}
        </span>
      )}
      <Input
        id={id}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        className={`${className} ${prefix ? "pl-7" : ""} ${suffix ? "pr-7" : ""}`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  );
}
