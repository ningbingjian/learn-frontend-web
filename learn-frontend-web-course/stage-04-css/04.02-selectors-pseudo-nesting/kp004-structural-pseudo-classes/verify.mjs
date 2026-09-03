import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");
const app = await readFile(new URL("app.js", import.meta.url), "utf8");

assert.match(html, /Structural Pseudo-class Laboratory/);
assert.match(css, /\.mixed-children > :first-child/);
assert.match(css, /\.mixed-children > :last-child/);
assert.match(css, /article:nth-child\(2\)/);
assert.match(css, /article:nth-of-type\(2\)/);
assert.match(css, /:nth-child\(2 of \.eligible\)/);
assert.match(css, /:only-child/);
assert.match(app, /queue\.prepend\(item\)/);
assert.match(app, /document\.querySelectorAll\(selector\)/);
assert.equal((css.match(/\{/g) ?? []).length, (css.match(/\}/g) ?? []).length);

console.log("✓ KP004 structural pseudo-class, of S filtering, and dynamic-index experiments are complete.");
