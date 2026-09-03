import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /Structural Pseudo-class Laboratory/);
assert.match(html, /queue-before/);
assert.match(html, /queue-after/);
assert.match(html, /New Job · eligible/);
assert.doesNotMatch(html, /<script/i);
assert.match(css, /article:nth-child\(2\)/);
assert.match(css, /article:nth-of-type\(2\)/);
assert.match(css, /:nth-child\(2 of \.eligible\)/);
assert.match(css, /\.eligible:nth-child\(2\)/);
assert.match(css, /:only-child/);
assert.equal((css.match(/\{/g) ?? []).length, (css.match(/\}/g) ?? []).length);

console.log("✓ KP004 proves structural recalculation with static before/after HTML states.");
