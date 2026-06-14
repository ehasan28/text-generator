import type { Metadata } from "next";
import { ClampGeneratorTool } from "@/components/clamp-generator/ClampGeneratorTool";

export const metadata: Metadata = {
  title: "CSS Clamp Generator — Fluid Font Size Calculator",
  description:
    "Generate a responsive CSS clamp() value for fluid typography that scales smoothly between two viewport widths. Set min/max font sizes and copy a clean clamp() — ready for Elementor, WordPress, or any stylesheet.",
};

export default function ClampGeneratorPage() {
  return <ClampGeneratorTool />;
}
