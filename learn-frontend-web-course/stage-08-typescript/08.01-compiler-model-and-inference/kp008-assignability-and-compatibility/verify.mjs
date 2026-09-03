import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("runtimeKeys=id,title,description,owner"), "静态视图不应裁剪 Runtime 字段");
assert(runtime.stdout.includes("sameReference=true"), "赋值应保持同一对象引用");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("summaryView: TaskSummary"), "目标静态视图缺失");
assert(declaration.includes("DetailEqualsSummary = Equal<TaskDetail, TaskSummary>"), "类型相等探针缺失");

console.log("✓ KP008 验证通过：单向可赋值、结构兼容和 Runtime 对象身份已被分别证明。" );
