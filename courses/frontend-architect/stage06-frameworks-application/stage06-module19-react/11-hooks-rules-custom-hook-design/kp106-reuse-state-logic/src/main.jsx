import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  return {
    count,
    increment() {
      setCount(value => value + 1);
    },
    reset() {
      setCount(initialValue);
    },
  };
}

function CounterPanel({ label }) {
  const counter = useCounter(0);

  return (
    <section>
      <h2>{label}</h2>
      <p>Count: {counter.count}</p>
      <button onClick={counter.increment}>+1</button>{' '}
      <button onClick={counter.reset}>Reset</button>
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>复用状态逻辑，而不是状态本身</h1>
      <CounterPanel label="Counter A" />
      <CounterPanel label="Counter B" />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
