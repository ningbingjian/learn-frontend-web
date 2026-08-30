import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function Counter({ enabled }) {
  const [count, setCount] = useState(0);

  if (!enabled) {
    return <p>Counter disabled，Hook 仍然在顶层稳定调用。</p>;
  }

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

function App() {
  const [enabled, setEnabled] = useState(true);

  return (
    <main>
      <h1>eslint-plugin-react-hooks</h1>
      <button onClick={() => setEnabled(value => !value)}>
        {enabled ? 'Disable' : 'Enable'} Counter
      </button>
      <Counter enabled={enabled} />
      <p>条件只影响 JSX，不改变 Counter 内 Hook 的调用顺序。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
