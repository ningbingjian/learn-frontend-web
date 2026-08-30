type ProductId = string | number;

function normalizeProductId(id: ProductId): string {
  if (typeof id === 'number') {
    return `#${id.toFixed(0)}`;
  }

  return id.toUpperCase();
}

console.log(normalizeProductId(101));
console.log(normalizeProductId('kb-001'));
