export type JobStatus = "draft" | "queued" | "running" | "completed";

export let mutableStatus = "draft";
export const fixedStatus = "draft";

export const mutableJob = {
  status: "draft",
  channel: "email"
};

export const annotatedJob: { status: JobStatus; channel: "email" | "sms" } = {
  status: "draft",
  channel: "email"
};

export const frozenJob = {
  status: "queued",
  channel: "email",
  retries: [1, 2]
} as const;

export function acceptStatus(status: JobStatus): string {
  return `accepted:${status}`;
}

console.log(`mutable=${mutableStatus}; typeof=${typeof mutableStatus}`);
console.log(`fixed=${fixedStatus}; typeof=${typeof fixedStatus}`);
console.log(acceptStatus(annotatedJob.status));
console.log(`${frozenJob.status}/${frozenJob.channel}/retries=${frozenJob.retries.join(",")}`);
