import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("annotated=prod:2"), "Annotated Config 输出不正确");
assert(runtime.stdout.includes("precise=prod:audit,metrics"), "Precise Config 输出不正确");
assert(runtime.stdout.includes("runtimeExtra=true:platform"), "变量中转后的 Runtime Extra 未保留");
assert(runtime.stdout.includes("staticView=prod:1"), "结构赋值后的静态视图不正确");
assert(runtime.stdout.includes("route=/jobs:true"), "Route Registry 输出不正确");
assert(runtime.stdout.includes("runtimeValidated=false"), "satisfies 不应替代 Runtime Validation");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("annotatedConfig: AppConfig"), "Annotation 应暴露目标类型");
assert(declaration.includes('readonly environment: "prod"'), "satisfies 应保留精确 literal");
assert(declaration.includes('readonly features: readonly ["audit", "metrics"]'), "as const 精确 tuple 缺失");
assert(declaration.includes('readonly owner: "platform"'), "变量中转的额外属性应保留在原对象类型中");
assert(declaration.includes("Record<RouteName, RouteDefinition>") || declaration.includes("readonly jobs"), "Route Registry 声明缺失");

console.log("✓ KP021 验证通过：Freshness、Excess Property Check、变量中转与 satisfies 的 Static/Runtime 边界已被验证。");
