import {
  readonlyView,
  renameFirstSegment,
  snapshot,
  type SegmentInput,
  type SegmentView
} from "./index.js";

// @ts-expect-error -- ReadonlyArray 没有 push。
readonlyView.push({ id: "SEG-X", name: "X", weight: 1 });

// @ts-expect-error -- ReadonlyArray 不允许替换索引位置。
readonlyView[0] = { id: "SEG-X", name: "X", weight: 1 };

// @ts-expect-error -- 需要可变数组的函数不能接收 readonly 数组。
renameFirstSegment(readonlyView, "Unsafe rename");

// @ts-expect-error -- Snapshot 的元素属性也被建模为 readonly。
snapshot.segments[0]!.name = "Mutated snapshot";

// @ts-expect-error -- readonly SegmentView[] 不能赋给可变 SegmentInput[]。
const mutableSegments: SegmentInput[] = snapshot.segments;
void mutableSegments;

const mutableElement: SegmentInput = { id: "SEG-M", name: "Mutable", weight: 1 };
const readonlyElement: SegmentView = mutableElement;
void readonlyElement;
