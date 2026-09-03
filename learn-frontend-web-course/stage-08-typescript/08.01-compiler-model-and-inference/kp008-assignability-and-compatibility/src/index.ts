export interface TaskSummary {
  id: string;
  title: string;
}

export interface TaskDetail extends TaskSummary {
  description: string;
  owner: string;
}

export const detailedTask: TaskDetail = {
  id: "TASK-101",
  title: "完成类型课程",
  description: "补齐静态证据、运行时证据和回归脚本",
  owner: "Ada"
};

export const summaryView: TaskSummary = detailedTask;

export function acceptSummary(task: TaskSummary): string {
  return `${task.id}:${task.title}`;
}

export type Equal<Left, Right> =
  (<T>() => T extends Left ? 1 : 2) extends
  (<T>() => T extends Right ? 1 : 2)
    ? (<T>() => T extends Right ? 1 : 2) extends
      (<T>() => T extends Left ? 1 : 2)
      ? true
      : false
    : false;

export type Assert<Condition extends true> = Condition;
export type SummaryMatchesObject = Assert<
  Equal<TaskSummary, { id: string; title: string }>
>;
export type DetailEqualsSummary = Equal<TaskDetail, TaskSummary>;

const accepted = acceptSummary(detailedTask);
const runtimeKeys = Object.keys(summaryView).join(",");

console.log("ASSIGNABILITY");
console.log(`accepted=${accepted}`);
console.log(`runtimeKeys=${runtimeKeys}`);
console.log(`sameReference=${summaryView === detailedTask}`);
