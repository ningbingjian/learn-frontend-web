export interface Task {
  id: string;
  projectId: string;
  title: string;
  done: boolean;
  priority: "low" | "high";
}

export type TaskFormatter = (task: Task, index: number) => string;
export type TaskPredicate = (task: Task) => boolean;

export const tasks: readonly Task[] = [
  {
    id: "TASK-001",
    projectId: "PAY",
    title: "修复支付回调",
    done: false,
    priority: "high"
  },
  {
    id: "TASK-002",
    projectId: "OPS",
    title: "清理历史日志",
    done: true,
    priority: "low"
  },
  {
    id: "TASK-004",
    projectId: "PAY",
    title: "补充告警指标",
    done: false,
    priority: "high"
  }
];

export const contextualFormatter: TaskFormatter = (task, index) =>
  `${index + 1}. [${task.priority}] ${task.id} ${task.title}`;

export const openTaskLabels = tasks
  .filter((task) => !task.done)
  .map((task, index) => contextualFormatter(task, index));

export function createProjectPredicate(projectId: string): TaskPredicate {
  return (task) => task.projectId === projectId;
}

export interface CreateCommand {
  id: string;
  title: string;
}

export type CommandHandler = (command: CreateCommand) => string;
export type CommandHandlerMap = {
  create: CommandHandler;
  preview: CommandHandler;
};

export const commandHandlers: CommandHandlerMap = {
  create: (command) => `${command.id}:${command.title}`,
  preview: (command) => `[preview] ${command.title}`
};

const paymentTasks = tasks.filter(createProjectPredicate("PAY"));
const created = commandHandlers.create({
  id: "TASK-003",
  title: "补充回归测试"
});

console.log("CONTEXTUAL_TYPING");
console.log(`open=${openTaskLabels.length}`);
console.log(`first=${openTaskLabels[0] ?? "none"}`);
console.log(`created=${created}`);

export const paymentTaskCount = paymentTasks.length;
