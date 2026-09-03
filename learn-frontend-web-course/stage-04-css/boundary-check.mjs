import { readdir, readFile } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const stageRoot = fileURLToPath(new URL(".", import.meta.url));
const errors = [];
let lessonCount = 0;
let learnerFileCount = 0;

const forbiddenReadmePatterns = [
  [/(?:document\.)?querySelector(?:All)?\s*\(/, "DOM query API"],
  [/\.matches\s*\(/, "Element.matches API"],
  [/document\.styleSheets/, "CSSOM stylesheet API"],
  [/CSSStyleSheet|CSSStyleRule/, "CSSOM object API"],
  [/getComputedStyle\s*\(/, "computed-style API"],
  [/CSS\.supports\s*\(/, "Web Platform support API"],
  [/addEventListener\s*\(/, "Event API"],
  [/createElement\s*\(/, "DOM creation API"],
  [/checkValidity\s*\(|reportValidity\s*\(/, "Form validation API"],
  [/<template\s+[^>]*shadowrootmode/i, "Declarative Shadow DOM"],
  [/:host\s*\{/, "Shadow DOM :host rule"],
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const isLesson = entries.some((entry) => entry.isFile() && entry.name === "README.md") && /^kp\d+/i.test(basename(directory));

  if (isLesson) {
    lessonCount += 1;
    const names = new Set(entries.map((entry) => entry.name));
    for (const required of ["README.md", "index.html", "styles.css"]) {
      if (!names.has(required)) errors.push(`${relative(stageRoot, directory)} missing ${required}`);
    }
    if (names.has("app.js")) errors.push(`${relative(stageRoot, directory)} contains learner-facing app.js`);
  }

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }
    if (!isLesson) continue;

    const extension = extname(entry.name);
    if (![".md", ".html", ".css", ".json"].includes(extension)) continue;
    learnerFileCount += 1;
    const content = await readFile(fullPath, "utf8");
    const display = relative(stageRoot, fullPath);

    if (extension === ".html") {
      if (/<script\b/i.test(content)) errors.push(`${display} contains <script>`);
      if (/\son\w+\s*=/i.test(content)) errors.push(`${display} contains inline event handler`);
      if (/shadowrootmode/i.test(content)) errors.push(`${display} contains Shadow DOM markup`);
    }

    if (extension === ".css" && /:host\b/.test(content)) {
      errors.push(`${display} contains Shadow DOM :host`);
    }

    if (entry.name === "README.md") {
      for (const [pattern, label] of forbiddenReadmePatterns) {
        if (pattern.test(content)) errors.push(`${display} requires or demonstrates ${label}`);
      }
    }

    if (entry.name === "package.json" && /app\.js/.test(content)) {
      errors.push(`${display} runs app.js`);
    }
  }
}

await walk(stageRoot);

if (lessonCount !== 17) {
  errors.push(`expected 17 completed lessons during this boundary baseline, found ${lessonCount}`);
}

if (errors.length) {
  console.error("Stage 04 owner-boundary check failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`✓ Stage 04 boundary passed: ${lessonCount} lessons, ${learnerFileCount} learner-facing files checked.`);
}
