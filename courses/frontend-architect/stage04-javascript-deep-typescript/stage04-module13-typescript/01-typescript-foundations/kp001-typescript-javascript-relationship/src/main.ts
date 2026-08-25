const productName = 'Mechanical Keyboard';
const price = 499;

function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}

const label = `${productName}: ${formatPrice(price)}`;

console.log(label);
