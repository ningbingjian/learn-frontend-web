import type {
  Assert,
  Equal,
  TaskDetail,
  TaskSummary
} from "./index.js";

const summaryOnly: TaskSummary = {
  id: "TASK-201",
  title: "只有摘要"
};

// @ts-expect-error -- Summary 缺少 Detail 要求的 description 和 owner。
const detailFromSummary: TaskDetail = summaryOnly;
void detailFromSummary;

// @ts-expect-error -- 字符串宽类型不能赋给更窄的字面量类型。
const completed: "completed" = "draft";
void completed;

// @ts-expect-error -- 这两个类型并不相等。
type MustBeEqual = Assert<Equal<TaskSummary, TaskDetail>>;

// 新鲜对象字面量仍会检查多余字段。
// @ts-expect-error -- extra 不属于 TaskSummary。
const freshObject: TaskSummary = { id: "1", title: "x", extra: true };
void freshObject;
