import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /Origin \/ Importance \/ Context \/ Source Order Laboratory/);
assert.equal((css.match(/\.source-order-demo\s*\{/g) || []).length, 2);
assert.match(css, /\.importance-demo\s*\{[^}]*!important/s);
assert.match(html, /class="important-vs-inline" style="color: #7c3aed;"/);
assert.match(html, /shadowrootmode="open"/);
assert.match(css, /\.context-important\s*\{[^}]*!important/s);
assert.match(html, /user agent stylesheet/i);

console.log("✓ KP005 origin, importance, source-order, inline, and encapsulation-context experiments are complete.");
