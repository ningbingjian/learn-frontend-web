import type { Task, TaskFormatter } from "./index.js";

// @ts-expect-error -- 脱离任何目标位置后，参数 task 没有类型来源。
const detachedTitle = (task) => task.title;
void detachedTitle;

// @ts-expect-error -- Contextual return type 要求 string，不能返回 number。
const wrongReturn: TaskFormatter = (task) => task.title.length;
void wrongReturn;

// @ts-expect-error -- Task 中不存在 missing 属性。
const wrongMember: TaskFormatter = (task) => task.missing;
void wrongMember;

// 提取后的函数在稳定边界显式声明最小输入类型。
const repairedTitle = (task: Task): string => task.title;
void repairedTitle;
