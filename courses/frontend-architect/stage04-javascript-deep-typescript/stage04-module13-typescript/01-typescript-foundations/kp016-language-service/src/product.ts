export type Product = {
  id: number;
  name: string;
  price: number;
};

export function formatProduct(product: Product): string {
  return `${product.name}: ¥${product.price.toFixed(2)}`;
}
