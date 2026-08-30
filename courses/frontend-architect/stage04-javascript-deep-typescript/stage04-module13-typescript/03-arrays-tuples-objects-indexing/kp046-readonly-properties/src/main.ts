const product: {
  readonly id: number;
  name: string;
  metadata: { category: string };
} = {
  id: 101,
  name: 'Keyboard',
  metadata: { category: 'Input' }
};

product.name = 'Mechanical Keyboard';
product.metadata.category = 'Accessories';

console.log(`${product.id}:${product.name}:${product.metadata.category}`);
