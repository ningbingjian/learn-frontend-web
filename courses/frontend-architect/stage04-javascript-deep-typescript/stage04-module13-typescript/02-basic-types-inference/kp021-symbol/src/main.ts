const productIdKey: unique symbol = Symbol('productId');
const fallbackKey: symbol = Symbol('productId');

const product = {
  name: 'Mechanical Keyboard',
  [productIdKey]: 'product-001'
};

function readProductId(value: { [productIdKey]: string }): string {
  return value[productIdKey];
}

console.log(readProductId(product));
console.log(productIdKey === fallbackKey);
console.log(typeof productIdKey);
