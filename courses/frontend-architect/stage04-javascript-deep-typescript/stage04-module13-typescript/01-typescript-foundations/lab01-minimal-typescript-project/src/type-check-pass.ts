type Product = {
  name: string;
  price: number;
};

function formatProduct(product: Product): string {
  return `${product.name}: ¥${product.price.toFixed(2)}`;
}

const product: Product = {
  name: 'Mechanical Keyboard',
  price: 499
};

console.log(formatProduct(product));
