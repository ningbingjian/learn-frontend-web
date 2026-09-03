import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("coordinate=121.4737,31.2304"), "Coordinate 格式化不正确");
assert(runtime.stdout.includes("user=USER-1:98:active"), "Named Tuple 用户行不正确");
assert(runtime.stdout.includes("response=ORDER-1:REQ-2026"), "带 Optional requestId 的响应不正确");
assert(runtime.stdout.includes("responseWithoutTrace=ok:NO_REQUEST_ID"), "省略 Optional Element 的响应不正确");
assert(runtime.stdout.includes("command=deploy --env prod --dry-run"), "Rest Tuple 命令不正确");
assert(runtime.stdout.includes("runtimeIsArray=true;length=2"), "Tuple Runtime 应仍然是 Array");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("readonly [longitude: number, latitude: number]"), "Named Coordinate Tuple 声明缺失");
assert(declaration.includes("requestId?: string"), "Optional Tuple Element 声明缺失");
assert(declaration.includes("readonly [name: string, ...args: string[]]"), "Rest Tuple Element 声明缺失");
assert(declaration.includes('level: "info" | "warn" | "error"'), "Log level Tuple 声明缺失");

console.log("✓ KP017 验证通过：Named、Optional、Rest 与 readonly Tuple 的位置契约已被验证。");
