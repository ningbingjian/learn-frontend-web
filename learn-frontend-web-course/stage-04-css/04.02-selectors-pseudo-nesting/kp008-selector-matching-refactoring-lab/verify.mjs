import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const brokenHtml = await readFile(new URL("index.html", import.meta.url), "utf8");
const solutionHtml = await readFile(new URL("solution.html", import.meta.url), "utf8");
const brokenCss = await readFile(new URL("styles.css", import.meta.url), "utf8");
const solutionCss = await readFile(new URL("solution.css", import.meta.url), "utf8");
const app = await readFile(new URL("app.js", import.meta.url), "utf8");
const report = await readFile(new URL("DIAGNOSTIC_REPORT.md", import.meta.url), "utf8");
const reference = await readFile(new URL("REFERENCE_SOLUTION.md", import.meta.url), "utf8");
const contract = await readFile(new URL("SELECTOR_CONTRACT.md", import.meta.url), "utf8");

assert.match(brokenHtml, /data-mode="broken"/);
assert.match(solutionHtml, /data-mode="solution"/);
assert.match(brokenCss, /\.selector-list-target,\s*\n:totally-invalid-pseudo/);
assert.match(brokenCss, /\[data-role\*="admin"\]/);
assert.match(brokenCss, /\.dashboard \.title/);
assert.match(brokenCss, /:nth-child\(2\)/);
assert.match(brokenCss, /:is\(\.action, #legacy-action\)/);
assert.match(brokenCss, /\.status-error:has\(\.panel\)/);
assert.match(brokenCss, /\.interactive-target:focus\s*\{[^}]*outline:\s*none/s);
assert.match(brokenCss, /\.danger-action::before\s*\{[^}]*content:\s*"删除项目"/s);
assert.match(brokenCss, /&__label/);

assert.match(solutionCss, /\[data-role="admin"\]/);
assert.match(solutionCss, /\.dashboard > \.dashboard__title/);
assert.match(solutionCss, /\.release-row\[data-state="current"\]/);
assert.match(solutionCss, /:where\(\.action, #legacy-action\)/);
assert.match(solutionCss, /\.status-panel:has\(\.status-error\)/);
assert.match(solutionCss, /:focus-visible/);
assert.match(solutionCss, /& > \.notice__label/);
assert.match(solutionHtml, /<button class="danger-action" type="button"><span>删除项目<\/span><\/button>/);

assert.match(app, /scopeZone\.querySelectorAll\(scopeSelector\)/);
assert.match(app, /':scope > \.scope-row'/);
assert.match(app, /CSS\.supports\("selector\(:has\(\*\)\)"\)/);
assert.match(app, /CSS\.supports\("selector\(&\)"\)/);

for (const id of ["S01","S02","S03","S04","S05","S06","S07","S08","S09","S10","S11"]) {
  assert.match(report, new RegExp(`## ${id}`));
  assert.match(reference, new RegExp(`## ${id}`));
}
assert.match(contract, /Selector Depth Budget/);
assert.match(contract, /Specificity Budget/);
assert.match(contract, /State Modeling/);

for (const css of [brokenCss, solutionCss]) {
  assert.equal((css.match(/\{/g) ?? []).length, (css.match(/\}/g) ?? []).length);
}

console.log("✓ KP008 broken baseline, eleven selector faults, evidence app, reports, solution, and selector contract are complete.");
