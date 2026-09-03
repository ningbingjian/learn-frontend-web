import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(
  runtime.stdout.trim() === "items=2; subtotal=750; tax=45; total=795.00",
  `输出不符合预期：${runtime.stdout}`
);

const source = readFileSync("src/index.ts", "utf8");
const declaration = readFileSync("dist/index.d.ts", "utf8");

assert(
  source.includes("export function calculateInvoice(") && source.includes("): InvoiceSummary"),
  "公共函数必须显式表达输入与返回契约"
);
assert(source.includes("const taxRate = 0.06"), "明显的局部值应保留推断示例");
assert(source.includes("lines.map((line) =>"), "回调参数应展示上下文类型推断");
assert(declaration.includes("export declare function calculateInvoice"), "声明文件必须暴露公共契约");
assert(!declaration.includes("taxRate = 0.06"), "局部实现细节不应泄漏到公共声明");

console.log("✓ KP005 验证通过：边界有显式契约，局部实现充分利用类型推断。" );
