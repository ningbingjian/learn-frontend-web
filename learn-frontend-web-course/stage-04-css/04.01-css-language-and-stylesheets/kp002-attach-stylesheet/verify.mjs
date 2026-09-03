import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /<link\s+rel="stylesheet"\s+href="\.\/styles\.css"\s*\/?>/);
assert.match(html, /<style>[\s\S]*\.method-card--internal/);
assert.match(html, /style="border-color:\s*#6d28d9"/);
assert.match(html, /\.load-order-card\s*\{[\s\S]*background:\s*#fff7ed/);
assert.match(css, /\.method-card--external\s*\{/);
assert.match(css, /\.load-order-card\s*\{[\s\S]*background:\s*#eff6ff/);

console.log("✓ KP002 contains Inline, Internal, External and load-order evidence.");
