import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /CSS Error Recovery & Value Pipeline Laboratory/);
assert.doesNotMatch(html, /<script/i);
assert.match(css, /color:\s*definitely-not-a-color/);
assert.match(css, /definitely-not-a-property/);
assert.match(css, /:totally-invalid-pseudo/);
assert.match(css, /--accent:\s*20px/);
assert.match(css, /color:\s*var\(--accent\)/);
assert.match(css, /var\(--missing-accent,\s*#0369a1\)/);
assert.doesNotMatch(html + css, /document\.styleSheets|getComputedStyle|CSSStyleRule/);
assert.equal((css.match(/\{/g) ?? []).length, (css.match(/\}/g) ?? []).length);

console.log("✓ KP008 uses static DevTools evidence and defers CSSOM programming APIs to Stage 09.");
