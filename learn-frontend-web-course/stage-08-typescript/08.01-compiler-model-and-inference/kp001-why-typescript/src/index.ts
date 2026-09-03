type DeliveryChannel = "email" | "sms";

interface DeliveryRequest {
  recipient: string;
  channel: DeliveryChannel;
  attempts: number;
}

function createDeliverySummary(request: DeliveryRequest): string {
  return `${request.recipient} / ${request.channel} / attempts=${request.attempts.toFixed(0)}`;
}

const request: DeliveryRequest = {
  recipient: "team@example.com",
  channel: "email",
  attempts: 3
};

console.log(createDeliverySummary(request));
