interface Product {
  id: number;
  name: string;
}

interface ProductConstructor {
  new (id: number, name: string): Product;
}

class ProductModel implements Product {
  constructor(
    public id: number,
    public name: string
  ) {}
}

function createProduct(
  Constructor: ProductConstructor,
  id: number,
  name: string
): Product {
  return new Constructor(id, name);
}

const product = createProduct(ProductModel, 101, 'Keyboard');
console.log(`${product.id}:${product.name.toUpperCase()}`);
