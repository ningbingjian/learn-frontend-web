function formatProduct(product: { id: number; name: string; price: number }): string {
  return `${product.id}:${product.name.toUpperCase()}:¥${product.price.toFixed(2)}`;
}

const product = {
  id: 101,
  name: 'Keyboard',
  price: 499
};

console.log(formatProduct(product));
