import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /Shorthand \/ Longhand \/ At-rule Laboratory/);
assert.match(css, /KP004_COMMENT_MARKER/);
assert.match(css, /margin:\s*8px 16px 24px 32px/);
assert.match(css, /margin-left:\s*48px/);
assert.match(css, /background-image:[^;]+;\s*background:\s*#fff7ed/s);
assert.match(css, /@supports\s*\(display:\s*grid\)/);
assert.match(css, /@media\s*\(min-width:\s*720px\)/);

console.log("✓ KP004 shorthand, longhand, comment, at-rule, and reset experiments are complete.");
