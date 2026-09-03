import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("CONTEXTUAL_TYPING"), "缺少课程标记");
assert(runtime.stdout.includes("open=2"), "开放任务数量不正确");
assert(runtime.stdout.includes("created=TASK-003:补充回归测试"), "处理器上下文结果不正确");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("contextualFormatter: TaskFormatter"), "目标函数类型未保留");
assert(declaration.includes("createProjectPredicate(projectId: string): TaskPredicate"), "返回边界不稳定");

console.log("✓ KP007 验证通过：赋值位置、调用位置和注册表都提供了可追踪的 Contextual Typing。" );
