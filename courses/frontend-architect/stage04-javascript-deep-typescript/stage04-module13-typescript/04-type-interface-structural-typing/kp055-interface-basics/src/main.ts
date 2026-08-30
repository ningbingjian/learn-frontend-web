interface Product {
  id: number;
  name: string;
  price: number;
}

function formatProduct(product: Product): string {
  return `${product.id}:${product.name.toUpperCase()}:¥${product.price.toFixed(2)}`;
}

const storedProduct = {
  id: 101,
  name: 'Keyboard',
  price: 499,
  stock: 20
};

console.log(formatProduct(storedProduct));
console.log(storedProduct.stock);
