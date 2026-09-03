import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /Origin \/ Importance \/ Source Order Laboratory/);
assert.match(html, /user agent stylesheet/);
assert.match(html, /未来边界：Encapsulation Context/);
assert.doesNotMatch(html, /shadowrootmode/i);
assert.doesNotMatch(html, /<script/i);
assert.doesNotMatch(css, /:host/);
assert.match(css, /\.source-order-demo\s*\{[^}]*color:/s);
assert.match(css, /\.importance-demo\s*\{[^}]*!important/s);
assert.match(css, /\.important-vs-inline\s*\{[^}]*!important/s);
assert.match(html, /style="color: #7c3aed;"/);
assert.equal((css.match(/\{/g) ?? []).length, (css.match(/\}/g) ?? []).length);

console.log("✓ KP005 uses static cascade evidence and defers Shadow DOM to Stage 13.");
