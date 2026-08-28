import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const products = [
  { id: 1, name: 'Keyboard', price: 99 },
  { id: 2, name: 'Mouse', price: 49 },
  { id: 3, name: 'Monitor', price: 299 }
];

function ProductList({ products, selectedId, onSelect }) {
  return (
    <div>
      {products.map(product => (
        <button
          key={product.id}
          onClick={() => onSelect(product.id)}
          disabled={product.id === selectedId}
        >
          {product.name}
        </button>
      ))}
    </div>
  );
}

function ProductDetails({ product }) {
  return (
    <section>
      <h2>商品详情</h2>
      <p>{product.name}</p>
      <p>${product.price}</p>
    </section>
  );
}

function CheckoutSummary({ product }) {
  return <p>结算摘要：{product.name} / ${product.price}</p>;
}

function App() {
  const [selectedId, setSelectedId] = useState(products[0].id);
  const selectedProduct = products.find(product => product.id === selectedId);

  return (
    <main>
      <h1>RE-KP071：Single Source of Truth</h1>
      <ProductList
        products={products}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <ProductDetails product={selectedProduct} />
      <CheckoutSummary product={selectedProduct} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
