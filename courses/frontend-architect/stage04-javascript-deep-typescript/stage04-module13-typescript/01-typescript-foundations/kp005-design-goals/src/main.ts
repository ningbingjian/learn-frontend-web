function discountedPrice(
  price: number,
  discountPercent: number
): number {
  return price * (1 - discountPercent / 100);
}

console.log('正常折扣:', discountedPrice(200, 20));
console.log('业务可疑:', discountedPrice(200, 150));
