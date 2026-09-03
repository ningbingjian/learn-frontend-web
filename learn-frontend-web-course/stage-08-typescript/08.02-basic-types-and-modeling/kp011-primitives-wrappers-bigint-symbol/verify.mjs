import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("primitiveType=string"), "Primitive Runtime 类型不正确");
assert(runtime.stdout.includes("wrapperType=object"), "Wrapper Runtime 类型不正确");
assert(runtime.stdout.includes("bigintJsonFailure=TypeError"), "BigInt JSON 故障未复现");
assert(runtime.stdout.includes('bigintJson={"budget":"900719925474099312345"}'), "BigInt 序列化策略不正确");
assert(runtime.stdout.includes("service=production:registry-ready"), "unique symbol Registry 失败");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("CONFIG_TOKEN: unique symbol"), "unique symbol 声明丢失");
assert(declaration.includes("class ServiceRegistry"), "Registry 声明缺失");

console.log("✓ KP011 验证通过：Primitive、Wrapper、bigint 与 unique symbol 的静态和 Runtime 边界均已验证。" );
