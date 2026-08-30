type Product = {
  name: string;
  price: number;
};

type ProductConstructor = {
  new (name: string, price: number): Product;
};

class ProductModel implements Product {
  constructor(
    public name: string,
    public price: number
  ) {}
}

function createProduct(
  Constructor: ProductConstructor,
  name: string,
  price: number
): Product {
  return new Constructor(name, price);
}

const product = createProduct(ProductModel, 'Keyboard', 499);

console.log(`${product.name}:${product.price.toFixed(2)}`);
console.log(ProductModel.name);
