import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");
const app = await readFile(new URL("app.js", import.meta.url), "utf8");

assert.match(html, /UI \/ Form \/ Focus \/ Pseudo-element Laboratory/);
assert.match(css, /:focus-visible/);
assert.match(css, /\.focus-card:focus-within/);
assert.match(css, /input:invalid:not\(:placeholder-shown\)/);
assert.match(css, /input:checked \+ label/);
assert.match(css, /button:disabled/);
assert.match(css, /\.decorated-status::before/);
assert.match(css, /\.milestones li::marker/);
assert.match(css, /::selection/);
assert.match(app, /getComputedStyle\(decorated, "::before"\)/);
assert.match(app, /form\.reportValidity\(\)/);
assert.equal((css.match(/\{/g) ?? []).length, (css.match(/\}/g) ?? []).length);

console.log("✓ KP006 interaction, form, focus, pseudo-element, and A11Y evidence experiments are complete.");
