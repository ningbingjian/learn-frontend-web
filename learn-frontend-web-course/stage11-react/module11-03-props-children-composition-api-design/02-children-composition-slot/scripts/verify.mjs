import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/main.tsx', import.meta.url), 'utf8');

const checks = [
  ['ReactNode children contract', /readonly children: ReactNode/],
  ['Children.count evidence', /Children\.count\(children\)/],
  ['Children.toArray evidence', /Children\.toArray\(children\)/],
  ['nested JSX usage', /<CompositionPanel[\s\S]*<ReleaseFacts \/>/],
  ['fragment example', /<>\s*<ul className="check-list"/],
  ['component opacity example', /function MoreChecks/],
];

for (const [name, pattern] of checks) {
  if (!pattern.test(source)) {
    throw new Error(`Verification failed: ${name}`);
  }
}

if (/children\s+as\s+unknown\s+as\s+Array/.test(source)) {
  throw new Error('Verification failed: children is forced into an array.');
}

console.log('RE-1103-002 evidence verification passed.');
