type DeliveryChannel = "email" | "sms";

interface DeliveryRequest {
  recipient: string;
  channel: DeliveryChannel;
  attempts: number;
}

// 负向类型测试：错误数据必须被 TypeScript 阻止。
const invalidRequest: DeliveryRequest = {
  recipient: "team@example.com",
  channel: "email",
  // @ts-expect-error -- attempts 必须是 number，不能是 string
  attempts: "3"
};

// @ts-expect-error -- push 不是允许的 DeliveryChannel
const invalidChannel: DeliveryChannel = "push";

void invalidRequest;
void invalidChannel;
