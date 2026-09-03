import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /Functional \/ Relational Pseudo-class Laboratory/);
assert.doesNotMatch(html, /<script/i);
assert.match(css, /:is\(\.message\.info, \.message\.warning, \.message\.success\)/);
assert.match(css, /\.specificity-is :is\(\.message, #never-used\)/);
assert.match(css, /\.specificity-where :where\(\.message, #never-used\)/);
assert.match(css, /\.action:not\(\.archived, \[aria-disabled="true"\]\)/);
assert.match(css, /@supports selector\(\.panel:has\(\.status-error\)\)/);
assert.match(css, /\.panel:has\(\.status-error\)/);
assert.match(css, /\.step:has\(\+ \.step\.current\)/);
assert.match(css, /\.status-error:has\(\.panel\)/);
assert.equal((css.match(/\{/g) ?? []).length, (css.match(/\}/g) ?? []).length);

console.log("✓ KP005 uses static relational states and CSS @supports without DOM scripting.");
