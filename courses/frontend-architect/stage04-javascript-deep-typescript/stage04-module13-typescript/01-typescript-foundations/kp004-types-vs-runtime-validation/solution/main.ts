type Product = {
  name: string;
  price: number;
};

const rawJson = '{"name":"Keyboard","price":"199"}';
const candidate: unknown = JSON.parse(rawJson);

if (
  typeof candidate === 'object' &&
  candidate !== null &&
  'name' in candidate &&
  'price' in candidate &&
  typeof candidate.name === 'string' &&
  typeof candidate.price === 'number'
) {
  const product: Product = {
    name: candidate.name,
    price: candidate.price
  };
  console.log(`${product.name}: ¥${product.price.toFixed(2)}`);
} else {
  console.log('runtime validation rejected invalid product');
}
