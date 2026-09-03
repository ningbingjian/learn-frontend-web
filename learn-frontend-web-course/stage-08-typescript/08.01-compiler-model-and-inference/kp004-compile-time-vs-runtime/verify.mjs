import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const safe = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(safe.status === 0, `安全主线运行失败：${safe.stderr}`);
const lines = safe.stdout.trim().split(/\r?\n/);
assert(
  lines[0] === "accepted:event=evt-42,status=delivered,attempts=2",
  `合法数据结果错误：${lines[0]}`
);
assert(
  lines[1] === "rejected:payload.attempts must be a finite number >= 0",
  `非法数据没有被拒绝：${lines[1]}`
);

const unsafe = spawnSync(process.execPath, ["unsafe-boundary.mjs"], { encoding: "utf8" });
assert(unsafe.status !== 0, "不安全基线应当在运行时失败");
assert(unsafe.stderr.includes("toUpperCase"), "应当观察到错误字段导致的 TypeError");

const emitted = readFileSync("dist/index.js", "utf8");
assert(!emitted.includes("interface DeliveryEvent"), "interface 不应存在于运行时代码");
assert(emitted.includes("typeof input.eventId"), "Runtime Guard 必须保留在 JavaScript 中");

console.log("✓ KP004 验证通过：静态类型已擦除，Runtime Guard 才能验证外部数据。" );
