import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("objectArray=array:2"), "object 应接受 Array");
assert(runtime.stdout.includes("objectFunction=function"), "object 应接受 Function");
assert(runtime.stdout.includes("nonNullishNumber=number:42"), "{} 应接受非 nullish number");
assert(runtime.stdout.includes("unknownNull=null"), "unknown 应接受 null 并经过 Narrow");
assert(runtime.stdout.includes("label=architect"), "Record Guard 读取失败");
assert(runtime.stdout.includes("arrayIsRecord=false"), "Array 不应被当作普通 Record");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("value is Record<PropertyKey, unknown>"), "Record Guard 声明缺失");

console.log("✓ KP014 验证通过：object、{}、Object、unknown 与 Record 的边界已被逐一验证。" );
