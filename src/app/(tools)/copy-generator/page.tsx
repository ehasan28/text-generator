import type { Metadata } from "next";
import { GeneratorApp } from "@/components/GeneratorApp";

export const metadata: Metadata = {
  title: "Copy Generator — Lorem Ipsum & Mock Data",
  description:
    "Generate placeholder copy and mock data: meaningful English, lorem ipsum, JSON, UUIDs, emails, slugs, names, HEX colors, and more. 16 generators with instant counts and history — all free and client-side.",
};

export default function CopyGeneratorPage() {
  return <GeneratorApp />;
}
