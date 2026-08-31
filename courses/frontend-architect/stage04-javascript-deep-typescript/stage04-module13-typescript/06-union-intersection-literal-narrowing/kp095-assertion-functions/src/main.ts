type Product = {
  id: number;
  name: string;
};

function assertIsProduct(value: unknown): asserts value is Product {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('id' in value) ||
    typeof value.id !== 'number' ||
    !('name' in value) ||
    typeof value.name !== 'string'
  ) {
    throw new TypeError('Invalid product payload');
  }
}

const payload: unknown = {
  id: 101,
  name: 'Keyboard'
};

assertIsProduct(payload);

console.log(payload.id);
console.log(payload.name.toUpperCase());
