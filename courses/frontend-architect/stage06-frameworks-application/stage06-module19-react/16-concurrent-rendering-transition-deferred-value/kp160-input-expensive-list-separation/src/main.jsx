import { StrictMode, memo, useDeferredValue, useState } from 'react';
import { createRoot } from 'react-dom/client';

const ITEMS = Array.from({ length: 12000 }, (_, index) => `Architecture Item ${index + 1}`);

const ExpensiveList = memo(function ExpensiveList({ query }) {
  const normalizedQuery = query.trim().toLowerCase();
  const matches = ITEMS.filter(item => item.toLowerCase().includes(normalizedQuery));

  let checksum = 0;
  for (let index = 0; index < 400000; index += 1) {
    checksum = (checksum + index) % 997;
  }

  return (
    <section>
      <p>列表使用 query：{query || '（空）'} · checksum: {checksum}</p>
      <ul>{matches.slice(0, 100).map(item => <li key={item}>{item}</li>)}</ul>
    </section>
  );
});

function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <main>
      <h1>输入框与昂贵列表分离</h1>
      <input value={query} onChange={event => setQuery(event.target.value)} placeholder="快速输入" />
      <p>输入框：{query || '（空）'}</p>
      <div style={{ opacity: isStale ? 0.6 : 1 }}>
        <ExpensiveList query={deferredQuery} />
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
