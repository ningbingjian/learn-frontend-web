function calculateTotal(price: number, quantity: number) {
  return price * quantity;
}

function buildLabel(name: string, price: number) {
  return `${name}: ¥${price.toFixed(2)}`;
}

function logOrder(id: number) {
  console.log(`order=${id}`);
}

const total = calculateTotal(199.5, 2);
const label = buildLabel('Keyboard', total);
const logResult = logOrder(1001);

console.log(label);
console.log(typeof total);
console.log(typeof logResult);
