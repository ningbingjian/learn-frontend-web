import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("channels=email,sms,push"), "Channel 常量数据不正确");
assert(runtime.stdout.includes("status=draft,queued,running,completed"), "Status 对象常量不正确");
assert(runtime.stdout.includes("label=email:queued"), "Literal Union 调用不正确");
assert(runtime.stdout.includes("parsed=sms:invalid"), "Runtime Channel Narrowing 不正确");
assert(runtime.stdout.includes("window=9-18"), "Readonly Tuple 到可变 Tuple 的复制不正确");
assert(runtime.stdout.includes("policyFrozen=false"), "as const 不应被误认为 Runtime Freeze");
assert(runtime.stdout.includes("sharedFallback=sms,push,email"), "共享引用应证明 as const 不是深度 Runtime Freeze");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes('readonly ["email", "sms", "push"]'), "Channel readonly tuple 声明缺失");
assert(declaration.includes("type DeliveryChannel = (typeof DELIVERY_CHANNELS)[number]"), "Channel Union 派生声明缺失");
assert(declaration.includes('readonly defaultChannel: "email"'), "Object literal readonly 属性缺失");
assert(declaration.includes("readonly window: readonly [9, 18]"), "精确 readonly Tuple 声明缺失");
assert(declaration.includes("readonly fallback: string[]"), "共享引用应保留可变数组元素类型");

console.log("✓ KP018 验证通过：Literal Union、as const、Widening 与 Runtime Freeze 边界已形成证据链。");
