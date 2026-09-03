import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /Native CSS Nesting & Selector Context Laboratory/);
assert.doesNotMatch(html, /<script/i);
assert.match(css, /\.component-card\s*\{[\s\S]*\.component-card__meta\s*\{/);
assert.match(css, /& > \.component-card__title/);
assert.match(css, /&\[data-state="active"\]/);
assert.match(css, /&:hover/);
assert.match(css, /\.theme-dark &/);
assert.match(css, /#never-used,\s*\n\.specificity-parent\s*\{[\s\S]*& \.specificity-child/);
assert.match(css, /&__label/);
assert.match(css, /\.bem-card__label/);
assert.match(html, /:scope.*Stage 07/s);
assert.equal((css.match(/\{/g) ?? []).length, (css.match(/\}/g) ?? []).length);

console.log("✓ KP007 teaches native nesting with static CSS and defers scoped DOM queries to Stage 07.");
