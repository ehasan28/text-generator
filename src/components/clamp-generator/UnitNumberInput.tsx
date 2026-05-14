"use client";

import clsx from "clsx";
import type { CssUnit } from "@/lib/css-units";

interface UnitNumberInputProps {
  value: number;
  unit: CssUnit;
  onChange: (next: { value: number; unit: CssUnit }) => void;
  min?: number;
  max?: number;
  step?: number;
  ariaLabel?: string;
}

export function UnitNumberInput({
  value,
  unit,
  onChange,
  min = 0,
  max = 4000,
  step,
  ariaLabel,
}: UnitNumberInputProps) {
  return (
    <div
      className={clsx(
        "flex items-stretch rounded-lg overflow-hidden",
        "bg-surface border border-border-base hover:border-border-strong",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background",
        "transition-colors",
      )}
    >
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step ?? (unit === "rem" ? 0.0625 : 1)}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isFinite(n)) onChange({ value: n, unit });
        }}
        aria-label={ariaLabel}
        className={clsx(
          "flex-1 min-w-0 h-10 px-3 bg-transparent text-sm font-medium tabular-nums",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          "focus:outline-none",
        )}
      />
      <div className="relative">
        <select
          value={unit}
          onChange={(e) =>
            onChange({ value, unit: e.target.value as CssUnit })
          }
          aria-label="Unit"
          className={clsx(
            "appearance-none h-10 pl-3 pr-7 border-l border-border-base bg-surface-muted",
            "text-xs font-medium uppercase tracking-wider cursor-pointer",
            "focus:outline-none focus:bg-surface-muted",
            "transition-colors",
          )}
        >
          <option value="px">px</option>
          <option value="rem">rem</option>
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-foreground-muted"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
