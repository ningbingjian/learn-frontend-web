import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("scenarios=9"), "故障矩阵数量不正确");
assert(runtime.stdout.includes("first=CFG-001:configuration"), "Triage 排序不正确");
assert(runtime.stdout.includes("cascadeTotal=20"), "级联统计不正确");
assert(runtime.stdout.includes("event=TS2322:type mismatch"), "Build Event 解析失败");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("parseBuildEvent(input: unknown): BuildEvent | null"), "外部事件 unknown 边界缺失");

for (const file of ["TRIAGE_PLAYBOOK.md", "OBSERVATORY_REPORT.md"]) {
  const text = readFileSync(file, "utf8");
  assert(text.includes("Runtime"), `${file} 缺少 Runtime 证据说明`);
}

console.log("✓ KP010 验证通过：故障矩阵、Triage 顺序、Runtime Boundary 与诊断文档形成完整闭环。" );
