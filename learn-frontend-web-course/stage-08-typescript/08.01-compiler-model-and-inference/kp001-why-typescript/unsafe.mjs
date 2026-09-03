function createDeliverySummary(request) {
  return `${request.recipient} / ${request.channel} / attempts=${request.attempts.toFixed(0)}`;
}

const requestFromJavaScript = {
  recipient: "team@example.com",
  channel: "email",
  attempts: "3"
};

console.log(createDeliverySummary(requestFromJavaScript));
