import React from 'react';
import { createRoot } from 'react-dom/client';

const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 499 },
  { id: 2, name: 'Wireless Mouse', price: 299 },
  { id: 3, name: 'USB-C Dock', price: 699 },
];

function ProductList({ items, renderItem }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <main>
      <h1>Render Prop</h1>

      <h2>Compact</h2>
      <ProductList
        items={products}
        renderItem={(product, index) => (
          <span>{index + 1}. {product.name}</span>
        )}
      />

      <h2>Detailed</h2>
      <ProductList
        items={products}
        renderItem={(product) => (
          <strong>{product.name} · ¥{product.price}</strong>
        )}
      />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
