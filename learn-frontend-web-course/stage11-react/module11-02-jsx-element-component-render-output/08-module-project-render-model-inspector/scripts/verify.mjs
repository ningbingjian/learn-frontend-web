import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const requiredFiles = [
  'README.md',
  'PROJECT_REPORT.md',
  'MODULE_REVIEW.md',
  'index.html',
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'src/App.tsx',
  'src/model.tsx',
  'src/main.tsx',
  'src/styles.css',
  'src/vite-env.d.ts',
];

for (const file of requiredFiles) {
  await access(`${root}/${file}`);
}

const model = await readFile(`${root}/src/model.tsx`, 'utf8');
const app = await readFile(`${root}/src/App.tsx`, 'utf8');
const main = await readFile(`${root}/src/main.tsx`, 'utf8');
const review = await readFile(`${root}/MODULE_REVIEW.md`, 'utf8');

for (const scenario of ["id: 'host'", "id: 'component'", "id: 'fragment'", "id: 'empty'"]) {
  if (!model.includes(scenario)) {
    throw new Error(`Missing inspector scenario: ${scenario}`);
  }
}

for (const evidence of [
  'isValidElement(value)',
  'Object.isFrozen(value)',
  'setRenderRequest((value) => value + 1)',
  'setRevision((value) => value + 1)',
]) {
  if (!(model.includes(evidence) || app.includes(evidence))) {
    throw new Error(`Missing render-model evidence: ${evidence}`);
  }
}

for (const evidence of ['new MutationObserver', 'observer.observe(rootNode', '<StrictMode>']) {
  if (!main.includes(evidence)) {
    throw new Error(`Missing commit evidence: ${evidence}`);
  }
}

for (const heading of ['Scope Review', 'Depth Review', 'Evidence Review', 'Definition of Done']) {
  if (!review.includes(heading)) {
    throw new Error(`Missing Module Review section: ${heading}`);
  }
}

const packageJson = JSON.parse(
  await readFile(`${root}/package.json`, 'utf8'),
);

for (const script of ['dev', 'verify', 'typecheck', 'build']) {
  if (typeof packageJson.scripts?.[script] !== 'string') {
    throw new Error(`Missing npm script: ${script}`);
  }
}

console.log('RE-1102-008 project structure and evidence verified.');
