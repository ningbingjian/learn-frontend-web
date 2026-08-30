interface Entity {
  id: number;
}

interface Product extends Entity {
  name: string;
  price: number;
}

function formatProduct(product: Product): string {
  return `${product.id}:${product.name.toUpperCase()}:¥${product.price.toFixed(2)}`;
}

const product: Product = {
  id: 101,
  name: 'Keyboard',
  price: 499
};

console.log(formatProduct(product));
