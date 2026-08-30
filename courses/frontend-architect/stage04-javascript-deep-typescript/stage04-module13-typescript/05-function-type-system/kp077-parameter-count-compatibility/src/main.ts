const products = ['Keyboard', 'Mouse'];

type ProductVisitor = (
  product: string,
  index: number,
  allProducts: string[]
) => void;

function visitProducts(items: string[], visitor: ProductVisitor): void {
  items.forEach((item, index) => visitor(item, index, items));
}

const printName = (product: string): void => {
  console.log(product.toUpperCase());
};

visitProducts(products, printName);
visitProducts(products, (product, index) => {
  console.log(`${index}:${product}`);
});
