type ProductId = number;

type Product = {
  id: ProductId;
  name: string;
  price: number;
};

function formatProduct(product: Product): string {
  return `${product.id}:${product.name.toUpperCase()}:¥${product.price.toFixed(2)}`;
}

const product: Product = {
  id: 101,
  name: 'Keyboard',
  price: 499
};

console.log(formatProduct(product));
console.log(typeof product.id);
