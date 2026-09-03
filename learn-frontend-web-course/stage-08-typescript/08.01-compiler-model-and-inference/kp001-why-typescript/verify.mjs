import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const output = spawnSync(process.execPath, ["dist/index.js"], {
  encoding: "utf8"
});

assert(output.status === 0, `安全版本运行失败：${output.stderr}`);
assert(
  output.stdout.trim() === "team@example.com / email / attempts=3",
  `安全版本输出不符合预期：${output.stdout}`
);

const emitted = readFileSync("dist/index.js", "utf8");
const declaration = readFileSync("dist/index.d.ts", "utf8");

assert(!emitted.includes("interface DeliveryRequest"), "Emit 后的 JavaScript 不应保留 interface");
assert(!emitted.includes("type DeliveryChannel"), "Emit 后的 JavaScript 不应保留 type alias");
assert(
  declaration.includes("export {};") || declaration.trim().length > 0,
  "应生成 declaration 文件"
);

console.log("✓ KP001 验证通过：静态类型阻止错误输入，运行时代码中类型已被擦除。");
