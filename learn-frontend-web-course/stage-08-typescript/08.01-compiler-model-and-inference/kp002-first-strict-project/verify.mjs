import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const config = JSON.parse(readFileSync("tsconfig.json", "utf8"));
const options = config.compilerOptions ?? {};

for (const key of [
  "strict",
  "noUncheckedIndexedAccess",
  "exactOptionalPropertyTypes",
  "useUnknownInCatchVariables",
  "noImplicitOverride",
  "noUncheckedSideEffectImports"
]) {
  assert(options[key] === true, `tsconfig 必须显式启用 ${key}`);
}

assert(options.module === "NodeNext", "module 必须显式设置为 NodeNext");
assert(options.moduleResolution === "NodeNext", "moduleResolution 必须显式设置为 NodeNext");
assert(options.rootDir === "src", "rootDir 必须显式设置为 src");
assert(options.outDir === "dist", "outDir 必须显式设置为 dist");

const output = spawnSync(process.execPath, ["dist/index.js"], {
  encoding: "utf8"
});

assert(output.status === 0, `运行失败：${output.stderr}`);
assert(
  output.stdout.trim() === "Hello Ada · theme=dark · locale=zh-CN · palette=Ctrl+K",
  `输出不符合预期：${output.stdout}`
);

console.log("✓ KP002 验证通过：strict 配置显式可审查，Check、Build 与 Runtime 职责分离。");
