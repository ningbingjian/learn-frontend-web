import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const initialItems = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma' },
];

function Row({ item }) {
  const [clicks, setClicks] = useState(0);

  return (
    <li>
      <strong>{item.label}</strong> — local clicks: {clicks}{' '}
      <button type="button" onClick={() => setClicks(clicks + 1)}>
        +1
      </button>
    </li>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);

  return (
    <main>
      <p>RE-KP066</p>
      <h1>稳定 key 让本地 State 跟随实体</h1>
      <ul>
        {items.map((item) => (
          <Row key={item.id} item={item} />
        ))}
      </ul>
      <button type="button" onClick={() => setItems([...items].reverse())}>
        反转列表
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
