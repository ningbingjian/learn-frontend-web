export const DELIVERY_CHANNELS = ["email", "sms", "push"] as const;
export type DeliveryChannel = (typeof DELIVERY_CHANNELS)[number];

export const JOB_STATUS = {
  Draft: "draft",
  Queued: "queued",
  Running: "running",
  Completed: "completed"
} as const;
export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];

export const CHANNEL_POLICY = {
  defaultChannel: "email",
  fallback: ["sms", "push"],
  retryWindows: [5, 15, 30]
} as const;

export const sharedFallback: string[] = ["sms", "push"];
export const POLICY_WITH_SHARED_REFERENCE = {
  defaultChannel: "email",
  fallback: sharedFallback
} as const;

export interface MutableSchedule {
  channel: DeliveryChannel;
  status: JobStatus;
  window: [startHour: number, endHour: number];
}

export function scheduleLabel(
  channel: DeliveryChannel,
  status: JobStatus
): string {
  return `${channel}:${status}`;
}

export function isDeliveryChannel(value: string): value is DeliveryChannel {
  return (DELIVERY_CHANNELS as readonly string[]).includes(value);
}

export function parseChannel(value: string): DeliveryChannel | undefined {
  return isDeliveryChannel(value) ? value : undefined;
}

export const preciseSchedule = {
  channel: "email",
  status: JOB_STATUS.Queued,
  window: [9, 18]
} as const;

export const mutableSchedule: MutableSchedule = {
  channel: preciseSchedule.channel,
  status: preciseSchedule.status,
  window: [...preciseSchedule.window]
};

// as const 不能冻结通过变量引用进来的数组；别名修改仍然可见。
sharedFallback.push("email");

console.log("LITERAL_AS_CONST");
console.log(`channels=${DELIVERY_CHANNELS.join(",")}`);
console.log(`status=${Object.values(JOB_STATUS).join(",")}`);
console.log(`label=${scheduleLabel(preciseSchedule.channel, preciseSchedule.status)}`);
console.log(`parsed=${parseChannel("sms") ?? "invalid"}:${parseChannel("fax") ?? "invalid"}`);
console.log(`window=${mutableSchedule.window.join("-")}`);
console.log(`policyFrozen=${Object.isFrozen(CHANNEL_POLICY)}`);
console.log(`sharedFallback=${POLICY_WITH_SHARED_REFERENCE.fallback.join(",")}`);
