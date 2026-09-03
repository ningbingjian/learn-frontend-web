import {
  ApiMode,
  WORKFLOW_STATUS,
  type RetryBudget,
  type WorkflowStatus
} from "./index.js";

// @ts-expect-error -- Literal Union 只接受已声明的工作流状态。
const invalidStatus: WorkflowStatus = "paused";
void invalidStatus;

// String enum 不是普通字符串联合，原始字符串不能直接赋给 enum。
// @ts-expect-error -- "live" 不是 ApiMode 成员值的类型身份。
const rawMode: ApiMode = "live";
void rawMode;

// @ts-expect-error -- as const 对象常量的属性是 readonly。
WORKFLOW_STATUS.Queued = "waiting";

// @ts-expect-error -- RetryBudget 只允许 1、3、5 三个成员值。
const invalidBudget: RetryBudget = 2;
void invalidBudget;

function acceptMode(mode: ApiMode): ApiMode {
  return mode;
}

// @ts-expect-error -- Consumer 必须显式使用 ApiMode.Live。
acceptMode("live");
