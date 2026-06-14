import type { Metadata } from "next";
import { PxConverterTool } from "@/components/px-converter/PxConverterTool";

export const metadata: Metadata = {
  title: "PX to REM Converter — Pixels ↔ REM Calculator",
  description:
    "Convert px to rem and rem to px instantly, with a configurable root font-size. Swap directions, click presets, and copy values — a fast, free CSS unit converter for developers and designers.",
};

export default function PxConverterPage() {
  return <PxConverterTool />;
}
