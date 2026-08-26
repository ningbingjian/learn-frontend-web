import { createRoot } from 'react-dom/client';

function ProductCard({ label, product, currency }) {
  const formattedPrice = `${currency}${product.price.toFixed(2)}`;

  return (
    <article>
      <small>{label}</small>
      <h2>{product.name}</h2>
      <strong>{formattedPrice}</strong>
    </article>
  );
}

function App() {
  const baseProduct = {
    name: 'Mechanical Keyboard',
    price: 499,
  };

  const saleProduct = {
    ...baseProduct,
    price: 399,
  };

  return (
    <main>
      <h1>RE-KP021：Props 作为只读输入</h1>
      <ProductCard label="Base" product={baseProduct} currency="¥" />
      <ProductCard label="Sale" product={saleProduct} currency="¥" />
      <p>Original price is still: {baseProduct.price}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
