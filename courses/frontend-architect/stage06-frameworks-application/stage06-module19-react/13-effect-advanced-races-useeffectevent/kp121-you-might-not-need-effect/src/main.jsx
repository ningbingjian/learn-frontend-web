import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const products = [
  { id: 1, name: 'Mechanical Keyboard', inStock: true },
  { id: 2, name: '4K Monitor', inStock: false },
  { id: 3, name: 'USB-C Dock', inStock: true },
  { id: 4, name: 'Studio Microphone', inStock: true },
];

function ProductSearch() {
  const [query, setQuery] = useState('');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleProducts = products.filter(product => {
    const matchesQuery = product.name.toLowerCase().includes(normalizedQuery);
    const matchesStock = !showInStockOnly || product.inStock;
    return matchesQuery && matchesStock;
  });

  return (
    <main>
      <h1>You Might Not Need an Effect</h1>
      <label>
        搜索：
        <input value={query} onChange={event => setQuery(event.target.value)} />
      </label>
      <label>
        <input
          type="checkbox"
          checked={showInStockOnly}
          onChange={event => setShowInStockOnly(event.target.checked)}
        />
        仅显示有库存
      </label>

      <p>结果数量：{visibleProducts.length}</p>
      <ul>
        {visibleProducts.map(product => (
          <li key={product.id}>
            {product.name} — {product.inStock ? '有库存' : '缺货'}
          </li>
        ))}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductSearch />
  </StrictMode>,
);
