import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/main.tsx', import.meta.url), 'utf8');

const checks = [
  ['readonly props interface', /interface ReleaseCardProps[\s\S]*readonly release/],
  ['optional prop with default', /density = 'comfortable'/],
  ['boolean default', /showOwner = true/],
  ['parent creates snapshot', /const currentRelease: ReleaseSnapshot/],
  ['child receives props', /<ReleaseCard release=\{currentRelease\}/],
  ['nested readonly owner', /interface ReleaseOwner[\s\S]*readonly name/],
];

for (const [name, pattern] of checks) {
  if (!pattern.test(source)) {
    throw new Error(`Verification failed: ${name}`);
  }
}

if (/\b(?:release|props)\.[A-Za-z_$][\w$]*\s*=(?!=)/.test(source)) {
  throw new Error('Verification failed: props or release is assigned directly.');
}

console.log('RE-1103-001 evidence verification passed.');
