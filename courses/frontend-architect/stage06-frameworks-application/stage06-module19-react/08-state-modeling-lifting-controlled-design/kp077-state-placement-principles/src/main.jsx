import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const products = [
  { id: 1, name: 'Mechanical Keyboard' },
  { id: 2, name: 'Wireless Mouse' },
  { id: 3, name: '4K Monitor' },
];

function SearchBox({ query, onQueryChange }) {
  return (
    <label>
      搜索：{' '}
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </label>
  );
}

function ProductResults({ products: allProducts, query }) {
  const [expandedId, setExpandedId] = useState(null);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery),
  );

  return (
    <ul>
      {filteredProducts.map((product) => (
        <li key={product.id}>
          <button
            type="button"
            onClick={() =>
              setExpandedId(expandedId === product.id ? null : product.id)
            }
          >
            {product.name}
          </button>
          {expandedId === product.id && <span> — 商品 #{product.id}</span>}
        </li>
      ))}
    </ul>
  );
}

function ProductExplorer() {
  const [query, setQuery] = useState('');

  return (
    <section>
      <SearchBox query={query} onQueryChange={setQuery} />
      <ProductResults products={products} query={query} />
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>RE-KP077：状态放置原则</h1>
      <ProductExplorer />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
