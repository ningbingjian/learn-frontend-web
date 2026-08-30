import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const products = [
  { id: 1, name: 'React Handbook' },
  { id: 2, name: 'JavaScript Guide' },
  { id: 3, name: 'CSS Architecture' },
];

function App() {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const visibleProducts = products.filter(product =>
    product.name.toLowerCase().includes(normalizedQuery),
  );
  const visibleCount = visibleProducts.length;

  useEffect(() => {
    document.title = `找到 ${visibleCount} 项：${query || '全部'}`;
  }, [query, visibleCount]);

  return (
    <main>
      <h1>Effect 与 Render 的区别</h1>
      <label>
        搜索：
        <input value={query} onChange={event => setQuery(event.target.value)} />
      </label>
      <p>匹配数量：{visibleCount}</p>
      <ul>
        {visibleProducts.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <p>列表是 Render 派生值；浏览器标题才由 Effect 同步。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
