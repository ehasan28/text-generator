"use client";

import { useMemo, useReducer, useState } from "react";
import { Check, Copy } from "lucide-react";
import { UnitNumberInput } from "./UnitNumberInput";
import {
  buildClamp,
  DEFAULT_BASE_PX,
  remToPx,
  type CssUnit,
} from "@/lib/css-units";

const ICON = { className: "h-4 w-4", strokeWidth: 1.5 } as const;

interface UnitValue {
  value: number;
  unit: CssUnit;
}

interface State {
  minViewport: UnitValue;
  maxViewport: UnitValue;
  minFont: UnitValue;
  maxFont: UnitValue;
}

type FieldKey = "minViewport" | "maxViewport" | "minFont" | "maxFont";

type Action = { type: "setField"; key: FieldKey; value: UnitValue };

const initial: State = {
  minViewport: { value: 500, unit: "px" },
  maxViewport: { value: 900, unit: "px" },
  minFont: { value: 16, unit: "px" },
  maxFont: { value: 48, unit: "px" },
};

function reducer(s: State, a: Action): State {
  return { ...s, [a.key]: a.value };
}

function toPx(uv: UnitValue): number {
  return uv.unit === "px" ? uv.value : remToPx(uv.value, DEFAULT_BASE_PX);
}

const FIELDS: { key: FieldKey; label: string }[] = [
  { key: "minViewport", label: "Minimum viewport width" },
  { key: "maxViewport", label: "Maximum viewport width" },
  { key: "minFont", label: "Minimum font size" },
  { key: "maxFont", label: "Maximum font size" },
];

export function ClampGeneratorTool() {
  const [state, dispatch] = useReducer(reducer, initial);
  const [copied, setCopied] = useState(false);

  const clamp = useMemo(() => {
    return buildClamp({
      minViewportPx: toPx(state.minViewport),
      maxViewportPx: toPx(state.maxViewport),
      minFontPx: toPx(state.minFont),
      maxFontPx: toPx(state.maxFont),
    });
  }, [state]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(clamp.css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="text-center max-w-2xl mx-auto pt-2 sm:pt-4">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
          Font-size Clamp Generator
        </h1>
        <p className="text-sm text-foreground-muted mt-1">
          Generate a fluid <span className="font-mono">font-size</span> that scales linearly with{" "}
          <span className="font-mono">clamp()</span>.
        </p>
      </header>

      <div className="mx-auto w-full max-w-2xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {FIELDS.map((f) => (
            <label key={f.key} className="space-y-1.5">
              <span className="block text-sm font-medium">{f.label}</span>
              <UnitNumberInput
                value={state[f.key].value}
                unit={state[f.key].unit}
                onChange={(uv) =>
                  dispatch({ type: "setField", key: f.key, value: uv })
                }
                min={0}
                max={f.key.includes("Viewport") ? 4000 : 400}
                ariaLabel={f.label}
              />
            </label>
          ))}
        </div>

        <div className="rounded-lg border border-border-base bg-surface-muted px-4 py-3 flex items-center gap-3">
          <code className="flex-1 min-w-0 font-mono text-sm break-all whitespace-pre-wrap">
            {clamp.css}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy CSS"}
            className="shrink-0 h-9 w-9 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface flex items-center justify-center cursor-pointer transition-colors"
            title={copied ? "Copied!" : "Copy"}
          >
            {copied ? <Check {...ICON} /> : <Copy {...ICON} />}
          </button>
        </div>

        {clamp.degenerate && (
          <p className="text-center text-xs text-foreground-muted">
            Viewport range is zero — using the minimum font size as a flat value.
          </p>
        )}
      </div>
    </div>
  );
}
