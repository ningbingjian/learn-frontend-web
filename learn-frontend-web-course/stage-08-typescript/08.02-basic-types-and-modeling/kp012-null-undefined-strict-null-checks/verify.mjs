import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("profile=USER-1:用户-USER-1"), "DTO 到 Domain 标准化失败");
assert(runtime.stdout.includes("avatar=missing"), "Optional avatar 语义不正确");
assert(runtime.stdout.includes("nullishEmpty=\n"), "?? 应保留空字符串");
assert(runtime.stdout.includes("orEmpty=fallback"), "|| 应把空字符串视为 falsy");
assert(runtime.stdout.includes("lastLogin=2026-09-01"), "日期转换失败");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("nickname?: string"), "Domain Optional 声明缺失");
assert(declaration.includes("displayName: string | null"), "DTO nullability 被错误丢失");

console.log("✓ KP012 验证通过：null、undefined、Optional、?? 与 || 的语义差异已被回归。" );
