import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const file of [
  "dist/index.js",
  "dist/pricing.js",
  "dist/pricing.d.ts",
  "dist/pricing.js.map",
  "dist/pricing.d.ts.map"
]) {
  assert(existsSync(file), `缺少构建产物：${file}`);
}

const source = readFileSync("src/pricing.ts", "utf8");
const emitted = readFileSync("dist/pricing.js", "utf8");
const declaration = readFileSync("dist/pricing.d.ts", "utf8");

assert(source.includes("interface QuoteRequest"), "源码必须包含 QuoteRequest 接口");
assert(!emitted.includes("interface QuoteRequest"), "JavaScript 产物中不应保留 interface");
assert(declaration.includes("interface QuoteRequest"), "声明产物必须保留公共类型");
assert(emitted.includes("export function calculateQuote"), "运行时代码必须保留函数实现");

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(
  runtime.stdout.trim() === "subtotal=100.00; discount=10.00; total=90.00",
  `输出不符合预期：${runtime.stdout}`
);

console.log("✓ KP003 验证通过：Parse/Check/Emit 的产物边界清晰，类型只进入声明文件。" );
