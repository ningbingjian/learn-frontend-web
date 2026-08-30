type ProductRow = [id: number, name: string, price: number];

function formatRow(row: ProductRow): string {
  const [id, name, price] = row;
  return `${id}:${name.toUpperCase()}:¥${price.toFixed(2)}`;
}

const row: ProductRow = [101, 'Keyboard', 499];
const [productId, productName, productPrice] = row;

console.log(formatRow(row));
console.log(`${productId}/${productName}/${productPrice}`);
