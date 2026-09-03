import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /Selector Grammar Laboratory/);
assert.match(html, /id="primary-card"/);
assert.match(html, /class="selector-card featured"/);
assert.match(css, /article\s*\{/);
assert.match(css, /\.selector-card\s*\{/);
assert.match(css, /#primary-card\s*\{/);
assert.match(css, /\.selector-card\.featured\s*\{/);
assert.match(css, /\.selector-card \.featured\s*\{/);
assert.match(css, /\.selector-list-invalid,\s*\n:totally-invalid-pseudo/);
assert.equal((css.match(/\{/g) ?? []).length, (css.match(/\}/g) ?? []).length);

console.log("✓ KP001 selector grammar, compound matching, and invalid selector-list lab are complete.");
