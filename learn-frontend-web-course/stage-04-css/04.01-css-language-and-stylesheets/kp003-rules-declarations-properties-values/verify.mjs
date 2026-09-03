import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /class="anatomy-card"/);
assert.match(html, /data-state="warning"/);
assert.match(css, /\.anatomy-card,\s*\n\.invalid-value-demo\s*\{/);
assert.match(css, /\[data-state="warning"\]\s*\{/);
assert.match(css, /color:\s*#0f5132;\s*\n\s*color:\s*definitely-not-a-color/);
assert.match(html, /<dt>Selector<\/dt>/);
assert.match(html, /<dt>Declaration<\/dt>/);

console.log("✓ KP003 rule anatomy and invalid-value experiment are complete.");
