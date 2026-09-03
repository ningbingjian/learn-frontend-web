import {
  CHANNEL_POLICY,
  DELIVERY_CHANNELS,
  JOB_STATUS,
  preciseSchedule,
  scheduleLabel,
  type DeliveryChannel,
  type MutableSchedule
} from "./index.js";

// @ts-expect-error -- fax 不属于由常量数据派生的 DeliveryChannel。
const invalidChannel: DeliveryChannel = "fax";
void invalidChannel;

// @ts-expect-error -- as const 让数组成为 readonly tuple。
DELIVERY_CHANNELS.push("fax");

// @ts-expect-error -- as const 让对象属性保持 readonly literal。
CHANNEL_POLICY.defaultChannel = "sms";

// @ts-expect-error -- 嵌套数组字面量被推断为 readonly tuple。
CHANNEL_POLICY.fallback[0] = "email";

const looseConfig = { channel: "email" };
// @ts-expect-error -- 可变对象属性发生 widening，looseConfig.channel 是 string。
scheduleLabel(looseConfig.channel, JOB_STATUS.Draft);

const invalidSchedule: MutableSchedule = {
  channel: preciseSchedule.channel,
  status: preciseSchedule.status,
  // @ts-expect-error -- readonly tuple 不能直接赋给要求可变 tuple 的字段。
  window: preciseSchedule.window
};
void invalidSchedule;

let dynamicChannel = "email";
// @ts-expect-error -- const assertion 只能直接作用于受支持的字面量表达式。
const invalidConstAssertion = dynamicChannel as const;
void invalidConstAssertion;
