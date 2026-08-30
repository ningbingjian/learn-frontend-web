function calculatePrice(
  unitPrice: number,
  quantity: number = 1,
  discountRate: number = 0
): number {
  return unitPrice * quantity * (1 - discountRate);
}

console.log(calculatePrice(499).toFixed(2));
console.log(calculatePrice(499, 2).toFixed(2));
console.log(calculatePrice(499, 2, 0.1).toFixed(2));
console.log(calculatePrice(499, undefined, 0.1).toFixed(2));
