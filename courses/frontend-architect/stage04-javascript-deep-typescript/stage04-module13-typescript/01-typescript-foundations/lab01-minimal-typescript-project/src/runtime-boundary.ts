function formatAmount(value: number): string {
  return `¥${value.toFixed(2)}`;
}

const payload = JSON.parse('{"amount":"499"}');
console.log(formatAmount(payload.amount));
