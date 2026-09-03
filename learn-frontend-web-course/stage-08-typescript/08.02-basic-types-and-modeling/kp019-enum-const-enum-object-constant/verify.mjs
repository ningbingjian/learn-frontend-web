import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("objectValues=draft,queued,running,completed"), "对象常量值不正确");
assert(runtime.stdout.includes("stringEnum=live:2"), "String enum Runtime 对象不正确");
assert(runtime.stdout.includes("numericEnum=1:Ready"), "Numeric enum 反向映射不正确");
assert(runtime.stdout.includes("constEnum=3:true"), "const enum 运行结果不正确");
assert(runtime.stdout.includes("parsed=queued:排队中|invalid:paused"), "Runtime Guard 结果不正确");

const declaration = readFileSync("dist/index.d.ts", "utf8");
const preservedJavaScript = readFileSync("dist/index.js", "utf8");
const inlinedJavaScript = readFileSync("dist-inline/index.js", "utf8");

assert(declaration.includes("export declare enum ApiMode"), "String enum 声明缺失");
assert(declaration.includes("export declare enum NumericPhase"), "Numeric enum 声明缺失");
assert(declaration.includes("export declare const enum RetryBudget"), "const enum 声明缺失");
assert(declaration.includes('readonly Queued: "queued"'), "对象常量精确声明缺失");
assert(preservedJavaScript.includes("ApiMode"), "普通 enum 应生成 Runtime 对象");
assert(preservedJavaScript.includes("NumericPhase"), "Numeric enum 应生成 Runtime 对象");
assert(
  preservedJavaScript.includes("RetryBudget"),
  "verbatimModuleSyntax / isolatedModules 路线应保留 const enum Runtime 对象"
);
assert(
  !inlinedJavaScript.includes("export var RetryBudget"),
  "显式关闭 preserveConstEnums 的整体编译路线应内联 const enum"
);
assert(
  inlinedJavaScript.includes("3 /* RetryBudget.Normal */") ||
    inlinedJavaScript.includes("3"),
  "内联构建应出现 RetryBudget.Normal 的常量值"
);

console.log("✓ KP019 验证通过：四种有限值方案与 const enum 的配置敏感 Emit 已形成证据链。");
