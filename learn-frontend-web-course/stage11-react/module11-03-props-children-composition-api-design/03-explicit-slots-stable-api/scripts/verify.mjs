import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/main.tsx', import.meta.url), 'utf8');

const checks = [
  ['children main slot', /readonly children: ReactNode/],
  ['actions explicit slot', /readonly actions: ReactNode/],
  ['aside explicit slot', /readonly aside\?: ReactNode/],
  ['footer explicit slot', /readonly footer\?: ReactNode/],
  ['conditional aside host region', /aside \? <aside className="aside-slot">/],
  ['composition usage', /summary=\{[\s\S]*actions=\{[\s\S]*aside=\{/],
  ['boolean explosion comparison', /Boolean explosion/],
];

for (const [name, pattern] of checks) {
  if (!pattern.test(source)) {
    throw new Error(`Verification failed: ${name}`);
  }
}

if (/showSummary\s*:\s*boolean/.test(source)) {
  throw new Error('Verification failed: boolean explosion entered the real API.');
}

console.log('RE-1103-003 evidence verification passed.');
