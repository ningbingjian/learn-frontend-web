function forEachProduct(
  products: string[],
  callback: (product: string, index: number) => void
): void {
  for (let index = 0; index < products.length; index += 1) {
    callback(products[index], index);
  }
}

forEachProduct(['Keyboard', 'Mouse'], (product) => {
  console.log(product.toUpperCase());
});

forEachProduct(['Keyboard', 'Mouse'], (product, index) => {
  console.log(`${index}:${product}`);
});
