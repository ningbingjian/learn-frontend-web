import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /<link\s+rel="stylesheet"\s+href="\.\/styles\.css"\s*\/?>/);
assert.match(html, /class="status-card"/);
assert.match(html, /<main\s+class="lesson-shell">/);
assert.match(css, /\.status-card\s*\{/);
assert.match(css, /padding:\s*2rem/);
assert.match(css, /background:\s*#ffffff/);
assert.match(css, /\.status-card__action:focus-visible/);

console.log("✓ KP001 structure and CSS evidence are complete.");
