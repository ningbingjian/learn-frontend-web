const inventory: {
  [sku: string]: number;
} = {
  keyboard: 10,
  mouse: 20
};

inventory.monitor = 5;

function totalStock(stock: { [sku: string]: number }): number {
  return Object.values(stock).reduce((total, value) => total + value, 0);
}

console.log(inventory.keyboard);
console.log(inventory.monitor);
console.log(totalStock(inventory));
