import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function useToggle(initialValue = false) {
  const [on, setOn] = useState(initialValue);
  return [on, () => setOn(value => !value)];
}

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  return {
    count,
    increment() {
      setCount(value => value + 1);
    },
    decrement() {
      setCount(value => value - 1);
    },
    reset() {
      setCount(initialValue);
    },
  };
}

function App() {
  const [detailsOpen, toggleDetails] = useToggle(false);
  const counter = useCounter(10);

  return (
    <main>
      <h1>对象返回与 Tuple 返回</h1>

      <section>
        <h2>Tuple：useToggle</h2>
        <button onClick={toggleDetails}>
          {detailsOpen ? 'Hide details' : 'Show details'}
        </button>
        {detailsOpen && <p>Tuple 适合短小、位置稳定的返回契约。</p>}
      </section>

      <section>
        <h2>Object：useCounter</h2>
        <p>Count: {counter.count}</p>
        <button onClick={counter.decrement}>-1</button>{' '}
        <button onClick={counter.increment}>+1</button>{' '}
        <button onClick={counter.reset}>Reset</button>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
