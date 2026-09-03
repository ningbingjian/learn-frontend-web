import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /UI \/ Form \/ Focus Pseudo-class & Pseudo-element Laboratory/);
assert.doesNotMatch(html, /<script/i);
for (const selector of [
  /:hover/, /:active/, /:focus\s*\{/, /:focus-visible/, /:focus-within/,
  /input:required/, /input:invalid/, /input:valid/, /input:read-only/,
  /input:checked/, /button:disabled/, /::before/, /::after/, /::marker/,
  /::selection/
]) assert.match(css, selector);
assert.match(css, /\.focus-removed:focus\s*\{[^}]*outline:\s*none/s);
assert.match(css, /\.generated-only::before\s*\{[^}]*content:/s);
assert.match(html, /关键业务文字必须存在于 HTML 中/);
assert.equal((css.match(/\{/g) ?? []).length, (css.match(/\}/g) ?? []).length);

console.log("✓ KP006 uses native browser states and static pseudo-element evidence without event scripts.");
