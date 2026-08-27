const unitPrice: number = 499.5;
const quantity = 2;
const discountRate: number = 0.1;

function calculateTotal(price: number, count: number, discount: number): number {
  return price * count * (1 - discount);
}

const total = calculateTotal(unitPrice, quantity, discountRate);

console.log(total.toFixed(2));
console.log(typeof total);
