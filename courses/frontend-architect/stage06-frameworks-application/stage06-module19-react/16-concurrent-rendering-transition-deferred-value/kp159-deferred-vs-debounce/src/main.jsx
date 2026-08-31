import { StrictMode, useDeferredValue, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function SearchComparison() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 600);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  return (
    <main>
      <h1>Deferred Value vs Debounce</h1>
      <label>
        搜索：
        <input value={query} onChange={event => setQuery(event.target.value)} />
      </label>
      <ul>
        <li>即时 query：{query || '（空）'}</li>
        <li>deferredQuery：{deferredQuery || '（空）'}</li>
        <li>600ms debouncedQuery：{debouncedQuery || '（空）'}</li>
      </ul>
      <p>Deferred：用于让某部分 UI 以较低优先级追赶。</p>
      <p>Debounce：等待固定静默窗口后才执行后续工作，例如搜索请求。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchComparison />
  </StrictMode>,
);
