import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("anyFailure=TypeError"), "any 污染故障未复现");
assert(runtime.stdout.includes("unknownResult=invalid"), "unknown Narrow 结果不正确");
assert(runtime.stdout.includes("command=start:JOB-7"), "Command 解析或穷尽执行失败");
assert(runtime.stdout.includes("voidReturn=undefined"), "void Runtime 结果不正确");
assert(runtime.stdout.includes("messages=alpha,beta"), "void 回调副作用不正确");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("safeUpperCase(input: unknown): string"), "unknown 边界缺失");
assert(declaration.includes("assertNever(value: never): never"), "never 穷尽工具缺失");
assert(declaration.includes("emitMessages(sink: LogSink): void"), "void API 缺失");

console.log("✓ KP013 验证通过：any、unknown、never 与 void 的四种职责已由类型和 Runtime 证据区分。" );
