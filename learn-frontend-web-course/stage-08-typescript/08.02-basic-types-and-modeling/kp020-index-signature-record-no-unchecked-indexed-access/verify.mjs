import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("knownTotal=295"), "Complete Record 汇总不正确");
assert(runtime.stdout.includes("counter=128"), "已存在 Counter 读取不正确");
assert(runtime.stdout.includes("missing=undefined"), "缺失动态键应返回 undefined");
assert(runtime.stdout.includes("requiredError=Missing counter: retries"), "缺失键错误路径不正确");
assert(
  runtime.stdout.includes("partial=us-west=120|us-east=missing|eu-central=75"),
  "Partial Record 描述不正确"
);

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("readonly [metric: string]: number"), "Index Signature 声明缺失");
assert(declaration.includes("Record<RegionCode, number>"), "Complete Record 声明缺失");
assert(declaration.includes("Partial<Record<RegionCode, number>>"), "Partial Record 声明缺失");
assert(declaration.includes("number | undefined"), "安全动态读取返回类型缺失");

console.log("✓ KP020 验证通过：开放字典、有限键 Record、缺失状态与 noUncheckedIndexedAccess 已形成完整对照。");
