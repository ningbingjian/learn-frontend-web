import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function CounterRow({ label }) {
  const [count, setCount] = useState(0);

  return (
    <li>
      {label}：{count}{' '}
      <button onClick={() => setCount(value => value + 1)}>+1</button>
    </li>
  );
}

function FeaturePanel({ enabled }) {
  const [visits, setVisits] = useState(0);

  if (!enabled) {
    return <p>功能已关闭</p>;
  }

  return (
    <section>
      <p>访问次数：{visits}</p>
      <button onClick={() => setVisits(value => value + 1)}>记录访问</button>
    </section>
  );
}

function App() {
  const [enabled, setEnabled] = useState(true);
  const items = ['Alpha', 'Beta', 'Gamma'];

  return (
    <main>
      <h1>Hooks 不能放在条件和循环中</h1>
      <button onClick={() => setEnabled(value => !value)}>切换功能</button>
      <FeaturePanel enabled={enabled} />
      <ul>
        {items.map(item => (
          <CounterRow key={item} label={item} />
        ))}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
