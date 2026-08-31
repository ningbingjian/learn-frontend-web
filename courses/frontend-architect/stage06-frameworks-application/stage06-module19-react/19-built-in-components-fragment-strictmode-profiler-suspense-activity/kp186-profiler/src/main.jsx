import { Profiler, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

const products = Array.from({ length: 800 }, (_, index) => `Product ${index + 1}`);

function SearchResults({ query }) {
  const normalized = query.trim().toLowerCase();
  let checksum = 0;

  for (let index = 0; index < 250000; index += 1) {
    checksum = (checksum + index) % 997;
  }

  const visible = products.filter(product => product.toLowerCase().includes(normalized));

  return (
    <section>
      <p>结果数：{visible.length} · checksum：{checksum}</p>
      <ul>{visible.slice(0, 20).map(product => <li key={product}>{product}</li>)}</ul>
    </section>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const sampleRef = useRef(null);

  function handleRender(id, phase, actualDuration) {
    const text = `${id} / ${phase} / ${actualDuration.toFixed(2)}ms`;
    console.log('Profiler sample:', text);
    if (sampleRef.current) {
      sampleRef.current.textContent = text;
    }
  }

  return (
    <main>
      <h1>Profiler：程序化测量 React 子树</h1>
      <label>
        搜索：
        <input value={query} onChange={event => setQuery(event.target.value)} />
      </label>
      <p>最新测量：<output ref={sampleRef}>等待 commit...</output></p>
      <Profiler id="SearchResults" onRender={handleRender}>
        <SearchResults query={query} />
      </Profiler>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
