export const WORKFLOW_STATUS = {
  Draft: "draft",
  Queued: "queued",
  Running: "running",
  Completed: "completed"
} as const;

export type WorkflowStatus =
  (typeof WORKFLOW_STATUS)[keyof typeof WORKFLOW_STATUS];

export enum ApiMode {
  Sandbox = "sandbox",
  Live = "live"
}

export enum NumericPhase {
  Draft,
  Ready,
  Done
}

export const enum RetryBudget {
  Low = 1,
  Normal = 3,
  High = 5
}

export const STATUS_LABEL: Record<WorkflowStatus, string> = {
  draft: "草稿",
  queued: "排队中",
  running: "执行中",
  completed: "已完成"
};

export function describeStatus(status: WorkflowStatus): string {
  return `${status}:${STATUS_LABEL[status]}`;
}

export function isWorkflowStatus(value: string): value is WorkflowStatus {
  return (Object.values(WORKFLOW_STATUS) as readonly string[]).includes(value);
}

export function canRetry(
  budget: RetryBudget,
  attempts: number
): boolean {
  return attempts < budget;
}

const parsed = ["queued", "paused"].map((value) =>
  isWorkflowStatus(value) ? describeStatus(value) : `invalid:${value}`
);

console.log("ENUM_DECISION");
console.log(`objectValues=${Object.values(WORKFLOW_STATUS).join(",")}`);
console.log(`stringEnum=${ApiMode.Live}:${Object.keys(ApiMode).length}`);
console.log(`numericEnum=${NumericPhase.Ready}:${NumericPhase[NumericPhase.Ready]}`);
console.log(`constEnum=${RetryBudget.Normal}:${canRetry(RetryBudget.Normal, 2)}`);
console.log(`parsed=${parsed.join("|")}`);
