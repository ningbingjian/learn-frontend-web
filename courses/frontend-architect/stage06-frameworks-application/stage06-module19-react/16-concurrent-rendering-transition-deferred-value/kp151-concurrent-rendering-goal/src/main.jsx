import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const products = Array.from({ length: 2500 }, (_, index) => ({
  id: index,
  name: `Product ${index}`,
}));

function expensiveScore(text) {
  if (text.length === 0) {
    return 0;
  }

  let score = 0;
  for (let index = 0; index < 180; index += 1) {
    score += text.charCodeAt(index % text.length);
  }
  return score;
}

function ExpensiveResults({ query }) {
  const normalizedQuery = query.trim().toLowerCase();
  const results = [];

  for (const product of products) {
    const score = expensiveScore(product.name);
    if (product.name.toLowerCase().includes(normalizedQuery)) {
      results.push({ ...product, score });
    }
  }

  return (
    <section>
      <h2>昂贵结果列表</h2>
      <p>匹配数量：{results.length}</p>
      <ul>
        {results.slice(0, 20).map(product => (
          <li key={product.id}>
            {product.name} · score {product.score}
          </li>
        ))}
      </ul>
    </section>
  );
}

function App() {
  const [query, setQuery] = useState('');

  return (
    <main>
      <h1>RE-KP151：Concurrent Rendering 的目标</h1>
      <label>
        搜索：{' '}
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="快速输入，例如 24"
        />
      </label>
      <p>当前 query：{query || '（空）'}</p>
      <ExpensiveResults query={query} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
