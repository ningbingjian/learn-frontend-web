type Product = {
  id: number;
  name: string;
};

const rawValue: unknown = {
  id: 101,
  name: 'Keyboard'
};

const product = <Product>rawValue;

console.log(`${product.id}:${product.name.toUpperCase()}`);
console.log('angle-bracket assertion works in .ts');
