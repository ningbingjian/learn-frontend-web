import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/main.tsx', import.meta.url), 'utf8');
const styles = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');

const checks = [
  ['children main slot', /readonly children: ReactNode/],
  ['actions explicit slot', /readonly actions: ReactNode/],
  ['aside explicit slot', /readonly aside\?: ReactNode/],
  ['footer explicit slot', /readonly footer\?: ReactNode/],
  ['nullish summary handling', /summary == null \? null/],
  ['conditional aside host region', /aside == null[\s\S]*<aside className="aside-slot">/],
  ['single-column class selection', /review-shell__layout--single/],
  ['composition usage', /summary=\{[\s\S]*actions=\{[\s\S]*aside=\{/],
  ['boolean explosion comparison', /Boolean explosion/],
  ['single-column CSS', /\.review-shell__layout--single\s*\{[\s\S]*grid-template-columns/],
];

for (const [name, pattern] of checks) {
  const target = name === 'single-column CSS' ? styles : source;

  if (!pattern.test(target)) {
    throw new Error(`Verification failed: ${name}`);
  }
}

if (/showSummary\s*:\s*boolean/.test(source)) {
  throw new Error('Verification failed: boolean explosion entered the real API.');
}

if (/\{(?:summary|aside|footer)\s*\?/.test(source)) {
  throw new Error('Verification failed: optional ReactNode slot uses a truthiness check.');
}

console.log('RE-1103-003 evidence verification passed.');
