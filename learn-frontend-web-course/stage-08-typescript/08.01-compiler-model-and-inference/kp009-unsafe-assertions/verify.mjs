import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("doubleAssertion=TypeError"), "双重断言故障没有被复现");
assert(runtime.stdout.includes("nonNullAssertion=TypeError"), "非空断言故障没有被复现");
assert(runtime.stdout.includes("safeParse=error:name must be string,members must be string[]"), "安全解析错误不正确");
assert(runtime.stdout.includes("validProject=PROJECT-2:Runtime Firewall"), "有效输入解析失败");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("parseProject(input: unknown): ParseResult<Project>"), "unknown 边界没有保留");

console.log("✓ KP009 验证通过：断言可通过 Check 但会在 Runtime 失败，安全解析器提供了真实证据。" );
