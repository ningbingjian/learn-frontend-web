type ProductAlias = {
  readonly id: number;
  name: string;
};

interface ProductInterface {
  readonly id: number;
  name: string;
}

function formatAlias(product: ProductAlias): string {
  return `${product.id}:${product.name.toUpperCase()}`;
}

function formatInterface(product: ProductInterface): string {
  return `${product.id}:${product.name.toUpperCase()}`;
}

const storedProduct = {
  id: 101,
  name: 'Keyboard',
  stock: 20
};

const asAlias: ProductAlias = storedProduct;
const asInterface: ProductInterface = storedProduct;

console.log(formatAlias(asAlias));
console.log(formatInterface(asInterface));
console.log(asAlias.name === asInterface.name);
