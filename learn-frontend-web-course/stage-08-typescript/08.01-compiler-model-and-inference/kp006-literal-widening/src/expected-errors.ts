import {
  acceptStatus,
  fixedStatus,
  frozenJob,
  mutableJob,
  mutableStatus
} from "./index.js";

acceptStatus(fixedStatus);

// let 绑定需要允许后续赋入其他字符串，因此初始字面量被扩大为 string。
// @ts-expect-error -- string 不能保证属于 JobStatus
acceptStatus(mutableStatus);

// 对象属性默认可变，所以 mutableJob.status 也扩大为 string。
// @ts-expect-error -- mutableJob.status 的类型是 string
acceptStatus(mutableJob.status);

// as const 同时保留字面量并把属性设为 readonly。
// @ts-expect-error -- frozenJob.status 是只读属性
frozenJob.status = "running";

// @ts-expect-error -- readonly tuple 不能 push
frozenJob.retries.push(3);
