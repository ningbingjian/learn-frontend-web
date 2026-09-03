import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const requiredFiles = [
  'README.md',
  'index.html',
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'src/main.tsx',
  'src/styles.css',
  'src/vite-env.d.ts',
];

for (const file of requiredFiles) {
  await access(`${root}/${file}`);
}

const source = await readFile(`${root}/src/main.tsx`, 'utf8');
const requiredEvidence = [
  "createElement(\n    'releasebadge'",
  'Object.isFrozen(descriptor)',
  'ReleaseBadge({ label:',
  'HookedReleaseBadge({ label:',
  'isValidElement(value)',
  '<StrictMode>',
];

for (const evidence of requiredEvidence) {
  if (!source.includes(evidence)) {
    throw new Error(`Missing Failure Lab evidence: ${evidence}`);
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

console.log('RE-1102-007 structure and failure evidence verified.');
