import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function createInitialCatalog() {
  console.log('createInitialCatalog called');

  return Array.from({ length: 2000 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`
  }));
}

function App() {
  const [catalog] = useState(createInitialCatalog);
  const [query, setQuery] = useState('');

  const visibleItems = catalog
    .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);

  return (
    <main>
      <h1>惰性初始化</h1>
      <p>Catalog size：{catalog.length}</p>
      <label>
        搜索
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </label>
      <ul>
        {visibleItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <p>打开 Console，观察 initializer 与普通重新 Render 的区别。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
