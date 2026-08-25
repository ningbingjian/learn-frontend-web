type ProductId = string;

interface Product {
  id: ProductId;
  price: number;
}

function formatProduct(product: Product): string {
  return `${product.id}: ¥${product.price.toFixed(2)}`;
}

const product: Product = {
  id: 'keyboard-001',
  price: 499
};

console.log(formatProduct(product));
