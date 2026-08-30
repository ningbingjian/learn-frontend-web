interface Identifiable {
  id: number;
}

interface Timestamped {
  createdAt: string;
}

interface Product extends Identifiable, Timestamped {
  name: string;
  price: number;
}

const product: Product = {
  id: 101,
  createdAt: '2026-08-29',
  name: 'Keyboard',
  price: 499
};

console.log(`${product.id}:${product.createdAt}:${product.name}`);
