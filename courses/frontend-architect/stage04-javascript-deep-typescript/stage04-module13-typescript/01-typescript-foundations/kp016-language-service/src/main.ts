import { formatProduct, type Product } from './product';

const product: Product = {
  id: 1,
  name: 'Keyboard',
  price: 499
};

console.log(formatProduct(product));
