import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("patched=light:zh-CN:stable,beta"), "Patch 结果不正确");
assert(runtime.stdout.includes("cleared=system:zh-CN"), "显式 Clear Command 未删除 theme");
assert(runtime.stdout.includes("shallowMutation=ja-JP:2"), "浅层 readonly 实验不正确");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("theme?: Theme"), "Optional theme 声明缺失");
assert(declaration.includes("readonly tags: readonly string[]"), "深层只读数组声明缺失");
assert(declaration.includes('type: "clear-theme"'), "显式清除命令缺失");

console.log("✓ KP015 验证通过：Optional 写入语义、浅层 readonly 与深层只读视图已形成对照。" );
