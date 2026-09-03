import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(runtime.stdout.includes("draft=Changed through readonly element:3"), "共享别名实验不正确");
assert(runtime.stdout.includes("readonlyView=Changed through readonly element:3"), "Readonly View 应观察到别名变化");
assert(runtime.stdout.includes("snapshot=New households:2"), "防御性复制 Snapshot 不应被源数据污染");
assert(runtime.stdout.includes("extended=New households,Returning viewers,Premium viewers"), "非破坏性追加结果不正确");
assert(runtime.stdout.includes("summary=New households@60|Returning viewers@40"), "只读输入汇总不正确");

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("readonly segments: readonly SegmentView[]"), "Snapshot 应暴露双层只读集合");
assert(declaration.includes("summarizeSegments(segments: readonly SegmentView[]): string"), "读取函数应接收 readonly 数组");
assert(declaration.includes("appendSegment(segments: readonly SegmentView[]"), "非破坏性追加函数签名缺失");

console.log("✓ KP016 验证通过：ReadonlyArray、共享引用、元素可变性与防御性复制已形成完整对照。");
