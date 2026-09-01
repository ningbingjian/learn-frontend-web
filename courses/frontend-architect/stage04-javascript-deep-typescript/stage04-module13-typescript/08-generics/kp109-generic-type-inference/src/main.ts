function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}

const firstName = first(['Keyboard', 'Mouse']);
const firstPrice = first([499, 199]);

if (firstName !== undefined) {
  console.log(firstName.toUpperCase());
}

if (firstPrice !== undefined) {
  console.log(firstPrice.toFixed(2));
}
