type LegacyProduct = {
  id: string | number;
  name?: string;
  price: string | number;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

function normalizeProduct(input: LegacyProduct): Product {
  return {
    id: Number(input.id),
    name: input.name ?? 'Unnamed product',
    price: Number(input.price)
  };
}

const legacyProduct: LegacyProduct = {
  id: '42',
  name: 'Mechanical Keyboard',
  price: '499'
};

console.log(normalizeProduct(legacyProduct));
