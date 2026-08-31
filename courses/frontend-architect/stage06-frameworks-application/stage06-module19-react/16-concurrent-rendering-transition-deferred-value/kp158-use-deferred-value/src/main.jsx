import { StrictMode, useDeferredValue, useState } from 'react';
import { createRoot } from 'react-dom/client';

const PRODUCTS = Array.from({ length: 6000 }, (_, index) => `React Product ${index + 1}`);

function SlowResults({ query }) {
  const normalizedQuery = query.trim().toLowerCase();
  const results = [];

  for (const product of PRODUCTS) {
    if (!normalizedQuery || product.toLowerCase().includes(normalizedQuery)) {
      results.push(product);
    }
  }

  return (
    <ul>
      {results.slice(0, 80).map(product => <li key={product}>{product}</li>)}
    </ul>
  );
}

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <main>
      <h1>useDeferredValue</h1>
      <label>
        搜索：
        <input value={query} onChange={event => setQuery(event.target.value)} />
      </label>
      <p>即时值：{query || '（空）'}</p>
      <p>延迟值：{deferredQuery || '（空）'}</p>
      <section style={{ opacity: isStale ? 0.55 : 1 }} aria-busy={isStale}>
        <p>{isStale ? '结果正在后台追赶…' : '结果已追上输入'}</p>
        <SlowResults query={deferredQuery} />
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchPage />
  </StrictMode>,
);
