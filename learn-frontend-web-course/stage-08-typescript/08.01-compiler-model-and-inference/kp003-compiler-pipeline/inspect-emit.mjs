import { readFileSync } from "node:fs";

const source = readFileSync("src/pricing.ts", "utf8");
const emittedJavaScript = readFileSync("dist/pricing.js", "utf8");
const declaration = readFileSync("dist/pricing.d.ts", "utf8");

console.log("=== TypeScript source contains interface ===");
console.log(source.includes("interface QuoteRequest"));
console.log("=== emitted JavaScript contains interface ===");
console.log(emittedJavaScript.includes("interface QuoteRequest"));
console.log("=== declaration file contains interface ===");
console.log(declaration.includes("interface QuoteRequest"));
