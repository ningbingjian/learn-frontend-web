import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(
  runtime.stdout.trim() === [
    "mutable=draft; typeof=string",
    "fixed=draft; typeof=string",
    "accepted:draft",
    "queued/email/retries=1,2"
  ].join("\n"),
  `输出不符合预期：${runtime.stdout}`
);

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("mutableStatus: string"), "let 字面量应扩大为 string");
assert(declaration.includes('fixedStatus = "draft"'), "const 基础字面量应保留 draft");
assert(
  declaration.includes("status: string") && declaration.includes("channel: string"),
  "可变对象属性应扩大为 string"
);
assert(declaration.includes('readonly status: \"queued\"'), "as const 应保留 readonly queued");
assert(declaration.includes("readonly retries: readonly [1, 2]"), "as const 应生成 readonly tuple");

console.log("✓ KP006 验证通过：Declaration Emit 清楚展示了 widening、annotation 与 as const 的差异。" );
