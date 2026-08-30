function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

function buildReceipt(total: number): string {
  return `total=¥${total.toFixed(2)}`;
}

const total = calculateTotal(499, 2);
console.log(buildReceipt(total));
