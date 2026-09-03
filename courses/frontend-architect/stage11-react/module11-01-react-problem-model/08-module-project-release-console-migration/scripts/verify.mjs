import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const lessonRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

const requiredFiles = [
  'index.html',
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'MIGRATION_REPORT.md',
  'src/main.tsx',
  'src/App.tsx',
  'src/legacy.ts',
  'src/styles.css',
];

async function read(relativePath) {
  return readFile(path.join(lessonRoot, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const relativePath of requiredFiles) {
  await read(relativePath);
}

const appSource = await read('src/App.tsx');
const legacySource = await read('src/legacy.ts');
const mainSource = await read('src/main.tsx');
const report = await read('MIGRATION_REPORT.md');
const packageJson = JSON.parse(await read('package.json'));

assert(
  mainSource.includes('mountLegacyConsole') &&
    mainSource.includes('createRoot(reactContainer)'),
  'main.tsx 必须同时挂载遗留基线和 React 迁移版本。',
);

assert(
  appSource.includes('setApprovals((current) =>') &&
    appSource.includes('current.map((approval) =>'),
  'React 版本必须通过不可变更新处理审批列表。',
);

assert(
  !appSource.includes('document.querySelector'),
  'App.tsx 不应该直接查询和修改 React Root 内部 DOM。',
);

assert(
  legacySource.includes('document') ||
    legacySource.includes('querySelector') ||
    legacySource.includes('innerHTML'),
  '遗留基线必须保留命令式 DOM 证据。',
);

assert(
  report.includes('组件树') && report.includes('一次审批更新的时间线'),
  '迁移报告必须包含组件树和更新时序。',
);

assert(
  packageJson.scripts?.verify === 'node scripts/verify.mjs',
  'package.json 必须提供 npm run verify。',
);

console.log('RE-1101-008 verification passed.');
