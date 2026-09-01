function identity<T>(value: T): T {
  return value;
}

const productName = identity('Keyboard');
const price = identity(499);

console.log(productName.toUpperCase());
console.log(price.toFixed(2));
