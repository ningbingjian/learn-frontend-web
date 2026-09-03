import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /Specificity \/ Inheritance \/ CSS-wide Keywords Laboratory/);
assert.match(css, /p\.specificity-target\s*\{/);
assert.match(css, /#specificity-target\s*\{/);
assert.match(html, /style="color: #7c3aed;"/);
assert.match(css, /\.inheritance-parent\s*\{[^}]*color:[^;]+;[^}]*border:/s);
assert.match(css, /\.keyword-inherit\s*\{\s*color:\s*inherit/);
assert.match(css, /\.keyword-initial\s*\{\s*color:\s*initial/);
assert.match(css, /\.keyword-unset\s*\{\s*color:\s*unset/);
assert.match(css, /\.revert-link\s*\{\s*color:\s*revert/);
assert.match(css, /#legacy-panel \.component-button/);
assert.match(css, /\.fixed-button\.action/);

console.log("✓ KP006 specificity, inheritance, CSS-wide keywords, and specificity-debt experiments are complete.");
