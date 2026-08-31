type Product = {
  id: number;
  name: string;
  price: number;
};

const rawValue: unknown = {
  id: 101,
  name: 'Keyboard',
  price: 499
};

const product = rawValue as Product;

console.log(`${product.id}:${product.name.toUpperCase()}`);
console.log(product.price.toFixed(2));
