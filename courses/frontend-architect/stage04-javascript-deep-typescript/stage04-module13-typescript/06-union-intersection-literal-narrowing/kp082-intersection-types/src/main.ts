type Identifiable = {
  id: number;
};

type Named = {
  name: string;
};

type Priced = {
  price: number;
};

type ProductSummary = Identifiable & Named & Priced;

function formatProduct(product: ProductSummary): string {
  return `${product.id}:${product.name}:${product.price.toFixed(2)}`;
}

const product: ProductSummary = {
  id: 101,
  name: 'Keyboard',
  price: 499
};

console.log(formatProduct(product));
