const rawProductId = '101';
const assertedProductId = rawProductId as unknown as number;

console.log(typeof assertedProductId);
console.log(assertedProductId + 1);
