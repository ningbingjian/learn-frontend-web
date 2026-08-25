type Product = {
  name: string;
  price: number;
};

const rawJson = '{"name":"Keyboard","price":"199"}';
const candidate: unknown = JSON.parse(rawJson);

const isValidProduct =
  typeof candidate === 'object' &&
  candidate !== null &&
  'name' in candidate &&
  'price' in candidate &&
  typeof candidate.name === 'string' &&
  typeof candidate.price === 'number';

if (isValidProduct) {
  const product: Product = candidate;
  console.log(`${product.name}: ¥${product.price.toFixed(2)}`);
} else {
  console.log('runtime validation rejected invalid product');
}
