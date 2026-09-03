import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");
const app = await readFile(new URL("app.js", import.meta.url), "utf8");

assert.match(html, /Native CSS Nesting \/ <code>&amp;<\/code> \/ <code>:scope<\/code> Laboratory/);
assert.match(css, /\.component-card\s*\{[\s\S]*\.component-card__meta\s*\{/);
assert.match(css, /& > \.component-card__title/);
assert.match(css, /&\[data-state="active"\]/);
assert.match(css, /\.theme-dark &/);
assert.match(css, /#never-used,\s*\n\.specificity-parent\s*\{[\s\S]*& \.specificity-child/);
assert.match(css, /&__label/);
assert.match(css, /\.bem-fix__label/);
assert.match(app, /querySelectorAll\(":scope > \.scope-item"\)/);
assert.match(app, /CSS\.supports\("selector\(&\)"\)/);
assert.match(app, /CSS\.supports\("selector\(:scope\)"\)/);
assert.equal((css.match(/\{/g) ?? []).length, (css.match(/\}/g) ?? []).length);

console.log("✓ KP007 native nesting, &, specificity, Sass-concatenation failure, and :scope evidence are complete.");
