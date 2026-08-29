const product: [number, string, boolean] = [101, 'Keyboard', true];

function formatProduct(value: [number, string, boolean]): string {
  const [id, name, active] = value;
  return `${id}:${name.toUpperCase()}:${active ? 'active' : 'inactive'}`;
}

console.log(formatProduct(product));
console.log(product[0].toFixed(0));
console.log(product[1].toUpperCase());
console.log(Array.isArray(product));
