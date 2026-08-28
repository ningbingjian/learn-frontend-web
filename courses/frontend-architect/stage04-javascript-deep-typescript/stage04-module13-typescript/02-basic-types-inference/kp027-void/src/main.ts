function logOrderCreated(orderId: number): void {
  console.log(`created order=${orderId}`);
}

const result = logOrderCreated(1001);

console.log(result);
console.log(typeof result);
