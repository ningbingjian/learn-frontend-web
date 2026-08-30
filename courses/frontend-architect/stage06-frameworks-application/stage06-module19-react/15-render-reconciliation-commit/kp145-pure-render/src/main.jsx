import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const products = [
  { id: 1, name: 'Keyboard', category: 'hardware' },
  { id: 2, name: 'Mouse', category: 'hardware' },
  { id: 3, name: 'React Guide', category: 'book' },
];

function ProductList({ category }) {
  const visibleProducts = category === 'all'
    ? products
    : products.filter(product => product.category === category);

  const rows = [];
  for (const product of visibleProducts) {
    rows.push(<li key={product.id}>{product.name}</li>);
  }

  return <ul>{rows}</ul>;
}

function App() {
  const [category, setCategory] = useState('all');

  return (
    <main>
      <h1>RE-KP145：Pure Render</h1>
      <p>
        {['all', 'hardware', 'book'].map(value => (
          <button key={value} onClick={() => setCategory(value)}>
            {value}
          </button>
        ))}
      </p>
      <p>当前分类：{category}</p>
      <ProductList category={category} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
