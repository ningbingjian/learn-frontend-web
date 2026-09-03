interface DeliveryEvent {
  readonly eventId: string;
  readonly attempts: number;
}

const payload: unknown = JSON.parse('{"eventId":"evt-1","attempts":1}') as unknown;

// unknown 必须先缩窄，不能直接访问属性。
// @ts-expect-error -- payload 的运行时形状尚未被证明
payload.eventId;

// 静态类型不能把 unknown 自动当成业务对象。
// @ts-expect-error -- 需要 Runtime Validation
const event: DeliveryEvent = payload;

void event;
