import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  return {
    count,
    increment() {
      setCount(value => value + 1);
    },
  };
}

function CounterCard({ title, initialValue }) {
  const counter = useCounter(initialValue);

  return (
    <section>
      <h2>{title}</h2>
      <p>计数：{counter.count}</p>
      <button onClick={counter.increment}>+1</button>
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>Hooks 顶层调用</h1>
      <CounterCard title="计数器 A" initialValue={0} />
      <CounterCard title="计数器 B" initialValue={10} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
