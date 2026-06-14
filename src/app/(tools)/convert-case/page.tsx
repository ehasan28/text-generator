import type { Metadata } from "next";
import { ConvertCaseTool } from "@/components/convert-case/ConvertCaseTool";

export const metadata: Metadata = {
  title: "Case Converter — camelCase, snake_case, Title Case & More",
  description:
    "Paste any text and instantly convert between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and aLtErNaTiNg. Free, fast, and fully client-side.",
};

export default function ConvertCasePage() {
  return <ConvertCaseTool />;
}
